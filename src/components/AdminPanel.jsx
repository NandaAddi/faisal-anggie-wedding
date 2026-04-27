import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AdminPanel = () => {
  const [guestName, setGuestName] = useState('');
  const [invitationType, setInvitationType] = useState('wanita');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState({});
  const [isReplying, setIsReplying] = useState(null);

  useEffect(() => {
    // Memastikan halaman admin selalu bisa di-scroll (meng-override setelan hidden di App.jsx)
    document.body.style.overflowY = 'auto';
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    setIsLoading(true);
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

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/?to=${encodeURIComponent(guestName.trim())}&type=${invitationType}`;
    setGeneratedUrl(url);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    alert('Link berhasil disalin!');
  };

  const copyWhatsApp = () => {
    const text = `Yth. ${guestName}\n\nAssalamualaikum Warahmatullahi Wabarakatuh\n\nDengan memohon Rahmat dan Ridho Allah SWT, dan tanpa mengurangi rasa hormat melalui pesan ini kami mengundang Bapak/Ibu/Saudara/I untuk menghadiri acara pernikahan/Ngunduh Mantu kami :\n\nAnggie Nadyasyifa & M. Faizal Riski\n\nBerikut link undangan kami, untuk info lengkap dari acara bisa kunjungi :\n${generatedUrl}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.\n\nMohon maaf perihal undangan hanya di bagikan melalui pesan ini.\n\nTerima kasih banyak atas perhatiannya.\nWassalamualaikum Warahmatullahi Wabarakatuh`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const handleExportCSV = () => {
    if (wishes.length === 0) {
      alert('Tidak ada data untuk diexport');
      return;
    }

    const headers = ['Nama', 'Kehadiran', 'Jumlah Orang', 'Ucapan', 'Balasan', 'Tanggal'];
    const csvRows = [headers.join(',')];

    wishes.forEach(wish => {
      const date = wish.created_at ? new Date(wish.created_at).toLocaleDateString('id-ID') : '';
      const escapeCSV = (str) => {
        if (!str) return '""';
        return `"${str.toString().replace(/"/g, '""')}"`;
      };
      
      const row = [
        escapeCSV(wish.name),
        escapeCSV(wish.attendance),
        wish.guest_count || 0,
        escapeCSV(wish.message),
        escapeCSV(wish.reply),
        escapeCSV(date)
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_tamu_undangan.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const submitReply = async (id) => {
    const text = replyText[id];
    if (!text?.trim()) return;

    setIsReplying(id);
    try {
      const { error } = await supabase
        .from('wishes')
        .update({ reply: text })
        .eq('id', id);

      if (error) {
        alert('Gagal mengirim balasan.');
        console.error(error);
      } else {
        alert('Balasan berhasil dikirim!');
        fetchWishes(); // Refresh data
        setReplyText(prev => ({ ...prev, [id]: '' }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsReplying(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus ucapan ini? Tindakan ini tidak dapat dibatalkan.')) return;

    try {
      const { error } = await supabase
        .from('wishes')
        .delete()
        .eq('id', id);

      if (error) {
        alert('Gagal menghapus ucapan.');
        console.error(error);
      } else {
        alert('Ucapan berhasil dihapus!');
        fetchWishes(); // Refresh data
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate Stats
  const statHadir = wishes.filter(w => w.attendance === 'Hadir').length;
  const statTidakHadir = wishes.filter(w => w.attendance === 'Tidak Hadir').length;
  const statRagu = wishes.filter(w => w.attendance === 'Ragu').length;
  const statTotalTamu = wishes.reduce((sum, w) => sum + (w.guest_count || 0), 0);

  return (
    <>
      <style>
        {`
          /* Font and Global Resets */
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          .admin-container {
            padding: 2rem;
            font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #FAFAFA;
            min-height: 100vh;
            color: #111827;
            line-height: 1.5;
          }
          
          /* Override global headings that force latin fonts */
          .admin-container h1, 
          .admin-container h2, 
          .admin-container h3, 
          .admin-container h4 {
            font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          }
          
          .admin-wrapper {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          /* Header */
          .admin-header {
            margin-bottom: 2.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.5rem;
          }
          .admin-header-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: #111827;
            letter-spacing: -0.02em;
            margin: 0 0 0.2rem 0;
          }
          .admin-header-subtitle {
            margin: 0;
            color: #6B7280;
            font-size: 0.95rem;
          }
          .btn-outline {
            background: transparent;
            color: #374151;
            border: 1px solid #D1D5DB;
            padding: 0.6rem 1.2rem;
            border-radius: 8px;
            font-weight: 500;
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
          .btn-outline:hover {
            background: #F3F4F6;
            color: #111827;
          }
          
          /* Layout */
          .admin-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            align-items: flex-start;
          }
          .admin-col-left {
            flex: 1 1 350px;
            background-color: #FFFFFF;
            padding: 2rem;
            border-radius: 16px;
            border: 1px solid #F3F4F6;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          }
          .admin-col-right {
            flex: 2 1 500px;
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
          .admin-card {
            background-color: #FFFFFF;
            padding: 2rem;
            border-radius: 16px;
            border: 1px solid #F3F4F6;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          }
          
          /* Forms and Inputs */
          .input-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #374151;
            font-size: 0.9rem;
          }
          .admin-input {
            width: 100%;
            padding: 0.8rem 1rem;
            border-radius: 8px;
            border: 1px solid #D1D5DB;
            font-size: 0.95rem;
            outline: none;
            box-sizing: border-box;
            transition: all 0.2s;
            font-family: inherit;
          }
          .admin-input:focus {
            border-color: #A0854D;
            box-shadow: 0 0 0 3px rgba(160, 133, 77, 0.1);
          }
          
          /* Buttons */
          .btn-primary {
            background-color: #111827;
            color: #FFFFFF;
            padding: 0.8rem 1.2rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.95rem;
            font-weight: 500;
            width: 100%;
            transition: all 0.2s;
            font-family: inherit;
          }
          .btn-primary:hover {
            background-color: #374151;
            transform: translateY(-1px);
          }
          .btn-secondary {
            background-color: #F9FAFB;
            color: #374151;
            border: 1px solid #D1D5DB;
            padding: 0.8rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
            font-family: inherit;
          }
          .btn-secondary:hover {
            background-color: #F3F4F6;
          }
          .btn-whatsapp {
            background-color: #22C55E;
            color: white;
            border: none;
            padding: 0.8rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
            font-family: inherit;
          }
          .btn-whatsapp:hover {
            background-color: #16A34A;
          }
          
          /* Stats Grid */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
            gap: 1rem;
          }
          .stat-box {
            padding: 1.5rem 1rem;
            border-radius: 12px;
            text-align: center;
            background-color: #F9FAFB;
            border: 1px solid #F3F4F6;
            transition: transform 0.2s;
          }
          .stat-box:hover {
            transform: translateY(-2px);
          }
          .stat-value {
            margin: 0 0 0.3rem 0;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #111827;
          }
          .stat-label {
            margin: 0;
            font-size: 0.75rem;
            font-weight: 600;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          /* Badges */
          .badge {
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            display: inline-block;
          }
          .badge-hadir {
            background-color: #ECFDF5;
            color: #059669;
          }
          .badge-tidak {
            background-color: #FEF2F2;
            color: #DC2626;
          }
          .badge-ragu {
            background-color: #FFFBEB;
            color: #D97706;
          }
          
          /* Wish Item */
          .wish-item {
            padding: 1.5rem;
            border-bottom: 1px solid #F3F4F6;
          }
          .wish-item:last-child {
            border-bottom: none;
          }
          
          /* Responsiveness */
          @media (max-width: 768px) {
            .admin-container { padding: 1rem; }
            .admin-header-title { font-size: 1.5rem; }
            .admin-col-left, .admin-card { padding: 1.5rem; }
            .stats-grid { grid-template-columns: 1fr 1fr; }
            .stat-box.full-width { grid-column: 1 / -1; }
            .btn-group { flex-direction: column; }
            .btn-group > button { width: 100%; }
          }
          
          .btn-delete {
            background: transparent;
            color: #9CA3AF;
            border: none;
            padding: 4px;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .btn-delete:hover {
            color: #EF4444;
            background-color: #FEF2F2;
          }
        `}
      </style>
      
      <div className="admin-container">
        <div className="admin-wrapper">
          
          <header className="admin-header">
            <div>
              <h1 className="admin-header-title">Admin Dashboard</h1>
              <p className="admin-header-subtitle">Kelola tautan undangan dan pantau kehadiran tamu.</p>
            </div>
            <a href="/" className="btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              Kembali
            </a>
          </header>

          <div className="admin-grid">
            
            {/* LINK GENERATOR */}
            <div className="admin-col-left">
              <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>Buat Link Undangan</h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="input-label">Nama Tamu</label>
                <input 
                  type="text" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="admin-input"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="input-label">Pihak Mempelai</label>
                <select 
                  value={invitationType}
                  onChange={(e) => setInvitationType(e.target.value)}
                  className="admin-input"
                >
                  <option value="wanita">Mempelai Wanita (Default)</option>
                  <option value="pria">Mempelai Pria</option>
                </select>
              </div>
              
              <button onClick={handleGenerate} className="btn-primary">
                Buat Link
              </button>

              {generatedUrl && (
                <div style={{ marginTop: '2rem', padding: '1.25rem', backgroundColor: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '12px' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontWeight: 600, color: '#4B5563' }}>Link Berhasil Dibuat:</p>
                  <p style={{ margin: '0 0 1.25rem 0', wordBreak: 'break-all', backgroundColor: '#FFFFFF', padding: '0.8rem', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '0.85rem' }}>
                    <a href={generatedUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'none' }}>{generatedUrl}</a>
                  </p>
                  <div className="btn-group" style={{ display: 'flex', gap: '0.8rem' }}>
                    <button onClick={copyUrl} className="btn-secondary" style={{ flex: 1 }}>
                      Salin Link
                    </button>
                    <button onClick={copyWhatsApp} className="btn-whatsapp" style={{ flex: 1 }}>
                      WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STATS & WISHES */}
            <div className="admin-col-right">
              
              {/* Box 1: Statistik */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>Statistik Kehadiran</h2>
                  <button onClick={handleExportCSV} className="btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Export CSV
                  </button>
                </div>

                <div className="stats-grid">
                  <div className="stat-box">
                    <h3 className="stat-value">{wishes.length}</h3>
                    <p className="stat-label">Total RSVP</p>
                  </div>
                  <div className="stat-box" style={{backgroundColor: '#ECFDF5', borderColor: '#D1FAE5'}}>
                    <h3 className="stat-value" style={{color: '#059669'}}>{statHadir}</h3>
                    <p className="stat-label" style={{color: '#059669'}}>Hadir</p>
                  </div>
                  <div className="stat-box" style={{backgroundColor: '#FEF2F2', borderColor: '#FEE2E2'}}>
                    <h3 className="stat-value" style={{color: '#DC2626'}}>{statTidakHadir}</h3>
                    <p className="stat-label" style={{color: '#DC2626'}}>Tidak Hadir</p>
                  </div>
                  <div className="stat-box" style={{backgroundColor: '#FFFBEB', borderColor: '#FEF3C7'}}>
                    <h3 className="stat-value" style={{color: '#D97706'}}>{statRagu}</h3>
                    <p className="stat-label" style={{color: '#D97706'}}>Ragu</p>
                  </div>
                  <div className="stat-box full-width" style={{backgroundColor: '#EFF6FF', borderColor: '#DBEAFE'}}>
                    <h3 className="stat-value" style={{color: '#2563EB'}}>{statTotalTamu}</h3>
                    <p className="stat-label" style={{color: '#2563EB'}}>Estimasi Total Tamu</p>
                  </div>
                </div>
              </div>

              {/* Box 2: Daftar Ucapan */}
              <div className="admin-card" style={{ padding: '0' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #F3F4F6' }}>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>Buku Tamu</h2>
                </div>
                
                {isLoading ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>Memuat data...</div>
                ) : wishes.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>Belum ada data RSVP.</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {wishes.map((wish) => (
                      <div key={wish.id} className="wish-item">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div>
                            <strong style={{ fontSize: '1rem', color: '#111827', display: 'block' }}>{wish.name}</strong>
                            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{wish.created_at ? new Date(wish.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}) : ''}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                            <span className={`badge ${wish.attendance === 'Hadir' ? 'badge-hadir' : wish.attendance === 'Tidak Hadir' ? 'badge-tidak' : 'badge-ragu'}`}>
                              {wish.attendance} {wish.attendance === 'Hadir' && `(${wish.guest_count || 0})`}
                            </span>
                            <button 
                              onClick={() => handleDelete(wish.id)}
                              className="btn-delete"
                              title="Hapus Ucapan"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <p style={{ margin: '0 0 1rem 0', color: '#4B5563', fontSize: '0.9rem', lineHeight: '1.5' }}>"{wish.message}"</p>
                        
                        {wish.reply ? (
                          <div style={{ backgroundColor: '#F9FAFB', padding: '0.8rem 1rem', borderRadius: '8px', borderLeft: '3px solid #D1D5DB' }}>
                            <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>DIBALAS:</span>
                            <p style={{ margin: 0, color: '#374151', fontSize: '0.85rem' }}>{wish.reply}</p>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <input 
                              type="text" 
                              placeholder="Ketik balasan..."
                              value={replyText[wish.id] || ''}
                              onChange={(e) => setReplyText(prev => ({ ...prev, [wish.id]: e.target.value }))}
                              className="admin-input"
                              style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem' }}
                            />
                            <button 
                              onClick={() => submitReply(wish.id)}
                              disabled={isReplying === wish.id || !replyText[wish.id]?.trim()}
                              className="btn-secondary"
                              style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', opacity: (isReplying === wish.id || !replyText[wish.id]?.trim()) ? 0.5 : 1 }}
                            >
                              Balas
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
