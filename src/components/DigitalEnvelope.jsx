import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BankCard = ({ logoUrl, accountName, accountNumber, bankName }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: '#CDB17F',
        padding: '0.8rem',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '70%',
        maxWidth: '220px',
        margin: '0 auto',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 20
      }}
    >
      <img src={logoUrl} alt={bankName} style={{ height: '24px', marginBottom: '0.5rem', objectFit: 'contain' }} />

      <div style={{
        backgroundColor: '#FDF9F1',
        padding: '0.3rem 0.8rem',
        borderRadius: '3px',
        width: '100%',
        textAlign: 'center',
        marginBottom: '0.4rem',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <span style={{ color: '#2A1B16', fontWeight: 'bold', fontSize: '0.9rem', fontFamily: 'sans-serif', letterSpacing: '1px' }}>
          {accountNumber}
        </span>
      </div>

      <p style={{
        color: '#2A1B16',
        fontFamily: 'var(--font-body)',
        fontWeight: 'bold',
        fontSize: '0.75rem',
        marginBottom: '0.6rem',
        textAlign: 'center',
        textTransform: 'capitalize'
      }}>
        {accountName}
      </p>

      <button
        onClick={handleCopy}
        style={{
          backgroundColor: '#2A1B16',
          color: '#E4C88E',
          border: '1px solid #E4C88E',
          padding: '6px 14px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.7rem',
          fontWeight: 'bold',
          fontFamily: 'var(--font-body)',
          transition: 'all 0.3s ease',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#3A2720';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#2A1B16';
        }}
      >
        {copied ? (
          <>
            <span style={{ fontSize: '0.8rem' }}>✓</span> Disalin
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Salin">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Salin Rekening
          </>
        )}
      </button>
    </motion.div>
  );
};

const DigitalEnvelope = () => {
  const [showPopup, setShowPopup] = useState(false);

  const locations = {
    pria: "https://maps.app.goo.gl/fmGoeTmUgq1kojvv7",
    wanita: "https://maps.app.goo.gl/8jR9zGpQnpiVZQMi6?g_st=ic"
  };

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

      {/* Amplop Digital Title Layer */}
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
          backgroundImage: 'url("/images/amplop-digital.avif")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateY(-25px)'
        }}>
          <h2 className="sr-only">Amplop Digital & Kado Pernikahan</h2>
        </div>
      </motion.div>

      {/* Kirim Kado Layer (Interactive) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onClick={() => setShowPopup(true)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 15, // Raised z-index
          pointerEvents: 'auto', // Enabled pointer events
          cursor: 'pointer'
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/images/kirim-kado.avif")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateY(25px)'
        }} />
      </motion.div>

      {/* Interactive Bank Cards Layer */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0'
      }}>
        <BankCard
          logoUrl="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg"
          bankName="BCA"
          accountNumber="8040187392"
          accountName="Anggie Nadyasyifa"
        />
        <BankCard
          logoUrl="https://upload.wikimedia.org/wikipedia/commons/a/a0/Bank_Syariah_Indonesia.svg"
          bankName="BSI"
          accountNumber="7191713887"
          accountName="Muhammad Faizal Riski"
        />
      </div>

      {/* Location Popup Overlay */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backdropFilter: 'blur(5px)',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#2A1B16',
                border: '2px solid #E4C88E',
                borderRadius: '12px',
                padding: '2rem',
                width: '100%',
                maxWidth: '320px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              <h3 style={{
                color: '#E4C88E',
                fontFamily: 'var(--font-body)',
                fontSize: '1.4rem',
                marginBottom: '1.5rem'
              }}>
                Lokasi Pengiriman Kado
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a
                  href={locations.wanita}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#E4C88E',
                    color: '#2A1B16',
                    padding: '12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Rumah Mempelai Wanita
                </a>
                <a
                  href={locations.pria}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#E4C88E',
                    border: '1px solid #E4C88E',
                    padding: '12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Rumah Mempelai Pria
                </a>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                style={{
                  marginTop: '1.5rem',
                  backgroundColor: 'transparent',
                  color: 'rgba(228, 200, 142, 0.6)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  textDecoration: 'underline'
                }}
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default DigitalEnvelope;
