import { memo } from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import tw from "twin.macro";

export interface PovInDirectViewProps {
  onSelect: () => void;
  label: string;
  show: boolean;
}

export const PovInDirectView = memo(
  ({ onSelect, label, show }: PovInDirectViewProps) => {
    return (
      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-max"
            style={{ willChange: "opacity" }}
          >
            <StyledPovCta
              onClick={onSelect}
              dangerouslySetInnerHTML={{ __html: label }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

const StyledPovCta = styled.div(() => [
  tw`
    bg-ui-pov rounded-full
    absolute
    top-1/3 left-1/3
    drop-shadow-sm
    flex items-center justify-center
    text-center
  `,
  `
    width: 40vw;
    height: 40vw;
  `,
]);
