import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "wouter";

// Scroll to top component
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import ProgramFLiC from "@/pages/ProgramFLiC";
import ProgramHUBs from "@/pages/ProgramHUBs";
import ProgramAI from "@/pages/ProgramAI";
import Gallery from "@/pages/Gallery";
import Blog from "@/pages/Blog";
import GetInvolved from "@/pages/GetInvolved";
import Donate from "@/pages/Donate";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/pages/AdminDashboard";
import DetailedView from "@/pages/DetailedView";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/programs/flic" component={ProgramFLiC} />
          <Route path="/programs/hubs" component={ProgramHUBs} />
          <Route path="/programs/ai" component={ProgramAI} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/blog" component={Blog} />
          <Route path="/get-involved" component={GetInvolved} />
          <Route path="/donate" component={Donate} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/details/:type/:id" component={DetailedView} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
