import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { clearAdminToken, getAdminToken, isAdminLoggedIn, setAdminToken } from "@/lib/admin-auth";

function getLoginErrorDescription(error: { code?: string; message?: string } | null): string {
  const normalizedCode = error?.code?.toLowerCase();
  const normalizedMessage = error?.message?.toLowerCase() ?? "";

  if (normalizedCode === "email_not_confirmed" || normalizedMessage.includes("email not confirmed")) {
    return "Your email is not confirmed yet. Check your inbox and confirm your account first.";
  }

  if (
    normalizedCode === "invalid_credentials" ||
    normalizedMessage.includes("invalid login credentials") ||
    normalizedMessage.includes("invalid email or password")
  ) {
    return "Invalid email or password for this Supabase project. Verify the account exists in Supabase Auth and try again.";
  }

  if (normalizedCode === "invalid_api_key" || normalizedMessage.includes("invalid api key")) {
    return "Supabase API key is invalid. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in client/.env.";
  }

  return error?.message || "Invalid email or password.";
}

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validateStoredToken = async () => {
      if (!isAdminLoggedIn()) return;
      const token = getAdminToken();
      if (!token) return;

      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data.user) {
        clearAdminToken();
        return;
      }

      setLocation("/admin/dashboard");
    };

    void validateStoredToken();
  }, [setLocation]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error || !data.session?.access_token) {
      toast({
        title: "Access Denied",
        description: getLoginErrorDescription(error),
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setAdminToken(data.session.access_token);
    toast({
      title: "Access Granted",
      description: "Welcome back, Admin.",
    });
    setLocation("/admin/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 text-primary mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-gray-900">Admin Login</h1>
          <p className="text-gray-500 mt-2">Grow With Data Youth Foundation</p>
        </div>

        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-center">Enter your credentials to manage the platform</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    type="email" 
                    placeholder="admin@gwd.com.ng" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-primary hover:bg-green-600 text-lg font-bold shadow-lg shadow-primary/20 transition-all group"
              >
                {loading ? "Signing In..." : "Sign In"}{" "}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>
        </Card>

      </motion.div>
    </div>
  );
}
