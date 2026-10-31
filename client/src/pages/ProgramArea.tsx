import { SectionHeader } from "@/components/SectionHeader";
import { ProgramPostCard } from "@/components/ProgramPostCard";
import { usePosts } from "@/hooks/use-content";
import { PROGRAM_AREAS, type ProgramArea as ProgramAreaValue } from "@/lib/program-areas";

export default function ProgramArea({ area }: { area: ProgramAreaValue }) {
  const { data: posts, isLoading } = usePosts();
  const program = PROGRAM_AREAS.find((entry) => entry.value === area)!;
  const areaPosts = (posts ?? []).filter((post) => post.programArea === area);

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <SectionHeader title={program.title} subtitle="Our Programs" description={program.tagline} />
        <div className="grid md:grid-cols-3 gap-8">
          {areaPosts.map((post, i) => (
            <ProgramPostCard key={post.id} post={post} index={i} />
          ))}
          {!isLoading && areaPosts.length === 0 && (
            <p className="col-span-3 text-center text-muted-foreground py-12">
              No posts have been published yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
