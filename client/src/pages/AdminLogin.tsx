import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

/**
 * ADMIN AUTHENTICATION LOGIC (LOCALSTORAGE & CONTEXT SUGGESTION)
 * 
 * 1. REAL IMPLEMENTATION:
 *    - Use a dedicated AuthContext to wrap the application (or at least /admin routes).
 *    - On Login: Call backend API `/api/admin/login`, receive a JWT token.
 *    - Store JWT in an HttpOnly cookie (most secure) or Secure LocalStorage.
 *    - Redirect to `/admin/dashboard`.
 * 
 * 2. ROUTE PROTECTION:
 *    - Create a ProtectedRoute component that checks for the presence of a valid session/token.
 *    - If no session, redirect to `/admin/login`.
 * 
 * 3. CURRENT DUMMY LOGIC:
 *    - Checks LocalStorage for 'gwd_admin_auth' key.
 *    - Validates against hardcoded: admin@gwd.com.ng / admin123.
 */

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("gwd_admin_auth");
    if (auth === "true") {
      setLocation("/admin/dashboard");
    }
  }, [setLocation]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "admin@gwd.com.ng" && password === "admin123") {
      localStorage.setItem("gwd_admin_auth", "true");
      toast({
        title: "Access Granted",
        description: "Welcome back, Admin.",
      });
      setLocation("/admin/dashboard");
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4">
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
                className="w-full h-14 rounded-2xl bg-primary hover:bg-green-600 text-lg font-bold shadow-lg shadow-primary/20 transition-all group"
              >
                Sign In <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
