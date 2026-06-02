const register = async ({ username, password }) => {
    const user = { username, password };
    const token = 'adgshtjjesfef'

    return { user, token };
};

export default { register };
