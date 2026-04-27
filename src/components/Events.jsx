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
        backgroundSize: 'cover',
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
        }}>
          <h2 className="sr-only">Waktu dan Lokasi Acara</h2>
        </div>
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
          
          {/* View Map Button for Groom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              pointerEvents: 'auto'
            }}
          >
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: '#FDF9F1' }}
              whileTap={{ scale: 0.95 }}
              href="https://maps.app.goo.gl/fmGoeTmUgq1kojvv7"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#E4C88E',
                color: '#2A1B16',
                padding: '12px 24px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid #2A1B16',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.3s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Lihat Lokasi
            </motion.a>
          </motion.div>
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

          {/* View Map Button for Bride */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              pointerEvents: 'auto'
            }}
          >
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: '#FDF9F1' }}
              whileTap={{ scale: 0.95 }}
              href="https://maps.app.goo.gl/8jR9zGpQnpiVZQMi6?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#E4C88E',
                color: '#2A1B16',
                padding: '12px 24px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid #2A1B16',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.3s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Lihat Lokasi
            </motion.a>
          </motion.div>
        </>
      )}

    </section>
  );
};

export default Events;
