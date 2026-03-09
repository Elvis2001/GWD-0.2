import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "wouter";
import { ArrowRight, User, Calendar } from "lucide-react";
import { usePosts } from "@/hooks/use-content";

export default function Blog() {
  const { data: posts, isLoading } = usePosts();
  const blogPosts = (posts ?? []).filter((post) => post.category === "blog" || post.contentType === "post");

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <SectionHeader
          title="News & Blog"
          subtitle="Updates"
          description="Stay informed about our latest activities, partnerships, and educational resources."
        />

        {isLoading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : (
          <div className="max-w-4xl mx-auto space-y-12">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="aspect-[16/10] md:aspect-auto relative overflow-hidden">
                    <img
                      src={post.thumbnailImage || post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-primary" />
                        {post.author || "GWD Team"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Recent"}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 leading-tight">{post.title}</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>
                    <Link
                      href={`/details/blog/${post.id}`}
                      className="inline-flex items-center text-primary font-bold hover:gap-3 transition-all"
                    >
                      Read Full Story <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
            {blogPosts.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No published blog posts yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
