import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';

const images = [
  '/images/IMG_9625.avif',
  '/images/IMG_9446.avif',
  '/images/IMG_9610.avif',
  '/images/IMG_9446.avif', // Menambah agar lebih panjang
  '/images/IMG_9469.avif',
  '/images/IMG_9582.avif',
  '/images/IMG_9494.avif'
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const controls = useAnimation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: [0, -((images.length - 1) * 280), 0],
        transition: {
          duration: images.length * 5,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror"
        }
      });
    } else {
      controls.stop();
    }
  }, [isInView, controls]);

  return (
    <>
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#000'
      }}>
        {/* Background Image */}
        <img
          src="/images/background2.avif"
          alt=""
          loading="lazy"
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

        {/* Our Gallery Title Layer */}
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1 }}
          src="/images/our-gallery.avif"
          alt="Our Gallery"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />

        {/* Doa Pengantin Layer */}
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
          src="/images/doa-pengantin.avif"
          alt="Doa Pengantin"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 11,
            pointerEvents: 'none'
          }}
        />

        {/* Image Slider Container */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            zIndex: 4, // Behind the border (5)
            width: '100%',
            marginTop: '5vh',
            overflow: 'hidden'
          }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -((images.length - 1) * 280) }}
            animate={controls}
            onDragStart={() => controls.stop()} // Stop auto-slide on drag
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '0 10%',
              cursor: 'grab'
            }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                onClick={() => setSelectedImage(img)}
                style={{
                  minWidth: '260px',
                  width: '260px',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  backgroundColor: '#1a1a1a',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                  flexShrink: 0,
                  border: '1px solid rgba(228, 200, 142, 0.3)'
                }}
              >
                <img
                  src={img}
                  alt={`Gallery ${index}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Hint */}
          <div style={{
            width: '100%',
            textAlign: 'center',
            marginTop: '1.5rem',
            color: '#E4C88E',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-body)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            opacity: 0.8
          }}>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              backdropFilter: 'blur(5px)'
            }}
          >
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={selectedImage}
              alt="Full size"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
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


