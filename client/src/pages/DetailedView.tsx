import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles,
  ExternalLink,
  BookOpen,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data for detailed views
const mockDetails: Record<string, any> = {
  "aun-hub": {
    title: "AUN Innovation Hub",
    subtitle: "Fintech & Social Entrepreneurship",
    location: "American University of Nigeria, Yola",
    date: "Established 2022",
    stats: "200+ Students Empowered",
    description: `The AUN Innovation Hub is a cornerstone of our higher institution initiative. Located in the heart of Yola, this hub focuses on bridging the gap between theoretical knowledge and practical fintech application. Students engage in weekly workshops on social entrepreneurship, digital payments, and innovative problem-solving for local economic challenges.`,
    images: [
      "https://images.unsplash.com/photo-1523240715632-d984bb4b970e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop"
    ],
    activities: [
      "Weekly Fintech Seminars",
      "Social Innovation Hackathons",
      "Peer-to-Peer Mentorship",
      "Venture Capital Pitch Training"
    ]
  },
  "success-story-1": {
    title: "Jimeta Secondary Success",
    subtitle: "Leading in Financial Literacy",
    location: "Jimeta, Adamawa State",
    date: "Semester 1, 2024",
    stats: "95% Graduation Rate",
    description: `At Jimeta Secondary School, the FLiC program has witnessed extraordinary transformation. Students who previously lacked basic savings knowledge are now managing school clubs' budgets with precision. The impact extends beyond the classroom, with parents reporting improved financial habits at home.`,
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop"
    ],
    activities: [
      "Mock Stock Market Games",
      "Savings Challenge Winner",
      "Community Awareness Walks",
      "Financial Literacy Certification"
    ]
  }
};

export default function DetailedView() {
  const [match, params] = useRoute("/details/:type/:id");
  const data = mockDetails[`${params?.id}`] || mockDetails["aun-hub"];

  return (
    <div className="pb-24 bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <motion.img 
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src={data.images[0]}
            className="w-full h-full object-cover"
            alt={data.title}
          />
        </div>
        <div className="container-custom relative z-20">
          <Link href="/programs/hubs">
            <Button variant="ghost" className="text-white hover:text-primary mb-8 px-0">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to HUBs
            </Button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
              {data.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">{data.title}</h1>
            <div className="flex flex-wrap gap-6 text-gray-200 ">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium"><h4>{data.location}</h4></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium"><h4>{data.date}</h4></span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-custom mt-29 relative z-30">
        <div className="grid lg:grid-cols-3 gap-12 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
              <CardContent className="p-10">
                <h2 className="text-3xl font-black mb-6">Overview & Impact</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {data.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Key Activities</h3>
                    <ul className="space-y-3">
                      {data.activities.map((activity: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-900 p-8 rounded-3xl text-white">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary mb-6">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Hub Achievement</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {data.stats}
                    </p>
                    <Button className="w-full bg-primary hover:bg-green-600 rounded-xl font-bold border-none">
                      View Impact Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gallery Grid */}
            <div>
              <SectionHeader 
                title="Moments Captured" 
                subtitle="Visual Journey" 
                description="A collection of images showcasing the activities and impact at this location."
              />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {data.images.map((img: string, i: number) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white"
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            <Card className="border-none shadow-xl rounded-[2.5rem] bg-primary text-white relative overflow-hidden">
              <CardContent className="p-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <h3 className="text-xl font-bold mb-4 relative z-10">Get Involved</h3>
                <p className="text-white/80 text-sm mb-8 relative z-10">Your support can help us expand this hub and reach more students or you can become a student yourself.</p>
                <Link href="/get-involved">
                  <Button className="w-full h-12 rounded-xl bg-white text-primary hover:bg-gray-50 font-bold relative z-10 border-none">
                    Join Our Mission
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
