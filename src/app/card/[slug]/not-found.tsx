import Link from "next/link";

export default function CardNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold text-white">Namecard not found</h1>
      <p className="mt-3 text-sm text-white/60">
        This profile does not exist or was removed in Contact Admin.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full border border-[#D4AF37]/40 px-5 py-2 text-sm font-semibold text-[#F0D78C]"
      >
        Back home
      </Link>
    </main>
  );
}
