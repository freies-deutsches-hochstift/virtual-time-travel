import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { TwStyle } from "twin.macro";

interface FadeAnimationProps extends PropsWithChildren {
  css?: TwStyle;
}

export const FadeAnimation = ({ children, ...rest }: FadeAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...rest}
      style={{ willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeAnimation;
