import {PrismaClient} from '@prisma/client';
import {PrismaNeon} from '@prisma/adapter-neon';
import {Pool} from '@neondatabase/serverless';

const prismaClientSingleton = () => {
    const neon = new Pool({connectionString: process.env.SVP_GL_DATABASE_URL});
    const adapter = new PrismaNeon(neon);
    return new PrismaClient({adapter});
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}