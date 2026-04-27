import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onOpen, guestName }) => {
  return (
    <motion.section
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
      style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
        backgroundImage: 'url("/images/background.avif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/images/border.avif")',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        zIndex: 5
      }} />

      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Top Section: Names */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            position: 'absolute',
            top: '6%',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{ width: '100%', maxWidth: '100%', padding: 0 }}>
            <h1 className="sr-only">Pernikahan Anggie & Faizal</h1>
            <img src="/images/font-1.avif" alt="Anggie & Faizal" style={{ width: '100%', height: 'auto', transform: 'scale(1.15)' }} />
          </div>
        </motion.div>

        {/* Bottom Section: Guest Info & Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '5rem',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.2rem'
          }}
        >
          {/* Guest Information Box */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '0.8rem',
            width: '90%',
            maxWidth: '240px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.3rem', color: '#FDF9F1', fontFamily: 'var(--font-body)' }}>Kepada Yth.</p>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-body)', fontWeight: 'bold', color: '#FDF9F1', marginBottom: '0.3rem' }}>{guestName || 'Tamu Undangan'}</h3>
            <p style={{ fontSize: '0.7rem', color: '#FDF9F1', fontFamily: 'var(--font-body)' }}>You are cordially invited to our wedding.</p>
          </div>

          {/* Action Button */}
          <button
            onClick={onOpen}
            style={{
              backgroundColor: '#C09A5B',
              border: 'none',
              padding: '8px 40px',
              cursor: 'pointer',
              width: 'fit-content',
              color: '#2A1B16',
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.3s ease',
              textTransform: 'none'
            }}
          >
            Scroll Down
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
