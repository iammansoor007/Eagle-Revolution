import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "../config/icons";
import { useContent } from "../hooks/useContent";
import Image from "next/image";

import bgfair from "../assets/bgfair.jpg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { hero } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { badge, headlines, description, buttons, stats, images } = hero;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) * 0.005,
        y: (clientY - innerHeight / 2) * 0.005,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-12 min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 isolate"
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 95%)",
            maskImage: "linear-gradient(to bottom, black 60%, transparent 95%)",
          }}
        >
          <Image
            src={bgfair}
            alt=""
            className="w-full h-full object-cover scale-105"
            fill
            priority
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-transparent" />

        <motion.div
          className="absolute top-[10%] right-[10%] w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ x: mousePosition.x * 0.8, y: mousePosition.y * 0.8 }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 min-h-screen flex items-center py-28 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
            <div className="text-center lg:text-left">
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-white text-xs uppercase tracking-wider font-medium">{badge}</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.2] tracking-tight">
                {headlines.map((line: string, i: number) => (
                  <motion.span
                    key={i}
                    className="block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + 0.15 * i,
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {description}
              </motion.p>



              <motion.div
                className="mb-10 w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
                  {buttons.map((button: any, idx: number) => {
                    return button.primary ? (
                      <motion.a
                        key={idx}
                        href={button.href}
                        className="group relative overflow-hidden min-w-[150px] sm:min-w-[170px] flex-1 sm:flex-initial px-5 sm:px-7 py-3.5 rounded-2xl inline-flex items-center justify-center gap-2 text-sm sm:text-base font-semibold tracking-wide bg-primary text-primary-foreground border border-primary/30 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-white hover:text-primary hover:border-white/70 hover:shadow-[0_16px_40px_rgba(255,255,255,0.18)] active:scale-[0.98] backdrop-blur-xl"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">{button.text}</span>
                        {button.icon && <Icon name={button.icon} className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
                        <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                    ) : (
                      <motion.a
                        key={idx}
                        href={button.href}
                        className="group relative overflow-hidden min-w-[150px] sm:min-w-[170px] flex-1 sm:flex-initial px-5 sm:px-7 py-3.5 rounded-2xl inline-flex items-center justify-center gap-2 text-sm sm:text-base font-semibold tracking-wide backdrop-blur-xl bg-white/10 text-white border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:bg-white hover:text-slate-900 hover:border-white hover:shadow-[0_16px_40px_rgba(255,255,255,0.16)] active:scale-[0.98]"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">{button.text}</span>
                        {button.icon && <Icon name={button.icon} className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
                        <span className="absolute inset-0 bg-gradient-to-r from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:flex md:flex-wrap lg:justify-start gap-y-8 gap-x-4 pt-8 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {stats.map((stat: any, idx: number) => (
                  <div key={stat.label} className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-3 text-center sm:text-left">
                    <div className="p-2 rounded-lg bg-white/5 md:bg-transparent">
                      <Icon name={stat.icon} className="w-5 h-5 md:w-6 md:h-6 text-primary/80" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl md:text-2xl font-bold text-white leading-tight">{stat.value}</span>
                      <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 font-medium">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;