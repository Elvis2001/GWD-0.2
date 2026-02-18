import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { SiGoogle as GoogleIcon, SiFacebook as FacebookIcon } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        {/* Partners Section */}
        <div className="border-b border-gray-800 pb-12 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-secondary mb-1">Our Partners</h3>
              <p className="text-gray-400 text-sm">Working together for sustainable change</p>
            </div>
            <div className="flex items-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              <div className="flex items-center gap-2">
                <GoogleIcon className="w-8 h-8" />
                <span className="font-semibold text-xl">Google</span>
              </div>
              <div className="flex items-center gap-2">
                <FacebookIcon className="w-8 h-8" />
                <span className="font-semibold text-xl">Facebook</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              GWD<span className="text-secondary">YF</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering youth through financial literacy, leadership development, and digital skills for a sustainable future.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-secondary">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Who We Are</Link></li>
              <li><Link href="/programs/flic" className="text-gray-400 hover:text-white transition-colors">Our Programs</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Latest News</Link></li>
              <li><Link href="/get-involved" className="text-gray-400 hover:text-white transition-colors">Volunteer</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-secondary">Our Programs</h3>
            <ul className="space-y-3">
              <li><Link href="/programs/flic" className="text-gray-400 hover:text-white transition-colors">Financial Literacy Clubs</Link></li>
              <li><Link href="/programs/hubs" className="text-gray-400 hover:text-white transition-colors">HUBs (Higher Ed)</Link></li>
              <li><Link href="/programs/ai" className="text-gray-400 hover:text-white transition-colors">AI & Digital Skills</Link></li>
              <li><Link href="/programs/leadership" className="text-gray-400 hover:text-white transition-colors">Leadership Academy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-secondary">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">123 Foundation Way, Youth Center Building, City, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">info@gwdyf.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} GWD Youth Foundation. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
