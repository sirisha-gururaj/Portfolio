import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ExternalLink, 
  Code, BookOpen, Briefcase, Cpu, Globe, 
  Sparkles, ArrowDownRight, GraduationCap, Award
} from 'lucide-react';

// --- SUB-COMPONENTS ---

const TechBadge = ({ children }) => (
  <span className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-white/70 border border-white/10 rounded-full bg-white/5 backdrop-blur-md shadow-sm">
    {children}
  </span>
);

const SocialButton = ({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center gap-3 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 backdrop-blur-md"
  >
    {icon}
    <span className="text-sm font-bold tracking-wide group-hover:text-blue-300 transition-colors">{label}</span>
  </a>
);

// --- PROJECT CONTENT ---
const ProjectContent = ({ title, category, tech, desc, link }) => (
  <div className="h-full w-full p-6 md:p-12 flex flex-col justify-center relative overflow-hidden group">
    
    {/* Background Pattern */}
    <div className="absolute right-[-10%] top-[-20%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] group-hover:bg-blue-500/30 transition-all duration-700 pointer-events-none" />
    
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full w-full">
      
      {/* LEFT SIDE: Text Content */}
        <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-12 bg-blue-400"></div>
          <span className="text-blue-300 font-mono text-sm tracking-widest uppercase shadow-black drop-shadow-md">{category}</span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-5xl md:text-7xl font-black text-white drop-shadow-lg leading-tight">
            {title}
          </h2>
          {/* Mobile-only open-live icon placed next to title; pointer-events-auto to override parent */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live project"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-shadow shadow-sm pointer-events-auto"
          >
            <ExternalLink size={16} className="text-white/90" />
          </a>
        </div>
        
        <p className="text-lg md:text-xl text-slate-300 mb-8 drop-shadow-md leading-relaxed max-w-md">
          {desc}
        </p>

        <div className="flex gap-3 flex-wrap">
           {tech.map((t) => (
             <TechBadge key={t}>{t}</TechBadge>
           ))}
        </div>

      </div>

      {/* RIGHT SIDE: Live Browser (Visible on Desktop) */}
      <div className="hidden md:flex justify-center items-center h-full">
         <a 
           href={link}
           target="_blank"
           rel="noopener noreferrer"
           className="block group/browser cursor-pointer transform transition-all hover:scale-105 hover:-rotate-1"
         >
            <div className="w-72 h-48 bg-slate-900 rounded-xl border border-white/20 shadow-2xl overflow-hidden">
               <div className="h-7 bg-white/10 border-b border-white/10 flex items-center px-3 gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                 <div className="ml-3 text-[9px] text-white/40 font-mono bg-black/30 px-2 py-1 rounded flex-1 truncate opacity-50">
                   {link}
                 </div>
               </div>
               <div className="w-full h-full bg-slate-800 relative group-hover/browser:bg-white transition-colors duration-500">
                 <iframe 
                   src={link}
                   className="w-[200%] h-[200%] origin-top-left scale-50 border-none pointer-events-none grayscale-[20%] group-hover/browser:grayscale-0 transition-all duration-500"
                   loading="lazy"
                   title="Live Preview"
                 />
                 <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[1px] opacity-0 group-hover/browser:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-black/80 text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20 shadow-lg flex items-center gap-2 transform translate-y-4 group-hover/browser:translate-y-0 transition-transform">
                      Visit Live <ExternalLink size={12}/>
                    </span>
                 </div>
               </div>
            </div>
         </a>
      </div>

    </div>
  </div>
);

// --- MAIN CARD COMPONENT ---
const Card = ({ i, color, content, progress, range, targetScale, scrollable = true }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });
  
  const scale = useTransform(progress, range, [1, targetScale]);
  const blur = useTransform(progress, range, ["0px", "10px"]);

  // --- VISIBILITY LOGIC ---
  const fadeOutStart = range[0] + 0.30; 
  const fadeOutEnd = range[0] + 0.35;   
  const opacity = useTransform(progress, [range[0], fadeOutStart, fadeOutEnd], [1, 1, 0]);
  
  return (
    // FIXED: Removed pt-4 to eliminate top spacing
    <div ref={container} className="h-screen flex items-start justify-center sticky top-0 perspective-1000">
      <motion.div 
        style={{ 
          scale, 
          filter: `blur(${blur})`,
          opacity, 
          backgroundColor: color, 
          // FIXED: Reduced offset from 20px to 10px for a much tighter stack
          top: `calc(${i * 10}px)` 
        }} 
        className="flex flex-col relative h-[500px] md:h-[580px] w-[90vw] md:w-[1000px] rounded-[3rem] border-t border-l border-r border-white/20 border-b border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden origin-top backdrop-blur-3xl transition-colors duration-500"
      >
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] pointer-events-none"></div>
        
        {/* Ensure content is clickable (z-index 10) */}
        <div className={`relative z-10 h-full w-full ${scrollable ? 'overflow-auto touch-pan-y card-scroll' : 'overflow-hidden'}`}>
          {content}
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN APPLICATION ---
export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const cards = useMemo(() => [
    // 1. HERO CARD
    {
      id: "hero",
      color: "rgba(15, 23, 42, 0.6)", 
      content: (
        <div className="relative h-full flex flex-col items-center justify-center text-center p-6 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px]" />

          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 1 }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              
              <span className="text-xs font-mono text-slate-300 tracking-wider">DESIGN • DEVELOP • DEPLOY</span>
            </div>
            
            <h1 className="text-[12vw] md:text-[8rem] leading-[0.8] font-black tracking-tighter text-white mix-blend-overlay">
              SIRISHA G
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-slate-300 font-light tracking-wide max-w-2xl mx-auto">
              Engineering the boundary between <br></br><span className="text-blue-400 font-bold">Full Stack</span> & <span className="text-purple-400 font-bold">Artificial Intelligence</span>.
            </p>
          </motion.div>

          <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-50">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll to Explore</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </div>
      )
    },
    // 2. ABOUT / SKILLS
    {
      id: "about",
      color: "rgba(30, 27, 75, 0.75)", 
      content: (
        <div className="h-full flex flex-col md:flex-row p-8 md:p-16 gap-12 items-center relative z-10">
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              The <br/> <span className="text-indigo-400">Architect.</span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-md drop-shadow-md">
              Currently pursuing my <b className="text-white">MCA at St. Joseph's University</b>, focused on designing systems that balance robust backend logic with intuitive frontend experiences.<br/>Supported by a strong 9.3 CGPA foundation.
            </p>
            <div className="flex flex-wrap gap-2">
               <TechBadge>C</TechBadge>
               <TechBadge>Python</TechBadge>
               <TechBadge>Java</TechBadge>
               <TechBadge>JavaScript</TechBadge>
               <TechBadge>React</TechBadge>
               <TechBadge>.NET</TechBadge>
               <TechBadge>RestApi</TechBadge>
               <TechBadge>Flutter</TechBadge>
               <TechBadge>Docker</TechBadge>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md shadow-lg">
               <Code className="mb-4 text-indigo-400" />
               <h3 className="font-bold text-xl">Full Stack</h3>
               <p className="text-xs text-slate-400 mt-2 leading-relaxed">React, Node.js, Flask, PostgreSQL.<br/>Building scalable web architectures.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md shadow-lg translate-y-8">
               <Sparkles className="mb-4 text-purple-400" />
               <h3 className="font-bold text-xl">AI & RAG</h3>
               <p className="text-xs text-slate-400 mt-2 leading-relaxed">LangChain, Generative AI, Streamlit.<br/>Making data intelligent.</p>
            </div>
          </div>
        </div>
      )
    },
    // 3. EDUCATION (Timeline Style)
    {
      id: "education",
      color: "rgba(49, 46, 129, 0.9)", // Deep Indigo Glass
      content: (
        <div className="h-full p-8 md:p-16 flex flex-col justify-center">
           <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 drop-shadow-md">The Foundation.</h2>
           
           <div className="space-y-6 relative z-10">
             <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-white/10"></div>
             
             {/* MCA */}
             <div className="relative pl-12 group">
               <div className="absolute left-[12px] top-2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-black group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
               <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">Master of Computer Applications</h3>
               <p className="text-white/50 font-mono text-sm mb-1">St. Joseph's University • 2024 - Present</p>
               <p className="text-slate-300">Specializing in Full Stack Development & AI Architecture.</p>
             </div>

             {/* BSc */}
             <div className="relative pl-12 group">
               <div className="absolute left-[12px] top-2 w-4 h-4 rounded-full bg-blue-500 border-4 border-black group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
               <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">B.Sc Mathematics & Computer Science</h3>
               <p className="text-white/50 font-mono text-sm mb-1">St. Joseph's College • 2021 - 2024</p>
               <p className="text-slate-300">Graduated with 9.3 CGPA.</p>
             </div>
           </div>
        </div>
      )
    },
    // 4. PROJECT: SlotSwapper
    {
      id: "project1",
      color: "rgba(23, 37, 84, 0.8)", 
      scrollable: false,
      content: (
        <ProjectContent 
          title={<>SLOT<br/>SWAPPER</>}
          category="Real-Time System"
          tech={["React", "Node.js", "PostgreSQL"]}
          desc="A P2P scheduling platform. It uses WebSockets for live conflict resolution and Google OAuth for secure access."
          link="https://slotswapper-rouge.vercel.app/login"
        />
      )
    },
    // 5. PROJECT: ByteEat
    {
      id: "project2",
      color: "rgba(88, 28, 135, 0.8)", 
      scrollable: false,
      content: (
        <ProjectContent 
          title={<>BYTE<br/>EAT</>}
          category="AI Web Application"
          tech={["Flutter", "Flask", "Supabase"]}
          desc="Restaurant management reimagined. Features AI Voice Ordering and Smart Menu recommendations powered by Flask."
          link="https://restaurant-mangement-app-frontend.onrender.com"
        />
      )
    },
    // 6. PROJECT: MyCampusBot
    {
      id: "project3",
      color: "rgba(6, 78, 59, 0.85)", 
      scrollable: false,
      content: (
        <ProjectContent 
          title={<>MY CAMPUS<br/>BOT</>}
          category="Generative AI"
          tech={["Python", "LangChain", "RAG"]}
          desc="An intelligent campus guide. Uses Local RAG + Web Search fallback to answer queries instantly."
          link="https://sirisha-gururaj-project-app-kiounk.streamlit.app/"
        />
      )
    },
    // 7. CERTIFICATIONS
    {
      id: "certifications",
      color: "rgba(17, 24, 39, 0.9)", // Dark Gray Glass
      content: (
        <div className="h-full p-6 md:p-10 flex flex-col justify-center">
           <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-md">Certifications.</h2>
           
           <div className="grid gap-4 max-w-3xl relative z-10">
             {/* Cert 1: Internship */}
             <a href="https://drive.google.com/file/d/1hhIEc1SJHJMpZ58_rFsbAny_4p63fnCw/view" target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-[1.02] backdrop-blur-md cursor-pointer">
               <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50">
                 <Award size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-white text-lg group-hover:text-emerald-300 transition-colors">Software Development Internship</h3>
                 <p className="text-xs text-slate-400 mt-1">SkillCraft Technology • Aug 2025</p>
               </div>
               <ExternalLink className="ml-auto text-white/20 group-hover:text-emerald-400 transition-colors" size={18} />
             </a>

             {/* Cert 2: Job Simulation */}
             <a href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/xhih9yFWsf6AYfngd/HNpZwZcuYwona2d8Y_xhih9yFWsf6AYfngd_ikQFphyjnPhABMrJ7_1748026386668_completion_certificate.pdf" target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-[1.02] backdrop-blur-md cursor-pointer">
               <div className="p-3 rounded-full bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50">
                 <Award size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">Software Engineering Job Simulation</h3>
                 <p className="text-xs text-slate-400 mt-1">Accenture Nordics</p>
               </div>
               <ExternalLink className="ml-auto text-white/20 group-hover:text-blue-400 transition-colors" size={18} />
             </a>

             {/* Cert 3: Cloud Computing */}
             <a href="https://drive.google.com/file/d/1dH4xTKL1rC-vLqjj3DuWto20mmPbfzhU/view" target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-[1.02] backdrop-blur-md cursor-pointer">
               <div className="p-3 rounded-full bg-purple-500/20 text-purple-400 ring-1 ring-purple-500/50">
                 <Award size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">Essentials of Cloud Computing</h3>
                 <p className="text-xs text-slate-400 mt-1">Certification Authority</p>
               </div>
               <ExternalLink className="ml-auto text-white/20 group-hover:text-purple-400 transition-colors" size={18} />
             </a>
           </div>
        </div>
      )
    },
    // 8. PUBLICATION
    {
      id: "publication",
      color: "rgba(124, 58, 237, 0.85)", // Violet Glass
      content: (
        <div className="h-full p-6 md:p-12 flex flex-col justify-center">
           <div className="flex items-center gap-4 mb-8">
             <BookOpen className="text-pink-400" size={40} />
             <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md">Research.</h2>
           </div>
           
           <div className="relative z-10 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Review on Digital Twin – A Transformative Journey from Conceptualization to Real-World 
Implementation
              </h3>
              <div className="inline-block px-3 py-1 rounded-md bg-pink-500/20 border border-pink-500/30 text-pink-300 font-mono text-xs mb-6">
                ICCTIT-2025 • St Joseph's University
              </div>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
                This paper presents an in-depth review of Digital Twin technology, tracing its evolution from early conceptual models to its modern real-world implementation. The study also highlights major industry applications, benefits, and the challenges organizations face while adopting Digital Twins.
              </p>
              <a 
                href="https://drive.google.com/file/d/1tN3SeZmZEE2e2orLaSaYC0d34YwhFiVV/view" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-white/10 cursor-pointer"
              >
                Read Publication <ExternalLink size={18} />
              </a>
           </div>
        </div>
      )
    },
    // 9. CONTACT
    {
      id: "contact",
      color: "#050505",
      content: (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
           <div className="absolute inset-0 bg-noise opacity-10"></div>
           <Globe className="text-blue-500 mb-8 w-20 h-20 animate-spin-slow" style={{ animationDuration: '20s' }} />
           
           <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter drop-shadow-xl">
             LET’S CONNECT.
           </h2>
           
           <div className="flex flex-wrap justify-center gap-4 relative z-10">
             <SocialButton href="mailto:sirisha.gururaj@gmail.com" icon={<Mail size={18} />} label="Email" />
             <SocialButton href="https://www.linkedin.com/in/sirisha-g-71344b289/" icon={<Linkedin size={18} />} label="LinkedIn" />
             <SocialButton href="https://github.com/sirisha-gururaj" icon={<Github size={18} />} label="GitHub" />
           </div>

           <footer className="absolute bottom-8 text-white/30 text-xs font-mono uppercase tracking-widest">
             © 2025 Sirisha G. • Bengaluru
           </footer>
        </div>
      )
    }
  ], []);

  return (
    <div ref={containerRef} className="relative w-full bg-noise animate-aurora">
      {cards.map((card, i) => {
        const stepSize = 1 / cards.length;
        const targetScale = 1 - ( (cards.length - i) * 0.05); 
        
        return (
          <Card 
            key={card.id} 
            i={i} 
            {...card} 
            range={[i * stepSize, 1]} 
            progress={scrollYProgress} 
            targetScale={targetScale} 
            totalCards={cards.length}
          />
        );
      })}
    </div>
  );
}