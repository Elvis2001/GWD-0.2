import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { useTeam } from "@/hooks/use-content";
import { CheckCircle2, Target, Lightbulb, Heart, Users, Landmark, Clock, Globe, Trophy, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function About() {
  const { data: team } = useTeam();

  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Purpose",
      description: "We are driven by a clear mission to uplift and empower youth."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-secondary" />,
      title: "Innovation",
      description: "We embrace new technologies and methods to enhance learning."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Passion",
      description: "Our team is deeply committed to the success of every student."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-blue-500" />,
      title: "Integrity",
      description: "We operate with transparency, honesty, and accountability."
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section with Ken Burns Effect */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <motion.img 
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
            alt="Nigerian Students in School"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            Who We Are
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Empowering the next generation of Nigerian leaders through financial literacy and digital excellence.
          </motion.p>
        </div>
      </section>

      <div className="container-custom py-24">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8" />
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To empower youth with financial literacy, leadership skills, and digital competencies necessary to thrive in the 21st-century economy. We strive to create equal opportunities for growth and success.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -mr-8 -mt-8" />
            <h3 className="text-2xl font-bold mb-4 text-secondary">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              A world where every young person is financially literate, digitally skilled, and empowered to lead positive change in their communities and beyond.
            </p>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <div className="mb-24">
          <SectionHeader 
            title="What Drives Us" 
            subtitle="Our Core Values" 
            description="Our values are the heartbeat of GWDYF, guiding every interaction and decision as we empower the next generation." 
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-2 md:col-span-1 lg:col-span-1 h-48 rounded-3xl overflow-hidden relative group"
            >
              <div className="absolute inset-0 z-0">
                <motion.img 
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                  src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=2070&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                  alt="Students in Uniform"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <Sparkles className="text-white w-6 h-6 mb-2" />
                <h4 className="text-white font-bold text-lg">Who We ARE</h4>
              </div>
            </motion.div>
            {[
              { title: "FOCUS", color: "bg-blue-500", desc: "Concentrating our energy on measurable youth impact." },
              { title: "COMMITMENT", color: "bg-green-500", desc: "Unwavering dedication to our students' long-term success." },
              { title: "DISCIPLINE", color: "bg-purple-500", desc: "Consistency in our approach and educational standards." },
              { title: "WE CAN DO IT", color: "bg-orange-500", desc: "A positive 'can-do' spirit in the face of any challenge." },
              { title: "EXCELLENCE", color: "bg-red-500", desc: "Striving for the highest quality in everything we deliver." },
              { title: "RESPECT", color: "bg-teal-500", desc: "Valuing every individual's unique potential and voice." },
              { title: "FUN", color: "bg-yellow-500", desc: "Making learning an enjoyable and memorable adventure." }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-48 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={cn("absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity", value.color)} />
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className={cn("w-10 h-1 h-1 rounded-full mb-4", value.color)} />
                  <div>
                    <h4 className="text-xl font-black mb-2 tracking-tighter">{value.title}</h4>
                    <p className="text-xs text-gray-600 leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {value.desc}
                    </p>
                  </div>
                </div>
                <div className={cn("absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left", value.color)} />
              </motion.div>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 text-center text-lg text-gray-600 italic max-w-3xl mx-auto"
          >
            "These core values are not just words on a wall; they are the principles that enable GWDYF to bridge the gap between potential and performance, ensuring every young Nigerian we reach is equipped to lead with integrity, skill, and a focus on excellence."
          </motion.p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8" />
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To empower youth with financial literacy, leadership skills, and digital competencies necessary to thrive in the 21st-century economy. We strive to create equal opportunities for growth and success.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -mr-8 -mt-8" />
            <h3 className="text-2xl font-bold mb-4 text-secondary">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              A world where every young person is financially literate, digitally skilled, and empowered to lead positive change in their communities and beyond.
            </p>
          </motion.div>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                The GWD Youth Foundation began as a small community initiative aimed at teaching basic financial concepts to high school students. Recognizing the immense gap in financial education, our founders set out to create a curriculum that was both engaging and practical.
              </p>
              <p>
                Over the years, we expanded our scope to include digital skills training, realizing that financial literacy and technological proficiency go hand in hand in the modern world.
              </p>
              <p>
                Today, GWDYF operates in over 12 communities, partnering with schools, universities, and corporate organizations to deliver high-impact programs that prepare youth for the future of work.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-3" />
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" 
              alt="Our Story" 
              className="relative rounded-3xl shadow-xl w-full"
            />
          </motion.div>
        </div>
        <div className="mb-24">
          <SectionHeader title="Our Journey" subtitle="Timeline" description="Key milestones and achievements in our mission to empower Nigerian youth." />
          <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-primary/20 -translate-x-1/2" />
            
            {[
              { year: "Launch", title: "Foundation Establishment", desc: "Founded by Nnenna Mosugu with a vision for youth empowerment." },
              { year: "2020", title: "First FLiC Club", desc: "Launch of our signature Financial Literacy Club model in secondary schools." },
              { year: "2021", title: "ACT & Sunlight Partnership", desc: "Trained 50 youths in tech and entrepreneurship across Adamawa State." },
              { year: "2022", title: "NE Innovation Hub Partnership", desc: "31 IDPs trained in Social Innovation Entrepreneurship." },
              { year: "2023", title: "Mentors International Partnership", desc: "23 young women trained in advanced technology programs." },
              { year: "2024", title: "National Expansion", desc: "Expansion to 50+ schools, reaching 10,000+ students nationwide." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "relative mb-12 flex flex-col md:flex-row items-center",
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10 border-4 border-white shadow-sm" />
                
                <div className="md:w-1/2 p-4">
                  <div className={cn(
                    "bg-white p-6 rounded-2xl shadow-md border border-gray-100",
                    i % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}>
                    <span className="text-primary font-bold text-sm">{item.year}</span>
                    <h4 className="text-xl font-bold mt-1 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="md:w-1/2 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Statistics Dashboard */}
        <div className="mb-24 bg-gray-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <div className="relative z-10">
            <SectionHeader title="Our Measurable Impact" subtitle="Dashboard" light centered className="mb-16" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[
                { label: "Students Reached", value: "10,000+", icon: <Users className="w-6 h-6" /> },
                { label: "Schools & Institutions", value: "50+", icon: <Landmark className="w-6 h-6" /> },
                { label: "Training Hours", value: "25,000+", icon: <Clock className="w-6 h-6" /> },
                { label: "Partner Organizations", value: "15+", icon: <Globe className="w-6 h-6" /> },
                { label: "Active Yola Locations", value: "6", icon: <MapPin className="w-6 h-6" /> },
                { label: "State Reach", value: "Multiple", icon: <Trophy className="w-6 h-6" /> }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <h4 className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</h4>
                  <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <SectionHeader title="Meet Our Team" subtitle="Leadership" description="The dedicated individuals driving our mission forward." />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team?.map((member) => (
              <div key={member.id} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">{member.bio}</p>
              </div>
            ))}
            
            {/* Static placeholders if no API data yet */}
            {(!team || team.length === 0) && (
              <>
                <div className="group text-center">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Sarah Johnson" />
                  </div>
                  <h4 className="text-xl font-bold">Sarah Johnson</h4>
                  <p className="text-primary font-medium mb-2">Executive Director</p>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">Leading with passion and over 15 years of experience in youth development.</p>
                </div>
                <div className="group text-center">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="David Chen" />
                  </div>
                  <h4 className="text-xl font-bold">David Chen</h4>
                  <p className="text-primary font-medium mb-2">Program Director</p>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">Architecting our curriculum to ensure relevance and engagement.</p>
                </div>
                <div className="group text-center">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Amara Okeke" />
                  </div>
                  <h4 className="text-xl font-bold">Amara Okeke</h4>
                  <p className="text-primary font-medium mb-2">Community Outreach</p>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">Building bridges between GWDYF and the communities we serve.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
