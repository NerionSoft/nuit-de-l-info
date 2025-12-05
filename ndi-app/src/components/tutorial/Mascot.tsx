'use client';

import { motion } from 'framer-motion';

interface MascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  mood?: 'neutral' | 'happy' | 'thinking' | 'celebrating' | 'excited';
}

export function Mascot({
  className = '',
  size = 'md',
  animate = true,
  mood = 'neutral'
}: MascotProps) {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const moodAnimations = {
    neutral: {},
    happy: { rotate: [0, -5, 5, 0] },
    thinking: { y: [0, -5, 0] },
    celebrating: { scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] },
    excited: { scale: [1, 1.15, 1], y: [0, -8, 0] },
  };

  return (
    <motion.div
      className={`${sizeMap[size]} ${className}`}
      animate={animate ? moodAnimations[mood] : {}}
      transition={{
        duration: mood === 'celebrating' || mood === 'excited' ? 0.5 : 2,
        repeat: animate ? Infinity : 0,
        repeatType: 'reverse',
      }}
    >
      <svg
        viewBox="0 0 963 1088"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Corps principal */}
        <ellipse cx="540.5" cy="271" rx="199.5" ry="196" fill="#080808"/>
        <path d="M740 524.115C740 725 639.727 792 518.5 792C397.274 792 276 769.5 301 524.115C346.999 263.375 529.567 164.764 616.047 271.249C737.274 271.249 740 404.333 740 524.115Z" fill="#080808"/>

        {/* Yeux blancs */}
        <ellipse cx="426.928" cy="275.132" rx="63.7674" ry="84.0907" transform="rotate(-2.57287 426.928 275.132)" fill="white"/>
        <ellipse cx="592.012" cy="277.276" rx="74.5682" ry="91.2425" transform="rotate(13.6646 592.012 277.276)" fill="white"/>

        {/* Pupilles */}
        <motion.ellipse
          cx="594.127"
          cy="282.834"
          rx="36.6087"
          ry="47.8365"
          transform="rotate(13.6646 594.127 282.834)"
          fill="black"
          animate={animate ? { cx: [594, 598, 590, 594] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.ellipse
          cx="443.873"
          cy="277.131"
          rx="36.6087"
          ry="47.8365"
          transform="rotate(13.6646 443.873 277.131)"
          fill="black"
          animate={animate ? { cx: [443, 447, 439, 443] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Bouche/Bec */}
        <path d="M616.996 438.636C616.996 547.858 634.056 754.136 438 652C338.159 652 369.5 552.5 384.784 448.149C401.284 335.5 406.65 401.086 506.492 401.086C606.333 401.086 616.996 329.415 616.996 438.636Z" fill="white"/>
        <ellipse cx="488.5" cy="585.5" rx="121.5" ry="118.5" fill="white"/>

        {/* Bec jaune */}
        <path d="M616.5 364C616.5 391.614 543.846 405.625 508.5 405.625C473.154 405.625 365.5 391.614 365.5 364C382.5 344.5 456.154 307.125 491.5 307.125C526.846 307.125 538.5 370.5 616.5 364Z" fill="#FDC62F"/>
        <path d="M624.5 366C624.5 390.853 563.797 402.993 492 402.993C420.203 402.993 362 382.846 362 357.993C362 333.14 391.203 345.493 463 345.493C572 368 606 354 624.5 366Z" fill="#FBC730"/>

        {/* Pattes gauche */}
        <path d="M237.083 615.312C237.083 642.926 155.039 714.812 127.425 714.812C167.425 633.812 143.925 643.812 143.925 621.312C137.425 593.812 146.811 573.812 174.425 573.812C270.925 566.312 355.583 480.312 237.083 615.312Z" fill="#FDC831"/>
        <path d="M412 761C412 801.317 382.02 823.999 351.921 823.999C-78.1235 716.618 233.925 668 225.925 635C225.925 604 252.824 529 282.924 529C313.023 529 325.503 546.501 412 761Z" fill="#FDC831"/>

        {/* Ailes */}
        <ellipse cx="771.768" cy="513.13" rx="59.5" ry="157" transform="rotate(-23.5886 771.768 513.13)" fill="black"/>
        <ellipse cx="246.362" cy="296.454" rx="59.5" ry="157" transform="rotate(142.121 246.362 296.454)" fill="black"/>

        {/* Pattes droite */}
        <g clipPath="url(#clip0_mascot)">
          <path d="M704.871 668.167C677.39 665.456 613.907 576.75 616.618 549.269C693.299 597.029 685.655 572.661 708.046 574.87C736.052 571.101 755.033 582.405 752.322 609.886C750.311 706.656 827.584 799.349 704.871 668.167Z" fill="#FDC831"/>
          <path d="M542.713 827.935C502.591 823.976 482.962 791.915 485.917 761.961C635.002 344.537 652.747 659.851 686.373 655.129C717.224 658.173 789.22 692.306 786.265 722.261C783.31 752.215 764.668 762.916 542.713 827.935Z" fill="#FDC831"/>
        </g>

        <defs>
          <clipPath id="clip0_mascot">
            <rect width="334" height="317" fill="white" transform="translate(802.261 560.124) rotate(95.6345)"/>
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
}

// Mascotte avec bulle de dialogue
interface MascotWithBubbleProps {
  message: string;
  size?: 'sm' | 'md' | 'lg';
  mood?: 'neutral' | 'happy' | 'thinking' | 'celebrating' | 'excited';
  position?: 'left' | 'right';
}

export function MascotWithBubble({
  message,
  size = 'md',
  mood = 'neutral',
  position = 'left'
}: MascotWithBubbleProps) {
  const isLeft = position === 'left';

  return (
    <div className={`flex items-end gap-3 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      <Mascot size={size} mood={mood} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`
          relative bg-white rounded-2xl p-4 shadow-lg max-w-xs
          ${isLeft ? 'rounded-bl-sm' : 'rounded-br-sm'}
        `}
      >
        {/* Triangle pointer */}
        <div
          className={`
            absolute bottom-2 w-0 h-0
            border-t-8 border-t-transparent
            border-b-8 border-b-transparent
            ${isLeft
              ? '-left-2 border-r-8 border-r-white'
              : '-right-2 border-l-8 border-l-white'
            }
          `}
        />
        <p className="text-[#151515] text-sm">{message}</p>
      </motion.div>
    </div>
  );
}
