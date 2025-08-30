'use client';
import { MapPin, Car, Wrench, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef } from 'react';
import { Transition } from '@headlessui/react';

// Define types for the props of the ServiceSection component
interface ServiceSectionProps {
  title: string;
  items: string[];
  icon: React.ComponentType<{ size: number | string | undefined }>;
}

// A component for the services section
const ServiceSection = ({ title, items, icon: Icon }: ServiceSectionProps) => (
  <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-xl">
    <div className="flex items-center mb-4">
      <div className="p-3 rounded-full bg-blue-600 text-yellow-300">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-white mr-4">{title}</h3>
    </div>
    <ul className="space-y-4 text-gray-300">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <Wrench className="w-5 h-5 text-yellow-400 mt-1 ml-2 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Define types for the props of the ContactInfo component
interface ContactInfoProps {
  person: string;
  phone: string;
  email: string;
}

// A component for displaying contact info of each person
const ContactInfo = ({ person, phone, email }: ContactInfoProps) => (
  <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
    <h3 className="text-2xl font-bold text-white mb-4">
      צור קשר עם {person}
    </h3>
    <p className="text-lg text-gray-300 mb-2">
      <Phone className="inline-block w-5 h-5 text-yellow-300 ml-2" />
      <span className="font-bold">טלפון:</span> {phone}
    </p>
    <p className="text-lg text-gray-300 mb-2">
      <Mail className="inline-block w-5 h-5 text-yellow-300 ml-2" />
      <span className="font-bold">אימייל:</span> {email}
    </p>
  </div>
);

// The main App component handles the routing logic and page composition
function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // עדכון הגדרת ה-ref
  const homeSectionRef = useRef<HTMLDivElement | null>(null);
  const servicesSectionRef = useRef<HTMLDivElement | null>(null);
  const contactSectionRef = useRef<HTMLDivElement | null>(null);
  const locationSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement | null>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close menu after selection
  };

  return (
    <div className="bg-gray-900 min-h-screen font-sans" dir="rtl">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md shadow-lg" dir="rtl">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-black text-white">
            מכון אהרון
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-lg font-medium text-gray-300" style={{ textAlign: 'right' }}>
            <li>
              <button onClick={() => scrollToSection(homeSectionRef)} className="hover:text-white transition-colors duration-200">
                בית
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection(servicesSectionRef)} className="hover:text-white transition-colors duration-200">
                שירותים
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection(contactSectionRef)} className="hover:text-white transition-colors duration-200">
                צור קשר
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection(locationSectionRef)} className="hover:text-white mr-6 transition-colors duration-200">
                מיקום
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 focus:outline-none"
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
          <div className="md:hidden bg-gray-950/90 py-4 border-t border-gray-800">
            <ul className="flex flex-col items-center space-y-4 text-xl" style={{ textAlign: 'right' }}>
              <li>
                <button onClick={() => scrollToSection(homeSectionRef)} className="block py-2 text-white hover:text-blue-500 transition-colors">
                  בית
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(servicesSectionRef)} className="block py-2 text-white hover:text-blue-500 transition-colors">
                  שירותים
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(contactSectionRef)} className="block py-2 text-white hover:text-blue-500 transition-colors">
                  צור קשר
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(locationSectionRef)} className="block py-2 text-white hover:text-blue-500 transition-colors">
                  מיקום
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </nav>

      <main className="text-white">
        {/* Home Section */}
        <section ref={homeSectionRef} className="relative pt-28 pb-16 md:py-48 text-center bg-gray-950 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-70"></div>
          <div className="relative z-10 container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
              מכון אהרון
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              מומחים לרכב, עם ידע וניסיון של שנים, המוסך שדואג לך ולרכב שלך.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesSectionRef} className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            <Car className="inline-block w-8 h-8 ml-2 text-yellow-300" />
            השירותים שלנו
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <ServiceSection
              title="דוד - מכונאות כללית ושירותים מיוחדים"
              icon={Car}
              items={[
                "מכונאות כללית לכל סוגי המכוניות",
                "חשמל לרכב",
                "מזגנים",
                "פחחות כללית",
                "שירות טסטים מבית הלקוח",
                "שירות אמין ואדיב",
                "טיפול חינם פעם בחודש לחייל כפוף לתנאים של דוד",
                "טיפול חינם לאברך פעם בחודש כפוף לתנאים של דוד"
              ]}
            />
            <ServiceSection
              title="אהרון - מעבדה מוסמכת ורכבים חשמליים"
              icon={Wrench}
              items={[
                "מעבדה מוסמכת לרכב",
                "טסט מעל שנה",
                "שמאי תקנה 903 לאחר תאונה",
                "הוראת משטרת ישראל תקנה 803 לאחר תאונה",
                "כיווני פרונט / איזוני גלגלים",
                "אישורי תקינות לרכב חשמלי עד 550 קילו וואט ותקינות סוללה ראשית",
                "אישור ביצוע עבודות מכונאות רכב חשמלי היברידי או חשמלי מלא",
                "בדיקות רכבים קניה ומכירה",
                "כל המקצועות בתוקף עם אישור ממכון התקנים ומשרד התחבורה"
              ]}
            />
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactSectionRef} className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            <Phone className="inline-block w-8 h-8 ml-2 text-yellow-300" />
            צור קשר
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <ContactInfo person="דוד" phone="053-2782920" email="davidmusach@gmail.com" />
            <ContactInfo person="אהרון" phone="050-9876543" email="aaron@example.com" />
          </div>
        </section>

        {/* Location Section */}
        <section ref={locationSectionRef} className="bg-gray-950 text-center py-16 px-4 rounded-t-[50px]">
          <h2 className="text-4xl font-bold text-white mb-6">
            <MapPin className="inline-block w-8 h-8 ml-2 ml-2 text-yellow-300" />
            איך מגיעים אלינו?
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-300 mb-8">
            לחצו על הלוגו כדי להגיע למוסך בקלות דרך Waze.
          </p>
          <a href="https://waze.com/ul/hsv8y9uvdv" className="inline-block p-5 bg-blue-600 rounded-full shadow-2xl transition-transform duration-300 transform hover:scale-110">
            <MapPin className="w-20 h-20  text-yellow-300" />
          </a>
        </section>
      </main>

      <footer className="py-6 text-center text-gray-500 bg-gray-950">
        <p>&copy; 2025 מוסך דוד & אהרון. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}

export default App;
