import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

/**
 * Main card link and QR both land on the same digital namecard.
 * Physical card preview lives at /card/[slug]/physical
 */
export default async function CardPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/card/${encodeURIComponent(slug)}/digital`);
}
