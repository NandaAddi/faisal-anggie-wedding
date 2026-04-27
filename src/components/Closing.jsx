import React from 'react';
import { motion } from 'framer-motion';

const DustParticles = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => {
    const startX = 50 + (Math.random() * 4 - 2); 
    const startY = 10 + (Math.random() * 80); 
    
    const direction = Math.random() > 0.5 ? 1 : -1;
    const distance = 15 + Math.random() * 30; 
    const endX = startX + (direction * distance);
    const endY = startY - (Math.random() * 15 - 5); 
    
    const size = 1 + Math.random() * 4; 
    
    return (
      <motion.div
        key={i}
        initial={{ 
          opacity: 0, 
          left: `${startX}%`, 
          top: `${startY}%`,
          scale: 0
        }}
        whileInView={{ 
          opacity: [0, 0.8, 0],
          left: `${endX}%`,
          top: `${endY}%`,
          scale: [0, 1.5, 0]
        }}
        transition={{ 
          duration: 2.5 + Math.random() * 2, 
          delay: 1 + Math.random() * 0.8,
          ease: "easeOut"
        }}
        style={{
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: '#E4C88E',
          borderRadius: '50%',
          boxShadow: '0 0 8px #C09A5B',
          zIndex: 4,
          pointerEvents: 'none'
        }}
      />
    );
  });

  return <>{particles}</>;
};

const SmokeClouds = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: '50%', x: '-50%' }}
        whileInView={{ opacity: [0, 0.5, 0], scale: 2, y: '20%', x: '-50%' }}
        transition={{ duration: 4, delay: 1, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '0%',
          left: '50%',
          width: '150%',
          maxWidth: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse at center, rgba(192, 154, 91, 0.15) 0%, rgba(255,255,255,0) 60%)',
          filter: 'blur(15px)',
          zIndex: 4,
          pointerEvents: 'none'
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: '-50%', x: '-50%' }}
        whileInView={{ opacity: [0, 0.3, 0], scale: 2.5, y: '-60%', x: '-50%' }}
        transition={{ duration: 3.5, delay: 1.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          maxWidth: '500px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(228, 200, 142, 0.1) 0%, rgba(255,255,255,0) 60%)',
          filter: 'blur(20px)',
          zIndex: 4,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

const Closing = () => {
  return (
    <section style={{ 
      position: 'relative', 
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/images/background2.avif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1
      }} />

      {/* Border Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/images/border.avif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        zIndex: 5
      }} />

      {/* Left Gate */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: 5 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/images/gerbang.avif")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />
      </motion.div>

      {/* Right Gate */}
      <motion.div
        initial={{ x: '100%' }}
        whileInView={{ x: -5 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/images/gerbang.avif")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scaleX(-1)'
        }} />
      </motion.div>

      {/* Particle & Smoke Effects */}
      <DustParticles />
      <SmokeClouds />

      {/* Penutup Image Text Layer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/images/penutup.avif")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          <h2 className="sr-only">Ucapan Terima Kasih & Penutup</h2>
        </div>
      </motion.div>
    </section>
  );
};

export default Closing;
