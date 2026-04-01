"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useGlobalLoading } from "./LoadingContext";

const shutterVariants: any = {
  initial: { height: "100vh" },
  animate: { 
    height: "0vh",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2,
    }
  },
  exit: { 
    height: "100vh",
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    }
  },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { hasLoaded } = useGlobalLoading();
  const initialPath = useRef(pathname);
  const hasEverNavigated = useRef(false);

  // Immediate detection during render phase
  if (pathname !== initialPath.current) {
    hasEverNavigated.current = true;
  }

  const shouldPlayShutters = hasLoaded && hasEverNavigated.current;

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div key={pathname} className="relative">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>

        {shouldPlayShutters && (
          <motion.div key={`shutters-${pathname}`}>
            <motion.div
              className="fixed top-0 left-0 w-full bg-primary z-[999] pointer-events-none origin-top"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={shutterVariants}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                 <motion.span 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 1.2] }}
                   transition={{ duration: 0.8 }}
                   className="text-white text-4xl font-black tracking-widest uppercase"
                 >
                    Eagle Revolution
                 </motion.span>
              </div>
            </motion.div>
            
            <motion.div
              className="fixed bottom-0 left-0 w-full bg-slate-900 z-[998] pointer-events-none origin-bottom"
              initial={{ height: "100vh" }}
              animate={{ height: "0vh" }}
              exit={{ height: "100vh" }}
              transition={{
                duration: 0.6,
                ease: [0.76, 0, 0.24, 1] as any,
                delay: 0.1
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
