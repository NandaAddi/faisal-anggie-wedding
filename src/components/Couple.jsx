import React from 'react';
import { motion } from 'framer-motion';

const Couple = () => {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '4rem 0'
    }}>
      {/* Background Image */}
      <img
        src="/images/background2.avif"
        alt=""
        decoding="async"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Border Image */}
      <img
        src="/images/border.avif"
        alt=""
        loading="lazy"
        decoding="async"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          zIndex: 5,
          pointerEvents: 'none'
        }}
      />

      {/* Title Layer */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          willChange: 'transform, opacity'
        }}
      >
        <img 
          src="/images/font-3.avif" 
          alt="Mempelai Pria & Wanita" 
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
        <h2 className="sr-only">Mempelai Pria & Wanita</h2>
      </motion.div>

      {/* Bride Layer */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 11,
          pointerEvents: 'none',
          willChange: 'transform, opacity'
        }}
      >
        <img 
          src="/images/anggi.avif" 
          alt="" 
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </motion.div>

      {/* Groom Layer */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 12,
          pointerEvents: 'none',
          willChange: 'transform, opacity'
        }}
      >
        <img 
          src="/images/faisal.avif" 
          alt="" 
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </motion.div>

    </section>
  );
};

export default React.memo(Couple);
