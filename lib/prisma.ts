import { PrismaClient } from '@prisma/client';

const prismaClient = global as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = prismaClient.prisma ?? new PrismaClient();

// In non-production environments, attach the prisma instance to the global object.
// This ensures that the same instance is reused across hot-reloads.
if (process.env.NODE_ENV !== 'production') {
    prismaClient.prisma = prisma;
}