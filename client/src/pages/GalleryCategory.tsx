import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowLeft, School, GraduationCap, Gamepad2, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORY_DATA: Record<string, any> = {
  flic: {
    title: "FLiC Gallery",
    subtitle: "Secondary School Impact",
    icon: <GraduationCap className="w-12 h-12 text-primary" />,
    items: [
      { id: "jimeta-sec", name: "Jimeta Secondary School", location: "Yola", image: "https://i.pinimg.com/736x/56/29/48/5629481f924f3ede22bd48c08ce273c5.jpg", desc: "Leading the way in financial literacy graduation rates." },
      { id: "yola-sec", name: "Yola Model School", location: "Jimeta", image: "https://i.pinimg.com/1200x/a0/03/be/a003be1a0c1916de1a66ab43ec6af2bb.jpg", desc: "Our first pilot school in Adamawa state." }
    ]
  },
  hubs: {
    title: "HUBs Gallery",
    subtitle: "Higher Institution Innovation",
    icon: <School className="w-12 h-12 text-primary" />,
    items: [
      { id: "aun-hub", name: "AUN Innovation Hub", location: "Yola", image: "https://i.pinimg.com/736x/7e/30/88/7e3088bf1a6ab51a67930c7530027b57.jpg", desc: "Centering leadership and AI skills for the next generation." },
      { id: "mau-hub", name: "MAU Technical Hub", location: "MAU Yola", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2066&auto=format&fit=crop", desc: "Vocational and digital skills development center." }
    ]
  },
  games: {
    title: "Games & Activities",
    subtitle: "Learning Through Play",
    icon: <Gamepad2 className="w-12 h-12 text-primary" />,
    items: [
      { id: "savings-challenge", name: "Savings Challenge 2024", location: "Inter-School", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", desc: "Intense competition where students build virtual portfolios." },
      { id: "market-sim", name: "Market Simulation Day", location: "Tech Hub", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop", desc: "Real-world trading scenarios in a safe learning environment." }
    ]
  }
};

export default function GalleryCategory() {
  const [match, params] = useRoute("/gallery/:category");
  const category = params?.category || "flic";
  const data = CATEGORY_DATA[category] || CATEGORY_DATA.flic;

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <Link href="/gallery">
          <Button variant="ghost" className="mb-8 hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Main Gallery
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-16">
          <div className="w-24 h-24 rounded-[2rem] bg-white shadow-xl flex items-center justify-center">
            {data.icon}
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900">{data.title}</h1>
            <p className="text-gray-500 font-medium text-lg mt-1">{data.subtitle}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item: any, i: number) => (
            <motion.div
              key={item.id}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white group hover:shadow-2xl transition-all h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-primary" /> {item.location}
                  </div>
                </div>
                <CardContent className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{item.desc}</p>
                  <Link href={`/details/${category}/${item.id}`}>
                    <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-green-600 font-bold group shadow-lg shadow-primary/10">
                      View Full Details <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
