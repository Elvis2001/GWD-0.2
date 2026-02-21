import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Calendar, Clock, Image as ImageIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Gallery() {
  const categories = [
    {
      title: "FLiC Gallery",
      category: "Secondary Schools",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
      slug: "flic"
    },
    {
      title: "HUBs / Youth Tech Bootcamps",
      category: "Higher Institutions",
      image: "https://images.unsplash.com/photo-1523240715632-d984bb4b970e?q=80&w=2070&auto=format&fit=crop",
      slug: "hubs"
    },
    {
      title: "Financial Literacy Games & Activities",
      category: "Workshops & Play",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      slug: "games"
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <SectionHeader 
          title="Our Gallery" 
          subtitle="Moments of Impact" 
          description="A visual journey through our programs, workshops, and the lives transformed through financial literacy."
        />

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <img src={cat.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
                  {cat.category}
                </span>
                <h3 className="text-2xl font-black text-white mb-6 leading-tight">{cat.title}</h3>
                <Link href={`/gallery/${cat.slug}`}>
                  <Button className="w-full bg-white text-gray-900 hover:bg-primary hover:text-white font-bold h-12 rounded-xl transition-all border-none">
                    View Gallery
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}