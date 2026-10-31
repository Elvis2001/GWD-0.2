import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import type { Post } from "@shared/types";

export function ProgramPostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1 }}
      className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 flex flex-col"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={post.thumbnailImage || post.coverImage || "/gwd-logo.png"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-3">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Recent"}
        </div>
        <h3 className="text-xl font-bold mb-3">{post.title}</h3>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
        <Link
          href={`/details/${post.category}/${post.id}`}
          className="mt-auto inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
        >
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
