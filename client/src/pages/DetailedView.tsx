import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowLeft, Calendar, BookOpen, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGalleryByCategory, usePosts } from "@/hooks/use-content";

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

  return (
    <div className="pb-24 bg-gray-50">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <motion.img
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 8 }}
            src={images[0]}
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
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">{item.title}</h1>
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
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
              <CardContent className="p-10">
                <h2 className="text-3xl font-black mb-6">Overview & Impact</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">{item.content}</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Key Activities</h3>
                    <ul className="space-y-3">
                      {(item.keyActivities ?? []).map((activity, i) => (
                        <li key={i} className="text-gray-600 text-sm">
                          {activity}
                        </li>
                      ))}
                      {(item.keyActivities ?? []).length === 0 && (
                        <li className="text-gray-400 text-sm">No key activities listed.</li>
                      )}
                    </ul>
                  </div>
                  <div className="bg-gray-900 p-8 rounded-3xl text-white">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary mb-6">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Impact Report</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.impactReport || "No impact report attached yet."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <SectionHeader
                title="Moments Captured"
                subtitle="Visual Journey"
                description="Images uploaded for this content."
              />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.04 }}
                    className="aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white"
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
