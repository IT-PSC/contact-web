import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhysicalCard } from "@/components/PhysicalCard";
import { fetchCard, mediaUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const card = await fetchCard(slug);
    if (!card) return { title: "Namecard not found" };
    return {
      title: `${card.employee.name} — ${card.company.name}`,
      description:
        card.employee.bio ||
        `${card.employee.position} at ${card.company.name}`,
      openGraph: {
        title: `${card.employee.name} — ${card.company.name}`,
        description: card.employee.bio || card.employee.position,
        images: card.employee.photoUrl
          ? [{ url: mediaUrl(card.employee.photoUrl) }]
          : undefined,
      },
    };
  } catch {
    return { title: "SANDAI Namecard" };
  }
}

export default async function CardPage({ params }: Props) {
  const { slug } = await params;
  let card;
  try {
    card = await fetchCard(slug);
  } catch {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold text-white">Cannot reach backend</h1>
        <p className="mt-3 text-sm text-white/60">
          Start Contact Backend on port 4000, then refresh this page.
        </p>
      </main>
    );
  }

  if (!card) notFound();

  return (
    <main className="relative z-10 min-h-screen">
      <PhysicalCard employee={card.employee} company={card.company} />
    </main>
  );
}
