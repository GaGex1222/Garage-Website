'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Wrench, User, ListChecks, Phone, MapPin, Clock, ArrowDown } from 'lucide-react';

// הגדרת המקטעים עבור הניווט
const SECTIONS = [
  { id: 'hero', title: 'ראשי', icon: Wrench },
  { id: 'about', title: 'מי אני', icon: User },
  { id: 'services', title: 'שירותים', icon: ListChecks },
  { id: 'contact', title: 'צור קשר', icon: Phone },
];

// הגדרת סוגי הפרופסים עבור הרכיבים
interface NavbarProps {
  scrollToSection: (id: string) => void;
  activeSection: string;
}

// ------------------------------------------------------------------
// 1. רכיב סרגל הניווט (Navbar)
// ------------------------------------------------------------------

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, activeSection }) => {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-transparent"
      dir="rtl" // יישור לימין
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* לוגו / שם העסק */}
        <div 
          className="text-2xl font-bold text-white tracking-wider cursor-pointer transition-colors duration-300 hover:text-yellow-400"
          onClick={() => scrollToSection('hero')}
        >
          מכונאות דוד
        </div>
        
        {/* כפתורי ניווט */}
        <div className="hidden md:flex space-x-4 space-x-reverse"> 
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`
                flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-full font-medium 
                transition-all duration-300 
                ${activeSection === section.id 
                  ? 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/50' 
                  : 'text-white hover:bg-white/10 hover:text-yellow-400'
                }
              `}
            >
              <section.icon className="w-5 h-5 ml-1" />
              <span>{section.title}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// ------------------------------------------------------------------
// 2. רכיב המקטע הראשי (Hero)
// ------------------------------------------------------------------

const HeroSection: React.FC<{scrollToSection: (id: string) => void}> = ({ scrollToSection }) => {
  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center overflow-hidden"
      dir="rtl"
    >
      {/* וידאו רקע חי - שימוש ב-placeholder. יש להחליף ללינק אמיתי */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute z-0 w-full h-full object-cover brightness-[0.4]"
        poster="https://placehold.co/1920x1080/000000/ffffff?text=Video+Placeholder" // תמונת פוסטר לטעינה מהירה
      >
        {/* יש להחליף את הלינק ללינק וידאו אמיתי ורלוונטי (כגון וידאו של מנוע עובד, צמיגים מסתובבים וכו') */}
        <source src="/main.mp4" type="video/mp4" />
        הדפדפן שלך אינו תומך בתג הווידאו.
      </video>

      {/* שכבת תוכן קדמית - כעת מיושרת לימין וללא רקע כהה */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16">
        <div className="text-right max-w-4xl"> {/* יישור טקסט לימין והגבלת רוחב למראה נקי */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
            מכונאות כללית דוד
          </h1>
          <p className="text-xl md:text-3xl text-yellow-400 font-light italic mb-10 drop-shadow-md">
            כשאיכות פוגשת אמינות: הטיפול המקצועי לרכב שלך.
          </p>
          <button 
            onClick={() => scrollToSection('services')}
            className="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03]"
          >
            לשירותים שלנו
          </button>
        </div>
      </div>

      {/* חץ גלילה למטה */}
      <button 
        onClick={() => scrollToSection('about')}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 z-10"
        aria-label="גלול למטה"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
};

// ------------------------------------------------------------------
// 3. רכיב המקטע "מי אני" (About)
// ------------------------------------------------------------------

const AboutSection: React.FC = () => (
  <section 
    id="about" 
    className="min-h-screen py-20 flex items-center bg-gray-900 text-white p-8 md:p-16"
    dir="rtl"
  >
    <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-12">
      <div className="text-center md:text-right flex-1">
        <h2 className="text-4xl font-bold border-b-4 border-yellow-500 pb-3 mb-6 inline-block">
          <User className="inline-block w-8 h-8 ml-2 text-yellow-500" /> מי אני?
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          שמי דוד, ואני מכונאי מוסמך עם למעלה מ-15 שנות ניסיון בתחום הרכב. אנו ב'מכונאות דוד' גאים לספק שירותי מכונאות מקצועיים ואמינים לכל סוגי הרכבים – מפרטיות ועד מסחריות קלות.
        </p>
        <p className="text-lg leading-relaxed">
          הדגש שלנו הוא על **שקיפות מלאה**, שימוש בחלפים איכותיים בלבד, עבודה יסודית ומחירים הוגנים. אצלנו, הרכב שלך נמצא בידיים הכי טובות, ואנחנו תמיד דואגים שתצא לדרך בבטחה ובראש שקט.
        </p>
      </div>
      <div className="flex-shrink-0 w-full md:w-80 h-64 md:h-80 bg-gray-800 rounded-xl overflow-hidden shadow-2xl relative">
        {/* תמונה / איור של דוד המכונאי - Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-yellow-500/10">
          <Wrench className="w-24 h-24 text-yellow-500 opacity-20" />
        </div>
        <img 
          src="dad.jpg" 
          alt="דוד המכונאי" 
          className="w-full h-full object-cover opacity-80" 
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/320x320/2d3748/fff?text=דוד+המכונאי'; }}
        />
      </div>
    </div>
  </section>
);

// ------------------------------------------------------------------
// 4. רכיב המקטע "שירותים" (Services)
// ------------------------------------------------------------------

const servicesList = [
  { text: 'מכונאות כללית ותחזוקה לכל סוגי המכוניות (פרטיות ומסחריות קלות)', icon: Wrench },
  { text: 'תיקוני חשמל רכב מקיפים ודיאגנוסטיקה', icon: Clock },
  { text: 'מערכות מיזוג אוויר: תיקון, מילוי גז ותחזוקה', icon: MapPin },
  { text: 'פחחות כללית ותיקוני מרכב', icon: ListChecks },
  { text: 'שירות טסטים מבית הלקוח (הכנה והעברה)', icon: User },
  { text: 'שירות אמין, אדיב, וליווי מקצועי', icon: Phone },
  { text: '★ מבצע לחיילים: טיפול חינם פעם בחודש (כפוף לתנאים)', icon: ArrowDown },
  { text: '★ מבצע לאברכים: טיפול חינם פעם בחודש (כפוף לתנאים)', icon: ArrowDown },
];

const ServicesSection: React.FC = () => (
  <section id="services" className="min-h-screen py-20 flex items-center bg-gray-800 text-white p-8 md:p-16" dir="rtl">
    <div className="container mx-auto max-w-6xl">
      <h2 className="text-4xl font-bold text-center border-b-4 border-yellow-500 pb-3 mb-12 inline-block mx-auto">
        <ListChecks className="inline-block w-8 h-8 ml-2 text-yellow-500" /> השירותים שאנו מספקים
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service, index) => (
          <div 
            key={index} 
            // הדגשה קלה למבצעים
            className={`
              bg-gray-700 p-6 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-start
              ${service.icon === ArrowDown ? 'bg-yellow-900/40 border border-yellow-500 hover:shadow-yellow-500/50' : 'hover:shadow-yellow-500/30'}
            `}
          >
            <service.icon className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1 ml-4" />
            <p className="text-lg font-medium">{service.text}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-xl mt-12 text-yellow-400">
        כל הטיפולים מתבצעים על ידי דוד, בסטנדרט המקצועי הגבוה ביותר.
      </p>
    </div>
  </section>
);

// ------------------------------------------------------------------
// 5. רכיב המקטע "צור קשר" (Contact) - עודכן
// ------------------------------------------------------------------

const ContactSection: React.FC = () => (
  <section 
    id="contact" 
    className="min-h-screen py-20 flex items-center bg-gray-950 text-white p-8 md:p-16"
    dir="rtl"
  >
    <div className="container mx-auto max-w-4xl text-center">
      <h2 className="text-5xl font-extrabold text-yellow-500 mb-4">
        צור קשר
      </h2>
      <p className="text-2xl font-light mb-12 text-gray-300">
        מוזמנים ליצור קשר או לבקר אותנו במוסך לקבלת ייעוץ והצעת מחיר.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-900 p-8 rounded-2xl shadow-2xl">
        
        {/* 1. טלפון (Phone - Clickable) */}
        <a 
          href="tel:0521234567" 
          className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:bg-gray-800/50 group border border-transparent hover:border-yellow-500/50"
        >
          <Phone className="w-8 h-8 text-yellow-500 mb-3 transition-transform group-hover:scale-110" />
          <h3 className="text-xl font-semibold mb-2">טלפון</h3>
          <span className="text-lg text-white group-hover:text-yellow-400 transition-colors">
            053-2782920 - דוד
          </span>
        </a>

        {/* 2. כתובת (Address - Clickable/Emphasized) - המקטע המעודכן */}
        <a 
          href="https://maps.google.com/?q=רחוב+המוסכים+18,+תל+אביב" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 bg-gray-800/40 hover:bg-yellow-500/20 group border-4 border-yellow-500/30 hover:border-yellow-500 shadow-lg transform hover:scale-[1.03] cursor-pointer"
        >
          {/* האייקון המודגש */}
          <MapPin className="w-8 h-8 text-yellow-500 mb-3 transition-transform group-hover:scale-110 group-hover:text-yellow-300" />
          
          <h3 className="text-xl font-bold mb-2 text-yellow-500">
            כתובת (לחץ לניווט)
          </h3>
          
          {/* הטקסט עם חץ המצביע על קליק */}
          <p className="text-lg text-white font-medium flex items-center group-hover:text-yellow-100">
            רחוב המוסכים 18, תל אביב
            <ArrowDown 
              className="w-5 h-5 mr-1 text-yellow-500 transform rotate-[-90deg] group-hover:rotate-0 transition-transform duration-300" 
              aria-hidden="true" 
            />
          </p>
        </a>
        
        {/* 3. שעות פתיחה (Hours - Static) */}
        <div className="flex flex-col items-center p-4 border-gray-700 bg-gray-900/50 rounded-xl">
          <Clock className="w-8 h-8 text-yellow-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2">שעות פתיחה</h3>
          <p className="text-lg">א'-ה': 8:00-17:00</p>
          <p className="text-lg">ו': 8:00-13:00</p>
        </div>
      </div>
    </div>
  </section>
);

// ------------------------------------------------------------------
// 6. הרכיב הראשי (App)
// ------------------------------------------------------------------

const App: React.FC = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState('hero');

  // פונקציה לגלילה חלקה למקטע
  const scrollToSection = (id: string) => {
    const section = sectionRefs.current.find(ref => ref?.id === id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // לוגיקה לזיהוי המקטע הפעיל עבור סרגל הניווט (Navbar)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // לוודא שהכותרת נמצאת באמצע המסך (בערך)
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // מזהה כאשר 50% מהמקטע נצפה
      }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    // **שינוי כאן: החלפת 'Rubik' ל-'Heebo' (בתוספת fallback ל-sans-serif)**
    <div className="min-h-screen bg-gray-900 text-white font-['Heebo',_sans-serif] scroll-smooth" dir="rtl">
      {/* 7. הטמעת רכיב הניווט */}
      <Navbar scrollToSection={scrollToSection} activeSection={activeSection} />

      {/* עטיפה של כל המקטעים עם ה-ref */}
      {[HeroSection, AboutSection, ServicesSection, ContactSection].map((SectionComponent, index) => {
        const sectionId = SECTIONS[index].id;
        return (
          <div 
            key={sectionId}
            ref={el => sectionRefs.current[index] = el}
            id={sectionId}
            className="w-full"
          >
            {/* רקע שחור מלא כברירת מחדל, המקטעים עצמם מגדירים את הרקע */}
            {sectionId === 'hero' ? <HeroSection scrollToSection={scrollToSection} /> : 
              sectionId === 'about' ? <AboutSection /> : 
              sectionId === 'services' ? <ServicesSection /> : 
              <ContactSection />}
          </div>
        );
      })}
    </div>
  );
};

export default App;
