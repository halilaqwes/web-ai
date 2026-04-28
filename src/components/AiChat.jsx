import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sparkles, Bot } from 'lucide-react';

// Preset Q&A data
const presetQA = [
  {
    question: 'Web Ai hangi hizmetleri sunuyor?',
    answer:
      'Web Ai olarak kurumsal web sitesi tasarımı, 3D animasyon entegrasyonu, mobil uyumlu arayüz geliştirme, SEO optimizasyonu, e-ticaret altyapısı ve yapay zeka destekli içerik üretimi hizmetleri sunuyoruz. Her projemizde en son teknolojileri kullanarak markanızı dijital dünyada öne çıkarıyoruz.',
  },
  {
    question: 'Fiyatlandırma paketleri nelerdir?',
    answer:
      'Üç farklı paketimiz mevcut: Başlangıç paketi ₺2.000\'den başlayan fiyatlarla temel web sitesi ihtiyaçlarınızı karşılar. Profesyonel paket ₺5.000\'den başlar ve 3D animasyonlar, gelişmiş SEO içerir. Kurumsal paket ise ₺12.000\'den başlayarak tüm hizmetlerimizi ve 7/24 öncelikli destek sunar.',
  },
  {
    question: '3D animasyon desteği var mı?',
    answer:
      'Evet! Spline ve Three.js teknolojilerini kullanarak web sitenize etkileşimli 3D modeller, animasyonlu sahneler ve immersive deneyimler ekliyoruz. Profesyonel ve Kurumsal paketlerimizde özel 3D sahne tasarımı hizmetimiz bulunmaktadır.',
  },
  {
    question: 'Proje süreci nasıl işliyor?',
    answer:
      'Sürecimiz 4 aşamadan oluşur: 1) Keşif & Analiz — ihtiyaçlarınızı ve hedeflerinizi belirliyoruz. 2) Tasarım — wireframe ve UI/UX tasarımı oluşturuyoruz. 3) Geliştirme — modern teknolojilerle kodlama yapıyoruz. 4) Lansman & Destek — sitenizi yayına alıp sürekli destek sağlıyoruz.',
  },
  {
    question: 'SEO hizmetleri hakkında bilgi',
    answer:
      'Tüm paketlerimizde temel SEO yapılandırması dahildir. Profesyonel ve üzeri paketlerde gelişmiş anahtar kelime optimizasyonu, Google Analytics entegrasyonu, site hızı optimizasyonu, meta tag yönetimi ve arama motoru sıralamanızı yükseltmek için kapsamlı SEO stratejisi uyguluyoruz.',
  },
  {
    question: 'İletişime nasıl geçebilirim?',
    answer:
      'Bize web sitemiz üzerindeki iletişim formundan, info@webai.com.tr e-posta adresinden veya +90 (212) 555 0199 numaralı telefondan ulaşabilirsiniz. Ayrıca sosyal medya hesaplarımız üzerinden de mesaj atabilirsiniz. İş günlerinde 24 saat içinde dönüş sağlıyoruz.',
  },
];

export default function AiChat({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendQuestion = (qa) => {
    // Add user message
    setMessages((prev) => [...prev, { role: 'user', text: qa.question }]);
    setInputValue('');
    setShowSuggestions(false);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: qa.answer }]);
      // Show suggestions again after response
      setTimeout(() => setShowSuggestions(true), 300);
    }, 1200 + Math.random() * 800);
  };

  const handlePillClick = (qa) => {
    setInputValue(qa.question);
    // Small delay so user sees the question in input, then send
    setTimeout(() => handleSendQuestion(qa), 350);
  };

  const handleSendFromInput = () => {
    if (!inputValue.trim()) return;
    const match = presetQA.find((qa) => qa.question === inputValue.trim());
    if (match) {
      handleSendQuestion(match);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendFromInput();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090b',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Background layers */}
      <div className="bg-plus-pattern" />
      <div className="bg-plus-markers" />
      <div className="bg-center-glow" />

      {/* Top vignette gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(80% 45% at 50% 0%, rgba(0,255,136,0.03), transparent 60%)',
          zIndex: 0,
        }}
      />

      {/* Logo top-left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        onClick={onBack}
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '2rem',
          fontSize: '1.4rem',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#00ff88',
          textShadow:
            '0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.15)',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          zIndex: 100,
        }}
      >
        Web Ai
      </motion.div>

      {/* Main chat area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          padding: '0 1.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Chat content — scrollable */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '5rem',
            paddingBottom: '10rem',
          }}
        >
          {/* Welcome area — only shown when no messages */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                textAlign: 'center',
                marginTop: '12vh',
                marginBottom: '2.5rem',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  borderRadius: '1rem',
                  background: 'rgba(0,255,136,0.08)',
                  border: '1px solid rgba(0,255,136,0.15)',
                  marginBottom: '1.5rem',
                }}
              >
                <Sparkles size={26} color="#00ff88" />
              </div>
              <h1
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 700,
                  marginBottom: '0.6rem',
                  letterSpacing: '-0.02em',
                }}
              >
                <span style={{ color: '#fff' }}>Web Ai </span>
                <span
                  style={{
                    color: '#00ff88',
                    textShadow: '0 0 20px rgba(0,255,136,0.3)',
                  }}
                >
                  Asistan
                </span>
              </h1>
              <p
                style={{
                  color: '#737373',
                  fontSize: '1rem',
                  maxWidth: '400px',
                  margin: '0 auto',
                }}
              >
                Size nasıl yardımcı olabilirim? Aşağıdaki sorulardan birini
                seçerek başlayabilirsiniz.
              </p>
            </motion.div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`ai-chat-msg ${
                msg.role === 'user' ? 'ai-chat-msg-user' : 'ai-chat-msg-bot'
              }`}
              style={{
                marginBottom: '0.75rem',
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {msg.role === 'bot' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginBottom: '0.4rem',
                  }}
                >
                  <Bot size={14} color="#00ff88" />
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: '#00ff88',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Web Ai
                  </span>
                </div>
              )}
              {msg.text}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Bottom fixed area: suggestions + input */}
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '720px',
            padding: '0 1.5rem 1.5rem',
            zIndex: 10,
            background:
              'linear-gradient(to top, #09090b 60%, rgba(9,9,11,0.9) 80%, transparent 100%)',
          }}
        >
          {/* Suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}
              >
                {presetQA.map((qa, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="ai-suggestion-pill"
                    onClick={() => handlePillClick(qa)}
                    disabled={isTyping}
                    style={isTyping ? { opacity: 0.4, pointerEvents: 'none' } : {}}
                  >
                    {qa.question}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat input */}
          <div className="ai-chat-input-wrapper">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputValue}
              readOnly
              placeholder="Bir soru seçin veya yukarıdaki önerilerden birine tıklayın..."
              onKeyDown={handleKeyDown}
              style={{ cursor: 'default' }}
            />
            <button
              className="ai-chat-send-btn"
              onClick={handleSendFromInput}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Gönder"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
          </div>

          <p
            style={{
              textAlign: 'center',
              color: '#525252',
              fontSize: '0.7rem',
              marginTop: '0.5rem',
            }}
          >
            Web Ai Asistan sadece hazır sorulara yanıt vermektedir.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
