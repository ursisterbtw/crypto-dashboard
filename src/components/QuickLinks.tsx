import React, { useState } from "react";
import AnimatedButton from "@/utils/AnimatedButton";
import { AnimatePresence, motion } from "framer-motion";

const QuickLinks: React.FC = () => {
  const [contractAddress, setContractAddress] = useState("");

  return (
    <div className="pt-0 pb-0 pr-4 pl-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="p-4 bg-gray-400 bg-opacity-60 shadow-md rounded-md">
            <input
              className="text-center w-full m-2 p-2 rounded-md"
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Enter contract address"
            />
            {contractAddress && (
              <div className="flex space-x-4 justify-center mt-2">
                <AnimatedButton
                  className="btn"
                  onClick={() =>
                    window.open(
                      `https://dexscreener.com/ethereum/${contractAddress}`,
                      "_blank"
                    )
                  }
                >
                  <img
                    src="/dexscreener-icon.png"
                    alt="Dexscreener"
                    height="24"
                    width="24"
                  />
                </AnimatedButton>
                <AnimatedButton
                  className="btn"
                  onClick={() =>
                    window.open(
                      `https://dexspy.io/eth/token/${contractAddress}`,
                      "_blank"
                    )
                  }
                >
                  <img
                    src="/dexspy-icon.png"
                    alt="Dexspy"
                    height="24"
                    width="24"
                  />
                </AnimatedButton>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuickLinks;
