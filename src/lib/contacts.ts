import type { ContactLink, ContactType, Employee } from "./types";
import { ensureExternalHref } from "./links";

export function resolveEmployeeContacts(employee: Employee): ContactLink[] {
  if (employee.contacts?.length) return employee.contacts;
  const legacy: ContactLink[] = [];
  const push = (type: ContactType, value: string) => {
    if (!value?.trim()) return;
    legacy.push({ id: `${type}-${value}`, type, value: value.trim(), label: "" });
  };
  push("phone", employee.phone);
  push("telegram", employee.telegram);
  push("facebook", employee.facebook);
  push("tiktok", employee.tiktok);
  push("linkedin", employee.linkedin);
  return legacy;
}

export function contactDisplayLabel(contact: ContactLink): string {
  if (contact.type === "custom" && contact.label?.trim()) return contact.label.trim();
  return contact.value;
}

export function contactHref(contact: ContactLink): string {
  const value = contact.value.trim();
  if (!value) return "#";
  if (contact.type === "phone") return ensureExternalHref(value, "phone");
  if (contact.type === "whatsapp") {
    if (/^https?:\/\//i.test(value) || value.startsWith("wa.me/")) {
      return ensureExternalHref(value, "url");
    }
    const digits = value.replace(/[^\d+]/g, "").replace(/^\+/, "");
    return `https://wa.me/${digits}`;
  }
  return ensureExternalHref(value, "url");
}
