import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  GraduationCap,
  School,
  Newspaper,
  Gamepad2,
  LogOut,
  Save,
  LayoutDashboard,
  Trash2,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { clearAdminToken, getAdminToken, isAdminLoggedIn } from "@/lib/admin-auth";
import {
  createAdminResource,
  createAdminPost,
  createAdminProgram,
  deleteAdminPost,
  listAdminPosts,
  listAdminResources,
  type AdminPostSummary,
} from "@/lib/admin-api";
import { supabase } from "@/lib/supabase";

type ProgramCategory = "flic" | "hubs" | "activities" | "blog";
type AdminTab = ProgramCategory | "resources";

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
  resourcePdf: File | null;
  resourceDescription: string;
  resourceIcon: string;
  resourceColor: string;
  resourcePoints: string;
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
  resourcePdf: null,
  resourceDescription: "",
  resourceIcon: "terminal",
  resourceColor: "bg-purple-50 text-purple-600",
  resourcePoints: "",
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
  resourcePdfLabel: string;
};

const sectionLabel: Record<ProgramCategory, string> = {
  flic: "FLIC",
  hubs: "HUBS",
  activities: "ACTIVITIES",
  blog: "BLOG",
};

const resourceIconOptions = [
  { value: "terminal", label: "Terminal" },
  { value: "brain-circuit", label: "Brain Circuit" },
  { value: "trending-up", label: "Trending Up" },
  { value: "rocket", label: "Rocket" },
] as const;

const resourceColorOptions = [
  "bg-blue-50 text-blue-600",
  "bg-purple-50 text-purple-600",
  "bg-green-50 text-green-600",
  "bg-amber-50 text-amber-600",
] as const;

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<AdminTab>("flic");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState<AdminPostSummary[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
      resources: {
        title: "Resource PDFs",
        description:
          "Create downloadable resources for the Digital Financial Literacy Resource page.",
      },
    }),
    [],
  );

  const fieldCopy = useMemo<Record<ProgramCategory, FieldCopy>>(
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
        resourcePdfLabel: "Attach resource PDF (optional)",
      },
      hubs: {
        title: "e.g. HUB Workshop: Digital Skills for Youth Leaders",
        name: "e.g. AUN Youth Innovation Hub",
        excerpt: "Short summary of the HUB topic, participants, and result.",
        content:
          "Describe the HUB session in detail: objective, sessions delivered, and outcomes.",
        author: "Facilitator or coordinator name",
        impactReport: "Impact snapshot (e.g. 45 participants, 2 prototypes built).",
        keyActivities: "Comma-separated (e.g. design sprint, mentorship circle, demo day)",
        thumbnailLabel: "HUB cover image",
        galleryLabel: "HUB session photos (optional)",
        resourcePdfLabel: "Attach resource PDF (optional)",
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
        resourcePdfLabel: "Attach resource PDF (optional)",
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
        resourcePdfLabel: "Attach resource PDF (optional)",
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
    setActiveTab(tab as AdminTab);
    setForm(emptyForm);
  };

  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const [rows, resourceRows] = await Promise.all([listAdminPosts(), listAdminResources()]);
      setPosts([...rows, ...resourceRows]);
    } catch (error) {
      toast({
        title: "Could not load posts",
        description: error instanceof Error ? error.message : "Request failed.",
        variant: "destructive",
      });
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, []);

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast({ title: "Missing title", description: "Title is required.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      if (activeTab === "resources") {
        if (!form.resourcePdf) {
          toast({
            title: "Missing PDF",
            description: "Upload a PDF file for this resource.",
            variant: "destructive",
          });
          return;
        }

        await createAdminResource({
          title: form.title.trim(),
          description: form.resourceDescription.trim() || undefined,
          icon: form.resourceIcon,
          color: form.resourceColor,
          points: form.resourcePoints
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          published: true,
          resourcePdf: form.resourcePdf,
        });

        toast({
          title: "Published",
          description: "Resource PDF published successfully.",
        });
        setForm(emptyForm);
        await loadPosts();
        return;
      }

      const payload = {
        title: form.title,
        name: form.name.trim() || undefined,
        category: activeTab as ProgramCategory,
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
        resourcePdf: form.resourcePdf,
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
        description: `${config[activeTab as ProgramCategory].title} content published successfully.`,
      });
      setForm(emptyForm);
      await loadPosts();
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

  const handleDeletePost = async (id: string | number, title: string) => {
    const confirmed = window.confirm(`Delete "${title}"?`);
    if (!confirmed) return;

    const postId = String(id);
    setDeletingId(postId);
    try {
      await deleteAdminPost(postId);
      setPosts((prev) => prev.filter((post) => String(post.id) !== postId));
      toast({ title: "Deleted", description: "Post removed successfully." });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Request failed.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPosts = useMemo(
    () => {
      const pool =
        activeTab === "resources"
          ? posts.filter((post) => post.contentType === "resource")
          : posts.filter((post) => post.category.toLowerCase() === activeTab);

      return pool.sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });
    },
    [activeTab, posts],
  );

  const formatDate = (value: string | null): string => {
    if (!value) return "Unknown date";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "Unknown date";
    return parsed.toLocaleDateString();
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
            <TabsTrigger value="resources" className="rounded-xl px-6 py-3 font-bold">
              <FileText className="w-4 h-4 mr-2" /> Resource PDFs
            </TabsTrigger>
          </TabsList>

          {(["flic", "hubs", "activities", "blog"] as ProgramCategory[]).map((category) => (
            <TabsContent key={category} value={category}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-none shadow-xl bg-white rounded-[2rem]">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black">{config[category].title}</CardTitle>
                    <CardDescription>{config[category].description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[category]} Title</label>
                    <Input
                      placeholder={fieldCopy[category].title}
                      value={form.title}
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                    </div>
                    {(category === "flic" || category === "hubs") && (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">
                          {category === "flic" ? "School Name" : "Hub Name"}
                        </label>
                        <Input
                          placeholder={fieldCopy[category].name}
                          value={form.name}
                          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[category]} Excerpt</label>
                    <Input
                      placeholder={fieldCopy[category].excerpt}
                      value={form.excerpt}
                      onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                    />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[category]} Content</label>
                    <Textarea
                      placeholder={fieldCopy[category].content}
                      value={form.content}
                      onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                      className="h-40"
                    />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[category]} Author</label>
                    <Input
                      placeholder={fieldCopy[category].author}
                      value={form.author}
                      onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                    />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[category]} Impact Report</label>
                    <Input
                      placeholder={fieldCopy[category].impactReport}
                      value={form.impactReport}
                      onChange={(e) => setForm((prev) => ({ ...prev, impactReport: e.target.value }))}
                    />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{sectionLabel[category]} Key Activities</label>
                    <Input
                      placeholder={fieldCopy[category].keyActivities}
                      value={form.keyActivities}
                      onChange={(e) => setForm((prev) => ({ ...prev, keyActivities: e.target.value }))}
                    />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{fieldCopy[category].thumbnailLabel}</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, thumbnail: e.target.files?.[0] ?? null }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{fieldCopy[category].galleryLabel}</label>
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
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{fieldCopy[category].resourcePdfLabel}</label>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, resourcePdf: e.target.files?.[0] ?? null }))
                        }
                      />
                    </div>
                    <Button onClick={handleSubmit} disabled={submitting} className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      {submitting ? "Publishing..." : "Publish"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-white rounded-[2rem] mt-8">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black">
                      Manage {config[category].title} Posts
                    </CardTitle>
                    <CardDescription>Delete previously published items for this section.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {loadingPosts && (
                      <div className="flex justify-center py-6">
                        <Spinner size="sm" />
                      </div>
                    )}
                    {!loadingPosts && filteredPosts.length === 0 && (
                      <p className="text-sm text-gray-500">No published items yet.</p>
                    )}
                    {!loadingPosts &&
                      filteredPosts.map((post) => (
                        <div
                          key={String(post.id)}
                          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-xl border border-gray-100"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">{post.title}</p>
                            <p className="text-xs text-gray-500">
                              {post.category.toUpperCase()} • {formatDate(post.createdAt)}
                            </p>
                          </div>
                          <Button
                            variant="destructive"
                            onClick={() => handleDeletePost(post.id, post.title)}
                            disabled={deletingId === String(post.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {deletingId === String(post.id) ? "Deleting..." : "Delete"}
                          </Button>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}

          <TabsContent value="resources">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-none shadow-xl bg-white rounded-[2rem]">
                <CardHeader>
                  <CardTitle className="text-2xl font-black">{config.resources.title}</CardTitle>
                  <CardDescription>{config.resources.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Resource Title</label>
                    <Input
                      placeholder="e.g. Prompt Engineering Mastery"
                      value={form.title}
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Description</label>
                    <Textarea
                      placeholder="Short explanation of what this resource teaches."
                      value={form.resourceDescription}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, resourceDescription: e.target.value }))
                      }
                      className="h-32"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Icon</label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={form.resourceIcon}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, resourceIcon: e.target.value }))
                        }
                      >
                        {resourceIconOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Color Theme</label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={form.resourceColor}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, resourceColor: e.target.value }))
                        }
                      >
                        {resourceColorOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Points (comma-separated)</label>
                    <Input
                      placeholder="Structured Prompting Frameworks, Iterative Refinement Techniques"
                      value={form.resourcePoints}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, resourcePoints: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">PDF File</label>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, resourcePdf: e.target.files?.[0] ?? null }))
                      }
                    />
                  </div>
                  <Button onClick={handleSubmit} disabled={submitting} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {submitting ? "Publishing..." : "Publish Resource"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white rounded-[2rem] mt-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-black">Manage Resource PDFs</CardTitle>
                  <CardDescription>Delete previously published resource entries.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {loadingPosts && (
                    <div className="flex justify-center py-6">
                      <Spinner size="sm" />
                    </div>
                  )}
                  {!loadingPosts && filteredPosts.length === 0 && (
                    <p className="text-sm text-gray-500">No resource PDFs published yet.</p>
                  )}
                  {!loadingPosts &&
                    filteredPosts.map((post) => (
                      <div
                        key={String(post.id)}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-xl border border-gray-100"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{post.title}</p>
                          <p className="text-xs text-gray-500">
                            RESOURCE • {formatDate(post.createdAt)}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeletePost(post.id, post.title)}
                          disabled={deletingId === String(post.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {deletingId === String(post.id) ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
