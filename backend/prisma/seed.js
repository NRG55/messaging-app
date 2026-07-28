import prisma from '../src/config/prisma.js';

async function main() {
    const publicChat = await prisma.chat.upsert({
        where: { id: 'publicChat' },
        update: {},
        create: {
            id: 'publicChat',            
        },
    });

    console.log(`Public chat seeded with id: "${publicChat.id}"`);
    
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });