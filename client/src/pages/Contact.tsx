import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@/lib/validation";
import type { InsertContactMessage } from "@shared/types";
import { useSubmitContact } from "@/hooks/use-content";
import { useToast } from "@/hooks/use-toast";
import { SectionHeader } from "@/components/SectionHeader";
import { MapPin, Phone, Mail, Loader2 } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertContactMessage) => {
    submitContact.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. We will get back to you shortly.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <SectionHeader 
          title="Get In Touch" 
          subtitle="Contact Us"
          description="Have questions about our programs? Want to partner with us? Send us a message and we'll respond as soon as possible."
        />

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Our Office</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      123 Foundation Way<br />
                      Youth Center Building<br />
                      City, Country
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Phone</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      +1 (234) 567-8900<br />
                      Mon-Fri, 9am - 5pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Email</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      info@gwdyf.org<br />
                      support@gwdyf.org
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-2xl h-64 w-full flex items-center justify-center text-gray-400 border border-gray-200">
              <span className="font-medium">Map Integration</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Full Name</label>
                    <input 
                      {...form.register("name")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="John Doe"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input 
                      {...form.register("email")}
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="john@example.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Phone Number (Optional)</label>
                    <input 
                      {...form.register("phone")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="+1 (234) 000-0000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Subject / Category</label>
                    <select 
                      {...form.register("subject")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                    >
                      <option value="">Select a category</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="Sponsor/Partner">Sponsor/Partner</option>
                      <option value="Student">Student</option>
                      <option value="Donor">Donor</option>
                      <option value="Other">Other</option>
                    </select>
                    {form.formState.errors.subject && (
                      <p className="text-red-500 text-xs">{form.formState.errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                  <textarea 
                    {...form.register("message")}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-500 text-xs">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={submitContact.isPending}
                  className="btn-primary w-full md:w-auto min-w-[160px]"
                >
                  {submitContact.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
