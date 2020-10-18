// amount of days that cookie should be valid
const EXPIRY_IN_X_DAYS = 7;

/**
 * Returns a date for when the auth cookie should expire
 *
 * @returns - The expiration date
 */

export const getCookieExpirationDate = (): Date => {
    const now = new Date();
    now.setDate(now.getDate() + EXPIRY_IN_X_DAYS);
    return now;
};
