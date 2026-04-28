import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SplineScene } from './ui/SplineScene';

export default function Hero({ onNavigate }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--background)' }}>
      {/* Spotlight Effect */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
          
          {/* Left Column: Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ flex: '1 1 45%', minWidth: '300px', zIndex: 20 }}
          >
            <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
              <span style={{ 
                display: 'inline-block', 
                padding: '0.4rem 1rem', 
                borderRadius: '100px', 
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: 'rgba(255,255,255,0.02)',
                color: '#fff',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                ✨ Yeni Nesil Deneyim
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff' }}>
              Markanızın <br />
              <span style={{ 
                background: 'linear-gradient(to right, #ffffff, #71717a)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Playfair Display, serif'
              }}>
                Dijital İmzası
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} style={{ fontSize: '1.15rem', color: 'var(--muted)', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '90%' }}>
              Şirketinize özel, standartların ötesinde kurumsal web siteleri ve dijital deneyimler tasarlıyoruz. Sizi geleceğe taşıyacak 3D ve etkileşimli altyapılar.
            </motion.p>

            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate && onNavigate('pricing')}
                className="shiny-cta"
              >
                <span>Fiyatlandırma <ArrowRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '0.3rem' }} /></span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Spline 3D Scene */}
          <div style={{ flex: '1 1 45%', minWidth: '300px', height: '600px', position: 'relative', zIndex: 10 }}>
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 0.3 }}
               style={{ width: '100%', height: '100%' }}
             >
               <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
