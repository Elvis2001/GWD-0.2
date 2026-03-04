import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { GraduationCap, School, Newspaper, Gamepad2, LogOut, Save, LayoutDashboard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { clearAdminToken, getAdminToken, isAdminLoggedIn } from "@/lib/admin-auth";
import { createAdminPost, createAdminProgram } from "@/lib/admin-api";
import { supabase } from "@/lib/supabase";

type Category = "flic" | "hubs" | "activities" | "blog";

type FormState = {
  title: string;
  name: string;
  excerpt: string;
  content: string;
  author: string;
  impactReport: string;
  keyActivities: string;
  thumbnail: File | null;
  gallery: File[];
};

const emptyForm: FormState = {
  title: "",
  name: "",
  excerpt: "",
  content: "",
  author: "",
  impactReport: "",
  keyActivities: "",
  thumbnail: null,
  gallery: [],
};

type FieldCopy = {
  title: string;
  name: string;
  excerpt: string;
  content: string;
  author: string;
  impactReport: string;
  keyActivities: string;
  thumbnailLabel: string;
  galleryLabel: string;
};

const sectionLabel: Record<Category, string> = {
  flic: "FLIC",
  hubs: "HUBS",
  activities: "ACTIVITIES",
  blog: "BLOG",
};

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Category>("flic");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!isAdminLoggedIn()) {
        setLocation("/admin");
        return;
      }

      const token = getAdminToken();
      if (!token) {
        setLocation("/admin");
        return;
      }

      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data.user) {
        clearAdminToken();
        setLocation("/admin");
      }
    };

    void validateToken();
  }, [setLocation]);

  const config = useMemo(
    () => ({
      flic: { title: "FLIC", description: "Creates FLIC program posts and gallery content." },
      hubs: { title: "Hubs", description: "Creates HUB program posts and gallery content." },
      activities: {
        title: "Financial Literacy Activities",
        description: "Creates activity program posts and gallery content.",
      },
      blog: { title: "Blogs & News", description: "Creates public blog/news posts." },
    }),
    [],
  );

  const fieldCopy = useMemo<Record<Category, FieldCopy>>(
    () => ({
      flic: {
        title: "e.g. FLIC Cohort 2026: School Launch in Lagos",
        name: "e.g. Government Girls Secondary School, Surulere",
        excerpt: "One-sentence summary of the workshop, school, and key outcome.",
        content:
          "Write full FLIC report: school context, what students learned, and measurable outcome.",
        author: "Program lead name (e.g. Jane Doe)",
        impactReport: "Impact snapshot (e.g. 120 students trained, 3 schools reached).",
        keyActivities: "Comma-separated (e.g. budgeting basics, savings challenge, Q&A)",
        thumbnailLabel: "FLIC cover image",
        galleryLabel: "FLIC activity photos (optional)",
      },
      hubs: {
        title: "e.g. HUB Workshop: Digital Skills for Youth Leaders",
        name: "e.g. Abuja Youth Innovation Hub",
        excerpt: "Short summary of the HUB topic, participants, and result.",
        content:
          "Describe the HUB session in detail: objective, sessions delivered, and outcomes.",
        author: "Facilitator or coordinator name",
        impactReport: "Impact snapshot (e.g. 45 participants, 2 prototypes built).",
        keyActivities: "Comma-separated (e.g. design sprint, mentorship circle, demo day)",
        thumbnailLabel: "HUB cover image",
        galleryLabel: "HUB session photos (optional)",
      },
      activities: {
        title: "e.g. Financial Literacy Activity: Campus Budget Bootcamp",
        name: "Optional activity venue/group name",
        excerpt: "Brief summary of the activity and participant takeaway.",
        content:
          "Write activity details: setup, engagement format, and what changed after the session.",
        author: "Activity owner name",
        impactReport: "Impact snapshot (e.g. 80 attendees, 60% improved quiz score).",
        keyActivities: "Comma-separated (e.g. spending audit, goal planning, reflection)",
        thumbnailLabel: "Activity cover image",
        galleryLabel: "Activity photos (optional)",
      },
      blog: {
        title: "e.g. How Youth Can Build Better Money Habits in 2026",
        name: "Optional series name",
        excerpt: "SEO-friendly summary for homepage/blog cards (1-2 sentences).",
        content:
          "Write the article body: intro, key points, examples, and conclusion.",
        author: "Author byline (e.g. GWD Editorial Team)",
        impactReport: "Optional: include supporting metric or citation summary.",
        keyActivities: "Optional tags, comma-separated (e.g. savings, students, budgeting)",
        thumbnailLabel: "Blog cover image",
        galleryLabel: "Additional blog images (optional)",
      },
    }),
    [],
  );

  const handleLogout = () => {
    clearAdminToken();
    setLocation("/admin");
    toast({ title: "Logged Out", description: "Session ended." });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as Category);
    setForm(emptyForm);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast({ title: "Missing title", description: "Title is required.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        name: form.name.trim() || undefined,
        category: activeTab,
        excerpt: form.excerpt,
        content: form.content,
        author: form.author,
        impactReport: form.impactReport,
        keyActivities: form.keyActivities
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
        thumbnail: form.thumbnail,
        gallery: form.gallery,
        featured: activeTab === "flic" || activeTab === "hubs",
        published: true,
      } as const;

      if (activeTab === "blog") {
        await createAdminPost(payload);
      } else {
        await createAdminProgram(payload);
      }

      toast({
        title: "Published",
        description: `${config[activeTab].title} content published successfully.`,
      });
      setForm(emptyForm);
    } catch (error) {
      toast({
        title: "Publish failed",
        description: error instanceof Error ? error.message : "Request failed.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4">
              <LayoutDashboard className="w-10 h-10 text-primary" /> Admin Console
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Hello there admin</p>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="rounded-full hover:text-red-500">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="bg-white p-1 rounded-2xl shadow-sm border border-gray-100 mb-12 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="flic" className="rounded-xl px-6 py-3 font-bold">
              <GraduationCap className="w-4 h-4 mr-2" /> FLIC
            </TabsTrigger>
            <TabsTrigger value="hubs" className="rounded-xl px-6 py-3 font-bold">
              <School className="w-4 h-4 mr-2" /> Hubs
            </TabsTrigger>
            <TabsTrigger value="activities" className="rounded-xl px-6 py-3 font-bold">
              <Gamepad2 className="w-4 h-4 mr-2" /> Financial Literacy Activities
            </TabsTrigger>
            <TabsTrigger value="blog" className="rounded-xl px-6 py-3 font-bold">
              <Newspaper className="w-4 h-4 mr-2" /> Blogs & News
            </TabsTrigger>
          </TabsList>

          {(["flic", "hubs", "activities", "blog"] as Category[]).map((category) => (
            <TabsContent key={category} value={category}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-none shadow-xl bg-white rounded-[2rem]">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black">{config[category].title}</CardTitle>
                    <CardDescription>{config[category].description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[activeTab]} Title</label>
                    <Input
                      placeholder={fieldCopy[activeTab].title}
                      value={form.title}
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                    </div>
                    {(activeTab === "flic" || activeTab === "hubs") && (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">
                          {activeTab === "flic" ? "School Name" : "Hub Name"}
                        </label>
                        <Input
                          placeholder={fieldCopy[activeTab].name}
                          value={form.name}
                          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[activeTab]} Excerpt</label>
                    <Input
                      placeholder={fieldCopy[activeTab].excerpt}
                      value={form.excerpt}
                      onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                    />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[activeTab]} Content</label>
                    <Textarea
                      placeholder={fieldCopy[activeTab].content}
                      value={form.content}
                      onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                      className="h-40"
                    />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[activeTab]} Author</label>
                    <Input
                      placeholder={fieldCopy[activeTab].author}
                      value={form.author}
                      onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                    />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[activeTab]} Impact Report</label>
                    <Input
                      placeholder={fieldCopy[activeTab].impactReport}
                      value={form.impactReport}
                      onChange={(e) => setForm((prev) => ({ ...prev, impactReport: e.target.value }))}
                    />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[activeTab]} Key Activities</label>
                    <Input
                      placeholder={fieldCopy[activeTab].keyActivities}
                      value={form.keyActivities}
                      onChange={(e) => setForm((prev) => ({ ...prev, keyActivities: e.target.value }))}
                    />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{fieldCopy[activeTab].thumbnailLabel}</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, thumbnail: e.target.files?.[0] ?? null }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{fieldCopy[activeTab].galleryLabel}</label>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            gallery: Array.from(e.target.files ?? []),
                          }))
                        }
                      />
                    </div>
                    <Button onClick={handleSubmit} disabled={submitting} className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      {submitting ? "Publishing..." : "Publish"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
