import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Edit3, FileText, LogOut, Newspaper, Plus, Save, Search, Trash2 } from "lucide-react";
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
  getAdminPost,
  listAdminPosts,
  listAdminResources,
  updateAdminPost,
  type AdminPostSummary,
} from "@/lib/admin-api";
import { supabase } from "@/lib/supabase";
import { queryClient } from "@/lib/queryClient";
import { PROGRAM_AREAS } from "@/lib/program-areas";
import { cn } from "@/lib/utils";

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
  programArea: string;
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
  programArea: "",
  thumbnail: null,
  gallery: [],
  resourcePdf: null,
  resourceDescription: "",
  resourceIcon: "terminal",
  resourceColor: "bg-purple-50 text-purple-600",
  resourcePoints: "",
};

// New FLiC posts belong on the Financial Literacy page unless changed.
const formForTab = (tab: AdminTab): FormState => ({
  ...emptyForm,
  programArea: tab === "flic" ? "financial-literacy" : "",
});

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

const POST_TYPES: ProgramCategory[] = ["flic", "hubs", "activities", "blog"];

const typeLabel: Record<string, string> = {
  flic: "FLiC",
  hubs: "HUBs",
  activities: "Activity",
  blog: "Blog",
};

const programLabel = (value?: string): string =>
  PROGRAM_AREAS.find((area) => area.value === value)?.title ?? "None";

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
  const [form, setForm] = useState<FormState>(formForTab("flic"));
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState<AdminPostSummary[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingEditId, setLoadingEditId] = useState<string | null>(null);
  const [section, setSection] = useState<"posts" | "resources">("posts");
  const [view, setView] = useState<"list" | "form">("list");
  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

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
        impactReport: "e.g.\n120 students trained\n3 schools reached",
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
        impactReport: "e.g.\n45 participants\n2 prototypes built",
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
        impactReport: "e.g.\n80 attendees\n60% improved quiz score",
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

  const openSection = (next: "posts" | "resources") => {
    setSection(next);
    setView("list");
    setEditingId(null);
  };

  const openNew = (tab: AdminTab) => {
    setActiveTab(tab);
    setForm(formForTab(tab));
    setEditingId(null);
    setView("form");
    window.scrollTo({ top: 0 });
  };

  const handleTypeChange = (type: ProgramCategory) => {
    setActiveTab(type);
    setForm((prev) => ({ ...prev, programArea: formForTab(type).programArea }));
  };

  const resetEditor = () => {
    setEditingId(null);
    setForm(formForTab(activeTab));
    setView("list");
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

  const handleStartEdit = async (id: string | number) => {
    const postId = String(id);
    setLoadingEditId(postId);
    try {
      const post = await getAdminPost(postId);
      const category = post.category.toLowerCase() as ProgramCategory;

      if (!["flic", "hubs", "activities", "blog"].includes(category)) {
        toast({
          title: "Cannot edit this item",
          description: "Only standard posts and programs can be edited here.",
          variant: "destructive",
        });
        return;
      }

      setActiveTab(category);
      setEditingId(postId);
      setView("form");
      setForm({
        ...emptyForm,
        title: post.title ?? "",
        name: post.name ?? "",
        excerpt: post.excerpt ?? "",
        content: post.content ?? "",
        author: post.author ?? "",
        impactReport: post.impactReport ?? "",
        keyActivities: post.keyActivities?.join(", ") ?? "",
        programArea: post.programArea ?? "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast({
        title: "Could not load post",
        description: error instanceof Error ? error.message : "Request failed.",
        variant: "destructive",
      });
    } finally {
      setLoadingEditId(null);
    }
  };

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
        setView("list");
        await loadPosts();
        await queryClient.invalidateQueries();
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
        programArea: form.programArea,
        thumbnail: form.thumbnail,
        gallery: form.gallery,
        resourcePdf: form.resourcePdf,
        featured: activeTab === "flic" || activeTab === "hubs",
        published: true,
      } as const;

      if (editingId) {
        await updateAdminPost(editingId, payload);
        toast({
          title: "Updated",
          description: `${config[activeTab as ProgramCategory].title} content updated successfully.`,
        });
        resetEditor();
        await loadPosts();
        await queryClient.invalidateQueries();
        return;
      }

      if (activeTab === "blog") {
        await createAdminPost(payload);
      } else {
        await createAdminProgram(payload);
      }

      toast({
        title: "Published",
        description: `${config[activeTab as ProgramCategory].title} content published successfully.`,
      });
      resetEditor();
      await loadPosts();
      await queryClient.invalidateQueries();
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
      await queryClient.invalidateQueries();
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

  const sortedPosts = useMemo(
    () =>
      [...posts].sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      }),
    [posts],
  );
  const allPosts = sortedPosts.filter((post) => post.contentType !== "resource");
  const resources = sortedPosts.filter((post) => post.contentType === "resource");

  const visiblePosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allPosts.filter((post) => {
      if (query && !post.title.toLowerCase().includes(query)) return false;
      if (typeFilter !== "all" && post.category.toLowerCase() !== typeFilter) return false;
      if (programFilter === "none") return !post.programArea;
      return programFilter === "all" || post.programArea === programFilter;
    });
  }, [allPosts, search, typeFilter, programFilter]);

  const formatDate = (value: string | null): string => {
    if (!value) return "Unknown date";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "Unknown date";
    return parsed.toLocaleDateString();
  };

  const labelClass = "text-sm font-medium";
  const selectClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";
  const category = activeTab as ProgramCategory;

  const navItems = [
    { key: "posts" as const, label: "Posts", icon: <Newspaper className="w-4 h-4" /> },
    { key: "resources" as const, label: "Resources", icon: <FileText className="w-4 h-4" /> },
  ];

  const stats = [
    { label: "All posts", value: allPosts.length },
    ...PROGRAM_AREAS.map((area) => ({
      label: area.title,
      value: allPosts.filter((post) => post.programArea === area.value).length,
    })),
  ];

  const backButton = (
    <button
      type="button"
      onClick={resetEditor}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
    >
      <ArrowLeft className="w-4 h-4" /> Back to {section === "posts" ? "posts" : "resources"}
    </button>
  );

  const fileField = (label: string, input: JSX.Element) => (
    <div className="space-y-2">
      <label className={labelClass}>{label}</label>
      {input}
    </div>
  );

  const postForm = (
    <div>
      {backButton}
      <h2 className="text-2xl font-bold mb-1">{editingId ? "Edit post" : "New post"}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        {editingId
          ? "Upload new files only when you want to replace media."
          : "Choose the post type first. It sets where the post appears in the Gallery and Blog."}
      </p>
      <div className="bg-card border border-border rounded-xl p-6 space-y-5 max-w-3xl">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelClass} htmlFor="post-type">Post type</label>
            <select
              id="post-type"
              className={selectClass}
              value={category}
              disabled={Boolean(editingId)}
              onChange={(e) => handleTypeChange(e.target.value as ProgramCategory)}
            >
              {POST_TYPES.map((type) => (
                <option key={type} value={type}>{config[type].title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className={labelClass} htmlFor="program-area">Program area</label>
            <select
              id="program-area"
              className={selectClass}
              value={form.programArea}
              onChange={(e) => setForm((prev) => ({ ...prev, programArea: e.target.value }))}
            >
              <option value="">None (Gallery or Blog only)</option>
              {PROGRAM_AREAS.map((area) => (
                <option key={area.value} value={area.value}>{area.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Title</label>
          <Input
            placeholder={fieldCopy[category].title}
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>
        {(category === "flic" || category === "hubs") && (
          <div className="space-y-2">
            <label className={labelClass}>{category === "flic" ? "School name" : "Hub name"}</label>
            <Input
              placeholder={fieldCopy[category].name}
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
        )}
        <div className="space-y-2">
          <label className={labelClass}>Excerpt</label>
          <Input
            placeholder={fieldCopy[category].excerpt}
            value={form.excerpt}
            onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Content</label>
          <Textarea
            placeholder={fieldCopy[category].content}
            value={form.content}
            onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
            className="h-40"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Author</label>
          <Input
            placeholder={fieldCopy[category].author}
            value={form.author}
            onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Impact report</label>
          <Textarea
            rows={4}
            placeholder={fieldCopy[category].impactReport}
            value={form.impactReport}
            onChange={(e) => setForm((prev) => ({ ...prev, impactReport: e.target.value }))}
          />
          <p className="text-xs text-muted-foreground">One point per line. Each line shows as a bullet on the post.</p>
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Key activities</label>
          <Input
            placeholder={fieldCopy[category].keyActivities}
            value={form.keyActivities}
            onChange={(e) => setForm((prev) => ({ ...prev, keyActivities: e.target.value }))}
          />
        </div>
        {fileField(
          fieldCopy[category].thumbnailLabel,
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setForm((prev) => ({ ...prev, thumbnail: e.target.files?.[0] ?? null }))}
          />,
        )}
        {fileField(
          fieldCopy[category].galleryLabel,
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setForm((prev) => ({ ...prev, gallery: Array.from(e.target.files ?? []) }))}
          />,
        )}
        {fileField(
          fieldCopy[category].resourcePdfLabel,
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => setForm((prev) => ({ ...prev, resourcePdf: e.target.files?.[0] ?? null }))}
          />,
        )}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button type="button" variant="outline" onClick={resetEditor} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            <Save className="w-4 h-4 mr-2" />
            {submitting ? (editingId ? "Saving..." : "Publishing...") : editingId ? "Save changes" : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );

  const resourceForm = (
    <div>
      {backButton}
      <h2 className="text-2xl font-bold mb-1">New resource</h2>
      <p className="text-sm text-muted-foreground mb-6">{config.resources.description}</p>
      <div className="bg-card border border-border rounded-xl p-6 space-y-5 max-w-3xl">
        <div className="space-y-2">
          <label className={labelClass}>Title</label>
          <Input
            placeholder="e.g. Prompt Engineering Mastery"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Description</label>
          <Textarea
            placeholder="Short explanation of what this resource teaches."
            value={form.resourceDescription}
            onChange={(e) => setForm((prev) => ({ ...prev, resourceDescription: e.target.value }))}
            className="h-32"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelClass}>Icon</label>
            <select
              className={selectClass}
              value={form.resourceIcon}
              onChange={(e) => setForm((prev) => ({ ...prev, resourceIcon: e.target.value }))}
            >
              {resourceIconOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Color theme</label>
            <select
              className={selectClass}
              value={form.resourceColor}
              onChange={(e) => setForm((prev) => ({ ...prev, resourceColor: e.target.value }))}
            >
              {resourceColorOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Points (comma-separated)</label>
          <Input
            placeholder="Structured Prompting Frameworks, Iterative Refinement Techniques"
            value={form.resourcePoints}
            onChange={(e) => setForm((prev) => ({ ...prev, resourcePoints: e.target.value }))}
          />
        </div>
        {fileField(
          "PDF file",
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => setForm((prev) => ({ ...prev, resourcePdf: e.target.files?.[0] ?? null }))}
          />,
        )}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button type="button" variant="outline" onClick={resetEditor} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            <Save className="w-4 h-4 mr-2" />
            {submitting ? "Publishing..." : "Publish resource"}
          </Button>
        </div>
      </div>
    </div>
  );

  const deleteButton = (post: AdminPostSummary) => (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Delete ${post.title}`}
      title="Delete"
      className="text-muted-foreground hover:text-red-600"
      onClick={() => handleDeletePost(post.id, post.title)}
      disabled={deletingId === String(post.id)}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );

  const loadingRow = (
    <div className="flex justify-center py-10">
      <Spinner size="sm" />
    </div>
  );

  const postList = (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Posts</h2>
        <Button onClick={() => openNew("flic")}>
          <Plus className="w-4 h-4 mr-2" /> New post
        </Button>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search posts"
            placeholder="Search posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          aria-label="Filter by program"
          className={`${selectClass} md:w-56`}
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
        >
          <option value="all">All programs</option>
          {PROGRAM_AREAS.map((area) => (
            <option key={area.value} value={area.value}>{area.title}</option>
          ))}
          <option value="none">No program</option>
        </select>
        <select
          aria-label="Filter by type"
          className={`${selectClass} md:w-44`}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All types</option>
          {POST_TYPES.map((type) => (
            <option key={type} value={type}>{typeLabel[type]}</option>
          ))}
        </select>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loadingPosts ? (
          loadingRow
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border text-xs text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-4 py-3">Title</th>
                <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Program</th>
                <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Type</th>
                <th className="text-left font-medium px-4 py-3 hidden lg:table-cell">Date</th>
                <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {visiblePosts.map((post) => (
                <tr key={String(post.id)} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <p className="font-medium line-clamp-2">{post.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 md:hidden">
                      {programLabel(post.programArea)} · {typeLabel[post.category.toLowerCase()] ?? post.category}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{programLabel(post.programArea)}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {typeLabel[post.category.toLowerCase()] ?? post.category}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden lg:table-cell">{formatDate(post.createdAt)}</td>
                  <td className="px-2 py-2">
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Edit ${post.title}`}
                        title="Edit"
                        className="text-muted-foreground"
                        onClick={() => handleStartEdit(post.id)}
                        disabled={loadingEditId === String(post.id) || Boolean(deletingId)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      {deleteButton(post)}
                    </div>
                  </td>
                </tr>
              ))}
              {visiblePosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                    No posts match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {!loadingPosts && (
        <p className="text-xs text-muted-foreground mt-3">
          Showing {visiblePosts.length} of {allPosts.length} posts
        </p>
      )}
    </div>
  );

  const resourceList = (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Resources</h2>
        <Button onClick={() => openNew("resources")}>
          <Plus className="w-4 h-4 mr-2" /> New resource
        </Button>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loadingPosts && loadingRow}
        {!loadingPosts && resources.length === 0 && (
          <p className="px-4 py-10 text-sm text-center text-muted-foreground">No resource PDFs published yet.</p>
        )}
        {!loadingPosts &&
          resources.map((post) => (
            <div
              key={String(post.id)}
              className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border last:border-0"
            >
              <div>
                <p className="text-sm font-medium">{post.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(post.createdAt)}</p>
              </div>
              {deleteButton(post)}
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="pt-28 pb-16 bg-background text-foreground min-h-screen">
      <div className="container-custom grid lg:grid-cols-[200px_minmax(0,1fr)] gap-8">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-bold mb-3">GWD admin</p>
          <nav className="flex lg:flex-col gap-1 flex-wrap" aria-label="Admin">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => openSection(item.key)}
                aria-current={section === item.key ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
                  section === item.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.icon} {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors lg:mt-6"
            >
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </nav>
        </aside>
        <main className="min-w-0">
          {section === "posts"
            ? view === "form" ? postForm : postList
            : view === "form" ? resourceForm : resourceList}
        </main>
      </div>
    </div>
  );
}
