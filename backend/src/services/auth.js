import prisma from "../config/prisma.js";

const register = async ({ username, password }) => {
    const user = await prisma.user.create({
        data: {
            username,
            password
        }
    });

    const token = 'adgshtjjesfef'

    return { user, token };
};

export default { register };
