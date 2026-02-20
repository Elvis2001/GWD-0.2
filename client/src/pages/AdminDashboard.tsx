import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  Image as ImageIcon, 
  Plus, 
  Newspaper, 
  GraduationCap, 
  School, 
  Trophy,
  Upload,
  LayoutDashboard,
  Save,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("gallery");

  const handleUpload = (section: string) => {
    toast({
      title: "Success",
      description: `New ${section} entry added successfully (Dummy Data)`,
      variant: "default",
    });
  };

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
                <Textarea placeholder={field.placeholder} className="rounded-2xl border-gray-200 focus:ring-primary h-32" />
              ) : field.type === "file" ? (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload image</p>
                    </div>
                    <input type="file" className="hidden" multiple={field.multiple} />
                  </label>
                </div>
              ) : (
                <Input type={field.type} placeholder={field.placeholder} className="rounded-2xl border-gray-200 focus:ring-primary h-12" />
              )}
            </div>
          ))}
        </div>
        <Button 
          onClick={() => handleUpload(section)}
          className="w-full h-14 rounded-2xl bg-primary hover:bg-green-600 text-lg font-bold shadow-lg shadow-primary/20 transition-all"
        >
          <Save className="mr-2 w-5 h-5" /> Publish to Website
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
            <p className="text-gray-500 mt-2 font-medium">Manage and update your website content seamlessly.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-bold">System Online</div>
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
        </div>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="bg-white p-1 rounded-2xl shadow-sm border border-gray-100 mb-12 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="gallery" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">
              <ImageIcon className="w-4 h-4 mr-2" /> Gallery
            </TabsTrigger>
            <TabsTrigger value="stories" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">
              <Trophy className="w-4 h-4 mr-2" /> Success Stories
            </TabsTrigger>
            <TabsTrigger value="hubs" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">
              <School className="w-4 h-4 mr-2" /> HUBs
            </TabsTrigger>
            <TabsTrigger value="flic" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">
              <GraduationCap className="w-4 h-4 mr-2" /> FLiC
            </TabsTrigger>
            <TabsTrigger value="blog" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">
              <Newspaper className="w-4 h-4 mr-2" /> Blog & News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <UploadSection 
              title="Gallery Management"
              description="Upload moments to FLiC, Tech Bootcamp, or Financial Games."
              icon={<ImageIcon className="w-6 h-6" />}
              section="Gallery"
              fields={[
                { label: "Title", type: "text", placeholder: "e.g., Yola FLiC Club Launch" },
                { label: "Category", type: "text", placeholder: "FLiC / Tech Bootcamp / Games" },
                { label: "Upload Images", type: "file", multiple: true }
              ]}
            />
          </TabsContent>

          <TabsContent value="stories">
            <UploadSection 
              title="Success Stories"
              description="Capture achievements of specific schools and students."
              icon={<Trophy className="w-6 h-6" />}
              section="Success Story"
              fields={[
                { label: "School Name", type: "text", placeholder: "e.g., Government Day Secondary School" },
                { label: "Achievement Title", type: "text", placeholder: "e.g., 90% Financial Literacy Score" },
                { label: "Story Details", type: "textarea", placeholder: "Write the full story here..." },
                { label: "Impact Photos", type: "file", multiple: true }
              ]}
            />
          </TabsContent>

          <TabsContent value="hubs">
            <UploadSection 
              title="Higher Institution HUBs"
              description="Update school-specific HUB content and images."
              icon={<School className="w-6 h-6" />}
              section="HUB"
              fields={[
                { label: "Institution Name", type: "text", placeholder: "e.g., American University of Nigeria" },
                { label: "HUB Focus Area", type: "text", placeholder: "e.g., Fintech & Social Innovation" },
                { label: "Detailed Description", type: "textarea", placeholder: "Describe the hub's activities..." },
                { label: "Institution Photos", type: "file", multiple: true }
              ]}
            />
          </TabsContent>

          <TabsContent value="flic">
            <UploadSection 
              title="FLiC Program Updates"
              description="Add new school locations or program milestones."
              icon={<GraduationCap className="w-6 h-6" />}
              section="FLiC"
              fields={[
                { label: "Location/School", type: "text", placeholder: "e.g., Jimeta Secondary School" },
                { label: "Student Count", type: "number", placeholder: "e.g., 150" },
                { label: "Program Milestone", type: "text", placeholder: "e.g., Semester 1 Completion" },
                { label: "Location Images", type: "file", multiple: true }
              ]}
            />
          </TabsContent>

          <TabsContent value="blog">
            <UploadSection 
              title="Blog & News"
              description="Publish latest news, images, and articles."
              icon={<Newspaper className="w-6 h-6" />}
              section="Blog Post"
              fields={[
                { label: "Headline", type: "text", placeholder: "e.g., Empowering 500 Girls in Tech" },
                { label: "Excerpt", type: "text", placeholder: "Brief summary for the card view..." },
                { label: "Full Content", type: "textarea", placeholder: "Write your article..." },
                { label: "Cover Image", type: "file", multiple: false }
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
