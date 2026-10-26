import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Users,
  Landmark,
  Clock,
  Globe,
  Calendar,
  CheckCircle2,
  Trophy,
  GraduationCap,
  School,
  Cpu,
  Heart,
  Handshake,
  Quote,
  Eye,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { usePosts, useTestimonials } from "@/hooks/use-content";
import { IMPACT_STATS, STATS_AS_OF, PARTNERS, DONATION_ASK, formatStat } from "@/lib/site-stats";
import type { Post } from "@shared/types";

// Real GWD Cloudinary activity photos
const GWD_IMAGES = [
  "https://res.cloudinary.com/di1wu0bs5/image/upload/v1778935396/gwd/flic/c0gii4hwmqp4wbbulabe.jpg",
  "https://res.cloudinary.com/di1wu0bs5/image/upload/v1773483498/gwd/flic/rac3lvpd6ssilrgoy575.jpg",
  "https://res.cloudinary.com/di1wu0bs5/image/upload/v1773483004/gwd/flic/ukn0w4dy8nj9zh5iqa18.jpg",
  "https://res.cloudinary.com/di1wu0bs5/image/upload/v1773483713/gwd/flic/gtz9146hxazvwyjkpcru.jpg",
  "https://res.cloudinary.com/di1wu0bs5/image/upload/v1773606784/gwd/activities/gbtyureeowjnt11a1hro.jpg",
];

const STAT_ICONS = {
  students: Users,
  schools: Landmark,
  trainingHours: Clock,
  partners: Globe,
} as const;

const PROGRAMS = [
  {
    href: "/programs/flic",
    audience: "Secondary schools",
    icon: School,
    title: "Financial Literacy Clubs (FLiC)",
    summary: "Weekly in-school clubs where students learn to budget, save and think like entrepreneurs.",
    points: ["Budgeting & saving habits", "Career & personality discovery", "Pre/post-test measured outcomes"],
    image: GWD_IMAGES[1],
  },
  {
    href: "/programs/hubs",
    audience: "Universities & tertiary",
    icon: GraduationCap,
    title: "Campus HUBs",
    summary: "Centres of excellence that connect students to mentorship, innovation and leadership networks.",
    points: ["Mentorship circles", "Social innovation projects", "Leadership development"],
    image: "https://res.cloudinary.com/di1wu0bs5/image/upload/v1776345931/gwd/blog/t7ek9nb2xpkhve7tbfl7.jpg",
  },
  {
    href: "/programs/ai",
    audience: "Youth & young adults",
    icon: Cpu,
    title: "AI & Digital Skills",
    summary: "Practical training in AI tools, prompt engineering and digital research for the future of work.",
    points: ["AI as a research tool", "Prompt engineering", "Digital literacy & fact-checking"],
    image: "https://res.cloudinary.com/di1wu0bs5/image/upload/v1776345931/gwd/blog/qvjcfw4y8h9snu01csrd.jpg",
  },
];

const SAMPLE_TESTIMONIALS = [
  {
    id: "sample-1",
    name: "Aisha Bello",
    role: "Student",
    content:
      "GWD's programs opened doors for me — I learned financial skills and gained confidence to start my own small business.",
    imageUrl: "",
  },
  {
    id: "sample-2",
    name: "Chinedu Okafor",
    role: "Parent",
    content:
      "I've seen my child's focus and ambition grow since joining GWD. The mentorship and resources are invaluable.",
    imageUrl: "",
  },
];

const CORE_VALUES =["Focus", "Commitment", "Discipline", "We can do it", "Excellence", "Respect", "Fun"];

function getPostImage(post: Post, fallback: string) {
  return post.coverImage || post.thumbnailImage || post.imageUrl || post.galleryImages?.[0] || fallback;
}

function formatDate(value: Post["createdAt"]) {
  return value
    ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Recent";
}

export default function Home() {
  const { data: posts } = usePosts();
  const { data: testimonials } = useTestimonials();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [showStickyDonate, setShowStickyDonate] = useState(false);

  // Background photos rotate; the headline stays fixed so first-time visitors
  // always see what GWD does.
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % GWD_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Sticky mobile Donate button appears once the hero is scrolled past, so it never covers hero content.
  useEffect(() => {
    const onScroll = () => setShowStickyDonate(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const latestPosts = Array.isArray(posts) ? posts.slice(0, 3) : [];
  const [featuredPost, ...secondaryPosts] = latestPosts;
  const impactPost = Array.isArray(posts)
    ? posts.find((post) => (post.impactPoints?.length ?? 0) >= 2)
    : undefined;
  // CMS testimonials first, then the existing sample quotes so the section always shows.
  const allTestimonials = [...(Array.isArray(testimonials) ? testimonials : []), ...SAMPLE_TESTIMONIALS];

  return (
    <div className="overflow-x-hidden bg-gray-50/50">
      {/* 1. Hero: fixed value proposition */}
      <section className="relative min-h-[680px] md:min-h-[88vh] flex items-center overflow-hidden pt-28 pb-16 md:pt-32 bg-gray-950">
        <AnimatePresence>
          <motion.div
            key={backgroundIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img src={GWD_IMAGES[backgroundIndex]} alt="" className="w-full h-full object-cover object-center" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/90 via-black/75 to-black/40" />

        <div className="container-custom relative z-10 w-full">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-white"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold tracking-wide mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-primary" />
                GWD Youth Foundation · Yola, Adamawa State, Nigeria
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight font-heading">
                Money skills and digital skills for Nigeria's{" "}
                <span className="text-primary">next generation</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                GWD Youth Foundation runs financial literacy clubs in secondary schools, leadership HUBs on
                campuses and AI training for young people, so they grow up making confident, informed decisions.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {PROGRAMS.map((program) => (
                  <Link
                    key={program.href}
                    href={program.href}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-sm font-semibold transition-colors"
                  >
                    <program.icon className="w-4 h-4 text-primary" />
                    {program.title}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#programs" className="btn-primary text-base px-8 py-4 gap-2">
                  Explore our programs
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link href="/donate" className="btn-secondary text-base px-8 py-4 gap-2">
                  <Heart className="w-5 h-5" />
                  Support a student
                </Link>
              </div>

              <div className="mt-8 border-l-4 border-secondary pl-4">
                <p className="text-lg font-bold text-secondary leading-tight">Nnenna Mosugu</p>
                <p className="text-sm font-medium text-secondary/90 leading-tight mt-1">
                  Founder and Executive Director
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="lg:col-span-5 lg:justify-self-end w-full max-w-md"
            >
              <div className="p-6 sm:p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/15">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Our impact so far</span>
                  <span className="text-xs text-gray-300">As of {STATS_AS_OF}</span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {(Object.keys(IMPACT_STATS) as (keyof typeof IMPACT_STATS)[]).map((key) => {
                    const Icon = STAT_ICONS[key];
                    return (
                      <div key={key}>
                        <Icon className="w-5 h-5 text-primary mb-2" />
                        <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                          {formatStat(key)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-300">{IMPACT_STATS[key].label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Partner / school strip */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="container-custom">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
            Schools & partners we work with
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {PARTNERS.map((partner) => (
              <span key={partner} className="text-sm sm:text-base font-bold text-gray-500 whitespace-nowrap">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Programs */}
      <section id="programs" className="section-padding bg-gray-50/60 scroll-mt-20">
        <div className="container-custom">
          <SectionHeader
            title="Three programs, one goal"
            subtitle="What we do"
            description="Every program builds practical money and digital skills, matched to where young people are in their education."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {PROGRAMS.map((program, idx) => (
              <motion.div
                key={program.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-gray-800">
                    <program.icon className="w-3.5 h-3.5 text-primary" />
                    {program.audience}
                  </span>
                  <h3 className="absolute bottom-4 left-5 right-5 text-xl font-bold text-white">{program.title}</h3>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{program.summary}</p>
                  <ul className="space-y-2 mb-6">
                    {program.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={program.href}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest from the field + latest impact report */}
      {featuredPost && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <SectionHeader
                title="Latest from the field"
                subtitle="News & updates"
                description="Real sessions, real schools, reported by our facilitators."
                className="mb-0"
                centered={false}
              />
              <Link href="/blog" className="inline-flex items-center font-bold text-primary hover:text-green-700 gap-2">
                View all updates <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              <Link
                href={`/details/blog/${featuredPost.id}`}
                className="lg:col-span-7 group relative rounded-3xl overflow-hidden shadow-xl min-h-[380px] flex items-end"
              >
                <img
                  src={getPostImage(featuredPost, GWD_IMAGES[0])}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative p-8 text-white">
                  <div className="flex items-center gap-3 text-xs font-semibold mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary uppercase tracking-wide">
                      {featuredPost.category || "Update"}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-200">
                      <Calendar className="w-3.5 h-3.5" /> {formatDate(featuredPost.createdAt)}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">{featuredPost.title}</h3>
                  <p className="text-gray-200 text-sm line-clamp-2 max-w-xl">
                    {featuredPost.excerpt || featuredPost.content}
                  </p>
                </div>
              </Link>

              <div className="lg:col-span-5 flex flex-col gap-6">
                {secondaryPosts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/details/blog/${post.id}`}
                    className="group flex gap-4 bg-gray-50 hover:bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <img
                      src={getPostImage(post, GWD_IMAGES[(idx + 1) % GWD_IMAGES.length])}
                      alt={post.title}
                      className="w-28 h-28 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                        {post.category || "Update"} · {formatDate(post.createdAt)}
                      </p>
                      <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt || post.content}</p>
                    </div>
                  </Link>
                ))}

                {impactPost && (
                  <div className="bg-gray-900 text-white rounded-2xl p-6 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">Latest impact report</p>
                        <p className="text-sm text-gray-300 truncate">{impactPost.name || impactPost.title}</p>
                      </div>
                    </div>
                    <ul className="space-y-2.5 mb-4">
                      {impactPost.impactPoints!.slice(0, 4).map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/details/blog/${impactPost.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-primary"
                    >
                      Read the full report <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Who we are (short) — full story lives on /about */}
      <section className="section-padding bg-gray-50/60">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
          <motion.img
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            src={GWD_IMAGES[0]}
            alt="FLiC students in session"
            className="rounded-3xl shadow-2xl w-full h-[340px] sm:h-[420px] object-cover"
          />
          <div>
            <SectionHeader
              title="Why we started"
              subtitle="Who we are"
              centered={false}
              className="mb-6"
            />
            <p className="text-gray-600 leading-relaxed mb-4">
              Too many young people leave school without ever being taught how money works. GWD Youth Foundation
              began as a community initiative teaching basic financial concepts to high school students in Adamawa
              State, and has grown into clubs, campus HUBs and AI training across multiple institutions.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              <span className="font-bold text-gray-700">Our values: </span>
              {CORE_VALUES.join(" · ")}
            </p>
            <Link href="/about" className="btn-primary gap-2">
              Our story, team & milestones <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Vision banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-primary to-emerald-500 py-24 md:py-32 text-white">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-black/20 blur-3xl pointer-events-none" />
        <Quote className="absolute top-10 left-6 md:left-16 w-24 h-24 md:w-40 md:h-40 text-white/10 pointer-events-none" />

        <div className="container-custom relative z-10 max-w-5xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 border border-white/30 text-sm font-extrabold uppercase tracking-[0.25em] mb-8 backdrop-blur"
          >
            <Eye className="w-4 h-4 text-secondary" />
            Our vision
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight font-heading"
          >
            To create the{" "}
            <motion.span
              initial={{ backgroundSize: "0% 100%" }}
              whileInView={{ backgroundSize: "100% 100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="bg-no-repeat [box-decoration-break:clone] [-webkit-box-decoration-break:clone] px-1"
              style={{ backgroundImage: "linear-gradient(transparent 62%, rgba(245, 158, 11, 0.85) 62%)" }}
            >
              right attitude towards money
            </motion.span>{" "}
            among the youth, and close the poverty gap across{" "}
            <span className="text-secondary">Nigeria and Africa.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-lg md:text-xl text-white/85 max-w-3xl mx-auto"
          >
            Preparing young people to make better financial decisions, today and for the rest of their lives.
          </motion.p>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeader
              title="In their own words"
              subtitle="Testimonials"
              description="Students, parents and educators on what changed for them."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTestimonials.map((item) => (
                <figure key={item.id} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col">
                  <Quote className="w-8 h-8 text-primary/40 mb-4" />
                  <blockquote className="text-gray-700 leading-relaxed flex-1 mb-6">"{item.content}"</blockquote>
                  <figcaption className="flex items-center gap-3">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-11 h-11 rounded-full object-cover" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      {item.role && <p className="text-sm text-gray-500">{item.role}</p>}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
      </section>

      {/* 8. Get involved */}
      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading">Help us reach the next school</h2>
            <p className="text-lg text-gray-300">
              {formatStat("students")} students reached so far. Every new club starts with someone deciding to help.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <Heart className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Donate</h3>
              <p className="text-gray-300 mb-6">
                <span className="text-white font-bold">{DONATION_ASK.amount}</span> {DONATION_ASK.outcome}.
              </p>
              <Link href="/donate" className="btn-primary w-full">
                Support a student
              </Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <Handshake className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Partner or volunteer</h3>
              <p className="text-gray-300 mb-6">
                Schools, companies and mentors can host a club, sponsor a cohort or teach a session.
              </p>
              <Link href="/get-involved" className="btn-secondary w-full">
                Get involved
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky donate button on mobile */}
      <AnimatePresence>
        {showStickyDonate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="md:hidden fixed bottom-4 right-4 z-40"
          >
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-white font-bold px-5 py-3 shadow-xl shadow-primary/30"
            >
              <Heart className="w-4 h-4" /> Donate
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
