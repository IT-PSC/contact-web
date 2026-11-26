"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { digitalCardPath, digitalCardUrl } from "@/lib/urls";
import type { CompanySettings, Employee } from "@/lib/types";

type Props = {
  employee: Employee;
  company: CompanySettings;
};

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 4.5h3l1.2 3-1.8 1.8a12 12 0 005.8 5.8l1.8-1.8 3 1.2v3A2 2 0 0117.5 20 13.5 13.5 0 014 6.5a2 2 0 012.5-2z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 16.5v-9z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 7l7 5.5L19 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.75 12h16.5M12 3.75c2.4 2.6 3.6 5.3 3.6 8.25S14.4 17.65 12 20.25C9.6 17.65 8.4 14.95 8.4 12S9.6 6.35 12 3.75z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ContactRow({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/70 text-[#D4AF37]">
        {icon}
      </span>
      <p className="min-w-0 pt-0.5 text-[11px] leading-snug text-white/90 sm:text-[12px]">
        {children}
      </p>
    </div>
  );
}

function LightningMark() {
  return (
    <svg
      className="pointer-events-none absolute -right-6 -top-8 h-[140%] w-[70%] opacity-90"
      viewBox="0 0 320 420"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="boltGold" x1="40" y1="20" x2="280" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5E6A8" />
          <stop offset="0.45" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#8A6A14" />
        </linearGradient>
      </defs>
      <path
        d="M188 18L72 214h78L98 402l168-228h-86L188 18z"
        fill="url(#boltGold)"
        fillOpacity="0.55"
      />
      <path
        d="M188 18L72 214h78L98 402l168-228h-86L188 18z"
        stroke="url(#boltGold)"
        strokeWidth="3"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

export function PhysicalCard({ employee, company }: Props) {
  const qrValue = digitalCardUrl(employee.slug);
  const digitalHref = digitalCardPath(employee.slug);
  const website =
    company.name.trim().toLowerCase() === "sandai"
      ? "www.sandai.com"
      : company.name;

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-5 px-3 py-8 sm:py-12">
      <article
        className="physical-card relative w-full overflow-hidden rounded-[18px] border border-[#D4AF37]/25 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
        style={{
          background:
            "radial-gradient(120% 90% at 100% 10%, rgba(212,175,55,0.18), transparent 42%), linear-gradient(135deg, #1a1a1a 0%, #0c0c0c 48%, #151515 100%)",
        }}
      >
        <LightningMark />

        <div className="relative z-10 grid gap-6 p-5 sm:grid-cols-[1.15fr_0.85fr] sm:gap-4 sm:p-7">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold tracking-[0.14em] text-[#D4AF37] sm:text-[14px]">
              {company.name}
            </p>
            <h1 className="mt-1 text-[22px] font-extrabold uppercase tracking-[0.04em] text-white sm:text-[28px]">
              {employee.name}
            </h1>
            <p className="mt-2 text-[13px] font-medium text-white/85 sm:text-[14px]">
              {employee.position}
            </p>
            <div className="mt-2 h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />

            <div className="mt-5 flex flex-col gap-2.5">
              {employee.phone ? (
                <ContactRow icon={<PhoneIcon />}>{employee.phone}</ContactRow>
              ) : null}
              {employee.email ? (
                <ContactRow icon={<MailIcon />}>{employee.email}</ContactRow>
              ) : null}
              <ContactRow icon={<WebIcon />}>{website}</ContactRow>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:items-end">
            <div className="rounded-xl bg-white p-2.5 shadow-[0_12px_28px_rgba(212,175,55,0.25)]">
              <QRCodeSVG
                value={qrValue}
                size={132}
                level="M"
                bgColor="#ffffff"
                fgColor="#050505"
                includeMargin={false}
              />
            </div>
            <p className="max-w-[160px] text-center text-[10px] leading-snug tracking-[0.08em] text-[#D4AF37]/85 sm:text-right">
              Scan for digital namecard
            </p>
          </div>
        </div>
      </article>

      <Link
        href={digitalHref}
        className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-2.5 text-[13px] font-semibold text-[#F0D78C] transition hover:bg-[#D4AF37]/20"
      >
        Open digital namecard →
      </Link>
    </div>
  );
}
