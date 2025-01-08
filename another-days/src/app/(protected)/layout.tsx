'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, useRef } from 'react';
import { usePathname } from 'next/navigation';
import paths from '@/data/paths';
import { Footer } from '@/components/footer';

const variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
};

const Layout = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={containerRef}
        key={pathname}
        className="page absolute size-full bg-transparent"
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
        {...(pathname !== paths.home && { variants })}
      >
        {children}
      </motion.div>
      <Footer />
    </AnimatePresence>
  );
};

export default Layout;
