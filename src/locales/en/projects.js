const projects = {
  // Section project (UI TEXT)
  projectTitle: "WHAT I'VE BUILT?",
  projectDesc:
    "From conceptualizing intuitive UI/UX to deploying robust backend systems each project reflects problem-solving skills and craftsmanship.",
  emptyMessage: "Work in progress. Stay tuned!",

  // Filter tabs
  tabs: {
    BEST: "BEST",
    WEB: "WEB",
    UI_UX: "UI/UX",
    BRANDING: "BRANDING",
    ILLUSTRATION: "ILLUSTRATION",
  },

  // Project Detail Labels
  keyFeature: "Key Feature",
  theChallenge: "The Challenge",
  challenge: "Challenge",
  solution: "Solution",
  tech: "Technology",
  forClient: "Client",
  start: "Duration",
  finish: "Completed",
  role: "Role",
  simProject: "Similar Projects",

  // PROJECT CONTENT
  items: {
    "vitalwell-healthcare": {
      title: "VitalWell Health Platform",
      desc: "A comprehensive landing page for a digital health assistant and medical care finder.",
      fullDescription:
        "A clean and professional landing page for VitalWell, a platform designed to guide users toward a healthier life by connecting them with primary care, mental health services, and medical specialists. The design prioritizes trust, accessibility, and streamlined navigation for patients.",
      challenge:
        "Organizing complex medical service categories into a user-friendly interface that feels calming and trustworthy for users seeking healthcare assistance.",
      solution:
        "Implemented a card-based layout for service categories, used a soothing blue color palette to evoke professional trust, and integrated clear Call-to-Action (CTA) buttons for seamless user onboarding.",
      role: "UI/UX Designer & Frontend Developer",
      duration: "1.5 months",
      completedDate: "March 2024",
      client: "VitalWell Health Group",
      features: [
        "Integrated navigation (Home, Find Care, Articles, Community)",
        "Service categorization (Primary Care, Mental Health, Urgent Care, Specialists)",
        "Mission-driven 'About Us' section with custom imagery",
        "Responsive 'Find Care' search section",
        "Sign-up and Learn More CTA integration",
      ],
    },

    "personal-portfolio": {
      title: "Professional Portfolio",
      desc: "A personal portfolio website for a Full-Stack Developer & Graphic Designer.",
      fullDescription:
        "A modern portfolio platform showcasing expertise in both web development and graphic design. The site is engineered with a clean aesthetic approach, intuitive navigation, and high performance, leveraging the latest React ecosystem.",
      challenge:
        "Integrating two distinct professional identities (Developer and Designer) into a cohesive interface without confusing the target audience.",
      solution:
        "Utilized a dynamic grid-based layout, strong typography for personal branding, and smooth motion effects using the Motion library to enhance the overall user experience (UX).",
      role: "Full-Stack Developer & Designer",
      duration: "3 months",
      completedDate: "March 2024",
      client: "Personal Project",
      features: [
        "Hero section with custom digital watercolor illustration",
        "Project category filtering (Web, UI/UX, Design)",
        "Professional statistics (4+ years experience, 200+ successful projects)",
        "Accordion-style service menu (Web Dev, Branding, Illustration)",
        "Integrated contact form powered by EmailJS",
        "Fully responsive design optimized for all screen sizes",
      ],
    },

    "fitquest-fitness-platform": {
      title: "FitQuest - Fitness Challenge Landing Page",
      desc: "A dynamic dark-themed landing page for a gamified fitness community.",
      fullDescription:
        "FitQuest is a modern web platform designed to motivate users through fitness challenges and community engagement. The design features a bold high-contrast aesthetic, leaderboard tracking, and categorized workout challenges to create an immersive fitness journey.",
      challenge:
        "Creating a high-energy visual experience that balances large, inspiring imagery with functional data elements like leaderboards and interactive accordions.",
      solution:
        "Utilized a sophisticated dark theme with vibrant orange accents to drive action, implemented an organized grid for challenge categories, and designed a clear leaderboard UI to foster healthy competition.",
      role: "Lead UI/UX Designer & Web Developer",
      duration: "1 month",
      completedDate: "April 2024",
      client: "FitQuest Startup",
      features: [
        "Gamified challenge system (Running, Yoga, Cardio, Strength)",
        "Interactive 'About Us' section with accordion details",
        "Live community leaderboard and progress tracking",
        "Social media integration and community events section",
        "Responsive contact form with a 'Send Us a Message' CTA",
      ],
    },

    "ecommerce-ui": {
      title: "E-Commerce UI Concept",
      desc: "Clean product showcase with conversion focus.",
      fullDescription:
        "A modern e-commerce interface focused on conversion optimization and seamless shopping experience. Features intuitive product browsing and streamlined checkout flow.",
      challenge:
        "Designing an intuitive shopping flow that reduces cart abandonment and improves user experience while maintaining visual appeal.",
      solution:
        "Created streamlined checkout process with progress indicators, implemented visual feedback for cart actions, and optimized product discovery with smart filtering and quick view modals.",
      role: "UI/UX Designer",
      duration: "2 months",
      completedDate: "December 2023",
      client: "Fashion Retailer",
      features: [
        "Product quick view modal",
        "Shopping cart sidebar",
        "Checkout progress indicator",
        "Related products recommendations",
      ],
    },

    "brand-identity": {
      title: "Brand Identity System",
      desc: "Visual identity for creative startup.",
      fullDescription:
        "Complete brand identity system for a creative startup, including logo design, color palette, typography, and comprehensive brand guidelines for consistent application across all media.",
      challenge:
        "Creating a versatile brand identity that works across digital and print media while staying true to the company's innovative vision and appeal to their target audience.",
      solution:
        "Developed a modular design system with flexible components, extensive guidelines documentation, and multiple logo variations for different use cases and backgrounds.",
      role: "Brand Designer",
      duration: "1.5 months",
      completedDate: "November 2023",
      client: "Creative Startup",
      features: [
        "Primary and secondary logos",
        "Color palette with accessibility guidelines",
        "Typography system with web fonts",
        "Brand guidelines PDF",
      ],
    },

    "mobile-banking": {
      title: "Mobile Banking App UI",
      desc: "User-friendly fintech mobile interface.",
      fullDescription:
        "A mobile banking app design focused on simplicity, security, and ease of use for everyday banking tasks. Designed for both iOS and Android platforms.",
      challenge:
        "Designing a secure yet user-friendly interface that builds trust and simplifies complex financial transactions for users of all technical levels.",
      solution:
        "Used familiar banking patterns with clear visual hierarchy, progressive disclosure to show relevant information, and biometric authentication for security.",
      role: "UI/UX Designer",
      duration: "2 months",
      completedDate: "October 2023",
      client: "Fintech Startup",
      features: [
        "Account balance overview",
        "Transaction history with filters",
        "Money transfer flow",
        "Biometric authentication",
      ],
    },

    "corporate-website": {
      title: "Corporate Website Redesign",
      desc: "Modern redesign for corporate profile.",
      fullDescription:
        "A complete redesign of a corporate website with focus on modern aesthetics, improved user engagement, and better information architecture for a financial services company.",
      challenge:
        "Modernizing an outdated corporate image while maintaining professionalism, credibility, and meeting strict financial industry compliance requirements.",
      solution:
        "Implemented clean, modern layouts with subtle GSAP animations for scroll-triggered effects, maintaining professional tone while improving engagement metrics.",
      role: "Frontend Developer",
      duration: "1.5 months",
      completedDate: "September 2023",
      client: "Financial Services",
      features: [
        "Animated hero section",
        "Team member carousel",
        "Interactive company timeline",
        "News and insights section",
      ],
    },

    "startup-branding": {
      title: "Startup Pitch Branding",
      desc: "Brand assets for early-stage startup.",
      fullDescription:
        "Complete branding package for a tech startup preparing for their seed funding round, including logo design, pitch deck, and investor presentation materials.",
      challenge:
        "Creating a memorable brand identity that communicates innovation and reliability to potential investors while standing out in a competitive market.",
      solution:
        "Developed a clean, tech-forward visual identity with a strong logo system, professional pitch deck design, and comprehensive investor materials.",
      role: "Brand Designer",
      duration: "1 month",
      completedDate: "August 2023",
      client: "Tech Startup",
      features: [
        "Logo and wordmark variations",
        "Pitch deck template",
        "Business card design",
        "Social media assets",
      ],
    },

    "saas-landing-page": {
      title: "SaaS Landing Page",
      desc: "High-conversion landing page for SaaS product.",
      fullDescription:
        "A high-conversion landing page designed to showcase SaaS product features, build trust with social proof, and drive user sign-ups through strategic calls-to-action.",
      challenge:
        "Communicating complex product features simply and effectively while maintaining high conversion rates and reducing bounce rates.",
      solution:
        "Used benefit-focused copywriting, feature highlights with visual examples, social proof sections, and strategic CTA placement throughout the page.",
      role: "Frontend Developer & Designer",
      duration: "3 weeks",
      completedDate: "July 2023",
      client: "SaaS Company",
      features: [
        "Pricing comparison table",
        "Feature showcase grid",
        "Testimonial carousel",
        "FAQ accordion section",
      ],
    },

    "design-system-ui": {
      title: "Design System UI Kit",
      desc: "Scalable UI kit for product teams.",
      fullDescription:
        "A comprehensive UI kit with reusable components, design tokens, and detailed documentation for product teams to maintain consistency across multiple applications.",
      challenge:
        "Creating a flexible design system that scales across multiple products, maintains consistency, and is easy for other designers and developers to use.",
      solution:
        "Built atomic design structure with component variants, auto-layout components, and detailed documentation in Figma with design tokens and usage guidelines.",
      role: "UI/UX Designer",
      duration: "3 months",
      completedDate: "June 2023",
      client: "Product Team",
      features: [
        "Color and typography tokens",
        "Component library with variants",
        "Complete icon set",
        "Usage guidelines documentation",
      ],
    },
  },
};

export default projects;
