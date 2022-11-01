import { uid } from "react-uid";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import tw from "twin.macro";

export interface PovsOverlayFeedsProps {
  feed: string | null;
}

export function PovsOverlayFeeds({ feed }: PovsOverlayFeedsProps) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {!!feed && (
        <motion.div
          key={uid(feed)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-2 left-2 right-2 z-max"
          style={{ willChange: "opacity" }}
        >
          <StyledPovsOverlayFeeds dangerouslySetInnerHTML={{ __html: feed }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PovsOverlayFeeds;

const StyledPovsOverlayFeeds = styled.div([
  tw`
    bg-primary-b text-primary
    p-2
  `,
]);
