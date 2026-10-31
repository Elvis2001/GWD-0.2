import { Link } from "wouter";
import { SectionHeader } from "@/components/SectionHeader";

export default function ProgramFutureFounders() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom text-center">
        <SectionHeader
          title="Future Founder's Acceleration and Innovation"
          subtitle="Coming Soon"
          description="Data-driven solutions for greater impact."
        />
        <Link href="/contact" className="btn-primary text-lg px-10">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
