"use client";

import { useMemo, useState, type ReactNode } from "react";
import { mediaUrl, vcardUrl } from "@/lib/api";
import {
  contactDisplayLabel,
  contactHref,
  resolveEmployeeContacts,
} from "@/lib/contacts";
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

function BioText({ bio }: { bio: string }) {
  const words = bio.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return null;

  return (
    <p className="mx-auto mt-3.5 max-w-[300px] px-2 text-[13px] leading-[1.75] text-[#2a2a2a]">
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            className={
              index % 3 === 1
                ? "font-semibold text-[#C8962E]"
                : "font-medium"
            }
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/** Glass pill matching the design mockup (info + contact rows) */
function GlassPill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center rounded-full border border-white/25 bg-[rgba(120,120,120,0.28)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-[6px] ${className}`}
    >
      {children}
    </div>
  );
}

const TEMPLATE_BG = "/backgrounds/sandai-namecard-template.jpg";

export function NameCard({ employee, company, departmentName }: Props) {
  const [lang, setLang] = useState<Lang>("en");
  const t = labels[lang];

  const logoSrc = mediaUrl(company.logoUrl) || "/sandai-logo.png";
  const photoSrc = mediaUrl(employee.photoUrl);

  const contacts = useMemo(
    () =>
      resolveEmployeeContacts(employee).map((item) => ({
        type: item.type,
        label: contactDisplayLabel(item),
        href: contactHref(item),
      })),
    [employee],
  );

  const infoRows = [
    { label: t.name, value: employee.name },
    { label: t.position, value: employee.position },
    { label: t.department, value: departmentName },
    { label: t.email, value: employee.email },
  ];

  const bioText = employee.bio || `${employee.position} · ${company.name}`;

  return (
    <article
      lang={lang === "zh" ? "zh" : lang}
      className="namecard relative mx-auto w-full max-w-[430px] overflow-hidden rounded-[24px] bg-[#f3f3f3] text-white shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
      style={{
        backgroundImage: `url("${TEMPLATE_BG}")`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Fallback img for WebViews that struggle with CSS background-image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TEMPLATE_BG}
          alt=""
          className="h-full w-full object-fill"
          decoding="async"
        />
      </div>

      {/* Header — matches light topo hero layout */}
      <section className="relative z-10 px-5 pb-8 pt-8 text-center text-[#111]">
        {/* Soft center glow behind photo (like the mockup) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[40%] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_50%,transparent_72%)]"
        />

        <div className="relative mx-auto mb-4 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt={company.name}
            className="h-[84px] w-[84px] object-contain"
          />
        </div>

        {/* Thick metallic gold double-ring — colors from design image */}
        <div
          className="relative mx-auto mb-5 h-[152px] w-[152px] rounded-full p-[7px] shadow-[0_10px_28px_rgba(154,98,0,0.35)]"
          style={{
            background:
              "linear-gradient(145deg, #F4C065 0%, #E7A933 22%, #CD9238 48%, #AD7F27 72%, #9A6200 100%)",
          }}
        >
          <div
            className="h-full w-full rounded-full p-[3px]"
            style={{
              background:
                "linear-gradient(325deg, #E6A834 0%, #9A6200 42%, #CD9238 78%, #F4C065 100%)",
            }}
          >
            <div className="h-full w-full overflow-hidden rounded-full bg-black ring-1 ring-[#9A6200]/45">
              {photoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoSrc}
                  alt={employee.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#2a2a2a,#D4AF37)] text-[36px] font-bold text-black">
                  {employee.name
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0]?.toUpperCase() ?? "")
                    .join("")}
                </div>
              )}
            </div>
          </div>
        </div>

        <h1 className="relative text-[clamp(22px,5.8vw,28px)] font-extrabold leading-tight tracking-tight text-black">
          {`${t.hello} ${employee.name}.`}
        </h1>
        <div className="relative">
          <BioText bio={bioText} />
        </div>
      </section>

      {/* Professional info — glass pills like design mockup */}
      <section className="relative z-10 px-5 pb-12 pt-12">
        <div className="space-y-2.5">
          {infoRows.map((row) => (
            <GlassPill key={row.label} className="justify-between gap-3">
              <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                {row.label}:
              </span>
              <span className="min-w-0 truncate text-right text-[14px] font-bold text-white">
                {row.value}
              </span>
            </GlassPill>
          ))}
        </div>
      </section>

      {/* Slogan — light geometric zone */}
      <section className="relative z-10 px-6 py-12 text-center">
        <SloganText slogan={company.slogan} />
      </section>

      {/* Personal contacts — dark bottom zone */}
      <section className="relative z-10 px-5 pb-8 pt-10">
        <h2 className="mb-5 text-center text-[15px] font-bold tracking-[0.2em] text-white">
          {t.personalContact}
        </h2>

        <div className="space-y-2.5">
          {contacts.length === 0 ? (
            <GlassPill className="justify-center">
              <span className="text-[13px] text-white/55">
                No personal contacts yet
              </span>
            </GlassPill>
          ) : (
            contacts.map((item) => (
              <a
                key={`${item.type}-${item.label}`}
                href={item.href}
                {...(item.type === "phone"
                  ? {}
                  : { target: "_blank", rel: "noreferrer" })}
                className="flex items-center gap-3 rounded-full border border-white/25 bg-[rgba(120,120,120,0.28)] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-[6px] transition hover:border-[#E7A933]/55 hover:bg-[rgba(140,140,140,0.35)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/45">
                  <ContactIcon type={item.type} />
                </span>
                <span className="truncate text-[13px] font-medium text-white">
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
      </section>
    </article>
  );
}
