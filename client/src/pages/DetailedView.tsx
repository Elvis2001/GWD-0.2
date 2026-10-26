import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { SectionHeader } from "@/components/SectionHeader";
import {
  ArrowLeft,
  Calendar,
  Trophy,
  ExternalLink,
  Download,
  CheckCircle2,
  Heart,
  Link2,
  MapPin,
  UserRound,
  Layers,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGalleryByCategory, usePosts } from "@/hooks/use-content";
import { buildApiUrl } from "@/lib/api";
import { DONATION_ASK } from "@/lib/site-stats";

const PROGRAM_LINKS: Record<string, { label: string; href: string }> = {
  flic: { label: "Financial Literacy Clubs (FLiC)", href: "/programs/flic" },
  hubs: { label: "Campus HUBs", href: "/programs/hubs" },
  ai: { label: "AI & Digital Skills", href: "/programs/ai" },
  blog: { label: "News & Blog", href: "/blog" },
};

export default function DetailedView() {
  const [, params] = useRoute("/details/:type/:id");
  const type = params?.type ?? "blog";
  const id = params?.id ?? "";

  const { data: galleryItems } = useGalleryByCategory(type);
  const { data: posts } = usePosts();
  const [copied, setCopied] = useState(false);
  const item =
    galleryItems?.find((entry) => String(entry.id) === id) ??
    posts?.find((entry) => String(entry.id) === id) ??
    null;

  if (!item) {
    return (
      <div className="pt-32 pb-24 text-center">
        <p className="text-gray-500">Content not found.</p>
        <Link href="/gallery">
          <Button className="mt-6">Back to Gallery</Button>
        </Link>
      </div>
    );
  }

  const images = item.galleryImages?.length
    ? item.galleryImages
    : [item.thumbnailImage || item.coverImage].filter(Boolean);
  const displayImages = images.length > 0 ? images : ["/gwdlogox66x550xhr.png"];

  // impactPoints comes pre-split from the API; fall back to the raw report for older API builds.
  const impactPoints =
    item.impactPoints ?? (item.impactReport?.trim() ? [item.impactReport.trim()] : []);
  const hasResourcePdf = Boolean(item.resourcePdfUrl);
  const program = PROGRAM_LINKS[item.category] ?? { label: "Gallery", href: `/gallery/${item.category}` };
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(`${item.title} — GWD Youth Foundation`);
  const shareLinks = [
    { label: "WhatsApp", href: `https://wa.me/?text=${shareText}%20${encodeURIComponent(pageUrl)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(pageUrl)}` },
  ];
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (insecure context); nothing to do.
    }
  };
  const facilitatorName = item.category === "flic" ? item.author?.trim() : "";
  const resourceViewUrl = buildApiUrl(`/api/resources/${encodeURIComponent(String(item.id))}/view`);
  const resourceDownloadUrl = buildApiUrl(
    `/api/resources/${encodeURIComponent(String(item.id))}/download`,
  );

  return (
    <div className="pb-24 bg-gray-50">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <motion.img
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 8 }}
            src={displayImages[0]}
            className="w-full h-full object-cover"
            alt={item.title}
          />
        </div>
        <div className="container-custom relative z-20">
          <Link href={`/gallery/${item.category}`}>
            <Button variant="ghost" className="text-white hover:text-primary mb-8 px-0">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-3">{item.title}</h1>
          {item.name && (
            <p className="text-lg md:text-2xl font-semibold text-white/90 mb-6 leading-snug break-words">
              {item.name}
            </p>
          )}
          <div className="flex items-center gap-2 text-gray-200">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-medium">
              {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
            </span>
          </div>
        </div>
      </section>

      <div className="container-custom mt-8 relative z-30">
        <div className="grid lg:grid-cols-3 gap-12 mt-8">
          <div className="lg:col-span-2 space-y-12">
            <Card className="detail-view-card border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
              <CardContent className="p-10">
                <h2 className="text-3xl font-black mb-6">Overview & Impact</h2>
                {facilitatorName && (
                  <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
                    <p className="text-sm font-semibold text-gray-700">
                      Facilitated by: <span className="text-primary">{facilitatorName}</span>
                    </p>
                  </div>
                )}
                <p className="text-gray-600 leading-relaxed text-lg mb-8">{item.content}</p>
                {impactPoints.length > 0 && (
                  <div className="bg-gray-900 p-8 md:p-10 rounded-3xl text-white">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary shrink-0">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold">Impact Report</h3>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                      {impactPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hasResourcePdf && (
                  <div className="mt-8 rounded-3xl border border-gray-200 p-6 bg-gray-50">
                    <h3 className="text-xl font-bold mb-2">Resource PDF</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Open the resource in your browser or download it for offline use.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild>
                        <a href={resourceViewUrl} target="_blank" rel="noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View PDF
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a href={resourceDownloadUrl}>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div>
              <SectionHeader
                title="Moments Captured"
                subtitle="Visual Journey"
                description="Images uploaded for this content."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {displayImages.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.04 }}
                    className="aspect-[4/4] w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white"
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i + 1}`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 h-fit space-y-6">
            <Card className="border-none shadow-xl rounded-3xl bg-white">
              <CardContent className="p-8 space-y-5">
                <h3 className="text-lg font-bold">At a glance</h3>
                <div className="flex items-start gap-3 text-sm">
                  <Layers className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-gray-500">Program</p>
                    <Link href={program.href} className="font-semibold text-gray-900 hover:text-primary">
                      {program.label}
                    </Link>
                  </div>
                </div>
                {item.name && (
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-gray-500">School / venue</p>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                    </div>
                  </div>
                )}
                {facilitatorName && (
                  <div className="flex items-start gap-3 text-sm">
                    <UserRound className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-gray-500">Facilitated by</p>
                      <p className="font-semibold text-gray-900">{facilitatorName}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-semibold text-gray-900">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Share this story</p>
                  <div className="flex flex-wrap gap-2">
                    {shareLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-xs font-semibold transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                    <button
                      onClick={copyLink}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-xs font-semibold transition-colors"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      {copied ? "Copied" : "Copy link"}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-3xl bg-gray-900 text-white p-8">
              <Heart className="w-7 h-7 text-primary mb-3" />
              <h3 className="text-lg font-bold mb-2">Make the next session happen</h3>
              <p className="text-sm text-gray-300 mb-5">
                {DONATION_ASK.amount} {DONATION_ASK.outcome}.
              </p>
              <Button asChild className="w-full rounded-full">
                <Link href="/donate">Donate</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
