import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// All features across all plans, ordered by tier/value
const allFeatures = [
  'Modern & Mobil Uyumlu Tasarım',
  'Temel SEO Yapılandırması',
  'Hızlı Yükleme Performansı',
  'İletişim Formu Entegrasyonu',
  'Özel 3D Animasyonlar',
  'Gelişmiş SEO & Anahtar Kelime',
  'Google Analytics & Analiz',
  'Sınırsız Alt Sayfa Oluşturma',
  'E-ticaret Alt Yapısı',
  'Özel 3D Sahne Tasarımı',
  '7/24 Öncelikli Teknik Destek',
  'Yapay Zeka Destekli İçerik',
];

const monthlySpecificFeatures = [
  'Aylık Site Denetleme & Raporlama',
  'Sürekli Teknik Destek & Güncelleme',
];

const plans = [
  {
    name: 'Başlangıç',
    oncePrice: 2000,
    monthlyPrice: 1000, 
    included: [
      'Modern & Mobil Uyumlu Tasarım',
      'Temel SEO Yapılandırması',
      'Hızlı Yükleme Performansı',
      'İletişim Formu Entegrasyonu',
    ],
  },
  {
    name: 'Profesyonel',
    badge: 'Popüler',
    oncePrice: 5000,
    monthlyPrice: 2500,
    included: [
      'Modern & Mobil Uyumlu Tasarım',
      'Temel SEO Yapılandırması',
      'Hızlı Yükleme Performansı',
      'İletişim Formu Entegrasyonu',
      'Özel 3D Animasyonlar',
      'Gelişmiş SEO & Anahtar Kelime',
      'Google Analytics & Analiz',
      'Sınırsız Alt Sayfa Oluşturma',
    ],
  },
  {
    name: 'Kurumsal',
    oncePrice: 12000,
    monthlyPrice: 6000,
    included: allFeatures,
  },
];

export default function Pricing({ onBack }) {
  const canvasRef = useRef(null);

  // Canvas particle system - moving stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];
    const COUNT = 80;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.15 + Math.random() * 0.4,
        o: 0.15 + Math.random() * 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fillRect(p.x, p.y, 0.7, 2.2);
        p.y -= p.speed;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  // Grid line animation keyframes
  const gridLineStyle = {
    position: 'absolute',
    backgroundColor: '#27272a',
    pointerEvents: 'none',
  };

  const [period, setPeriod] = useState(0);
  const [active, setActive] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090b',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4rem, 10vh, 6rem) 1.5rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Layer 1: Radial glow vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(80% 60% at 50% 12%, rgba(255,255,255,0.06), transparent 60%)',
      }} />

      {/* Layer 2: Animated grid lines */}
      <div style={{ ...gridLineStyle, top: '18%', left: 0, right: 0, height: '1px', transformOrigin: 'left', animation: 'drawX 1.5s ease-out forwards' }} />
      <div style={{ ...gridLineStyle, top: '50%', left: 0, right: 0, height: '1px', transformOrigin: 'center', animation: 'drawX 1.8s ease-out 0.2s forwards' }} />
      <div style={{ ...gridLineStyle, top: '82%', left: 0, right: 0, height: '1px', transformOrigin: 'right', animation: 'drawX 1.5s ease-out 0.4s forwards' }} />
      <div style={{ ...gridLineStyle, left: '22%', top: 0, bottom: 0, width: '1px', transformOrigin: 'top', animation: 'drawY 1.5s ease-out forwards' }} />
      <div style={{ ...gridLineStyle, left: '50%', top: 0, bottom: 0, width: '1px', transformOrigin: 'center', animation: 'drawY 1.8s ease-out 0.2s forwards' }} />
      <div style={{ ...gridLineStyle, left: '78%', top: 0, bottom: 0, width: '1px', transformOrigin: 'top', animation: 'drawY 1.5s ease-out 0.4s forwards' }} />

      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.5, mixBlendMode: 'screen', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        onClick={onBack}
        style={{
          position: 'absolute', top: '1.5rem', left: '1.5rem',
          fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: '#00ff88',
          textShadow: '0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.15)',
          cursor: 'pointer', fontFamily: 'Inter, sans-serif', zIndex: 100,
        }}
      >
        Web Ai
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}
      >
        Fiyatlandırma
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ color: '#737373', marginBottom: '2rem', fontSize: '0.9rem', textAlign: 'center' }}
      >
        İhtiyacınıza uygun planı seçin.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          display: 'flex', backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '9999px', padding: '4px', marginBottom: '2.5rem',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {['Tek Seferlik', 'Aylık'].map((label, i) => (
          <button
            key={label}
            onClick={() => setPeriod(i)}
            style={{
              padding: '0.5rem 1.25rem', borderRadius: '9999px',
              border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
              transition: 'all 0.3s ease',
              backgroundColor: period === i ? '#fff' : 'transparent',
              color: period === i ? '#000' : '#737373',
            }}
          >
            {label}
          </button>
        ))}
      </motion.div>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: '1rem',
        width: '100%', maxWidth: '480px',
      }}>
        {plans.map((plan, i) => {
          const isActive = active === i;
          
          // Sort features: included first, then excluded
          const combinedFeatures = [...allFeatures, ...monthlySpecificFeatures];
          const sortedFeatures = [...combinedFeatures].sort((a, b) => {
            const isMonthlyFeatureA = monthlySpecificFeatures.includes(a);
            const isMonthlyFeatureB = monthlySpecificFeatures.includes(b);
            
            const aInc = plan.included.includes(a) || (period === 1 && isMonthlyFeatureA);
            const bInc = plan.included.includes(b) || (period === 1 && isMonthlyFeatureB);
            
            if (aInc && !bInc) return -1;
            if (!aInc && bInc) return 1;
            return 0;
          });

          return (
            <div key={plan.name} style={{ width: '100%' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 120 }}
                onClick={() => setActive(i)}
                style={{
                  padding: '1.2rem 1.5rem',
                  borderRadius: isActive ? '1rem 1rem 0 0' : '1rem',
                  border: isActive ? '2px solid rgba(255,255,255,0.6)' : '2px solid rgba(255,255,255,0.08)',
                  borderBottom: isActive ? '1px solid rgba(255,255,255,0.1)' : undefined,
                  backgroundColor: isActive ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{plan.name}</span>
                    {plan.badge && (
                      <span style={{
                        fontSize: '0.55rem', fontWeight: 700, padding: '0.15rem 0.5rem',
                        borderRadius: '9999px', backgroundColor: 'rgba(250,204,21,0.15)',
                        color: '#facc15', textTransform: 'uppercase',
                      }}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                    ₺{(period === 0 ? plan.oncePrice : plan.monthlyPrice).toLocaleString('tr-TR')}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#737373', marginLeft: '0.25rem' }}>
                    {period === 0 ? '' : '/ay'}
                  </span>
                </div>

                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  border: isActive ? '2px solid #fff' : '2px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  {isActive && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#fff' }} />}
                </div>
              </motion.div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      padding: '1rem 1.5rem', borderRadius: '0 0 1rem 1rem',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '2px solid rgba(255,255,255,0.6)', borderTop: 'none',
                      overflow: 'hidden',
                    }}
                  >
                    {sortedFeatures.map((f) => {
                      const isMonthlyOnly = monthlySpecificFeatures.includes(f);
                      const included = plan.included.includes(f) || (period === 1 && isMonthlyOnly);
                      
                      return (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                          {included ? (
                            <Check size={12} style={{ color: '#00ff88', flexShrink: 0 }} />
                          ) : (
                            <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 700, width: '12px', textAlign: 'center', flexShrink: 0 }}>✕</span>
                          )}
                          <span style={{ 
                            fontSize: '0.75rem', 
                            color: included ? (isMonthlyOnly ? '#00ff88' : '#a3a3a3') : '#525252',
                            fontWeight: isMonthlyOnly && included ? 600 : 400
                          }}>
                            {f}
                            {isMonthlyOnly && period === 1 && <span style={{ fontSize: '0.65rem', marginLeft: '4px', opacity: 0.8 }}>(Bonus)</span>}
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '1rem',
            border: 'none',
            backgroundColor: '#fff',
            color: '#000',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: '0.5rem',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#e5e5e5'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = '#fff'; }}
        >
          Hemen Başla
        </motion.button>
      </div>
    </motion.div>
  );
}
