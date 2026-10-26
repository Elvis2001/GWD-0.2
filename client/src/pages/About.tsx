import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Users, Landmark, Clock, Globe, Target, Lightbulb, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { useTeam } from "@/hooks/use-content";
import { IMPACT_STATS, STATS_AS_OF, formatStat } from "@/lib/site-stats";
import { cn } from "@/lib/utils";

const STAT_ICONS = {
  students: Users,
  schools: Landmark,
  trainingHours: Clock,
  partners: Globe,
} as const;

// Story, mission, values, milestones and team — moved here from the home page.
export default function About() {
  const { data: team } = useTeam();

  return (
    <div className="overflow-x-hidden bg-gray-50/50">
      <section className="pt-36 pb-16 bg-gray-950 text-white">
        <div className="container-custom max-w-4xl text-center">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-primary">About GWD</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-3 mb-6 font-heading">Empowering youth for a brighter tomorrow</h1>
          <p className="text-lg text-gray-300">
            Our story, mission, values and the people behind GWD Youth Foundation.
          </p>
        </div>
      </section>

      {/* Who We Are & Mission / Vision */}
      <section className="section-padding bg-gray-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
            {/* Image Stack with Founder Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://res.cloudinary.com/di1wu0bs5/image/upload/v1778935396/gwd/flic/c0gii4hwmqp4wbbulabe.jpg" 
                  alt="Students Collaborating" 
                  className="w-full h-[400px] sm:h-[480px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-secondary rounded-3xl z-0" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <SectionHeader 
                title="Empowering Youth for a Brighter Tomorrow"
                subtitle="Who We Are"
                description="The GWD Youth Foundation is dedicated to transforming the lives of young people through financial education, mentorship, and modern technological opportunity."
                centered={false}
                className="mb-8"
              />
              
              <p className="text-gray-600 mb-8 leading-relaxed text-base">
                We believe financial freedom and modern technological skills are not luxuries—they are fundamental rights. Through our structured school clubs, campus HUBs, and AI bootcamps, we nurture ethically grounded leaders equipped to thrive in today's global economy.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Financial Literacy & Money Management",
                  "Ethical Leadership Mentorship",
                  "Digital Skills & AI Prompt Engineering",
                  "Campus HUBs & Community Initiatives"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-primary shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-gray-800 font-semibold text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 group-hover:scale-125 transition-transform" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-primary">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-heading">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">
                To provide exciting and unique opportunities for children and young adults' learning and community building. We strive to bring together youth from diverse backgrounds, uniting them under the common objective of learning financial and money skills while having fun.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-8 -mt-8 group-hover:scale-125 transition-transform" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-amber-50 text-secondary">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-heading">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">
                To create the right attitude towards money among the youth, preparing them to make better financial decisions in the future and reduce the poverty gap across Nigeria and the African continent.
              </p>
            </motion.div>
          </div>

          {/* Impact numbers — shared with the home page via site-stats */}
          <div className="mb-20 bg-slate-950 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-primary block mb-2 font-heading">
                As of {STATS_AS_OF}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
                Our Measurable Impact
              </h2>
            </div>
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">
              {(Object.keys(IMPACT_STATS) as (keyof typeof IMPACT_STATS)[]).map((key) => {
                const Icon = STAT_ICONS[key];
                return (
                  <div key={key} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight font-heading">
                      {formatStat(key)}
                    </p>
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300">
                      {IMPACT_STATS[key].label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Our Story Narrative */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader 
                title="Our Story" 
                subtitle="HOW IT ALL STARTED" 
                centered={false} 
                className="mb-6"
              />
              <div className="space-y-4 text-gray-600 leading-relaxed text-base">
                <p>
                  The GWD Youth Foundation began as a targeted community initiative aimed at teaching basic financial concepts to high school students. Recognizing the immense gap in financial education, our founders set out to create a curriculum that was both engaging and practical.
                </p>
                <p>
                  We envision financially literate youth who make informed, thoughtful, and beneficial financial decisions across Nigeria and the African continent.
                </p>
                <p>
                  We have established Financial Literacy Clubs (FLiC) in several secondary schools in Adamawa State and have seen dramatic improvements in money management skills among our students.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-2" />
              <img 
                src="https://res.cloudinary.com/di1wu0bs5/image/upload/v1773483498/gwd/flic/rac3lvpd6ssilrgoy575.jpg"
                alt="Our Story Illustration" 
                className="relative rounded-3xl shadow-xl w-full h-[360px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader 
            title="What Drives Us" 
            subtitle="OUR CORE VALUES" 
            description="Our values are the heartbeat of GWD Youth Foundation, guiding every workshop and interaction as we empower the next generation." 
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative h-48 rounded-3xl bg-gray-50 border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={cn("absolute top-0 left-0 right-0 h-1.5", value.color)} />
                <div>
                  <h4 className="text-xl font-extrabold mb-2 text-gray-900 tracking-tight">{value.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {value.desc}
                  </p>
                </div>
                <div className={cn("w-8 h-1 rounded-full", value.color)} />
              </motion.div>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 text-center text-base sm:text-lg text-gray-600 italic max-w-3xl mx-auto"
          >
            "These core values are not just words on a wall; they are the principles that enable GWD Youth Foundation to bridge the gap between potential and performance, ensuring every young Nigerian we reach is equipped to lead with integrity."
          </motion.p>
        </div>
      </section>

      {/* Growth Milestone Journey Timeline */}
      <section className="section-padding bg-white border-t border-gray-100">
        <div className="container-custom">
          <SectionHeader 
            title="Our Growth Milestone Journey" 
            subtitle="MILESTONE TIMELINE" 
            description="Key achievements and milestones in our mission to empower Nigerian & African youth." 
          />

          <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-primary/20 -translate-x-1/2" />
            
            {[
              { year: "Founding", title: "Foundation Establishment", desc: "Founded by Nnenna Mosugu with a vision for youth empowerment." },
              { year: "2020", title: "First FLiC Club Launch", desc: "Launch of our signature Financial Literacy Club model in secondary schools." },
              { year: "2021", title: "FLiC Clubs Impact", desc: "Trained 50 secondary school students in financial literacy and entrepreneurship across Adamawa State." },
              { year: "2022", title: "NE Innovation Hub Partnership", desc: "31 IDPs trained in Social Innovation Entrepreneurship." },
              { year: "2023", title: "Mentors International Partnership", desc: "23 young women trained in advanced technology programs." },
              { year: "2024", title: "National Expansion", desc: `Expansion to ${formatStat("schools")} schools and institutions, reaching ${formatStat("students")} students.` }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "relative mb-12 flex flex-col md:flex-row items-center",
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10 border-4 border-white shadow-md" />
                
                <div className="md:w-1/2 p-4 w-full">
                  <div className={cn(
                    "bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow",
                    i % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}>
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-primary font-bold text-xs mb-2">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="md:w-1/2 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      {team && team.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <SectionHeader 
              title="Meet Our Leadership Team" 
              subtitle="THE PEOPLE BEHIND GWD" 
              description="Dedicated professionals committed to empowering the next generation of African leaders."
            />
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 p-6 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-100 border-2 border-primary/20">
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-primary bg-emerald-50">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="py-16 bg-white text-center">
        <Link href="/get-involved" className="btn-primary gap-2">
          Get involved <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
