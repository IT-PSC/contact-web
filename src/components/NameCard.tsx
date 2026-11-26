"use client";

import { useMemo, useState } from "react";
import { mediaUrl, vcardUrl } from "@/lib/api";
import { ensureExternalHref } from "@/lib/links";
import type { CompanySettings, Employee } from "@/lib/types";

type Lang = "km" | "en" | "zh";

const labels: Record<
  Lang,
  {
    hello: string;
    name: string;
    position: string;
    department: string;
    email: string;
    personalContact: string;
    language: string;
    addToContact: string;
    languages: { km: string; en: string; zh: string };
  }
> = {
  en: {
    hello: "HELLO! I'm",
    name: "NAME",
    position: "POSITION",
    department: "DEPARTMENT",
    email: "EMAIL",
    personalContact: "PERSONAL CONTACT",
    language: "LANGUAGE",
    addToContact: "Add To Contact",
    languages: { km: "Khmer", en: "English", zh: "Chinese" },
  },
  km: {
    hello: "សួស្តី! ខ្ញុំឈ្មោះ",
    name: "ឈ្មោះ",
    position: "មុខតំណែង",
    department: "ផ្នែក",
    email: "អ៊ីមែល",
    personalContact: "ទំនាក់ទំនងផ្ទាល់ខ្លួន",
    language: "ភាសា",
    addToContact: "បញ្ចូលទំនាក់ទំនង",
    languages: { km: "ខ្មែរ", en: "អង់គ្លេស", zh: "ចិន" },
  },
  zh: {
    hello: "你好！我是",
    name: "姓名",
    position: "职位",
    department: "部门",
    email: "邮箱",
    personalContact: "个人联系方式",
    language: "语言",
    addToContact: "添加到通讯录",
    languages: { km: "高棉语", en: "英语", zh: "中文" },
  },
};

type Props = {
  employee: Employee;
  company: CompanySettings;
  departmentName: string;
};

function ContactIcon({ type }: { type: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  if (type === "phone") {
    return (
      <svg {...common}>
        <path
          d="M6.5 4.5h3l1.2 3-1.8 1.8a12 12 0 005.8 5.8l1.8-1.8 3 1.2v3A2 2 0 0117.5 20 13.5 13.5 0 014 6.5a2 2 0 012.5-2z"
          stroke="#fff"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "telegram") {
    return (
      <svg {...common}>
        <path
          d="M21 4L3 11.5l6 2.2L17 8l-6.8 7.4 6.3 3.3L21 4z"
          stroke="#fff"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "facebook") {
    return (
      <svg {...common}>
        <path
          d="M14 9h2.5V6H14a4 4 0 00-4 4v2H8v3h2v7h3v-7h2.2L16 12h-3v-1a1 1 0 011-1z"
          fill="#fff"
        />
      </svg>
    );
  }
  if (type === "tiktok") {
    return (
      <svg {...common}>
        <path
          d="M14 4v9.2a3.3 3.3 0 11-2.4-3.2V7.2A5.7 5.7 0 0014 8V4h3.2A5.4 5.4 0 0120 7.5V10a8.2 8.2 0 01-6-2.4V18a5.5 5.5 0 11-5.5-5.5h.8V15h-.8a2.8 2.8 0 100 5.6A2.8 2.8 0 0014 17.8V4z"
          fill="#fff"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        d="M7 9.5A4.5 4.5 0 0111.5 5H14a4 4 0 010 8h-2M17 14.5A4.5 4.5 0 0112.5 19H10a4 4 0 010-8h2"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Gold chevron divider matching the mockup section transitions */
function GoldChevron({
  flip = false,
  gradId = "goldChevron",
}: {
  flip?: boolean;
  gradId?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-20 h-8 ${
        flip ? "bottom-0" : "top-0"
      }`}
    >
      <svg
        viewBox="0 0 430 32"
        preserveAspectRatio="none"
        className={`h-full w-full ${flip ? "rotate-180" : ""}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A88720" />
            <stop offset="35%" stopColor="#F0D78C" />
            <stop offset="65%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#A88720" />
          </linearGradient>
        </defs>
        <path d="M0 0 L0 10 L215 32 L430 10 L430 0 Z" fill="#1a1a1a" />
        <path
          d="M0 8 L215 30 L430 8"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="3.5"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  );
}

function SloganText({ slogan }: { slogan: string }) {
  const words = slogan.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return null;

  return (
    <p className="relative text-[clamp(18px,5.2vw,26px)] font-extrabold uppercase leading-snug tracking-[0.08em]">
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className={index % 2 === 0 ? "text-[#D4AF37]" : "text-[#111]"}>
            {word}
          </span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/** Highlight alternate words in bio with gold (matches mockup accent words) */
function BioText({ bio }: { bio: string }) {
  const words = bio.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return null;

  return (
    <p className="mx-auto mt-3 max-w-[340px] text-[13px] leading-relaxed text-[#555]">
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className={index % 3 === 1 ? "font-semibold text-[#D4AF37]" : undefined}>
            {word}
          </span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

export function NameCard({ employee, company, departmentName }: Props) {
  const [lang, setLang] = useState<Lang>("en");
  const t = labels[lang];

  const logoSrc = mediaUrl(company.logoUrl) || "/sandai-logo.png";
  const photoSrc = mediaUrl(employee.photoUrl);

  const contacts = useMemo(
    () =>
      [
        employee.phone
          ? {
              type: "phone",
              label: employee.phone,
              href: ensureExternalHref(employee.phone, "phone"),
            }
          : null,
        employee.telegram
          ? {
              type: "telegram",
              label: employee.telegram,
              href: ensureExternalHref(employee.telegram, "url"),
            }
          : null,
        employee.facebook
          ? {
              type: "facebook",
              label: employee.facebook,
              href: ensureExternalHref(employee.facebook, "url"),
            }
          : null,
        employee.tiktok
          ? {
              type: "tiktok",
              label: employee.tiktok,
              href: ensureExternalHref(employee.tiktok, "url"),
            }
          : null,
        employee.linkedin
          ? {
              type: "linkedin",
              label: employee.linkedin,
              href: ensureExternalHref(employee.linkedin, "url"),
            }
          : null,
      ].filter(Boolean) as { type: string; label: string; href: string }[],
    [employee],
  );

  const infoRows = [
    { label: t.name, value: employee.name },
    { label: t.position, value: employee.position },
    { label: t.department, value: departmentName },
    { label: t.email, value: employee.email },
  ];

  const bioText =
    employee.bio || `${employee.position} · ${company.name}`;

  return (
    <article
      lang={lang === "zh" ? "zh" : lang}
      className="namecard mx-auto w-full max-w-[430px] overflow-hidden rounded-[24px] bg-[#050505] text-white shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
    >
      {/* Header — light topo background */}
      <section className="relative overflow-hidden px-6 pb-10 pt-8 text-center text-[#111]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[#f3f3f3]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/backgrounds/top background.png"
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="relative z-10">
          <div className="mx-auto mb-6 flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={company.name}
              className="h-[72px] w-[72px] object-contain drop-shadow-sm"
            />
            <p className="mt-1.5 text-[11px] font-bold tracking-[0.32em] text-[#1a1a1a]">
              {company.name}
            </p>
          </div>

          <div className="mx-auto mb-5 h-[140px] w-[140px] overflow-hidden rounded-full border-[3.5px] border-[#D4AF37] bg-[#eee] shadow-[0_10px_30px_rgba(212,175,55,0.28)]">
            {photoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoSrc}
                alt={employee.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#2a2a2a,#D4AF37)] text-[34px] font-bold text-black">
                {employee.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0]?.toUpperCase() ?? "")
                  .join("")}
              </div>
            )}
          </div>

          <h1 className="text-[clamp(22px,6vw,28px)] font-extrabold leading-tight tracking-tight text-[#111]">
            {`${t.hello} ${employee.name}.`}
          </h1>
          <BioText bio={bioText} />
        </div>
      </section>

      {/* Professional info — PNG on top of light pattern (transparent edges won't show black) */}
      <section className="relative px-5 py-10 bg-transparent">
  <div className="absolute inset-0">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/backgrounds/background on personal information.png"
      alt=""
      className="h-full w-full object-fill"
    />
  </div>

        <div className="relative z-10 space-y-3">
          {infoRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(70,70,70,0.55)] px-4 py-3 backdrop-blur-[2px]"
            >
              <span className="shrink-0 text-[11px] font-semibold tracking-[0.08em] text-white/55">
                {row.label}:
              </span>
              <span className="min-w-0 flex-1 truncate text-right text-[14px] font-semibold text-white">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Slogan — light geometric background */}
      <section className="relative overflow-hidden px-6 py-12 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[#d8d8d8]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/backgrounds/slogan background.png"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative z-10">
          <SloganText slogan={company.slogan} />
        </div>
      </section>

      {/* Personal contacts — solid black with gold chevron */}
      <section className="relative overflow-hidden bg-[#050505] px-5 pb-8 pt-12">
        <GoldChevron gradId="goldContactTop" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1a1a1a] to-transparent"
        />

        <div className="relative z-10">
          <h2 className="mb-5 text-center text-[15px] font-bold tracking-[0.2em] text-white">
            {t.personalContact}
          </h2>

          <div className="space-y-2.5">
            {contacts.length === 0 ? (
              <p className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-[13px] text-white/50">
                No personal contacts yet
              </p>
            ) : (
              contacts.map((item) => (
                <a
                  key={`${item.type}-${item.label}`}
                  href={item.href}
                  {...(item.type === "phone"
                    ? {}
                    : { target: "_blank", rel: "noreferrer" })}
                  className="flex items-center gap-3 rounded-full border border-white/12 bg-[rgba(80,80,80,0.45)] px-3 py-2.5 transition hover:border-[#D4AF37]/55 hover:bg-white/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40">
                    <ContactIcon type={item.type} />
                  </span>
                  <span className="truncate text-[13px] text-white/90">
                    {item.label}
                  </span>
                </a>
              ))
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="mb-3 text-[12px] font-bold tracking-[0.22em] text-white">
              {t.language}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {(Object.keys(labels) as Lang[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`min-w-[78px] rounded-md px-3.5 py-1.5 text-[12px] font-semibold transition ${
                    lang === code
                      ? "bg-[#D4AF37] text-black"
                      : "border border-white/25 bg-transparent text-white/80 hover:border-[#D4AF37]/50"
                  }`}
                >
                  {t.languages[code]}
                </button>
              ))}
            </div>
          </div>

          <a
            href={vcardUrl(employee.slug)}
            className="mt-7 flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#F0D78C_0%,#D4AF37_45%,#C5A028_100%)] px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_28px_rgba(212,175,55,0.4)] transition hover:brightness-105"
          >
            {t.addToContact}
          </a>
        </div>
      </section>
    </article>
  );
}
