import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Users, BookOpen, Trophy, Globe, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { usePosts, useTestimonials } from "@/hooks/use-content";

export default function Home() {
  const { data: posts } = usePosts();
  const { data: testimonials } = useTestimonials();
  const [studentsCount, setStudentsCount] = useState(0);
  const [partnersCount, setPartnersCount] = useState(0);
  const demoTestimonials = [
    {
      id: "demo-1",
      name: "Aisha Bello",
      role: "Student",
      content:
        "GWD's programs opened doors for me — I learned financial skills and gained confidence to start my own small business.",
      imageUrl: "",
    },
    {
      id: "demo-2",
      name: "Chinedu Okafor",
      role: "Parent",
      content:
        "I've seen my child's focus and ambition grow since joining GWD. The mentorship and resources are invaluable.",
      imageUrl: "",
    },
  ];
  const combinedTestimonials = [...(testimonials || []), ...demoTestimonials];

  useEffect(() => {
    const studentsTarget = 1000;
    const partnersTarget = 10;
    const durationMs = 1400;
    const start = performance.now();

    let rafId = 0;
    const tick = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setStudentsCount(Math.round(studentsTarget * eased));
      setPartnersCount(Math.round(partnersTarget * eased));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:h-screen flex items-start md:items-center justify-center overflow-hidden py-16 sm:py-20 md:py-0">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 md:via-black/50 to-transparent z-10" />
          {/* Diverse group of happy youth learning outdoors */}
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop"
            alt="Youth Empowerment"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="max-w-3xl text-white pt-8 sm:pt-12 md:pt-20">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-2 rounded-full bg-secondary/90 text-white text-sm font-bold tracking-wide mb-6 backdrop-blur-sm"
                >
                  EMPOWERING THE NEXT GENERATION
                </motion.span>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
                >
                  Building Future <span className="text-primary-foreground">Leaders</span> Today
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-10 leading-relaxed max-w-2xl"
                >
                  GWD Youth Foundation equips young minds with financial literacy, digital skills, and leadership training to create sustainable impact.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/programs/flic" className="btn-primary text-lg px-8 py-4 bg-primary hover:bg-green-600 transition-colors">
                    Explore Programs
                  </Link>
                  <Link href="/get-involved" className="btn-secondary text-lg px-8 py-4 hover:bg-green-50 hover:text-primary transition-colors">
                    Join Our Mission
                  </Link>
                </motion.div>
              </div>

              <div className="mt-8 sm:mt-10">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-2 rounded-full bg-secondary/90 text-white text-sm font-bold tracking-wide backdrop-blur-sm"
                >
                  Nnenna Mosugu (EXECUTIVE DIRECTOR & FOUNDER GWD)
                </motion.span>
              </div>
            </div>

            {/* Impact Statistics Dashboard */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="hidden md:block md:mx-auto md:mt-4 lg:mt-0 lg:col-span-4 lg:justify-self-end w-full max-w-xs"
            >
              <div className="glass-card p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{studentsCount.toLocaleString()}+</p>
                      <p className="text-xs text-gray-300 uppercase tracking-wider">Students Reached</p>
                    </div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{partnersCount}+</p>
                      <p className="text-xs text-gray-300 uppercase tracking-wider">Partner Schools</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-white relative overflow-visible">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative mt-8 lg:-mt-28"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                 {/* Group of students collaborating */}
                <img 
                  src="https://i.pinimg.com/1200x/0e/23/f3/0e23f3473158807908d251dab2523841.jpg" 
                  alt="Students Collaborating" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-secondary rounded-2xl z-0" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader 
                title="Empowering Youth for a Brighter Tomorrow"
                subtitle="Who We Are"
                description="The GWD Youth Foundation is dedicated to transforming the lives of young people through education, mentorship, and opportunity. We believe that every young person deserves the chance to succeed, regardless of their background."
                centered={false}
                className="mb-8"
              />
              
              <ul className="space-y-4 mb-8">
                {[
                  "Financial Literacy & Management",
                  "Leadership Development",
                  "Digital Skills & AI Training",
                  "Community Service Initiatives"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-primary shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/about" className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all">
                Learn More About Us <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader 
            title="Our Core Programs" 
            subtitle="What We Do"
            description="We offer comprehensive Digital and financial literacy programs designed to equip youth with the essential skills needed for the modern world."
          />
          
          <div className="grid md:grid-cols-3 gap-2">
            {/* Program 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            >
              <div className="h-48 bg-primary/10 flex items-center justify-center relative overflow-hidden group">
                 {/* Financial Chart/Graph icon concept */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href="/programs/flic" className="px-6 py-2 bg-white text-primary rounded-full font-bold text-sm">View Details</Link>
                </div>
                <Trophy className="w-16 h-16 text-primary" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Financial Literacy Clubs</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  Teaching students the fundamentals of money management, saving, investing, and entrepreneurship through interactive clubs.
                </p>
                <Link href="/programs/flic" className="text-primary font-semibold text-sm hover:underline">Read More</Link>
              </div>
            </motion.div>

            {/* Program 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            >
              <div className="h-48 bg-secondary/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-secondary/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href="/programs/hubs" className="px-6 py-2 bg-white text-secondary rounded-full font-bold text-sm">View Details</Link>
                </div>
                <Users className="w-16 h-16 text-secondary" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">HUBs Initiative</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  Establishing centers of excellence in higher institutions to foster innovation, collaboration, and professional development.
                </p>
                <Link href="/programs/hubs" className="text-secondary font-semibold text-sm hover:underline">Read More</Link>
              </div>
            </motion.div>

            {/* Program 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            >
              <div className="h-48 bg-accent/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href="/programs/ai" className="px-6 py-2 bg-white text-accent rounded-full font-bold text-sm">View Details</Link>
                </div>
                <BookOpen className="w-16 h-16 text-accent" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">AI & Digital Skills</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  Preparing youth for the future of work with training in artificial intelligence, prompt engineering, and digital literacy.
                </p>
                <Link href="/programs/ai" className="text-accent font-semibold text-sm hover:underline">Read More</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact/Testimonials */}
      <section className="section-padding bg-primary text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        
        <div className="container-custom relative z-10">
          <SectionHeader 
            title="Voices of Change" 
            subtitle="Testimonials"
            description="Hear from the students, educators, and partners whose lives have been transformed by GWDYF programs."
            light={true}
          />
          {/* Testimonials of students, parents, and partners: single responsive 3-column grid with equal heights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(combinedTestimonials && combinedTestimonials.length > 0 ? combinedTestimonials : []).map((item) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white/90">
                        {item.name ? item.name.charAt(0) : "?"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-white/70 text-sm">{item.role}</p>
                  </div>
                </div>
                <p className="text-gray-100 italic leading-relaxed flex-1">"{item.content}"</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Latest News */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <SectionHeader 
              title="Latest Updates" 
              subtitle="From The Blog"
              className="mb-0"
              centered={false}
            />
            <Link href="/blog" className="hidden md:inline-flex items-center font-bold text-primary hover:text-primary-dark transition-colors">
              View All News <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {posts && posts.length > 0 ? (
              posts.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/details/blog/${post.id}`} className="group block">
                  <div className="rounded-2xl overflow-hidden shadow-md mb-4 aspect-video relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-600 mb-2 line-clamp-1 break-words">
                    {post.name || "Name unavailable"}
                  </p>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {post.createdAt
                        ? `Posted ${new Date(post.createdAt).toLocaleDateString()}`
                        : "Posted recently"}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
               <p className="col-span-3 text-center text-muted-foreground py-12">No blog posts found yet.</p>
            )}
          </div>
          
          <div className="mt-8 md:hidden text-center">
             <Link href="/blog" className="btn-secondary w-full">View All News</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
           <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]" />
           <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary rounded-full blur-[96px]" />
        </div>
        
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto ">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join us in our mission to empower the next generation. Whether you want to volunteer, partner with us, or donate, your support matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-lg px-10">
              Contact Us
            </Link>
            <Link href="/get-involved" className="btn-secondary text-lg px-10">
              Learn How to Help
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
