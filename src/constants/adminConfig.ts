// Configuration file for Bostami Education Admin Access Control

export const DEFAULT_ADMIN_EMAILS: string[] = [
  "admin@bostamieducation.com",
  "rakibulhasan4041@gmail.com",
  "bostamieducation@gmail.com",
  "bayzidbostami@gmail.com",
  "rakibulhasan@gmail.com",
];

export function getAdminEmails(): string[] {
  const envEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean)
    : [];

  const combined = Array.from(
    new Set([
      ...DEFAULT_ADMIN_EMAILS.map((e) => e.trim().toLowerCase()),
      ...envEmails,
    ])
  );

  return combined;
}

/**
 * Checks if a given email is an authorized administrator.
 */
export function isUserAdmin(email?: string | null): boolean {
  if (!email) return false;
  const adminList = getAdminEmails();
  return adminList.includes(email.trim().toLowerCase());
}
