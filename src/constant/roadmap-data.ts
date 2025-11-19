// --- TYPE DEFINITION ---
export interface RoadmapStep {
  number: string;
  title: string;
  description: string;
  quote: string;
}

// --- DATA ---
// We include all 6 items. The 6th is our "empty" anchor.
export const roadmapData: RoadmapStep[] = [
  {
    number: "01-",
    title: "Discovery & Strategy",
    description:
      "We listen, question, probe. You tell us your pain, your ambition. We map goals, define KPIs, sketch the path.",
    quote: "A roadmap built around your business story",
  },
  {
    number: "02-",
    title: "Data & Architecture Design",
    description:
      "We build your foundation: data flows, secure infrastructure, scalable pipelines. No smoke. No mirrors.",
    quote: "The solid base your AI can grow on",
  },
  {
    number: "03-",
    title: "AI model & Development",
    description:
      "We experiment, build, and refine models until they mirror your real-world patterns.",
    quote: "A working, tested AI built for your challenge",
  },
  {
    number: "04-",
    title: "Deployment & Integration",
    description:
      'We embed intelligence into your stack. Systems talk. AI performs. Users don\'t think "AI;" they feel the impact.',
    quote: "A living system delivering measurable impact",
  },
  {
    number: "05-",
    title: "Ownership Transfer & Support",
    description:
      "We don't disappear. We train your people, hand over the keys, and stay nearby. You run it. You grow it.",
    quote: "Your AI. Your team. Your future.",
  },
];

// --- CONSTANTS FOR THE STICKY EFFECT ---
export const PANEL_HEADER_HEIGHT_PX = 120; // 120px
export const STICKY_TOP_OFFSET_PX = 20; // 20px
export const PANEL_SCROLL_PAST_HEIGHT = "60vh";
