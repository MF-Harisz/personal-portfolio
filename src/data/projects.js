export const projects = [
  {
    id: 1,
    slug: "vitalwell-healthcare",
    image: "/images/projects/project-1.png",
    images: [
      "/images/projects/project-1-detail-1.jpg",
      "/images/projects/project-1-detail-2.jpg",
      "/images/projects/project-1-detail-3.jpg",
    ],
    category: ["WEB", "BEST"],
    tech: "React · Tailwind · Framer Motion",
    liveUrl: "https://vitalwell-healthcare-demo.vercel.app",
    githubUrl: "https://github.com/MF-Harisz",
  },
  {
    id: 2,
    slug: "personal-portfolio",
    image: "/images/projects/project-2.png",
    images: [
      "/images/projects/detail/project-2-detail-1.png",
      "/images/projects/detail/project-2-detail-2.png",
    ],
    category: ["WEB", "BEST"],
    tech: "React · Vite · Tailwind · Framer Motion",
    liveUrl: "https://personal-portfolio-theta-nine-60.vercel.app/",
    githubUrl: "https://github.com/MF-Harisz/personal-portfolio",
  },
  {
    id: 3,
    slug: "fitquest-fitness-platform",
    image: "/images/projects/project-3.png",
    images: [
      "/images/projects/project-3-detail-1.jpg",
      "/images/projects/project-3-detail-2.jpg",
      "/images/projects/project-3-detail-3.jpg",
    ],
    category: ["WEB", "BEST"],
    tech: "React · Chart.js · API",
    liveUrl: "https://fitquest-fitness-demo.vercel.app",
    githubUrl: "https://github.com/MF-Harisz",
  },
  {
    id: 4,
    slug: "ecommerce-ui",
    image: "/images/projects/project-4.png",
    images: [
      "/images/projects/project-4-detail-1.jpg",
      "/images/projects/project-4-detail-2.jpg",
    ],
    category: ["UI/UX", "BEST"],
    tech: "Next.js · Stripe · UI/UX",
    liveUrl: "https://ecommerce-ui-demo.vercel.app",
    githubUrl: "https://github.com/MF-Harisz",
  },
  {
    id: 5,
    slug: "brand-identity",
    image: "/images/projects/project-5.png",
    images: [
      "/images/projects/project-5-detail-1.jpg",
      "/images/projects/project-5-detail-2.jpg",
      "/images/projects/project-5-detail-3.jpg",
    ],
    category: ["BRANDING", "BEST"],
    tech: "Branding · Figma · Design",
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 6,
    slug: "mobile-banking",
    image: "/images/projects/project-6.jpg",
    images: [
      "/images/projects/project-6-detail-1.jpg",
      "/images/projects/project-6-detail-2.jpg",
    ],
    category: ["UI/UX"],
    tech: "UI/UX · Figma · Prototype",
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 7,
    slug: "corporate-website",
    image: "/images/projects/project-7.jpg",
    images: [
      "/images/projects/project-7-detail-1.jpg",
      "/images/projects/project-7-detail-2.jpg",
    ],
    category: ["WEB"],
    tech: "HTML · Tailwind · GSAP",
    liveUrl: "https://corporate-redesign.vercel.app",
    githubUrl: "https://github.com/MF-Harisz",
  },
  {
    id: 8,
    slug: "startup-branding",
    image: "/images/projects/project-8.jpg",
    images: [
      "/images/projects/project-8-detail-1.jpg",
      "/images/projects/project-8-detail-2.jpg",
    ],
    category: ["BRANDING"],
    tech: "Branding · Logo · Visual System",
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 9,
    slug: "saas-landing-page",
    image: "/images/projects/project-9.jpg",
    images: [
      "/images/projects/project-9-detail-1.jpg",
      "/images/projects/project-9-detail-2.jpg",
      "/images/projects/project-9-detail-3.jpg",
    ],
    category: ["WEB"],
    tech: "React · Tailwind · Motion",
    liveUrl: "https://saas-landing-demo.vercel.app",
    githubUrl: "https://github.com/MF-Harisz",
  },
  {
    id: 10,
    slug: "design-system-ui",
    image: "/images/projects/project-10.jpg",
    images: [
      "/images/projects/project-10-detail-1.jpg",
      "/images/projects/project-10-detail-2.jpg",
    ],
    category: ["UI/UX"],
    tech: "UI/UX · Figma · Components",
    liveUrl: null,
    githubUrl: null,
  },
];

export const getProjectById = (id) => {
  return projects.find((project) => project.id === parseInt(id));
};

export const getRelatedProjects = (currentProject, limit = 3) => {
  if (!currentProject) return [];

  return projects
    .filter(
      (p) =>
        p.id !== currentProject.id &&
        p.category.some((cat) => currentProject.category.includes(cat)),
    )
    .slice(0, limit);
};

export default projects;
