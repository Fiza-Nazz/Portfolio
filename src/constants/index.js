
import {
  logo,
  backend,
  creator,
  mobile,
  web,
  github,
  menu,
  close,
  css,
  gearXpert,
  project2,
  project3,
  mysql,
  express,
  aws,
  mui,
  
  gsap,
  framer,
  figma,
  git,
  html,
  javascript,
  mongodb,
  nodejs,
  reactjs,
  redux,
  tailwind,
  threejs,
  firstTestimonial,
  secondTestimonial,
  thirdTestimonial,
} from '../assets'


// Import Tekisky separately
import tekisky from "../assets/company/tekisky.png";


export const navLinks = [


  {
    id: "about",
    title: "About",
    
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Agentic AI Engineer",
    icon: web,
  },
  {
    title: "Full Stack Developer",
    icon: mobile,
  },
  {
    title: "AI Developer",
    icon: backend,
  },
  {
    title: "Business Analyst",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Next.js",
    icon: reactjs,
  },
  {
    name: "Python",
    icon: nodejs,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Material Ui",
    icon: mui,
  },
  {
    name: "Express Js",
    icon: express,
  },
  {
    name: "AWS",
    icon: aws,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "MySql",
    icon: mysql,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "gsap",
    icon: gsap,
  },
  {
    name: "framer",
    icon: framer,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "figma",
    icon: figma,
  },
];

const experiences = [
  {
    title: "Freelance AI & Web Developer",
    company_name: "Upwork",
    icon: creator,
    iconBg: "#E6DEDD",
    date: "Sep 2023 - Present",
    points: [
      "Delivered 15+ AI-powered projects for international clients specializing in Generative AI and Agentic AI solutions.",
      "Built custom AI agents, RAG systems, and workflow automation using OpenAI APIs, n8n, and modern AI tools.",
      "Developed web applications with React, Next.js, and Python integrating advanced AI capabilities.",
      "Maintained 5-star rating with 100% client satisfaction through quality delivery and technical expertise.",
    ],
  },
  {
    title: "AI Agent Developer",
    company_name: "Boulder SEO Marketing",
    icon: web,
    iconBg: "#383E56",
    date: "April 2025 - August 2025",
    points: [
      "Developed advanced SEO-driven AI Agents for marketing automation using OpenAI Agent SDK.",
      "Built custom agent workflows with prompt chaining, SERP data ingestion, and brand-specific RAG integration.",
      "Collaborated with content strategists to deploy AI tools that increased SEO content velocity and ranking performance.",
    ],
  },
  {
    title: "AI Engineer",
    company_name: "SmythOS",
    icon: mobile,
    iconBg: "#E6DEDD",
    date: "May 2024 - Aug 2024",
    points: [
      "Engineered AI-powered applications using cutting-edge Generative AI models.",
      "Worked on AI Agents, Prompt Engineering, and Artificial General Intelligence (AGI) systems.",
    ],
  },
  {
    title: "Frontend Developer (Intern)",
    company_name: "Interns Pakistan",
    icon: backend,
    iconBg: "#383E56",
    date: "Nov 2023 - Oct 2024",
    points: [
      "Developed and optimized frontend architectures using React, Next.js, and TypeScript.",
      "Built scalable and efficient user-facing applications with cross-functional teams.",
    ],
  },
  {
    title: "Senior Student – Generative AI, Web3 & Metaverse",
    company_name: "Governor Sindh Initiative",
    icon: creator,
    iconBg: "#E6DEDD",
    date: "Mar 2024 - Sep 2024",
    points: [
      "Developed AI-driven solutions integrated with Web3 technologies.",
      "Hands-on experience in Robotics, AGI, and Generative AI systems.",
    ],
  },
  {
    title: "Student Leader – Generative AI, Web3 & Metaverse",
    company_name: "Governor Sindh Initiative",
    icon: web,
    iconBg: "#383E56",
    date: "Oct 2024 - Present",
    points: [
      "Led student teams in Generative AI & Agentic AI projects.",
      "Facilitated peer learning and technical execution of projects.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Fatima proved me wrong.",
    name: "MD Mustaqeem",
    designation: "Ecommerce",
    company: "QuickMart",
    image: firstTestimonial,
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Fatima does.",
    name: "Abdul Raheman",
    designation: "Ecommerce Business",
    company: "justbuyz",
    image: secondTestimonial,
  },
  {
    testimonial:
      "After Fatima optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "James Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: thirdTestimonial,
  },
];

const projects = [
  {
    name: "E‑Commerce Responsive",
    description:
      "A responsive e‑commerce UI showcasing product listings, categories, and modern shopping interactions.",
    tags: [
      { name: "html/css", color: "blue-text-gradient" },
      { name: "responsive", color: "white-text-gradient" },
      { name: "ui/ux", color: "pink-text-gradient" },
    ],
    image: project2,
    source_code_link: "https://github.com/FatimaNazeer777/E-Commerce-Responsive",
    live_demo_link: "https://e-commerce-responsive.vercel.app/",
  },
  {
    name: "AI Human Attribute Analyzer",
    description:
      "A Streamlit app that uses AI to analyze human facial attributes from uploaded images.",
    tags: [
      { name: "python", color: "green-text-gradient" },
      { name: "streamlit", color: "blue-text-gradient" },
      { name: "computer-vision", color: "pink-text-gradient" },
    ],
    image: gearXpert,
    source_code_link: "https://github.com/FatimaNazeer777/AI-Human-Attribute-Analyzer",
    live_demo_link: "https://ai-human-attribute-analyzer-7.streamlit.app/",
  },
  {
    name: "RistaGPT",
    description:
      "An AI chatbot app built with Streamlit that answers queries conversationally using GPT.",
    tags: [
      { name: "python", color: "green-text-gradient" },
      { name: "streamlit", color: "blue-text-gradient" },
      { name: "generative-ai", color: "pink-text-gradient" },
    ],
    image: project3,
    source_code_link: "https://github.com/FatimaNazeer777/RistaGPT",
    live_demo_link: "https://ristagpt-l7sg4fpe9ds2y3p2geecgt.streamlit.app/",
  },
];

export { services, technologies, experiences, testimonials, projects };
