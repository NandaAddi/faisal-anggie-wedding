import React, { useState } from 'react';

const AdminPanel = () => {
  const [guestName, setGuestName] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/?to=${encodeURIComponent(guestName.trim())}`;
    setGeneratedUrl(url);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    alert('Link berhasil disalin!');
  };

  const copyWhatsApp = () => {
    const text = `Kepada Yth. ${guestName},\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.\n\nBerikut link undangan untuk info lengkap mengenai acara:\n${generatedUrl}\n\nMerupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
    navigator.clipboard.writeText(text);
    alert('Pesan WhatsApp berhasil disalin!');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', color: '#333' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#2A1B16' }}>Panel Admin: Buat Link Undangan</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nama Tamu Undangan:</label>
          <input 
            type="text" 
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Contoh: Bapak Budi Santoso"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', outline: 'none' }}
          />
        </div>
        
        <button 
          onClick={handleGenerate}
          style={{ backgroundColor: '#2A1B16', color: '#E4C88E', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', width: '100%' }}
        >
          Buat Link Spesial
        </button>

        {generatedUrl && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#fdf9f1', border: '1px solid #E4C88E', borderRadius: '4px' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Link Anda Siap:</p>
            <p style={{ margin: '0 0 1.5rem 0', wordBreak: 'break-all', color: '#0056b3', backgroundColor: 'rgba(0,0,0,0.05)', padding: '10px', borderRadius: '4px' }}>
              <a href={generatedUrl} target="_blank" rel="noopener noreferrer">{generatedUrl}</a>
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={copyUrl}
                style={{ flex: 1, backgroundColor: '#E4C88E', color: '#2A1B16', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Salin Link Saja
              </button>
              <button 
                onClick={copyWhatsApp}
                style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Salin Teks WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
