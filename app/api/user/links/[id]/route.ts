import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await auth();
    const linkId = params.id;

    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const link = await prisma.link.findUnique({
            where: { id: linkId },
        });

        if(!link) return NextResponse.json({ error: 'Link not found' }, { status: 404 });
        if (link.userId !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        await prisma.link.delete({
            where: { id: linkId },
        });

        return NextResponse.json({ message: 'Link deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting link:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}