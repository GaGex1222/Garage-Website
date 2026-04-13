'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Wrench, User, ListChecks, Phone, MapPin, Clock, ArrowDown, ChevronLeft, Menu, X } from 'lucide-react';

const SECTIONS = [
  { id: 'hero',     title: 'ראשי',    icon: Wrench },
  { id: 'about',    title: 'מי אני',  icon: User },
  { id: 'services', title: 'שירותים', icon: ListChecks },
  { id: 'contact',  title: 'צור קשר', icon: Phone },
];

interface NavbarProps {
  scrollToSection: (id: string) => void;
  activeSection: string;
}

// ─────────────────────────────────────────────
// 1. Navbar — with mobile hamburger menu
// ─────────────────────────────────────────────
const Navbar: React.FC<NavbarProps> = ({ scrollToSection, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || menuOpen ? 'glass py-3 shadow-xl' : 'py-4 bg-transparent'}`}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Brand */}
          <button onClick={() => handleNav('hero')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                 style={{ background: 'var(--accent)' }}>
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:opacity-80 transition-opacity">
              מכונאות דוד
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleNav(s.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === s.id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeSection === s.id && (
                  <span className="absolute inset-0 rounded-lg"
                        style={{ background: 'var(--accent-subtle)', border: '1px solid var(--border-accent)' }} />
                )}
                <span className="relative flex items-center gap-2">
                  <s.icon className="w-4 h-4" />
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-white transition-colors hover:bg-white/10"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="תפריט"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(9,9,11,0.97)', backdropFilter: 'blur(16px)' }}
        dir="rtl"
      >
        <div className="flex flex-col items-center justify-center h-full gap-5 pt-20">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleNav(s.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-200 w-64 justify-center ${
                activeSection === s.id ? 'text-white' : 'text-gray-400'
              }`}
              style={activeSection === s.id ? { background: 'var(--accent-subtle)', border: '1px solid var(--border-accent)' } : {}}
            >
              <s.icon className="w-6 h-6" style={{ color: 'var(--accent)' }} />
              {s.title}
            </button>
          ))}
          <a
            href="tel:0532782920"
            className="mt-4 flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg"
            style={{ background: 'var(--accent)' }}
            onClick={() => setMenuOpen(false)}
          >
            <Phone className="w-5 h-5" />
            התקשר עכשיו
          </a>
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────
// 2. Hero
// ─────────────────────────────────────────────
const HeroSection: React.FC<{ scrollToSection: (id: string) => void }> = ({ scrollToSection }) => (
  <section id="hero" className="relative h-screen min-h-[600px] flex items-center overflow-hidden" dir="rtl">
    <video
      autoPlay loop muted playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={{ filter: 'brightness(0.28) saturate(0.6)' }}
      poster="https://placehold.co/1920x1080/000000/ffffff?text=."
    >
      <source src="/main.mp4" type="video/mp4" />
    </video>

    <div className="absolute inset-0 z-0" style={{
      background: 'radial-gradient(ellipse at 70% 50%, rgba(249,115,22,0.06) 0%, transparent 70%), linear-gradient(to bottom, rgba(9,9,11,0.3) 0%, rgba(9,9,11,0) 40%, rgba(9,9,11,0.7) 100%)'
    }} />

    <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16">
      <div className="max-w-3xl text-right">
        <p className="animate-fade-up text-xs uppercase tracking-[0.2em] font-semibold mb-4"
           style={{ color: 'var(--accent)' }}>
          מוסך מקצועי · ניסיון של 30+ שנה
        </p>
        <h1
          className="animate-fade-up delay-100 font-black leading-[1.05] mb-5 text-white"
          style={{ fontSize: 'clamp(2.4rem, 9vw, 6rem)', letterSpacing: '-0.02em' }}
        >
          מכונאות כללית<br />
          <span style={{ color: 'var(--accent)' }}>דוד</span>
        </h1>
        <p className="animate-fade-up delay-200 text-base sm:text-lg md:text-xl font-light mb-8 leading-relaxed"
           style={{ color: 'var(--text-secondary)' }}>
          כשאיכות פוגשת אמינות — הטיפול המקצועי לרכב שלך.
        </p>
        {/* Stack buttons on mobile */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-end">
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-3.5 rounded-xl font-bold text-white transition-all duration-300 hover:brightness-110 active:scale-95 text-base"
            style={{ background: 'var(--accent)' }}
          >
            צור קשר עכשיו
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:text-white active:scale-95 text-base"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)' }}
          >
            השירותים שלנו
          </button>
        </div>
      </div>
    </div>

    <button
      onClick={() => scrollToSection('about')}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-y flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity"
      aria-label="גלול למטה"
    >
      <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--text-muted)' }}>גלול</span>
      <ArrowDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
    </button>
  </section>
);

// ─────────────────────────────────────────────
// 3. About
// ─────────────────────────────────────────────
const AboutSection: React.FC = () => (
  <section id="about" className="py-20 sm:py-28 flex items-center" dir="rtl"
    style={{ background: 'var(--bg-secondary)' }}>
    <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 w-full">

      <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-4 text-right"
         style={{ color: 'var(--accent)' }}>
        קצת עלי
      </p>

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* Image — centered on mobile, fixed width on desktop */}
        <div
          className="relative w-full max-w-xs sm:max-w-sm md:w-80 md:flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl mx-auto md:mx-0"
          style={{ aspectRatio: '4/5', border: '1px solid var(--border)' }}
        >
          <div className="absolute top-0 right-0 w-1.5 h-full z-10"
               style={{ background: 'var(--accent)' }} />
          <img
            src="dad.png"
            alt="דוד המכונאי"
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(20%)' }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://placehold.co/320x400/18181E/94A3B8?text=דוד';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-20"
               style={{ background: 'linear-gradient(to top, var(--bg-secondary), transparent)' }} />
        </div>

        {/* Text */}
        <div className="flex-1 text-right w-full">
          <h2 className="font-black mb-4 leading-tight text-white"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            מי אני?
          </h2>
          <div className="mb-5 flex justify-end">
            <span className="accent-line" />
          </div>
          <p className="text-base sm:text-lg leading-[1.9] mb-4" style={{ color: 'var(--text-secondary)' }}>
            שמי דוד, ואני מכונאי מוסמך עם למעלה מ-15 שנות ניסיון בתחום הרכב. ב&rsquo;מכונאות דוד&rsquo; גאים לספק שירותי מכונאות מקצועיים ואמינים לכל סוגי הרכבים — מפרטיות ועד מסחריות קלות.
          </p>
          <p className="text-base sm:text-lg leading-[1.9]" style={{ color: 'var(--text-secondary)' }}>
            הדגש שלנו הוא על <strong className="text-white font-semibold">שקיפות מלאה</strong>, שימוש בחלפים איכותיים בלבד, עבודה יסודית ומחירים הוגנים. אצלנו, הרכב שלך נמצא בידיים הכי טובות.
          </p>
          {/* Stats */}
          <div className="flex gap-6 sm:gap-8 mt-8 justify-end flex-wrap">
            {[
              { num: '30+',    label: 'שנות ניסיון' },
              { num: '5,000+', label: 'לקוחות מרוצים' },
              { num: '100%',   label: 'מקצועיות' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>{num}</div>
                <div className="text-xs mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// 4. Services
// ─────────────────────────────────────────────
const servicesList = [
  { text: 'מכונאות כללית ותחזוקה לכל סוגי המכוניות (פרטיות ומסחריות קלות)', icon: Wrench, special: false },
  { text: 'תיקוני חשמל רכב מקיפים ודיאגנוסטיקה', icon: Clock, special: false },
  { text: 'מערכות מיזוג אוויר: תיקון, מילוי גז ותחזוקה', icon: MapPin, special: false },
  { text: 'פחחות כללית ותיקוני מרכב', icon: ListChecks, special: false },
  { text: 'שירות טסטים מבית הלקוח (הכנה והעברה)', icon: User, special: false },
  { text: 'שירות אמין, אדיב, וליווי מקצועי לאורך כל הדרך', icon: Phone, special: false },
  { text: 'מבצע לחיילים: טיפול חינם פעם בחודש (כפוף לתנאים)', icon: ChevronLeft, special: true },
  { text: 'מבצע לאברכים: טיפול חינם פעם בחודש (כפוף לתנאים)', icon: ChevronLeft, special: true },
];

const ServicesSection: React.FC = () => (
  <section id="services" className="py-20 sm:py-28 flex items-center" dir="rtl"
    style={{ background: 'var(--bg-primary)' }}>
    <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 w-full">

      <div className="text-right mb-10 sm:mb-14">
        <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3"
           style={{ color: 'var(--accent)' }}>
          מה אנחנו מציעים
        </p>
        <h2 className="font-black text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', letterSpacing: '-0.02em' }}>
          השירותים שלנו
        </h2>
        <div className="flex justify-end">
          <span className="accent-line" />
        </div>
      </div>

      {/* 1 col mobile → 2 col tablet → 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {servicesList.map((service, i) => (
          <div
            key={i}
            className="card-hover relative p-5 sm:p-6 rounded-2xl flex items-start gap-4 text-right"
            style={{
              background: service.special ? 'var(--accent-subtle)' : 'var(--bg-card)',
              border: `1px solid ${service.special ? 'var(--border-accent)' : 'var(--border)'}`,
            }}
          >
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: service.special ? 'var(--accent)' : 'rgba(249,115,22,0.12)' }}
            >
              <service.icon className="w-5 h-5"
                style={{ color: service.special ? 'white' : 'var(--accent)' }} />
            </div>
            <div className="flex-1 min-w-0">
              {service.special && (
                <span className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2"
                      style={{ background: 'var(--accent)', color: 'white' }}>
                  מבצע
                </span>
              )}
              <p className="font-medium leading-relaxed text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                {service.text.replace('★ ', '')}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-10 sm:mt-14 font-semibold text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
        כל הטיפולים מתבצעים על ידי דוד, בסטנדרט המקצועי הגבוה ביותר.
      </p>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// 5. Contact
// ─────────────────────────────────────────────
const ContactSection: React.FC = () => (
  <section id="contact" className="py-20 sm:py-28 pb-28 flex items-center relative" dir="rtl"
    style={{ background: 'var(--bg-secondary)' }}>
    <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-16 w-full text-right">

      <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3"
         style={{ color: 'var(--accent)' }}>
        בואו נדבר
      </p>
      <h2 className="font-black text-white mb-4"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', letterSpacing: '-0.02em' }}>
        צור קשר
      </h2>
      <div className="mb-5 flex justify-end">
        <span className="accent-line" />
      </div>
      <p className="text-base sm:text-lg mb-10 sm:mb-14" style={{ color: 'var(--text-secondary)' }}>
        מוזמנים ליצור קשר או לבקר אותנו במוסך לקבלת ייעוץ והצעת מחיר.
      </p>

      {/* Cards — 1 col mobile, 3 col tablet+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">

        {/* Phone */}
        <a
          href="tel:0532782920"
          className="card-hover flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl group"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-orange-500"
               style={{ background: 'rgba(249,115,22,0.12)' }}>
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--accent)' }} />
          </div>
          <h3 className="font-bold text-white mb-1 text-base sm:text-lg">טלפון</h3>
          <span className="font-medium text-sm sm:text-base transition-colors duration-300 group-hover:text-white"
                style={{ color: 'var(--text-secondary)' }}>
            053-2782920
          </span>
          <span className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-muted)' }}>דוד</span>
        </a>

        {/* Address */}
        <div
          className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl"
          style={{ background: 'var(--accent-subtle)', border: '1px solid var(--border-accent)' }}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4"
               style={{ background: 'var(--accent)' }}>
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h3 className="font-bold text-white mb-1 text-base sm:text-lg">כתובת</h3>
          <span className="font-medium text-sm sm:text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
            צבי ברגמן, פתח תקווה
          </span>
          {/* Navigation logo buttons */}
          <div className="flex gap-3 justify-center">
            {/* Google Maps */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Tsvi+Bergman+St+Petah+Tikva"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="פתח ב-Google Maps"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
              style={{ background: '#fff' }}
            >
              <svg viewBox="0 0 48 48" className="w-6 h-6">
                <path fill="#4285F4" d="M24 4C15.16 4 8 11.16 8 20c0 12.77 14.1 23.16 15.08 23.91a1.5 1.5 0 001.84 0C25.9 43.16 40 32.77 40 20c0-8.84-7.16-16-16-16z"/>
                <circle fill="#fff" cx="24" cy="20" r="7"/>
                <circle fill="#4285F4" cx="24" cy="20" r="4.5"/>
              </svg>
            </a>
            {/* Waze */}
            <a
              href="https://waze.com/ul?q=Tsvi+Bergman+Street+Petah+Tikva&navigate=yes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="פתח ב-Waze"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg overflow-hidden"
              style={{ background: '#05C8F7' }}
            >
              {/* Official Waze character: rounded body, eyes, smile, antenna */}
              <svg viewBox="0 0 64 64" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M32 7C19.3 7 9 16.4 9 28c0 6.6 3.2 12.5 8.3 16.5l-2.2 8.5 9.2-2.5c2.4.9 5 1.5 7.7 1.5 12.7 0 23-9.4 23-21S44.7 7 32 7z"/>
                <circle cx="23" cy="28" r="3" fill="#1a1a1a"/>
                <circle cx="24.2" cy="26.3" r="1.1" fill="white"/>
                <circle cx="38" cy="28" r="3" fill="#1a1a1a"/>
                <circle cx="39.2" cy="26.3" r="1.1" fill="white"/>
                <path d="M24 36 Q31 43 38 36" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                <path d="M40 19 L43.5 12" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="45" cy="10" r="3.5" fill="white" stroke="#1a1a1a" strokeWidth="1.8"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Hours */}
        <div
          className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4"
               style={{ background: 'rgba(249,115,22,0.12)' }}>
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--accent)' }} />
          </div>
          <h3 className="font-bold text-white mb-1 text-base sm:text-lg">שעות פתיחה</h3>
          <span className="font-medium text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>א׳–ה׳</span>
          <span className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-muted)' }}>08:00–17:00</span>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="mt-10 sm:mt-12 text-center">
        <a
          href="https://wa.me/9720532782920"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.03] active:scale-95 text-sm sm:text-base"
          style={{ background: 'var(--accent)' }}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          שלח הודעה בוואטסאפ
        </a>
      </div>
    </div>

    {/* Footer */}
    <div className="absolute bottom-0 left-0 right-0 py-4 text-center border-t"
         style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
      © {new Date().getFullYear()} מכונאות דוד · כל הזכויות שמורות
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Floating WhatsApp FAB (mobile only)
// ─────────────────────────────────────────────
const WhatsAppFAB: React.FC = () => (
  <a
    href="https://wa.me/9720532782920"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-5 left-5 z-50 sm:hidden w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-200 active:scale-90"
    style={{ background: '#25D366' }}
    aria-label="וואטסאפ"
  >
    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
);

// ─────────────────────────────────────────────
// 6. App
// ─────────────────────────────────────────────
const App: React.FC = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => sectionRefs.current.forEach((ref) => { if (ref) observer.unobserve(ref); });
  }, []);

  const sectionComponents = [
    <HeroSection key="hero" scrollToSection={scrollToSection} />,
    <AboutSection key="about" />,
    <ServicesSection key="services" />,
    <ContactSection key="contact" />,
  ];

  return (
    <div className="noise-overlay" style={{ fontFamily: 'var(--font-heebo), Heebo, sans-serif' }} dir="rtl">
      <Navbar scrollToSection={scrollToSection} activeSection={activeSection} />
      {SECTIONS.map((s, i) => (
        <div
          key={s.id}
          id={s.id}
          ref={(el) => { sectionRefs.current[i] = el; }}
        >
          {sectionComponents[i]}
        </div>
      ))}
      <WhatsAppFAB />
    </div>
  );
};

export default App;
