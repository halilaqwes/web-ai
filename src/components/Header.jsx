import { motion } from 'framer-motion';

export default function Header({ onNavigate }) {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 3rem',
      background: 'transparent',
    }}>
      {/* Logo - Neon green like DATASCAPE */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#00ff88',
          textShadow: '0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.15)',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Web Ai
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('ai-chat'); }} style={{
          color: '#00ff88',
          textDecoration: 'none',
          fontSize: '1.4rem',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          transition: 'all 0.3s ease',
          fontFamily: 'Inter, sans-serif',
          textShadow: '0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.15)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => { e.target.style.textShadow = '0 0 25px rgba(0,255,136,0.6), 0 0 50px rgba(0,255,136,0.3)'; }}
        onMouseLeave={(e) => { e.target.style.textShadow = '0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.15)'; }}
        >
          AI
        </a>
        <a href="#hero" style={{
          color: 'rgba(255,255,255,0.85)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
          transition: 'color 0.3s ease',
          fontFamily: 'Inter, sans-serif',
        }}
        onMouseEnter={(e) => e.target.style.color = '#fff'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.85)'}
        >
          Ana Sayfa
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('pricing'); }} style={{
          color: 'rgba(255,255,255,0.85)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
          transition: 'color 0.3s ease',
          fontFamily: 'Inter, sans-serif',
        }}
        onMouseEnter={(e) => e.target.style.color = '#fff'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.85)'}
        >
          Fiyatlandırma
        </a>
        <a href="#contact" style={{
          color: 'rgba(255,255,255,0.85)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
          transition: 'color 0.3s ease',
          fontFamily: 'Inter, sans-serif',
        }}
        onMouseEnter={(e) => e.target.style.color = '#fff'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.85)'}
        >
          Bizimle İletişime Geç
        </a>
      </motion.nav>
    </header>
  );
}
