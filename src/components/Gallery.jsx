import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/images/IMG_9625.avif',
  '/images/IMG_9446.avif',
  '/images/IMG_9610.avif',
  '/images/IMG_9469.avif',
  '/images/IMG_9582.avif',
  '/images/IMG_9494.avif'
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#000' // Base color while loading
      }}>
        {/* Background Image - Optimized with <img> tag */}
        <img
          src="/images/background2.avif"
          alt=""
          loading="lazy"
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

        {/* Border Image - Optimized with <img> tag */}
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
            objectFit: 'cover',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        />

        {/* Our Gallery Title Layer */}
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{ duration: 1 }}
          src="/images/our-gallery.avif"
          alt="Our Gallery"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 10,
            pointerEvents: 'none',
            willChange: 'opacity'
          }}
        />

        {/* Doa Pengantin Layer */}
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          src="/images/doa-pengantin.avif"
          alt="Doa Pengantin"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 11,
            pointerEvents: 'none',
            willChange: 'opacity'
          }}
        />

        {/* Image Grid */}
        <div style={{
          position: 'relative',
          zIndex: 6,
          width: '100%',
          padding: '0 12%',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.8rem'
        }}>
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1, margin: "100px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onClick={() => setSelectedImage(img)}
              style={{
                aspectRatio: '3/4',
                overflow: 'hidden',
                backgroundColor: '#1a1a1a',
                cursor: 'pointer',
                borderRadius: '4px',
                willChange: 'transform, opacity'
              }}
            >
              <img
                src={img}
                alt={`Gallery ${index}`}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem',
              cursor: 'zoom-out',
              backdropFilter: 'blur(5px)' // Subtle blur for premium feel, but test if it lags
            }}
          >
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selectedImage}
              alt="Full size"
              decoding="async"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                cursor: 'default'
              }}
            />

            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                color: '#fff',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                fontSize: '2rem',
                cursor: 'pointer',
                zIndex: 10000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(10px)'
              }}
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;


