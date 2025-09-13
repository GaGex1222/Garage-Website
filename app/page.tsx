'use client';
import { MapPin, Car, Wrench, Phone, Mail, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

// Define types for the props of the ContactInfo component
interface ContactInfoProps {
  person: string;
  phone: string;
  email: string;
}

// A component for displaying contact info of each person
const ContactInfo = ({ person, phone, email }: ContactInfoProps) => (
  <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl hover:bg-slate-700 transition duration-300">
    <h3 className="text-2xl font-bold text-orange-400 mb-4">
      צור קשר עם {person}
    </h3>
    <p className="text-lg text-slate-300 mb-2">
      <Phone className="inline-block w-5 h-5 text-orange-400 ml-2" />
      <span className="font-bold">טלפון:</span> {phone}
    </p>
    <p className="text-lg text-slate-300 mb-2">
      <Mail className="inline-block w-5 h-5 text-orange-400 ml-2" />
      <span className="font-bold">אימייל:</span> {email}
    </p>
  </div>
);

// The main App component handles the routing logic and page composition
function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const homeSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const locationSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close menu after selection
  };

  const [bgImage, setBgImage] = useState(0);

  // Array of background image URLs
  const images = [
    "/musach1.png",
    "/musach2.png",
    "/musach3.png", // Add more images as needed
  ];

  // Function to switch background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Data for the two mechanics
  const mechanicsData = [
    {
      person: "דוד",
      image: "/david.jpg",
      about: "דוד, עם שנות ניסיון רבות בתחום, הוא מומחה למכונאות כללית וטיפול ברכבים מכל הסוגים.",
      services: [
        "מכונאות כללית לכל סוגי המכוניות",
        "חשמל לרכב",
        "מזגנים",
        "פחחות כללית",
        "שירות טסטים מבית הלקוח",
        "שירות אמין ואדיב",
        "טיפול חינם פעם בחודש לחייל כפוף לתנאים של דוד",
        "טיפול חינם לאברך פעם בחודש כפוף לתנאים של דוד"
      ],
      contact: {
        person: "דוד",
        phone: "053-2782920",
        email: "davidmusach@gmail.com"
      }
    },
    {
      person: "אהרון",
      image: "/aharon.jpg",
      about: "אהרון הוא טכנאי מוסמך ומומחה לבדיקות רכב, רכבים חשמליים ואישורי תקינות.",
      services: [
        "מעבדה מוסמכת לרכב תקנה 281ד מכון התקנים משרד התחבורה, ללא טסט מעל שנה.",
        "תקנה 308 לאחר תאונה הוראת משטרת ישראל",
        "שמאי תקנה 309 לאחר תאונה",
        "כיווני פרונט / איזוני גלגלים",
        "אישורי הגבהות גיפים וכב",
        "אישורי תקינות לרכב חשמלי עד 550 קילו וואט ותקינות סוללה ראשית",
        "אישור ביצוע עבודות מכונאות רכב חשמלי היברידי או חשמלי מלא",
        "בדיקות רכבים קניה ומכירה",
        "כל המקצועות בתוקף עם אישור ממכון התקנים ומשרד התחבורה"
      ],
      contact: {
        person: "אהרון",
        phone: "050-9876543",
        email: "aaron@example.com"
      }
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen font-sans" dir="rtl">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo instead of text */}
          <img
            src="/logo.jpg"
            alt="מכון אהרון"
            className="h-12 w-auto object-contain"
          />

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-lg font-medium text-slate-300" style={{ textAlign: 'right' }}>
            <li>
              <button onClick={() => scrollToSection(homeSectionRef)} className="hover:text-orange-400 transition-colors duration-200">
                בית
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection(aboutSectionRef)} className="hover:text-orange-400 transition-colors duration-200">
                אודות
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection(servicesSectionRef)} className="hover:text-orange-400 transition-colors duration-200">
                שירותים
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection(contactSectionRef)} className="hover:text-orange-400 transition-colors duration-200">
                צור קשר
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection(locationSectionRef)} className="hover:text-orange-400 mr-6 transition-colors duration-200">
                מיקום
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-300 focus:outline-none"
          >
            {isMobileMenuOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <Transition
          show={isMobileMenuOpen}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 -translate-y-full"
          enterTo="transform opacity-100 translate-y-0"
          leave="transition ease-in duration-300"
          leaveFrom="transform opacity-100 translate-y-0"
          leaveTo="transform opacity-0 -translate-y-full"
        >
          <div className="md:hidden bg-slate-950/90 py-4 border-t border-slate-800">
            <ul className="flex flex-col items-center space-y-4 text-xl" style={{ textAlign: 'right' }}>
              <li>
                <button onClick={() => scrollToSection(homeSectionRef)} className="block py-2 text-white hover:text-orange-400 transition-colors">
                  בית
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(aboutSectionRef)} className="block py-2 text-white hover:text-orange-400 transition-colors">
                  אודות
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(servicesSectionRef)} className="block py-2 text-white hover:text-orange-400 transition-colors">
                  שירותים
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(contactSectionRef)} className="block py-2 text-white hover:text-orange-400 transition-colors">
                  צור קשר
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(locationSectionRef)} className="block py-2 text-white hover:text-orange-400 transition-colors">
                  מיקום
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </nav>

      <main className="text-slate-100">
        {/* Home Section */}
        <section
          ref={homeSectionRef}
          className="relative pt-28 pb-16 md:py-48 text-center bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{
            backgroundImage: `url('${images[bgImage]}')`,
            backgroundSize: '100% auto',
            backgroundPosition: 'center center',
          }}
        >
          {/* Overlay for darkening the image */}
          <div className="absolute inset-0 bg-slate-950 opacity-70"></div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-orange-400 drop-shadow-lg tracking-wide mb-4">
              מכון אהרון
            </h1>

            <p className="text-xl md:text-3xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
              מומחים לרכב, עם ידע וניסיון של שנים – המוסך שדואג לך ולרכב שלך.
            </p>
          </div>
        </section>

        {/* About & Services Section */}
        <section className="container mx-auto px-4 py-16 md:py-24" ref={aboutSectionRef}>
          <h2 className="text-4xl font-bold text-slate-100 text-center mb-12">
            <Star className="inline-block w-8 h-8 ml-2 text-orange-400" />
            אודות ושירותים
          </h2>
          <div className="grid md:grid-cols-2 gap-12" ref={servicesSectionRef}>
            {mechanicsData.map((mechanic, index) => (
              <motion.div
                key={index}
                className="bg-slate-800 p-8 rounded-2xl shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={mechanic.image}
                    alt={mechanic.person}
                    className="w-40 h-40 rounded-full object-cover mb-4 ring-4 ring-orange-400 transition-transform duration-300 hover:scale-105"
                  />
                  <h3 className="text-3xl font-bold text-orange-400 mb-2">{mechanic.person}</h3>
                  <p className="text-slate-300 text-lg mb-8">{mechanic.about}</p>
                </div>
                <h4 className="text-xl font-bold text-orange-400 mb-4">שירותים של {mechanic.person}</h4>
                <ul className="space-y-2 text-slate-300 mb-8">
                  {mechanic.services.map((item, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-start">
                      <Wrench className="w-5 h-5 text-orange-400 ml-2 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactSectionRef} className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="text-4xl font-bold text-slate-100 text-center mb-12">
            <Phone className="inline-block w-8 h-8 ml-2 text-orange-400" />
            צור קשר
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <ContactInfo person="דוד" phone="053-2782920" email="davidmusach@gmail.com" />
            <ContactInfo person="אהרון" phone="050-9876543" email="aaron@example.com" />
          </div>
        </section>

        {/* Location Section */}
        <section ref={locationSectionRef} className="bg-slate-900 text-center py-16 px-4 rounded-t-[50px]">
          <h2 className="text-4xl font-bold text-slate-100 mb-6">
            <MapPin className="inline-block w-8 h-8 ml-2 text-orange-400" />
            איך מגיעים אלינו?
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-300 mb-8">
            לחצו על הלוגו כדי להגיע למוסך בקלות דרך Waze.
          </p>
          <a href="https://waze.com/ul/hsv8y9uvdv" className="inline-block p-5 bg-orange-500 rounded-full shadow-2xl transition-transform duration-300 transform hover:scale-110">
            <MapPin className="w-20 h-20 text-slate-900" />
          </a>
        </section>
      </main>

      <footer className="py-6 text-center text-slate-500 bg-slate-950">
        <p>&copy; 2025 מוסך דוד & אהרון. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}

export default App;
