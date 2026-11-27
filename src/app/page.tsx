import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sandai-logo.png"
        alt="SANDAI"
        className="mb-6 h-20 w-20 object-contain"
      />
      <p className="text-[12px] font-semibold tracking-[0.28em] text-[#D4AF37]">
        SANDAI
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-white">Digital Namecard</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
        Open a personal card with{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-[#F0D78C]">
          /card/your-slug
        </code>
        . Profiles are managed in Contact Admin.
      </p>
      <Link
        href="/card/bobby-tandy/digital"
        className="mt-8 inline-flex rounded-full bg-[linear-gradient(135deg,#F0D78C_0%,#D4AF37_50%,#A88720_100%)] px-6 py-3 text-sm font-bold text-black shadow-[0_12px_28px_rgba(212,175,55,0.3)]"
      >
        View sample card
      </Link>
    </main>
  );
}
