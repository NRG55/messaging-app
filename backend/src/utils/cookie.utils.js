const COOKIE_NAME = 'token';
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
};

export const CookieUtil = {
    setAuthCookie(res, token) {
        res.cookie(COOKIE_NAME, token, {
            ...cookieOptions,
            maxAge: SEVEN_DAYS,
        });
    },

    clearAuthCookie(res) {
        res.clearCookie(COOKIE_NAME, cookieOptions);
    },
};