import { notFound } from 'next/navigation';
import { getEssayBySlug, getAllEssays } from '@/lib/essays';
import { EssayReader } from './essay-reader';

export function generateStaticParams() {
  return getAllEssays().map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const essay = getEssayBySlug(params.slug);
  if (!essay) return { title: 'Essay Not Found' };
  return {
    title: `${essay.title} — Troy Michael Scott`,
    description: essay.excerpt,
  };
}

export default function EssayPage({ params }: { params: { slug: string } }) {
  const essay = getEssayBySlug(params.slug);
  if (!essay) notFound();
  return <EssayReader essay={essay} />;
}
