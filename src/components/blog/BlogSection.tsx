import React from "react";
import DisplayCard from "../ui/DisplayCard";
import { getAllBlogPosts } from "@/lib/blog";

export default function BlogSection() {
  // Get all blog posts from the data utility
  const blogPosts = getAllBlogPosts();

  return (
    <section className="bg-[#F5F5F7] py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {blogPosts.map((post) => (
            <DisplayCard
              key={post.slug}
              title={post.title}
              author={post.author}
              readTime={post.readTime}
              imageUrl={post.imageUrl}
              href={`/blog/${post.slug}`}
              tags={post.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
