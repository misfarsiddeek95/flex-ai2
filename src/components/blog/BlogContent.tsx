"use client";

import React from "react";
import { motion } from "framer-motion";
import RichTextRenderer from "./RichTextRenderer";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <section className="bg-[#F5F5F7] py-8 md:py-12 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto max-w-[800px]"
      >
        <RichTextRenderer htmlContent={content} enableMediaProcessing={false} />
      </motion.div>
    </section>
  );
}
