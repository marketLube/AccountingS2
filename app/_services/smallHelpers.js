export function clearCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Helper function to get cookie value if needed
export const getCookieValue = (cookieName) => {
  const fullCookieString = document.cookie;

  const cookieMatch = fullCookieString
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`));

  return cookieMatch ? cookieMatch.split("=")[1] : null;
};
