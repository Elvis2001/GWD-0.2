import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  School, 
  MapPin, 
  ExternalLink, 
  Users, 
  Zap, 
  Building2, 
  Sparkles,
  TrendingUp,
  Cpu,
  HeartHandshake,
  ArrowRight,
  Calendar
} from "lucide-react";
import { Link } from "wouter";
import { useProgramsByCategory } from "@/hooks/use-content";

export default function ProgramHUBs() {
  const { data: hubPrograms } = useProgramsByCategory("hubs");
  const institutions = (hubPrograms ?? []).map((program, i) => ({
    name: program.title,
    hubName: program.excerpt || "GWDYF Hub Program",
    focus: program.impactReport || "Innovation & Leadership",
    image: program.thumbnailImage || program.coverImage,
    students: "Participants",
    color: ["border-blue-500", "border-amber-500", "border-green-500", "border-purple-500"][i % 4],
    id: program.id,
    createdAt: program.createdAt,
  }));

  const features = [
    { title: "Collaborative Workspace", desc: "Modern hubs equipped with fast internet and collaborative tools.", icon: <Users className="w-6 h-6" /> },
    { title: "Mentorship Programs", desc: "Direct access to industry professionals and successful founders.", icon: <Zap className="w-6 h-6" /> },
    { title: "Incubation Support", desc: "Turning student projects into viable business startups.", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  const keyPrograms = [
    {
      title: "Financial Literacy Clubs (FLiC)",
      desc: "Our signature secondary school model across Nigeria, with strong focus in Yola.",
      icon: <Building2 className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Technology & Entrepreneurship Training",
      desc: "In partnership with ACT Foundation and Sunlight for youth empowerment.",
      icon: <Cpu className="w-6 h-6" />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "21st-Century Ladies Tech",
      desc: "Specialized technology training for young women with Mentors International.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-pink-50 text-pink-600"
    },
    {
      title: "Social Innovation Bootcamps",
      desc: "Empowering IDPs and youth through social innovation with NE Hub.",
      icon: <HeartHandshake className="w-6 h-6" />,
      color: "bg-green-50 text-green-600"
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <SectionHeader 
          title="HUBs Initiative" 
          subtitle="Centers of Excellence" 
          description="Establishing innovation hubs in higher institutions across Adamawa State to foster a culture of entrepreneurship and digital excellence."
        />

        {/* Hub Design Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-32">
          {institutions.map((inst, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-[2.5rem] overflow-hidden shadow-xl border-t-8 ${inst.color} group`}
            >
              <div className="grid sm:grid-cols-2">
                <div className="aspect-square sm:aspect-auto overflow-hidden relative">
                  <img 
                    src={inst.image} 
                    alt={inst.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-primary" /> Adamawa
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">{inst.hubName}</h4>
                  <h3 className="text-2xl font-bold mb-4 leading-tight">{inst.name}</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium text-gray-600">Focus: {inst.focus}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium text-gray-600">Students: {inst.students}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium text-gray-600">
                        Posted: {inst.createdAt ? new Date(inst.createdAt).toLocaleDateString() : "Recent"}
                      </span>
                    </div>
                  </div>
                  <Link href={`/details/hubs/${inst.id}`}>
                    <Button variant="outline" className="rounded-full w-full group py-6 border-2 border-primary/20 hover:border-primary hover:bg-primary/5">
                      Explore Hub Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          {institutions.length === 0 && (
            <p className="col-span-2 text-center text-muted-foreground py-12">
              No HUB entries have been published yet.
            </p>
          )}
        </div>

        {/* Key Programs Breakdown */}
        <section className="mb-32">
          <SectionHeader 
            title="Our Impact Portfolio" 
            subtitle="Key Programs" 
            description="Comprehensive initiatives designed to empower every segment of the youth population."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPrograms.map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-2xl ${prog.color} flex items-center justify-center mb-6`}>
                  {prog.icon}
                </div>
                <h3 className="font-bold text-lg mb-3 leading-tight">{prog.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{prog.desc}</p>
      
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-white text-center relative overflow-hidden">
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full" />
          <h2 className="text-4xl font-bold mb-6">Become a Hub Coordinator</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Are you a student or faculty member in a higher institution? Partner with GWDYF to establish a hub and transform your campus into an innovation ecosystem.
          </p>
          <Link href="/contact?intent=Partner" className="btn-secondary text-lg px-12">
            Start a Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
