export const STAGE = import.meta.env.VITE_STAGE;

export const DOMAIN = "supply25.com";
export const USER_SERVICE_URL = `https://user-${STAGE}.${DOMAIN}`;
export const TENDER_PACKAGE_SERVICE_URL = `https://tender-package-${STAGE}.${DOMAIN}`;
export const ASSESSMENT_SERVICE_URL = `https://assessment-${STAGE}.${DOMAIN}`;
