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
          pointerEvents: 'none',
          willChange: 'transform, opacity'
        }}
      >
        <img 
          src="/images/wedding-day.avif" 
          alt="Waktu dan Lokasi Acara"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
        <h2 className="sr-only">Waktu dan Lokasi Acara</h2>
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
            pointerEvents: 'auto',
            willChange: 'transform, opacity'
          }}
        >
          <motion.a
            href="https://maps.app.goo.gl/fmGoeTmUgq1kojvv7"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              backgroundImage: 'url("/images/malang.webp")',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              cursor: 'pointer'
            }}
          />
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
              pointerEvents: 'auto',
              willChange: 'transform, opacity'
            }}
          >
            <motion.a
              href="https://maps.app.goo.gl/8jR9zGpQnpiVZQMi6?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                backgroundImage: 'url("/images/brebes-akad.webp")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                cursor: 'pointer'
              }}
            />
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
              pointerEvents: 'auto',
              willChange: 'transform, opacity'
            }}
          >
            <motion.a
              href="https://maps.app.goo.gl/8jR9zGpQnpiVZQMi6?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                backgroundImage: 'url("/images/brebes-resepsi.webp")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                cursor: 'pointer'
              }}
            />
          </motion.div>
        </>
      )}

    </section>
  );
};

export default React.memo(Events);
