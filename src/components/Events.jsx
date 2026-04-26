import React from 'react';
import { motion } from 'framer-motion';

const Events = ({ invitationType }) => {
  // Tentukan gambar detail acara berdasarkan tipe undangan (pria/wanita)
  const eventDetailsImage = invitationType === 'pria'
    ? '/images/malang.webp'
    : '/images/brebes-akad.webp'; // malang.avif dianggap sebagai versi wanita/default

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
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        zIndex: 5
      }} />

      {/* Wedding Day Title Layer */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
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
          backgroundImage: 'url("/images/wedding-day.avif")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />
      </motion.div>

      {/* Event Details Layer(s) */}
      {invitationType === 'pria' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 11,
            pointerEvents: 'none'
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url("/images/malang.webp")',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
        </motion.div>
      ) : (
        <>
          {/* Akad Layer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 11,
              pointerEvents: 'none'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url("/images/brebes-akad.webp")',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} />
          </motion.div>

          {/* Resepsi Layer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 12,
              pointerEvents: 'none'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url("/images/brebes-resepsi.webp")',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} />
          </motion.div>
        </>
      )}

    </section>
  );
};

export default Events;
