// Sajal Kesharwani - Personal Portfolio Single Page Application
const { useState, useEffect, useRef, useMemo } = React;

// Lucide Icon Helper Component for dynamic rendering
const Icon = ({ name, size = 18, className = "" }) => {
  const iconRef = useRef(null);

  useEffect(() => {
    if (window.lucide && iconRef.current) {
      window.lucide.createIcons({
        attrs: {
          class: `lucide lucide-${name} ${className}`,
          width: size,
          height: size,
          strokeWidth: 1.75
        }
      });
    }
  }, [name, size, className]);

  return <i ref={iconRef} data-lucide={name} className={`inline-flex items-center justify-center ${className}`}></i>;
};

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedType, setCopiedType] = useState(null);

  // Typewriter text cycling in hero
  const typewriterPhrases = useMemo(() => [
    "2nd-Year B.Tech CSE Student @ Lovely Professional University (CGPA 8.2).",
    "Aspiring Software Engineer building scalable full-stack web platforms.",
    "Passionate about full-stack engineering, APIs & clean UI design.",
    "GCP & AWS Certified Machine Learning Engineer."
  ], []);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    const fullText = typewriterPhrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 30 : 60;
    const pauseDelay = isDeleting ? 200 : 2500;

    let timer;

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseDelay);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, typewriterPhrases]);

  // ScrollSpy to highlight active section in navbar
  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "achievements", "education", "contact"];

    const handleScroll = () => {
      const scrollY = window.scrollY + 200;

      if (window.scrollY < 200) {
        setActiveSection("hero");
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollY >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize Lucide icons on DOM update
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [activeSection, mobileMenuOpen, toastMessage]);

  // Copy to clipboard helper
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(label);
      setToastMessage(`Copied ${label} to clipboard!`);
      setTimeout(() => {
        setToastMessage(null);
        setCopiedType(null);
      }, 3000);
    });
  };

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Credentials", href: "#achievements", id: "achievements" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Contact", href: "#contact", id: "contact" }
  ];

  const skillCategories = [
    {
      title: "Languages",
      icon: "code",
      skills: ["Python", "C++", "C", "JavaScript", "HTML5/CSS3"]
    },
    {
      title: "Frameworks & Libraries",
      icon: "layers",
      skills: ["React.js", "Next.js", "Tailwind CSS", "Flutter", "Node.js"]
    },
    {
      title: "Databases & Storage",
      icon: "database",
      skills: ["PostgreSQL", "MongoDB", "Supabase DB", "Redis"]
    },
    {
      title: "Cloud & DevOps",
      icon: "cloud",
      skills: ["Docker", "Kubernetes", "Git & GitHub", "CI/CD Pipelines", "Linux"]
    },
    {
      title: "Tools & Integrations",
      icon: "tool",
      skills: ["Supabase Auth & RLS", "Razorpay Payment Gateway", "Vercel", "Netlify", "Postman"]
    },
    {
      title: "Core Competencies",
      icon: "zap",
      skills: ["Full-Stack Learning", "System Design Basics", "Problem Solving", "Team Leadership", "Fast Adaptation"]
    }
  ];

  const projects = [
    {
      id: "workbridge",
      title: "WorkBridge",
      subtitle: "Freelance Marketplace Platform",
      dates: "April 2026 – Present",
      liveUrl: "https://workbrdge.netlify.app/",
      githubUrl: "https://github.com/SajalKesharwani",
      badge: "Full-Stack Project",
      summary: "Full-stack dual-sided freelance marketplace connecting clients with vetted talent, featuring end-to-end job posting, proposal bidding, milestone collaboration, escrow transactions, and real-time messaging.",
      highlights: [
        "Architected dual client & freelancer portal with distinct role-based workflows for posting job requisitions, browsing verified gigs, and submitting structured bids.",
        "Built a transparent 3-stage milestone workflow (Open → In Progress → Completed) integrated with automated transaction logic and Razorpay payments.",
        "Designed scalable Supabase PostgreSQL backend with Row-Level Security (RLS), real-time messaging, project file sharing, and two-way reviews."
      ],
      tech: ["Vite", "React", "Tailwind CSS", "Supabase", "PostgreSQL", "Razorpay"],
      stats: [
        { label: "Architecture", value: "Role-Based" },
        { label: "Payment", value: "Razorpay" },
        { label: "Database", value: "PostgreSQL" }
      ]
    },
    {
      id: "lrnit",
      title: "LRNit",
      subtitle: "Student Organization Web Platform",
      dates: "December 2025 – January 2026",
      liveUrl: "https://lrnitclub.netlify.app/",
      githubUrl: "https://github.com/SajalKesharwani",
      badge: "Live Community Portal",
      summary: "High-performance community portal and administrative content management platform for LRNit, empowering 200+ students with hackathon/event registrations, project showcases, interactive gallery, and leadership administration.",
      highlights: [
        "Engineered interactive multi-step registration engine for workshops, webinars, and hackathons with automated input verification and real-time data sync.",
        "Developed administrative CMS backend via Supabase to manage upcoming/completed project portfolios, dynamic team rosters, and media galleries.",
        "Crafted responsive glassmorphic UI with custom smooth marquee carousels, fluid micro-interactions, and fast edge deployment on Netlify."
      ],
      tech: ["React", "Vite", "Supabase", "Tailwind CSS", "Netlify", "Vercel"],
      stats: [
        { label: "Community", value: "200+ Users" },
        { label: "CMS Engine", value: "Supabase" },
        { label: "Deployment", value: "Netlify Edge" }
      ]
    }
  ];

  const certifications = [
    {
      title: "Professional Machine Learning Engineer",
      issuer: "Google Cloud",
      badgeText: "GCP Certified",
      icon: "cloud",
      desc: "Demonstrated expertise in designing, building, and deploying production ML models on Google Cloud Platform with scalable data pipelines."
    },
    {
      title: "Certified Machine Learning Engineer – Associate",
      issuer: "Amazon Web Services (AWS)",
      badgeText: "AWS Certified",
      icon: "cpu",
      desc: "Validated competence in architecting, tuning, and deploying cloud ML solutions, feature engineering, and inference pipelines on AWS."
    }
  ];

  const achievements = [
    {
      title: "Top 15 Finalist (100+ Teams)",
      event: "AtherX Hackathon",
      date: "March 2026",
      icon: "award",
      desc: "Designed and built an end-to-end prototype under strict 36-hour hackathon constraints, placing in the top 15 among 100+ competing engineering teams."
    },
    {
      title: "Student Organization Lead & Event Organizer",
      event: "LRNit Student Club",
      date: "2025 – 2026",
      icon: "users",
      desc: "Organized and facilitated technical hackathons and webinars engaging 200+ attendees across development and event management roles."
    }
  ];

  const education = [
    {
      institution: "Lovely Professional University",
      location: "Jalandhar, Punjab",
      degree: "Bachelor of Technology — Computer Science and Engineering (2nd Year / Sophomore)",
      score: "CGPA: 8.2 / 10.0",
      period: "Aug 2025 – Present",
      status: "In Progress (2nd Year)",
      highlights: "Actively studying Data Structures, Algorithms, Database Management Systems, Operating Systems, Machine Learning, and Full-Stack Web Technologies."
    },
    {
      institution: "New Horizon Higher Secondary School",
      location: "Maihar, MP",
      degree: "Higher Secondary Certificate (Class XII)",
      score: "85.0%",
      period: "June 2024 – March 2025",
      status: "Completed",
      highlights: "Specialization in Mathematics, Physics, Chemistry, and Computer Science."
    },
    {
      institution: "Miniland Academy Higher Secondary School",
      location: "Maihar, MP",
      degree: "Secondary School Certificate (Class X)",
      score: "88.6%",
      period: "June 2022 – March 2023",
      status: "Completed",
      highlights: "Distinction in Mathematics, Science, and Information Technology."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] selection:bg-white selection:text-black">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-5 py-3 rounded-full text-xs font-mono font-semibold shadow-2xl flex items-center gap-2 toast-animate">
          <Icon name="check" size={14} className="text-black" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. STICKY TOP NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#262626]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo / Monogram & Avatar */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#262626] group-hover:border-white transition-all bg-[#141414] shrink-0">
              <img src="profile.jpg" alt="SK" className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-gray-300 transition-colors">
                Sajal Kesharwani
              </span>
              <span className="font-mono text-[10px] text-[#8A8A8A] tracking-wider uppercase">
                2nd Year B.Tech CSE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#141414] px-3 py-1.5 rounded-full border border-[#262626]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${activeSection === link.id
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-[#8A8A8A] hover:text-white"
                  }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-1.5 rounded-full bg-white text-black font-sans text-xs font-semibold hover:bg-gray-200 transition-all transform hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-[#1C1C1C] border border-[#262626]"
            aria-label="Toggle Navigation Menu"
          >
            <Icon name={mobileMenuOpen ? "x" : "menu"} size={20} />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0E0E0E] border-b border-[#262626] px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${activeSection === link.id
                  ? "bg-white text-black font-semibold"
                  : "text-[#8A8A8A] hover:text-white hover:bg-[#141414]"
                  }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-[#262626]">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs"
              >
                Get In Touch
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20 space-y-32">

        {/* 2. HERO SECTION */}
        <section id="hero" className="pt-8 md:pt-14 relative">

          {/* Top Status & Year Pill */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-mono text-[#A3A3A3]">
              <span className="w-2 h-2 rounded-full bg-white pulse-dot"></span>
              <span>2nd Year B.Tech CSE @ LPU</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-mono text-[#8A8A8A]">
              <span>Open for Internships & Projects</span>
            </div>
          </div>

          {/* Big Stylish Name Display with Circle Profile Photo */}
          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-8 mb-8">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#525252]"></span>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8A8A8A]">
                  Engineering Portfolio
                </span>
              </div>

              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-extrabold tracking-tighter text-white leading-[0.95] uppercase">
                Sajal <span className="text-[#666666] hover:text-white transition-colors duration-300">Kesharwani</span>
              </h1>

              <div className="pt-2 flex items-center gap-3">
                <span className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Aspiring Software Engineer & Full-Stack Developer
                </span>
              </div>
            </div>

            {/* Circular Profile Photo with Subtle Glow & Border */}
            <div className="relative group shrink-0 self-start md:self-center">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-white/20 via-white/5 to-white/30 blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border-2 border-[#262626] group-hover:border-white transition-all duration-300 shadow-2xl bg-[#141414]">
                <img
                  src="profile.jpg"
                  alt="Sajal Kesharwani"
                  className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Typewriter Subtitle */}
          <div className="min-h-[2.5rem] flex items-center bg-[#141414]/60 border border-[#262626] rounded-xl px-4 py-3 max-w-3xl mb-6">
            <p className="font-mono text-xs sm:text-sm md:text-base text-[#8A8A8A] leading-relaxed">
              <span className="text-white font-bold">&gt; </span>
              {currentText}
              <span className="terminal-cursor"></span>
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#8A8A8A] max-w-2xl leading-relaxed">
            Second-year undergraduate at Lovely Professional University (CGPA 8.2), actively building and learning full-stack web platforms, authentication systems, APIs, and scalable databases.
          </p>

          {/* Action CTAs & Social Links */}
          <div className="pt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-white text-black font-sans text-sm font-semibold hover:bg-gray-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 shadow-lg"
            >
              <span>Explore Projects</span>
              <Icon name="arrow-down" size={16} />
            </a>

            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-[#141414] text-white border border-[#262626] hover:border-white font-sans text-sm font-medium transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Contact Me</span>
              <Icon name="mail" size={16} />
            </a>

            <button
              onClick={() => copyToClipboard("kesharwanisajal01@gmail.com", "Email")}
              className="px-5 py-3 rounded-full bg-[#141414] text-[#8A8A8A] hover:text-white border border-[#262626] hover:border-white font-mono text-xs transition-all flex items-center gap-2"
              title="Click to copy email address"
            >
              <Icon name={copiedType === "Email" ? "check" : "copy"} size={14} />
              <span>kesharwanisajal01@gmail.com</span>
            </button>
          </div>

          {/* Social Links Row */}
          <div className="pt-10 flex items-center gap-6 border-t border-[#1F1F1F] mt-10 text-[#8A8A8A]">
            <span className="font-mono text-xs text-[#525252] uppercase tracking-wider">Connect:</span>

            <a
              href="https://github.com/SajalKesharwani"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-2 text-xs font-mono"
            >
              <Icon name="github" size={16} />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/sajal-kesharwani-"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-2 text-xs font-mono"
            >
              <Icon name="linkedin" size={16} />
              <span>LinkedIn</span>
            </a>

            <a
              href="tel:+919399718763"
              className="hover:text-white transition-colors flex items-center gap-2 text-xs font-mono"
            >
              <Icon name="phone" size={16} />
              <span>+91 9399718763</span>
            </a>
          </div>
        </section>

        {/* 3. ABOUT SECTION */}
        <section id="about" className="space-y-12">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              About & Academic Journey
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* Bio Narrative */}
            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#8A8A8A] leading-relaxed">
              <p>
                I am a 2nd-year B.Tech Computer Science & Engineering student at <strong className="text-white font-medium">Lovely Professional University, Jalandhar (CGPA 8.2)</strong>. As an aspiring software engineer, I am passionate about learning and building real-world web platforms from the ground up — exploring authentication pipelines, interactive dashboards, REST APIs, and database schemas.
              </p>
              <p>
                Alongside full-stack web development, I hold professional certifications in Machine Learning from both <strong className="text-white font-medium">Google Cloud (GCP Professional ML Engineer)</strong> and <strong className="text-white font-medium">AWS (AWS Certified ML Engineer – Associate)</strong>. This foundational training strengthens my problem-solving ability and data-driven thinking.
              </p>
              <p>
                I actively participate in hackathons to test my skills under pressure, achieving a <strong className="text-white font-medium">Top 15 finish among 100+ teams</strong> at the AtherX Hackathon. Beyond coursework, I am involved with the LRNit student organization, organizing events and collaborating with peers on exciting technical initiatives.
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="spotlight-card p-5 space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white">2nd Year</span>
                <p className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider">Undergraduate</p>
                <p className="text-xs text-[#525252]">B.Tech CSE @ LPU</p>
              </div>

              <div className="spotlight-card p-5 space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white">8.2</span>
                <p className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider">Current CGPA</p>
                <p className="text-xs text-[#525252]">Academic Standing</p>
              </div>

              <div className="spotlight-card p-5 space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white">Top 15</span>
                <p className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider">AtherX Hackathon</p>
                <p className="text-xs text-[#525252]">Out of 100+ teams</p>
              </div>

              <div className="spotlight-card p-5 space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white">2x</span>
                <p className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider">ML Certifications</p>
                <p className="text-xs text-[#525252]">Google Cloud & AWS</p>
              </div>
            </div>

          </div>
        </section>

        {/* 4. SKILLS SECTION */}
        <section id="skills" className="space-y-12">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Technical Skill Matrix
            </h2>
            <p className="text-sm text-[#8A8A8A]">Technologies, tools, and engineering competencies I am actively learning and applying.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="spotlight-card p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-white">
                    <Icon name={category.icon} size={18} className="text-white" />
                    <h3 className="font-display font-bold text-base">{category.title}</h3>
                  </div>
                  <div className="w-full h-px bg-[#262626]"></div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="mono-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. PROJECTS SECTION */}
        <section id="projects" className="space-y-12">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Web Projects
            </h2>
            <p className="text-sm text-[#8A8A8A]">
              Full-stack platforms built to apply authentication, client-side dashboards, and database integrations.
            </p>
          </div>

          <div className="space-y-10">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="spotlight-card p-6 sm:p-8 space-y-6 border border-[#262626]"
              >
                {/* Header: Title, Badge, Dates, Action Links */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262626] pb-6">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                      <span className="mono-chip bg-white text-black font-semibold border-white">
                        {project.badge}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#8A8A8A] mt-1">
                      {project.subtitle} · <span className="text-[#525252]">{project.dates}</span>
                    </p>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[#1C1C1C] hover:bg-white hover:text-black border border-[#262626] text-xs font-mono text-white transition-all flex items-center gap-1.5"
                    >
                      <Icon name="github" size={14} />
                      <span>Code</span>
                    </a>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-white text-black hover:bg-gray-200 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <span>Live Site</span>
                      <Icon name="external-link" size={14} />
                    </a>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm sm:text-base text-[#F5F5F5] leading-relaxed">
                  {project.summary}
                </p>

                {/* Key Technical Highlights */}
                <div className="space-y-3 bg-[#0A0A0A] p-5 rounded-xl border border-[#1F1F1F]">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#8A8A8A] flex items-center gap-2">
                    <Icon name="terminal" size={14} />
                    <span>Technical Architecture & Key Highlights:</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {project.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-[#8A8A8A] flex items-start gap-2.5 leading-relaxed">
                        <span className="text-white mt-1 font-mono">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips & Specs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, tIdx) => (
                      <span key={tIdx} className="mono-chip">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#525252]">
                    {project.stats.map((st, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5">
                        <span className="text-[#8A8A8A]">{st.label}:</span>
                        <span className="text-white">{st.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 6. CERTIFICATIONS & ACHIEVEMENTS */}
        <section id="achievements" className="space-y-12">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Certifications & Accomplishments
            </h2>
            <p className="text-sm text-[#8A8A8A]">Professional cloud certifications, hackathons, and leadership credentials.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Certifications Column */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#8A8A8A] flex items-center gap-2 mb-2">
                <Icon name="award" size={16} className="text-white" />
                <span>Cloud & ML Certifications</span>
              </h3>

              {certifications.map((cert, idx) => (
                <div key={idx} className="spotlight-card p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="mono-chip bg-white text-black font-semibold border-white">
                      {cert.badgeText}
                    </span>
                    <span className="font-mono text-xs text-[#8A8A8A]">{cert.issuer}</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">{cert.title}</h4>
                  <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">{cert.desc}</p>
                </div>
              ))}
            </div>

            {/* Achievements & Leadership Column */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#8A8A8A] flex items-center gap-2 mb-2">
                <Icon name="trophy" size={16} className="text-white" />
                <span>Hackathons & Leadership</span>
              </h3>

              {achievements.map((ach, idx) => (
                <div key={idx} className="spotlight-card p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="mono-chip bg-[#1C1C1C] text-white border-[#262626]">
                      {ach.event}
                    </span>
                    <span className="font-mono text-xs text-[#8A8A8A]">{ach.date}</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">{ach.title}</h4>
                  <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">{ach.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 7. EDUCATION SECTION */}
        <section id="education" className="space-y-12">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Academic Education
            </h2>
            <p className="text-sm text-[#8A8A8A]">Chronological educational background and university status.</p>
          </div>

          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div key={idx} className="spotlight-card p-6 sm:p-7 space-y-4 border border-[#262626]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">{edu.institution}</h3>
                    <p className="font-mono text-xs text-[#8A8A8A]">{edu.location}</p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="mono-chip bg-white text-black font-semibold border-white">
                      {edu.score}
                    </span>
                    <span className="font-mono text-xs text-[#8A8A8A]">{edu.period}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-sans font-semibold text-sm sm:text-base text-[#F5F5F5]">{edu.degree}</h4>
                  <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">{edu.highlights}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. CONTACT SECTION */}
        <section id="contact" className="space-y-12 pt-8">
          <div className="spotlight-card p-8 sm:p-12 border border-[#262626] space-y-8 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">

            <div className="max-w-2xl space-y-4">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Let's Connect & Collaborate.
              </h2>
              <p className="text-sm sm:text-base text-[#8A8A8A] leading-relaxed">
                Whether you have an internship opportunity, a project collaboration, or want to discuss full-stack technologies — feel free to reach out.
              </p>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">

              {/* Email Button */}
              <div className="bg-[#0E0E0E] p-5 rounded-xl border border-[#262626] flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#8A8A8A]">
                    <Icon name="mail" size={16} />
                    <span className="font-mono text-xs uppercase tracking-wider">Email</span>
                  </div>
                  <p className="font-mono text-xs text-white truncate">kesharwanisajal01@gmail.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:kesharwanisajal01@gmail.com"
                    className="flex-1 py-1.5 px-3 rounded-lg bg-white text-black text-center font-sans text-xs font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Send Email
                  </a>
                  <button
                    onClick={() => copyToClipboard("kesharwanisajal01@gmail.com", "Email")}
                    className="p-1.5 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] text-white border border-[#262626] transition-colors"
                    title="Copy Email"
                  >
                    <Icon name={copiedType === "Email" ? "check" : "copy"} size={14} />
                  </button>
                </div>
              </div>

              {/* Phone Button */}
              <div className="bg-[#0E0E0E] p-5 rounded-xl border border-[#262626] flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#8A8A8A]">
                    <Icon name="phone" size={16} />
                    <span className="font-mono text-xs uppercase tracking-wider">Phone</span>
                  </div>
                  <p className="font-mono text-xs text-white">+91 9399718763</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+919399718763"
                    className="flex-1 py-1.5 px-3 rounded-lg bg-white text-black text-center font-sans text-xs font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Call
                  </a>
                  <button
                    onClick={() => copyToClipboard("+919399718763", "Phone")}
                    className="p-1.5 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] text-white border border-[#262626] transition-colors"
                    title="Copy Phone Number"
                  >
                    <Icon name={copiedType === "Phone" ? "check" : "copy"} size={14} />
                  </button>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="bg-[#0E0E0E] p-5 rounded-xl border border-[#262626] flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#8A8A8A]">
                    <Icon name="linkedin" size={16} />
                    <span className="font-mono text-xs uppercase tracking-wider">LinkedIn</span>
                  </div>
                  <p className="font-mono text-xs text-white truncate">in/sajal-kesharwani-</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/sajal-kesharwani-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded-lg bg-white text-black text-center font-sans text-xs font-semibold hover:bg-gray-200 transition-colors"
                >
                  View Profile
                </a>
              </div>

              {/* GitHub */}
              <div className="bg-[#0E0E0E] p-5 rounded-xl border border-[#262626] flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#8A8A8A]">
                    <Icon name="github" size={16} />
                    <span className="font-mono text-xs uppercase tracking-wider">GitHub</span>
                  </div>
                  <p className="font-mono text-xs text-white truncate">@SajalKesharwani</p>
                </div>
                <a
                  href="https://github.com/SajalKesharwani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded-lg bg-white text-black text-center font-sans text-xs font-semibold hover:bg-gray-200 transition-colors"
                >
                  View Repositories
                </a>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#262626] py-12 px-6 bg-[#070707]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#8A8A8A] font-mono">

          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-sm text-white">SK.</span>
            <span>&copy; {new Date().getFullYear()} Sajal Kesharwani · 2nd Year B.Tech CSE @ LPU</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Back to top</span>
              <Icon name="arrow-up" size={14} />
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}

// Render React App
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
