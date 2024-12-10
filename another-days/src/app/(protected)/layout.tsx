'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
};

const Layout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="page absolute size-full bg-transparent"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Layout;
