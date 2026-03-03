import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGalleryByCategory } from "@/hooks/use-content";

export default function GalleryCategory() {
  const [, params] = useRoute("/gallery/:category");
  const category = params?.category || "flic";
  const { data: items, isLoading } = useGalleryByCategory(category);

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <Link href="/gallery">
          <Button variant="ghost" className="mb-8 hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Main Gallery
          </Button>
        </Link>

        <SectionHeader
          title={`${category.toUpperCase()} Gallery`}
          subtitle="Category"
          description="Uploaded items from the admin dashboard."
        />

        {isLoading ? (
          <p className="text-center text-gray-500">Loading gallery...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(items ?? []).map((item, i) => (
              <motion.div
                key={item.id}
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white group h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={item.thumbnailImage || item.coverImage || item.galleryImages?.[0]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={item.title}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-full text-xs font-bold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-primary" /> {item.category}
                    </div>
                  </div>
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{item.excerpt}</p>
                    <Link href={`/details/${category}/${item.id}`}>
                      <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-green-600 font-bold group">
                        View Full Details{" "}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {(items ?? []).length === 0 && (
              <p className="col-span-3 text-center text-muted-foreground py-12">
                No gallery items available for this category.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
