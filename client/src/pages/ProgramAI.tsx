import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  Cpu, 
  Terminal, 
  Zap, 
  TrendingUp, 
  Lightbulb, 
  Code2, 
  ChevronLeft, 
  ChevronRight,
  BrainCircuit,
  Rocket
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function ProgramAI() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const programs = [
    {
      title: "Savings and Digital Financial Oppunities",
      description: "Intrroduction to effective saving strategies and how to leverage digital financial tools. We cover the basics of budgeting, saving, and using digital platforms for financial management.",
      icon: <BrainCircuit className="w-12 h-12" />,
      color: "bg-blue-50 text-blue-600",
      points: [
        "Smart Saving Techniques",
        "Digital Wallets & Mobile Banking",
        "Online Investment Platforms"
      ]
    },
    {
      title: "Prompt Engineering Mastery",
      description: "Learning the art of communicating with AI models. We teach students how to craft effective prompts to solve complex problems and boost productivity.",
      icon: <Terminal className="w-12 h-12" />,
      color: "bg-purple-50 text-purple-600",
      points: [
        "Structured Prompting Frameworks",
        "Iterative Refinement Techniques",
        "Multi-modal AI Interactions"
      ]
    },
    {
      title: "AI & Financial Literacy",
      description: "Using AI tools to enhance financial decision-making. Students learn to use AI for budgeting, investment analysis, and market research.",
      icon: <TrendingUp className="w-12 h-12" />,
      color: "bg-green-50 text-green-600",
      points: [
        "AI-Powered Personal Finance",
        "Data-Driven Investment Insights",
        "Automated Budgeting Assistants"
      ]
    },
    {
      title: "AI for Entrepreneurship",
      description: "Leveraging AI to start and scale businesses. From market analysis to content creation, we show how AI acts as a co-founder for young entrepreneurs.",
      icon: <Rocket className="w-12 h-12" />,
      color: "bg-amber-50 text-amber-600",
      points: [
        "AI-Driven Market Research",
        "Content & Marketing Automation",
        "Operational Efficiency with AI"
      ]
    }
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <SectionHeader 
          title="Digital Financial Literacy Resources" 
          subtitle="Future Skills" 
          description="Preparing Nigerian youth for the AI revolution with practical skills in prompt engineering and artificial intelligence thereby aiding financial literacy."
        />

        {/* Sliding Cards Container */}
        <div className="relative group mb-20">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {programs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] snap-center bg-white p-10 rounded-[2rem] shadow-xl border border-gray-50 flex flex-col h-full"
              >
                <div className={`w-20 h-20 rounded-3xl ${item.color} flex items-center justify-center mb-8 shrink-0`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                  {item.description}
                </p>
                <div className="space-y-3 pt-6 border-t border-gray-50">
                  {item.points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full shadow-lg bg-white h-12 w-12 border-gray-100"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full shadow-lg bg-white h-12 w-12 border-gray-100"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Integration with Finance Section */}
        <div className="bg-gray-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary rounded-full blur-[160px]" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Bridging AI and Financial Literacy</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We believe that modern financial literacy is incomplete without AI skills. Our program integrates AI literacy with our core financial curriculum to give youth a competitive edge.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-primary mb-2">Automated Savings</h4>
                  <p className="text-sm text-gray-400">Using AI to optimize saving habits.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-secondary mb-2">Smart Investing</h4>
                  <p className="text-sm text-gray-400">AI-driven market analysis for beginners.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Creative Problem Solving</h3>
                  <p className="text-gray-400">AI doesn't just calculate; it helps youth think outside the box when facing financial challenges.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Technical Empowerment</h3>
                  <p className="text-gray-400">Nigerian youth aren't just consumers of AI; they're becoming creators and engineers of the future.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}