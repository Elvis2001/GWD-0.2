import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Users, 
  BookOpen, 
  Trophy, 
  Globe, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Award, 
  Target, 
  Lightbulb, 
  Heart, 
  CheckCircle2, 
  Landmark, 
  Clock, 
  MapPin 
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { usePosts, useTestimonials, useTeam } from "@/hooks/use-content";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data: posts } = usePosts();
  const { data: testimonials } = useTestimonials();
  const { data: team } = useTeam();

  const [studentsCount, setStudentsCount] = useState(0);
  const [partnersCount, setPartnersCount] = useState(0);
  const [workshopsCount, setWorkshopsCount] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  // Real GWD Cloudinary activity fallback images
  const GWD_FALLBACK_IMAGES = [
    "https://res.cloudinary.com/di1wu0bs5/image/upload/v1778935396/gwd/flic/c0gii4hwmqp4wbbulabe.jpg",
    "https://res.cloudinary.com/di1wu0bs5/image/upload/v1773483498/gwd/flic/rac3lvpd6ssilrgoy575.jpg",
    "https://res.cloudinary.com/di1wu0bs5/image/upload/v1773483004/gwd/flic/ukn0w4dy8nj9zh5iqa18.jpg",
    "https://res.cloudinary.com/di1wu0bs5/image/upload/v1773483713/gwd/flic/gtz9146hxazvwyjkpcru.jpg",
    "https://res.cloudinary.com/di1wu0bs5/image/upload/v1773606784/gwd/activities/gbtyureeowjnt11a1hro.jpg"
  ];

  const getPostImage = (p: any, fallback: string) => {
    return p.coverImage || p.thumbnailImage || p.imageUrl || (p.galleryImages && p.galleryImages[0]) || fallback;
  };

  // Fallback slides if backend posts are loading or empty
  const defaultActivitySlides = [
    {
      id: "activity-1",
      title: "Building Future Leaders Today",
      category: "EMPOWERING THE NEXT GENERATION",
      excerpt: "GWD Youth Foundation equips young minds with financial literacy, digital skills, and leadership training to create sustainable impact.",
      coverImage: GWD_FALLBACK_IMAGES[0],
      link: "/programs/flic",
      linkText: "Explore Programs"
    },
    {
      id: "activity-2",
      title: "Financial Literacy Clubs & Youth Bootcamps",
      category: "FLiC INITIATIVE",
      excerpt: "Establishing high school & university clubs teaching savings, micro-investing, ethics, and youth entrepreneurship across Nigeria.",
      coverImage: GWD_FALLBACK_IMAGES[1],
      link: "/programs/flic",
      linkText: "Discover FLiC"
    },
    {
      id: "activity-3",
      title: "AI & Digital Prompt Engineering Masterclasses",
      category: "FUTURE OF WORK",
      excerpt: "Empowering youth with cutting-edge artificial intelligence, prompt engineering, and digital career tools.",
      coverImage: GWD_FALLBACK_IMAGES[2],
      link: "/programs/ai",
      linkText: "Join AI Program"
    }
  ];

  // Dynamic slides built from live posts API or fallback
  const activitySlides = posts && posts.length > 0
    ? posts.slice(0, 5).map((p, idx) => ({
        id: p.id,
        title: p.title,
        category: p.category ? p.category.toUpperCase() : "LATEST ACTIVITY",
        excerpt: p.excerpt || (p.content ? p.content.slice(0, 140) + "..." : ""),
        coverImage: getPostImage(p, GWD_FALLBACK_IMAGES[idx % GWD_FALLBACK_IMAGES.length]),
        link: `/details/blog/${p.id}`,
        linkText: "Full Story Here"
      }))
    : defaultActivitySlides;

  // Auto-play timer for hero slide rotation (rotates every 4.5 seconds)
  useEffect(() => {
    const slidesLength = activitySlides.length;
    if (slidesLength <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slidesLength);
    }, 4500);

    return () => clearInterval(interval);
  }, [activitySlides.length]);

  const activeSlide = activitySlides[currentSlideIndex] || activitySlides[0];

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
    const studentsTarget = 8000;
    const partnersTarget = 20;
    const workshopsTarget = 50;
    const durationMs = 1400;
    const start = performance.now();

    let rafId = 0;
    const tick = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setStudentsCount(Math.round(studentsTarget * eased));
      setPartnersCount(Math.round(partnersTarget * eased));
      setWorkshopsCount(Math.round(workshopsTarget * eased));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="overflow-x-hidden bg-gray-50/50">
      {/* 1. Dynamic Activity Hero Section */}
      <section 
        className="relative min-h-[640px] md:h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-0 bg-gray-950"
      >
        {/* Dynamic Background Slider with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 lg:via-black/60 to-black/40 z-10" />
            <img 
              src={activeSlide.coverImage}
              alt={activeSlide.title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        <div className="container-custom relative z-10 w-full">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <div className="max-w-3xl text-white pt-6 sm:pt-10 md:pt-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id + "-content"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/90 text-white text-xs sm:text-sm font-bold tracking-wide mb-6 backdrop-blur-md shadow-md">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>{activeSlide.category}</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold mb-6 leading-[1.15] tracking-tight font-heading">
                      {activeSlide.title}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                      {activeSlide.excerpt}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={activeSlide.link} className="btn-primary text-base sm:text-lg px-8 py-4 bg-primary hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg">
                        <span>{activeSlide.linkText}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                      <Link href="/get-involved" className="btn-secondary text-base sm:text-lg px-8 py-4 hover:bg-gray-100 transition-colors flex items-center justify-center">
                        Join Our Mission
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Founder Tag & Slider Controls */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md border border-white/20"
                >
                  Nnenna Mosugu (EXECUTIVE DIRECTOR & FOUNDER GWD)
                </motion.span>

                {/* Slider Controls */}
                {activitySlides.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + activitySlides.length) % activitySlides.length)}
                      aria-label="Previous slide"
                      className="w-10 h-10 rounded-full bg-black/40 hover:bg-secondary text-white border border-white/20 flex items-center justify-center transition-all backdrop-blur-sm"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-1.5 px-2">
                      {activitySlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlideIndex(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === currentSlideIndex ? "w-6 bg-secondary" : "w-2 bg-white/40 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % activitySlides.length)}
                      aria-label="Next slide"
                      className="w-10 h-10 rounded-full bg-black/40 hover:bg-secondary text-white border border-white/20 flex items-center justify-center transition-all backdrop-blur-sm"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Professional Elevated Impact Dashboard */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:col-span-5 lg:justify-self-end w-full max-w-md mt-6 lg:mt-0"
            >
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/25 bg-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:scale-125 transition-transform" />
                
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/15">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                    OUR REAL IMPACT METRICS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                    Verified
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Metric 1 */}
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-green-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                      <Users className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                        {studentsCount.toLocaleString()}+
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-gray-300">
                        Students Reached & Empowered
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-white/15" />

                  {/* Metric 2 */}
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500/30 to-yellow-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                      <Globe className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                        {partnersCount}+
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-gray-300">
                        Partner Schools & Institutional HUBs
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-white/15" />

                  {/* Metric 3 */}
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-green-500/30 to-emerald-700/10 border border-green-500/30 flex items-center justify-center text-green-400 shrink-0 shadow-inner">
                      <Award className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                        {workshopsCount}+
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-gray-300">
                        Financial & AI Bootcamps Conducted
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Latest Updates & Events Section (POSITIONED BEFORE WHO WE ARE) */}
      <section className="section-padding bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
          >
            <SectionHeader 
              title="Latest Updates & Events" 
              subtitle="From The Field & Blog"
              description="Stay connected with our recent workshops, student achievements, and community stories."
              className="mb-0"
              centered={false}
            />
            <Link href="/blog" className="hidden md:inline-flex items-center font-bold text-primary hover:text-green-700 transition-colors gap-2 text-base">
              <span>View All News & Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {posts && posts.length > 0 ? (
              posts.slice(0, 3).map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 flex flex-col justify-between group transition-all"
                >
                  <Link href={`/details/blog/${post.id}`} className="block">
                    <div className="rounded-t-2xl overflow-hidden aspect-video relative bg-gray-100">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                      <img 
                        src={getPostImage(post, GWD_FALLBACK_IMAGES[idx % GWD_FALLBACK_IMAGES.length])} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide shadow-sm">
                          {post.category || "Activity"}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                            : "Recent Activity"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.name && (
                        <p className="text-xs font-semibold text-primary mb-2 line-clamp-1">
                          {post.name}
                        </p>
                      )}
                      <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                        {post.excerpt || post.content}
                      </p>
                    </div>
                  </Link>

                  <div className="px-6 pb-6 pt-0">
                    <Link href={`/details/blog/${post.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all">
                      <span>Full Story Here</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              /* Fallback animated cards */
              [
                {
                  id: "fb-1",
                  title: "Financial Literacy Summit Reaches 500+ High School Students",
                  category: "FLiC Bootcamp",
                  excerpt: "Interactive money management and micro-investment simulations held across schools.",
                  img: "https://res.cloudinary.com/di1wu0bs5/image/upload/v1773606784/gwd/activities/gbtyureeowjnt11a1hro.jpg"
                },
                {
                  id: "fb-2",
                  title: "GWD Campus HUBs Launched in Tertiary Institutions",
                  category: "Campus HUB",
                  excerpt: "Empowering university students with career mentorship and leadership networks.",
                  img: "https://res.cloudinary.com/di1wu0bs5/image/upload/v1776345931/gwd/blog/t7ek9nb2xpkhve7tbfl7.jpg"
                },
                {
                  id: "fb-3",
                  title: "AI Prompt Engineering Cohort Completes Certification",
                  category: "AI Training",
                  excerpt: "Over 200 youth mastered artificial intelligence prompt tools for future careers.",
                  img: "https://res.cloudinary.com/di1wu0bs5/image/upload/v1776345931/gwd/blog/qvjcfw4y8h9snu01csrd.jpg"
                }
              ].map((fb, idx) => (
                <motion.div
                  key={fb.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 flex flex-col justify-between group transition-all"
                >
                  <div>
                    <div className="rounded-t-2xl overflow-hidden aspect-video relative bg-gray-100">
                      <img 
                        src={fb.img} 
                        alt={fb.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide">
                          {fb.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {fb.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                        {fb.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-0">
                    <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all">
                      <span>Full Story Here</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
          
          <div className="mt-8 md:hidden text-center">
             <Link href="/blog" className="btn-secondary w-full">View All News & Events</Link>
          </div>
        </div>
      </section>

      {/* 3. Who We Are & Mission / Vision (Consolidated from About.tsx) */}
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

          {/* Mission & Vision Cards (Merged from About.tsx) */}
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

          {/* Our Measurable Impact Dashboard (Matching Screenshot) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20 bg-slate-950 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-slate-800"
          >
            {/* Ambient Background Radial Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-400 block mb-2 font-heading">
                DASHBOARD
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
                Our Measurable Impact
              </h2>
            </div>

            {/* 6 Metrics Grid */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 text-center">
              {/* Metric 1 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight font-heading">
                  8,000+
                </h3>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300">
                  STUDENTS REACHED
                </p>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-sm">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight font-heading">
                  25+
                </h3>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300">
                  SCHOOLS & INSTITUTIONS
                </p>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight font-heading">
                  25,000+
                </h3>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300">
                  TRAINING HOURS
                </p>
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight font-heading">
                  15+
                </h3>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300">
                  PARTNER ORGANIZATIONS
                </p>
              </div>

              {/* Metric 5 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight font-heading">
                  6
                </h3>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300">
                  ACTIVE YOLA LOCATIONS
                </p>
              </div>

              {/* Metric 6 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-sm">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight font-heading">
                  Multiple
                </h3>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300">
                  STATE REACH
                </p>
              </div>
            </div>
          </motion.div>

          {/* Our Story Narrative (Merged from About.tsx) */}
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

      {/* 4. Core Values Grid (Merged from About.tsx) */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader 
            title="What Drives Us" 
            subtitle="OUR CORE VALUES" 
            description="Our values are the heartbeat of GWD Youth Foundation, guiding every workshop and interaction as we empower the next generation." 
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-2 md:col-span-1 lg:col-span-1 h-48 rounded-3xl overflow-hidden relative group shadow-lg"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://res.cloudinary.com/di1wu0bs5/image/upload/v1773483498/gwd/flic/rac3lvpd6ssilrgoy575.jpg"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="Students in Uniform"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <Sparkles className="text-amber-300 w-6 h-6 mb-2" />
                <h4 className="text-white font-bold text-xl">Our Core Values</h4>
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

      {/* 5. Core Strategic Programs Showcase */}
      <section className="section-padding bg-gray-50/60 border-t border-gray-100">
        <div className="container-custom">
          <SectionHeader 
            title="Our Core Strategic Programs" 
            subtitle="WHAT WE DO"
            description="Comprehensive digital and financial literacy programs designed to equip youth with essential modern skills."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Program 1 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 bg-gradient-to-br from-emerald-600 to-green-800 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold w-fit">
                    <Trophy className="w-3.5 h-3.5 text-amber-300" />
                    <span>SECONDARY SCHOOLS</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-1">Financial Literacy Clubs</h3>
                    <p className="text-emerald-100 text-xs uppercase tracking-wider font-semibold">FLiC Initiative</p>
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Teaching students the fundamentals of money management, saving, investing, and entrepreneurship through interactive clubs.
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-0">
                <Link href="/programs/flic" className="w-full btn-primary bg-emerald-600 hover:bg-emerald-700 text-white text-sm py-3 flex items-center justify-center gap-2 rounded-xl">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Program 2 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 bg-gradient-to-br from-amber-500 to-yellow-600 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold w-fit">
                    <Users className="w-3.5 h-3.5 text-white" />
                    <span>TERTIARY INSTITUTIONS</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-1">HUBs Initiative</h3>
                    <p className="text-amber-100 text-xs uppercase tracking-wider font-semibold">Campus Centers of Excellence</p>
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Establishing centers of excellence in higher institutions to foster innovation, collaboration, and professional development.
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-0">
                <Link href="/programs/hubs" className="w-full btn-primary bg-amber-500 hover:bg-amber-600 text-white text-sm py-3 flex items-center justify-center gap-2 rounded-xl">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Program 3 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 bg-gradient-to-br from-green-700 to-emerald-900 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold w-fit">
                    <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                    <span>FUTURE OF WORK</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-1">AI & Digital Skills</h3>
                    <p className="text-green-100 text-xs uppercase tracking-wider font-semibold">Tech & Prompt Engineering</p>
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Preparing youth for the future of work with training in artificial intelligence, prompt engineering, and digital literacy.
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-0">
                <Link href="/programs/ai" className="w-full btn-primary bg-green-700 hover:bg-green-800 text-white text-sm py-3 flex items-center justify-center gap-2 rounded-xl">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Growth Milestone Journey Timeline (Merged from About.tsx) */}
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
              { year: "Launch", title: "Foundation Establishment", desc: "Founded by Nnenna Mosugu with a vision for youth empowerment." },
              { year: "2020", title: "First FLiC Club Launch", desc: "Launch of our signature Financial Literacy Club model in secondary schools." },
              { year: "2021", title: "FLiC Clubs Impact", desc: "Trained 50 secondary school students in financial literacy and entrepreneurship across Adamawa State." },
              { year: "2022", title: "NE Innovation Hub Partnership", desc: "31 IDPs trained in Social Innovation Entrepreneurship." },
              { year: "2023", title: "Mentors International Partnership", desc: "23 young women trained in advanced technology programs." },
              { year: "2024", title: "National Expansion", desc: "Expansion to 50+ schools, reaching 10,000+ students nationwide." }
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

      {/* 7. Leadership Team Section (Merged from About.tsx) */}
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

      {/* 8. Voices of Change (Testimonials Grid) */}
      <section className="section-padding bg-primary text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} 
        />
        
        <div className="container-custom relative z-10">
          <SectionHeader 
            title="Voices of Transformation" 
            subtitle="TESTIMONIALS & COMMUNITY IMPACT"
            description="Hear from the students, educators, and partners whose lives have been transformed by GWD programs."
            light={true}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {combinedTestimonials.map((item) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 flex flex-col h-full shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 shrink-0">
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
                <p className="text-gray-100 italic leading-relaxed flex-1 text-sm">"{item.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Action Call to Action (CTA) */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]" />
           <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary rounded-full blur-[96px]" />
        </div>
        
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Ready to Make an Impact?</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join us in our mission to empower the next generation of African leaders. Whether you want to volunteer, partner with us, or donate, your support matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved" className="btn-primary text-lg px-10">
              Become a Partner / Volunteer
            </Link>
            <Link href="/donate" className="btn-secondary text-lg px-10">
              Support Our Mission (Donate)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
