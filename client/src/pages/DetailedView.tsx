import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowLeft, Calendar, BookOpen, Trophy, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGalleryByCategory, usePosts } from "@/hooks/use-content";
import { buildApiUrl } from "@/lib/api";

export default function DetailedView() {
  const [, params] = useRoute("/details/:type/:id");
  const type = params?.type ?? "blog";
  const id = params?.id ?? "";

  const { data: galleryItems } = useGalleryByCategory(type);
  const { data: posts } = usePosts();
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

  const isBlogPost = item.category === "blog" || item.contentType === "post";
  const keyActivities = item.keyActivities ?? [];
  const hasKeyActivities = keyActivities.length > 0;
  const hasImpactReport = Boolean(item.impactReport && item.impactReport.trim().length > 0);
  const hasResourcePdf = Boolean(item.resourcePdfUrl);
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
                {(!isBlogPost || hasKeyActivities || hasImpactReport) && (
                  <div className="grid md:grid-cols-2 gap-8">
                    {(!isBlogPost || hasKeyActivities) && (
                      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Key Activities</h3>
                        <ul className="space-y-3">
                          {keyActivities.map((activity, i) => (
                            <li key={i} className="text-gray-600 text-sm">
                              {activity}
                            </li>
                          ))}
                          {!hasKeyActivities && (
                            <li className="text-gray-400 text-sm">No key activities listed.</li>
                          )}
                        </ul>
                      </div>
                    )}
                    {(!isBlogPost || hasImpactReport) && (
                      <div className="bg-gray-900 p-8 rounded-3xl text-white">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary mb-6">
                          <Trophy className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Impact Report</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {item.impactReport || "No impact report attached yet."}
                        </p>
                      </div>
                    )}
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
        </div>
      </div>
    </div>
  );
}
