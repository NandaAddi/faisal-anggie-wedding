import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const WishesList = () => {
  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchWishes();
    
    // Real-time subscription to automatically show new wishes
    const subscription = supabase
      .channel('wishes_channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wishes' }, payload => {
        setWishes(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setWishes(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(wishes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWishes = wishes.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <section style={{ 
      position: 'relative', 
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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

      {/* Container Ucapan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative',
          zIndex: 20,
          width: '85%',
          maxWidth: '350px',
          backgroundColor: 'rgba(42, 27, 22, 0.85)',
          border: '1px solid #E4C88E',
          borderRadius: '8px',
          padding: '1.5rem',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '450px' // Keep a consistent height for the card
        }}
      >
        <h3 style={{ 
          color: '#E4C88E', 
          textAlign: 'center', 
          fontFamily: 'var(--font-heading)', 
          fontSize: '2rem', 
          margin: '0 0 1.5rem 0',
          borderBottom: '1px solid rgba(228, 200, 142, 0.3)',
          paddingBottom: '0.5rem'
        }}>
          Buku Tamu
        </h3>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isLoading ? (
            <p style={{ textAlign: 'center', color: '#FDF9F1' }}>Memuat ucapan...</p>
          ) : currentWishes.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#FDF9F1' }}>Belum ada ucapan. Jadilah yang pertama!</p>
          ) : (
            currentWishes.map((wish, index) => (
              <motion.div 
                key={wish.id || index} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                style={{ borderBottom: '1px solid rgba(228, 200, 142, 0.2)', paddingBottom: '0.8rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h4 style={{ color: '#E4C88E', fontSize: '1rem', margin: 0, fontFamily: 'var(--font-body)', fontWeight: 'bold' }}>{wish.name}</h4>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '2px 6px', 
                    borderRadius: '4px', 
                    backgroundColor: wish.attendance === 'Hadir' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                    color: wish.attendance === 'Hadir' ? '#81C784' : '#E57373',
                    fontWeight: 'bold'
                  }}>
                    {wish.attendance}
                  </span>
                </div>
                <p style={{ color: '#FDF9F1', fontSize: '0.85rem', lineHeight: '1.4', margin: '0 0 0.3rem 0', wordBreak: 'break-word' }}>
                  {wish.message}
                </p>
                {wish.created_at && (
                  <span style={{ fontSize: '0.7rem', color: 'rgba(253, 249, 241, 0.5)' }}>
                    {formatDate(wish.created_at)}
                  </span>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.5rem',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(228, 200, 142, 0.3)'
          }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px',
                  border: '1px solid #E4C88E',
                  backgroundColor: currentPage === page ? '#E4C88E' : 'transparent',
                  color: currentPage === page ? '#2A1B16' : '#E4C88E',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default WishesList;
