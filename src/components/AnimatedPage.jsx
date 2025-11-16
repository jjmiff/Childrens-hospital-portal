import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedPage({ children }) {
  const prefersReduced = useReducedMotion();

  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  const transition = {
    duration: prefersReduced ? 0.05 : 0.2,
    ease: "easeOut",
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={transition}
      style={{ willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
}
