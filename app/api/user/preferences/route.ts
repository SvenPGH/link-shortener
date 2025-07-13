import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

/**
 * Validates the request body for updating user preferences.
 * Ensures that only allowed keys are present and their values are booleans.
 * @param body The request body to validate.
 * @returns An object with either the validated data or an error message.
 */
const validatePreferences = (body: any) => {
    const allowedKeys = ['darkMode', 'emailNotifications', 'linkAnalytics'];
    const dataToUpdate: { [key: string]: boolean } = {};

    // Check if the body is a valid object
    if (typeof body !== 'object' || body === null) {
        return { error: 'Invalid request body. Expected an object.' };
    }

    for (const key in body) {
        if (!allowedKeys.includes(key)) {
            return { error: `Invalid preference key: '${key}'.` };
        }

        if (typeof body[key] !== 'boolean') {
            return { error: `Preference '${key}' must be a boolean.` };
        }
        dataToUpdate[key] = body[key];
    }

    return { data: dataToUpdate };
};

export async function PUT(request: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { data: dataToUpdate, error } = validatePreferences(body);

        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        if (!dataToUpdate || Object.keys(dataToUpdate).length === 0) {
            return NextResponse.json({ error: 'No preference fields provided for update.' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: dataToUpdate,
        });

        return NextResponse.json(updatedUser);

    } catch (err) {
        console.error("Error updating preferences:", err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}