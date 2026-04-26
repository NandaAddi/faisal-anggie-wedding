import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Music, Music4 } from 'lucide-react';
import Hero from './components/Hero';
import Opening from './components/Opening';
import Couple from './components/Couple';
import Events from './components/Events';
import Gallery from './components/Gallery';
import DigitalEnvelope from './components/DigitalEnvelope';
import Wishes from './components/Wishes';
import WishesList from './components/WishesList';
import Closing from './components/Closing';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [invitationType, setInvitationType] = useState('wanita');

  useEffect(() => {
    // Ambil nama tamu dan tipe undangan dari URL
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    const type = params.get('type');
    
    if (to) setGuestName(to);
    if (type === 'pria' || type === 'wanita') setInvitationType(type);
  }, []);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      document.body.style.overflowY = 'auto';
      return;
    }

    let timer;
    if (isOpen) {
      // Tunggu animasi gerbang selesai (3.5 detik) sebelum bisa di-scroll
      timer = setTimeout(() => {
        document.body.style.overflowY = 'auto';
      }, 3500);
      
      window.scrollTo(0, 0);
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
      }
      setIsPlaying(true);
    } else {
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      if (timer) clearTimeout(timer);
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Simple routing for Admin Panel
  if (window.location.pathname === '/admin') {
    return <AdminPanel />;
  }

  return (
    <div className="container">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="hero-overlay"
            initial={{ y: 0 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              zIndex: 50,
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'var(--color-bg-dark)'
            }}
          >
            <div style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
              <Hero onOpen={() => setIsOpen(true)} guestName={guestName} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
        <Opening isOpen={isOpen} />
        <Couple />
        <Events invitationType={invitationType} />
        <Gallery />
        <DigitalEnvelope />
        <Wishes />
        <WishesList />
        <Closing />
      </main>

      {/* Floating Audio Button */}
      {isOpen && (
        <button
          onClick={toggleAudio}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-gold)',
            color: 'var(--color-bg-dark)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
            zIndex: 40
          }}
        >
          {isPlaying ? <Music size={20} /> : <Music4 size={20} />}
        </button>
      )}
      {/* Audio Element */}
      <audio ref={audioRef} src="/backsound.mp3" loop />
    </div>
  );
}

export default App;
