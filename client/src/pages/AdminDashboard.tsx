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
import { clearAdminToken, isAdminLoggedIn } from "@/lib/admin-auth";
import { createAdminPost, createAdminProgram } from "@/lib/admin-api";

type Category = "flic" | "hubs" | "activities" | "blog";

type FormState = {
  title: string;
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
  excerpt: "",
  content: "",
  author: "",
  impactReport: "",
  keyActivities: "",
  thumbnail: null,
  gallery: [],
};

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Category>("flic");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      setLocation("/admin");
    }
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
            <p className="text-gray-500 mt-2 font-medium">Supabase + Cloudinary Publishing</p>
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
                    <Input
                      placeholder="Title"
                      value={form.title}
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                    <Input
                      placeholder="Excerpt"
                      value={form.excerpt}
                      onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                    />
                    <Textarea
                      placeholder="Content"
                      value={form.content}
                      onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                      className="h-40"
                    />
                    <Input
                      placeholder="Author (optional)"
                      value={form.author}
                      onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                    />
                    <Input
                      placeholder="Impact report (optional)"
                      value={form.impactReport}
                      onChange={(e) => setForm((prev) => ({ ...prev, impactReport: e.target.value }))}
                    />
                    <Input
                      placeholder="Key activities (comma-separated)"
                      value={form.keyActivities}
                      onChange={(e) => setForm((prev) => ({ ...prev, keyActivities: e.target.value }))}
                    />
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Thumbnail image</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, thumbnail: e.target.files?.[0] ?? null }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gallery images (optional)</label>
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
