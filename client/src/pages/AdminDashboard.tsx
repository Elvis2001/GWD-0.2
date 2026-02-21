import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { 
  Image as ImageIcon, 
  Plus, 
  Newspaper, 
  GraduationCap, 
  School, 
  Gamepad2,
  Upload,
  LayoutDashboard,
  Save,
  LogOut,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

/**
 * SMART CONTENT PUBLISHING LOGIC (ARCHITECTURAL OVERVIEW)
 * 
 * When 'Publish' is clicked, the application should:
 * 1. If Category = FLICs:
 *    - Update `posts` or `success_stories` table in DB.
 *    - Update `gallery_items` with category 'flic'.
 *    - This triggers a cache invalidation on the frontend via React Query ['/api/flics', '/api/gallery'].
 * 
 * 2. If Category = HUBs:
 *    - Update `hubs` table.
 *    - Add to `success_stories` for homepage display.
 *    - Add to `gallery_items` with category 'hubs'.
 * 
 * 3. If Category = Games:
 *    - Update `games_activities` table.
 *    - Add to `gallery_items` with category 'games'.
 */

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("gwd_admin_auth");
    if (auth !== "true") {
      setLocation("/admin/login");
    } else {
      setIsLoaded(true);
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("gwd_admin_auth");
    setLocation("/admin/login");
    toast({ title: "Logged Out", description: "You have been securely logged out." });
  };

  const handleUpload = (section: string) => {
    toast({
      title: "Success",
      description: `New ${section} entry added and frontend updated (Dummy Logic)`,
      variant: "default",
    });
  };

  if (!isLoaded) return null;

  const UploadSection = ({ title, description, icon, fields, section }: any) => (
    <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm rounded-[2rem]">
      <CardHeader>
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          <div>
            <CardTitle className="text-2xl font-black">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6">
          {fields.map((field: any, i: number) => (
            <div key={i} className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{field.label}</label>
              {field.type === "textarea" ? (
                <Textarea placeholder={field.placeholder} className="rounded-2xl border-gray-100 bg-white/80 focus:ring-primary h-32" />
              ) : field.type === "file" ? (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer bg-white/50 hover:bg-white/80 transition-colors group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:text-primary transition-colors" />
                      <p className="text-sm text-gray-500">Click to upload image</p>
                    </div>
                    <input type="file" className="hidden" multiple={field.multiple} />
                  </label>
                </div>
              ) : (
                <Input type={field.type} placeholder={field.placeholder} className="rounded-2xl border-gray-100 bg-white/80 focus:ring-primary h-12" />
              )}
            </div>
          ))}
        </div>
        <Button 
          onClick={() => handleUpload(section)}
          className="w-full h-14 rounded-2xl bg-primary hover:bg-green-600 text-lg font-bold shadow-lg shadow-primary/20 transition-all"
        >
          <Save className="mr-2 w-5 h-5" /> Publish & Update Website
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4">
              <LayoutDashboard className="w-10 h-10 text-primary" /> Admin <span className="text-primary">Console</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Smart Content Publishing Hub</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-bold">System Online</div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="w-10 h-10 rounded-full hover:bg-red-50 hover:text-red-500">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="flic" className="w-full">
          <TabsList className="bg-white p-1 rounded-2xl shadow-sm border border-gray-100 mb-12 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="flic" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">
              <GraduationCap className="w-4 h-4 mr-2" /> FLiC Schools
            </TabsTrigger>
            <TabsTrigger value="hubs" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">
              <School className="w-4 h-4 mr-2" /> HUBs & Tech
            </TabsTrigger>
            <TabsTrigger value="blog" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">
              <Newspaper className="w-4 h-4 mr-2" /> Blog & News
            </TabsTrigger>
            <TabsTrigger value="games" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">
              <Gamepad2 className="w-4 h-4 mr-2" /> Games & Activities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flic">
            <UploadSection 
              title="FLiC Schools & Success"
              description="Posts here update Homepage Success Stories, FLiC Page, and FLiC Gallery."
              icon={<GraduationCap className="w-6 h-6" />}
              section="FLiC"
              fields={[
                { label: "School Name", type: "text", placeholder: "e.g., Jimeta Secondary School" },
                { label: "Impact Summary", type: "text", placeholder: "e.g., 90% Financial Literacy Score" },
                { label: "Detailed Story", type: "textarea", placeholder: "Write the full story here..." },
                { label: "Gallery Photos", type: "file", multiple: true }
              ]}
            />
          </TabsContent>

          <TabsContent value="hubs">
            <UploadSection 
              title="HUBs & Tech Bootcamps"
              description="Posts here update Homepage Success Stories, HUBs Page, and HUB Gallery."
              icon={<School className="w-6 h-6" />}
              section="HUB"
              fields={[
                { label: "Institution/Hub Name", type: "text", placeholder: "e.g., AUN Innovation Hub" },
                { label: "Focus Area", type: "text", placeholder: "e.g., AI & Digital Skills" },
                { label: "Achievement Details", type: "textarea", placeholder: "Describe the hub's milestones..." },
                { label: "Hub Photos", type: "file", multiple: true }
              ]}
            />
          </TabsContent>

          <TabsContent value="blog">
            <UploadSection 
              title="Blog & Latest News"
              description="Posts here update the Blog page and Homepage Latest Updates."
              icon={<Newspaper className="w-6 h-6" />}
              section="Blog Post"
              fields={[
                { label: "Headline", type: "text", placeholder: "e.g., GWDYF Empowers 500 Youth" },
                { label: "Short Excerpt", type: "text", placeholder: "Summary for card view..." },
                { label: "Full Article Content", type: "textarea", placeholder: "Write your article..." },
                { label: "Cover Image", type: "file", multiple: false }
              ]}
            />
          </TabsContent>

          <TabsContent value="games">
            <UploadSection 
              title="Financial Literacy Games"
              description="Posts here update the Games Section and Games Gallery."
              icon={<Gamepad2 className="w-6 h-6" />}
              section="Game Activity"
              fields={[
                { label: "Activity Title", type: "text", placeholder: "e.g., The Savings Challenge 2024" },
                { label: "Category", type: "text", placeholder: "e.g., School Games / Interactive Workshop" },
                { label: "Game Description", type: "textarea", placeholder: "Describe the activity..." },
                { label: "Activity Photos", type: "file", multiple: true }
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
