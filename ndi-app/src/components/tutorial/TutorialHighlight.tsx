'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTutorialStore } from '@/stores/tutorialStore';

interface HighlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function TutorialHighlight() {
  const { isActive, getHighlightTarget, phase } = useTutorialStore();
  const [rect, setRect] = useState<HighlightRect | null>(null);

  const highlightTarget = isActive ? getHighlightTarget() : null;

  useEffect(() => {
    if (!highlightTarget) {
      setRect(null);
      return;
    }

    const updateRect = () => {
      const element = document.querySelector(highlightTarget);
      if (element) {
        const domRect = element.getBoundingClientRect();
        setRect({
          top: domRect.top - 8,
          left: domRect.left - 8,
          width: domRect.width + 16,
          height: domRect.height + 16,
        });
      }
    };

    // Initial update
    updateRect();

    // Update on resize
    window.addEventListener('resize', updateRect);

    // Update periodically in case element moves
    const interval = setInterval(updateRect, 100);

    return () => {
      window.removeEventListener('resize', updateRect);
      clearInterval(interval);
    };
  }, [highlightTarget]);

  // Only show highlight during action phase
  if (!isActive || phase !== 'action' || !rect) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 pointer-events-none"
      >
        {/* Semi-transparent overlay with cutout */}
        <svg className="w-full h-full">
          <defs>
            <mask id="highlight-mask">
              {/* White = visible, black = hidden */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={rect.left}
                y={rect.top}
                width={rect.width}
                height={rect.height}
                rx="12"
                fill="black"
              />
            </mask>
          </defs>

          {/* Dark overlay with cutout */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.6)"
            mask="url(#highlight-mask)"
          />
        </svg>

        {/* Glowing border around highlighted element */}
        <motion.div
          className="absolute rounded-xl border-2 border-[#E95420]"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }}
          animate={{
            boxShadow: [
              '0 0 10px rgba(233, 84, 32, 0.5), 0 0 20px rgba(233, 84, 32, 0.3)',
              '0 0 20px rgba(233, 84, 32, 0.8), 0 0 40px rgba(233, 84, 32, 0.5)',
              '0 0 10px rgba(233, 84, 32, 0.5), 0 0 20px rgba(233, 84, 32, 0.3)',
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Arrow pointing to element */}
        <motion.div
          className="absolute"
          style={{
            top: rect.top - 50,
            left: rect.left + rect.width / 2 - 20,
          }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 5 L20 30 M10 20 L20 30 L30 20"
              stroke="#E95420"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
