import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Programs submenu items
const programs = [
  { title: "Financial Literacy Clubs (FLiC)", href: "/programs/flic" },
  { title: "HUBs (Higher Institutions)", href: "/programs/hubs" },
  { title: "AI & Prompt Engineering", href: "/programs/ai" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [programsOpen, setProgramsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setProgramsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-black/40 backdrop-blur-md py-5"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className={cn(
            "font-bold text-2xl tracking-tighter transition-colors",
            scrolled ? "text-primary" : "text-white"
          )}>
            GWD<span className="text-secondary">YF</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className={cn(
            "text-sm font-semibold hover:text-secondary transition-colors relative py-1",
            scrolled ? "text-gray-800" : "text-white/90",
            location === "/" && "text-secondary"
          )}>
            Home
            {location === "/" && (
              <motion.div 
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
              />
            )}
          </Link>
          
          <Link href="/about" className={cn(
            "text-sm font-semibold hover:text-secondary transition-colors relative py-1",
            scrolled ? "text-gray-800" : "text-white/90",
            location === "/about" && "text-secondary"
          )}>
            Who We Are
            {location === "/about" && (
              <motion.div 
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
              />
            )}
          </Link>

          {/* Programs Dropdown */}
          <div className="relative group">
            <button className={cn(
              "flex items-center gap-1 text-sm font-semibold hover:text-secondary transition-colors group-hover:text-secondary relative py-1",
              scrolled ? "text-gray-800" : "text-white/90",
              location.startsWith("/programs") && "text-secondary"
            )}>
              Our Programs <ChevronDown className="w-4 h-4" />
              {location.startsWith("/programs") && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                />
              )}
            </button>
            <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-white rounded-xl shadow-xl p-2 border border-gray-100 overflow-hidden">
                {programs.map((prog) => (
                  <Link key={prog.href} href={prog.href} className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    location === prog.href ? "bg-green-50 text-primary" : "text-gray-700 hover:bg-green-50 hover:text-primary"
                  )}>
                    {prog.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/gallery" className={cn(
            "text-sm font-semibold hover:text-secondary transition-colors relative py-1",
            scrolled ? "text-gray-800" : "text-white/90",
            location === "/gallery" && "text-secondary"
          )}>
            Gallery
            {location === "/gallery" && (
              <motion.div 
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
              />
            )}
          </Link>

          <Link href="/blog" className={cn(
            "text-sm font-semibold hover:text-secondary transition-colors relative py-1",
            scrolled ? "text-gray-800" : "text-white/90",
            location === "/blog" && "text-secondary"
          )}>
            News & Blog
            {location === "/blog" && (
              <motion.div 
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
              />
            )}
          </Link>

          <Link href="/contact" className={cn(
            "text-sm font-semibold hover:text-secondary transition-colors relative py-1",
            scrolled ? "text-gray-800" : "text-white/90",
            location === "/contact" && "text-secondary"
          )}>
            Contact
            {location === "/contact" && (
              <motion.div 
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
              />
            )}
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link href="/get-involved" className={cn(
            "px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-lg",
            scrolled 
              ? "bg-primary text-white hover:bg-primary/90 hover:shadow-primary/30" 
              : "bg-white text-primary hover:bg-gray-100"
          )}>
            Get Involved
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "lg:hidden p-2 rounded-md z-50 relative",
            scrolled ? "text-gray-800" : "text-white"
          )}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-40 lg:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 text-lg font-semibold text-gray-800">
              <Link href="/" className="py-2 border-b border-gray-100">Home</Link>
              <Link href="/about" className="py-2 border-b border-gray-100">Who We Are</Link>
              
              <div className="py-2 border-b border-gray-100">
                <button 
                  onClick={() => setProgramsOpen(!programsOpen)}
                  className="flex items-center justify-between w-full"
                >
                  Our Programs
                  <ChevronDown className={cn("w-5 h-5 transition-transform", programsOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {programsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 mt-2 flex flex-col gap-3 text-base font-normal text-gray-600"
                    >
                      {programs.map((prog) => (
                        <Link key={prog.href} href={prog.href} className="py-1 hover:text-primary">
                          {prog.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/gallery" className="py-2 border-b border-gray-100">Gallery</Link>
              <Link href="/blog" className="py-2 border-b border-gray-100">News & Blog</Link>
              <Link href="/contact" className="py-2 border-b border-gray-100">Contact</Link>
              
              <Link href="/get-involved" className="mt-4 w-full bg-primary text-white text-center py-4 rounded-xl shadow-lg shadow-primary/30">
                Get Involved
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
