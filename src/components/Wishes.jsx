import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const Wishes = () => {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('Hadir');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching wishes:', error);
      } else {
        setWishes(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert('Mohon isi nama dan ucapan doa Anda.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('wishes')
        .insert([{ name, attendance, message }]);

      if (error) {
        alert('Koneksi Supabase belum diatur atau tabel belum ada.');
        console.error(error);
      } else {
        setName('');
        setAttendance('Hadir');
        setMessage('');
        fetchWishes(); // Refresh list
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to format date
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

      {/* Kehadiran Image Text Layer */}
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
          backgroundImage: 'url("/images/kehadiran.avif")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateY(-20px)'
        }} />
      </motion.div>

      {/* Form & Feed Container */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        gap: '2rem' // Jarak antara form dan daftar ucapan
      }}>
        
        {/* Form Input */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            textAlign: 'left',
            backgroundColor: 'rgba(42, 27, 22, 0.85)',
            border: '1px solid #E4C88E',
            padding: '1.5rem',
            borderRadius: '8px',
            width: '85%',
            maxWidth: '320px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(5px)'
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#E4C88E' }}>Nama Lengkap</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda" 
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '4px', 
                border: '1px solid rgba(228, 200, 142, 0.5)', 
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                color: '#FDF9F1',
                fontFamily: 'var(--font-body)',
                outline: 'none'
              }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#E4C88E' }}>Konfirmasi Kehadiran</label>
            <select 
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '4px', 
                border: '1px solid rgba(228, 200, 142, 0.5)', 
                backgroundColor: '#2A1B16', 
                color: '#FDF9F1',
                fontFamily: 'var(--font-body)',
                outline: 'none'
              }}
            >
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#E4C88E' }}>Ucapan & Doa</label>
            <textarea 
              rows="3" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa..." 
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '4px', 
                border: '1px solid rgba(228, 200, 142, 0.5)', 
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                color: '#FDF9F1',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                resize: 'vertical'
              }}
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            style={{ 
              marginTop: '0.5rem',
              backgroundColor: isSubmitting ? '#A0854D' : '#CDB17F',
              color: '#2A1B16',
              border: 'none',
              padding: '12px',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontFamily: 'var(--font-body)',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              if(!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#E4C88E';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              if(!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#CDB17F';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
        </motion.form>

      </div>
    </section>
  );
};

export default Wishes;
