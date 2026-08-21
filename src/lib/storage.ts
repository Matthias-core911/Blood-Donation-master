/**
 * Client-side session marker only. Real credentials and all persisted data
 * (donors, requests, payments, schedules) now live in the database - see
 * src/db and src/rpc. This just remembers who's using this browser, the
 * same way the original app's "current user" concept worked, but without
 * ever storing a password client-side.
 */

const SESSION_KEY = "lifeline_session";

function isBrowser() {
  return typeof window !== "undefined";
}

export interface SessionUser {
  name: string;
  phone: string;
}

export function getCurrentUser(): SessionUser | null {
  if (!isBrowser()) return null;
  try {
    const raw =
      window.localStorage.getItem(SESSION_KEY) ?? window.sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: SessionUser, remember = true) {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
  (remember ? window.localStorage : window.sessionStorage).setItem(
    SESSION_KEY,
    JSON.stringify(user),
  );
}

export function clearCurrentUser() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}

/** Normalizes Kenyan phone input (07XX…, 7XX…, 2547XX…, +254 7XX…) to 2547XXXXXXXX. */
export function normalizeKenyanPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 10) return `254${digits.slice(1)}`;
  if (digits.startsWith("7") && digits.length === 9) return `254${digits}`;
  return null;
}
