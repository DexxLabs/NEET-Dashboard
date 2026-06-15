// STICKER STRATEGY: AI-GENERATED
// All 12 stickers generated from reference image using AI image generation,
// saved to /src/assets/stickers/cozy/
// Fallback tiers (used if AI generation unavailable):
//   Tier 1 (simple geometry): stars (#07, #08, #12), hearts (#06, #09), bunny (#03), miffy (#04)
//   Tier 2 (structured shapes): cat badge (#02), sitting cat (#01), Totoro (#10)
//   Tier 3 (SVG + emoji composite): Hello Kitty (#05), polaroid frame (#11)

import React from 'react';
import s01 from '../../assets/stickers/cozy/sticker-01-grumpy-cat.png';
import s02 from '../../assets/stickers/cozy/sticker-02-cat-badge.png';
import s03 from '../../assets/stickers/cozy/sticker-03-bunny.png';
import s04 from '../../assets/stickers/cozy/sticker-04-miffy.png';
import s05 from '../../assets/stickers/cozy/sticker-05-hello-kitty.png';
import s06 from '../../assets/stickers/cozy/sticker-06-red-heart.png';
import s07a from '../../assets/stickers/cozy/sticker-07-tan-star.png';
import s07b from '../../assets/stickers/cozy/sticker-07-tan-star.png';
import s07c from '../../assets/stickers/cozy/sticker-07-tan-star.png';
import s08 from '../../assets/stickers/cozy/sticker-08-crimson-star.png';
import s09 from '../../assets/stickers/cozy/sticker-09-tan-heart.png';
import s10 from '../../assets/stickers/cozy/sticker-10-totoro.png';
import s11 from '../../assets/stickers/cozy/sticker-11-polaroid-cat.png';
import s12 from '../../assets/stickers/cozy/sticker-12-red-star.png';

const STICKERS = [
  // Top-left cluster
  { src: s06, alt: 'red heart', width: 110, top: '55px',  left: '2%',  rot: -8  },
  { src: s02, alt: 'grumpy cat badge', width: 68, top: '155px', left: '8%',  rot:  6  },

  // Top-right cluster
  { src: s05, alt: 'hello kitty', width: 130, top: '38px',  right: '1%', rot:  5  },

  // Bottom-left cluster
  { src: s03, alt: 'white bunny',    width: 72,  bottom: '240px', left: '2%',  rot: -10 },
  { src: s04, alt: 'miffy face',     width: 58,  bottom: '175px', left: '10%', rot:  8  },
  { src: s08, alt: 'crimson star',   width: 52,  bottom: '130px', left: '3%',  rot: -15 },
  { src: s09, alt: 'tan heart',      width: 44,  bottom: '80px',  left: '11%', rot:  12 },

  // Bottom-right cluster
  { src: s01, alt: 'grumpy cat boba', width: 100, bottom: '200px', right: '9%',  rot:  7  },
  { src: s10, alt: 'totoro',          width: 95,  bottom: '65px',  right: '4%',  rot: -5  },
  { src: s11, alt: 'polaroid cat',    width: 80,  bottom: '130px', right: '2%',  rot:  12 },
  { src: s12, alt: 'red star',        width: 54,  bottom: '145px', right: '10%', rot: -10 },

  // Scattered tan stars
  { src: s07a, alt: 'tan star', width: 46, top: '40%',  right: '18%', rot:  20 },
  { src: s07b, alt: 'tan star', width: 38, bottom: '28%', left: '22%', rot: -14 },
  { src: s07c, alt: 'tan star', width: 42, top: '62%',  right: '28%', rot:  8  },
];

export const CozyStickers = () => (
  <>
    {STICKERS.map((s, i) => {
      const posStyle = {};
      if (s.top)    posStyle.top    = s.top;
      if (s.bottom) posStyle.bottom = s.bottom;
      if (s.left)   posStyle.left   = s.left;
      if (s.right)  posStyle.right  = s.right;

      return (
        <img
          key={i}
          src={s.src}
          alt={s.alt}
          draggable={false}
          style={{
            position: 'fixed',
            ...posStyle,
            width: s.width,
            height: 'auto',
            transform: `rotate(${s.rot}deg)`,
            '--sticker-rot': `${s.rot}deg`,
            opacity: 0.88,
            pointerEvents: 'none',
            zIndex: 0,
            userSelect: 'none',
            transition: 'transform 0.2s ease',
            mixBlendMode: (s.alt === 'totoro' || s.alt === 'polaroid cat') ? 'normal' : 'multiply',
            filter: (s.alt === 'totoro' || s.alt === 'polaroid cat') ? 'contrast(1.1) brightness(1.05) drop-shadow(0 0 2px rgba(0,0,0,0.1))' : 'contrast(1.2) brightness(1.05)',
            WebkitMaskImage: (s.alt === 'totoro' || s.alt === 'polaroid cat') ? 'radial-gradient(circle at center, black 40%, transparent 65%)' : 'none',
            maskImage: (s.alt === 'totoro' || s.alt === 'polaroid cat') ? 'radial-gradient(circle at center, black 40%, transparent 65%)' : 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.animation = `sticker-wobble 0.4s ease`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.animation = '';
            e.currentTarget.style.transform = `rotate(${s.rot}deg)`;
          }}
        />
      );
    })}
  </>
);
