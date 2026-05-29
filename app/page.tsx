"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Phone, 
  Search, 
  Users, 
  MapPin, 
  Wrench, 
  Zap, 
  Droplets, 
  Flame, 
  Wind, 
  Shield,
  Menu,
  X,
  Mail,
  Clock,
  CheckCircle,
  Star,
  Building,
  Target,
  Heart,
  Moon,
  Sun,
  Globe
} from "lucide-react";

// Types
interface Especialista {
  id: number;
  nombre: string;
  telefono: string;
  rubros: string[];
  zonas: string[];
  foto: string;
}

// Data
const RUBROS = [
  { value: "electricidad", label: { es: "Electricidad domiciliaria", en: "Home Electricity" } },
  { value: "plomeria", label: { es: "Plomeria", en: "Plumbing" } },
  { value: "gasista", label: { es: "Gasista matriculado", en: "Licensed Gas Technician" } },
  { value: "aires", label: { es: "Aires acondicionados", en: "Air Conditioning" } },
  { value: "herreria", label: { es: "Herreria", en: "Metalwork" } },
  { value: "cerrajeria", label: { es: "Cerrajeria", en: "Locksmith" } },
];

const ZONAS = [
  { value: "norte", label: { es: "Zona Norte", en: "North Zone" } },
  { value: "sur", label: { es: "Zona Sur", en: "South Zone" } },
  { value: "centro", label: { es: "Centro", en: "Downtown" } },
  { value: "oeste", label: { es: "Zona Oeste", en: "West Zone" } },
  { value: "este", label: { es: "Zona Este", en: "East Zone" } },
];

const ESPECIALISTAS: Especialista[] = [
  {
    id: 1,
    nombre: "Carlos Rodriguez",
    telefono: "5491123456789",
    rubros: ["electricidad", "aires"],
    zonas: ["norte", "centro"],
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    nombre: "Maria Gonzalez",
    telefono: "5491198765432",
    rubros: ["plomeria", "gasista"],
    zonas: ["sur", "centro", "oeste"],
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    nombre: "Juan Perez",
    telefono: "5491156781234",
    rubros: ["herreria", "cerrajeria"],
    zonas: ["norte", "este"],
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    nombre: "Ana Martinez",
    telefono: "5491143218765",
    rubros: ["electricidad", "gasista"],
    zonas: ["sur", "oeste", "este"],
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    nombre: "Pedro Sanchez",
    telefono: "5491187654321",
    rubros: ["plomeria", "aires", "herreria"],
    zonas: ["centro", "norte"],
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
];

const NAV_LINKS = [
  { href: "#inicio", label: { es: "Inicio", en: "Home" } },
  { href: "#servicios", label: { es: "Servicios", en: "Services" } },
  { href: "#buscar", label: { es: "Buscar", en: "Search" } },
  { href: "#nosotros", label: { es: "Nosotros", en: "About" } },
  { href: "#contacto", label: { es: "Contacto", en: "Contact" } },
];

const PARTNERS = [
  {
    id: 1,
    name: "Tech Solutions",
    logo: "https://placehold.co/200x100/84cc16/ffffff?text=Tech+Solutions",
    alt: "Tech Solutions logo"
  },
  {
    id: 2,
    name: "Constructora Moderna",
    logo: "https://placehold.co/200x100/84cc16/ffffff?text=Constructora+Moderna",
    alt: "Constructora Moderna logo"
  },
  {
    id: 3,
    name: "Servicios Premium",
    logo: "https://placehold.co/200x100/84cc16/ffffff?text=Servicios+Premium",
    alt: "Servicios Premium logo"
  },
  {
    id: 4,
    name: "Hogar Seguro",
    logo: "https://placehold.co/200x100/84cc16/ffffff?text=Hogar+Seguro",
    alt: "Hogar Seguro logo"
  },
  {
    id: 5,
    name: "Energía Verde",
    logo: "https://placehold.co/200x100/84cc16/ffffff?text=Energía+Verde",
    alt: "Energía Verde logo"
  },
  {
    id: 6,
    name: "Construcciones ABC",
    logo: "https://placehold.co/200x100/84cc16/ffffff?text=Construcciones+ABC",
    alt: "Construcciones ABC logo"
  },
  {
    id: 7,
    name: "Hogar Digital",
    logo: "https://placehold.co/200x100/84cc16/ffffff?text=Hogar+Digital",
    alt: "Hogar Digital logo"
  },
  {
    id: 8,
    name: "Servicios Eficientes",
    logo: "https://placehold.co/200x100/84cc16/ffffff?text=Servicios+Eficientes",
    alt: "Servicios Eficientes logo"
  }
];

// Translations
const translations = {
  es: {
    // General
    "search_expert": "Buscar especialista",
    "learn_more": "Conocer más",
    "clear": "Limpiar",
    "searching": "Buscando...",
    "assigned_expert": "Especialista asignado",
    "contact_whatsapp": "Contactar por WhatsApp",
    "no_results": "No encontramos especialistas",
    "no_results_desc": "No hay especialistas disponibles para el rubro y zona seleccionados. Intenta con otra combinación o contáctanos directamente.",
    
    // Hero
    "hero_title": "Conectamos expertos con quienes los necesitan",
    "hero_desc": "Somos una cooperativa de servicios técnicos que garantiza calidad, precios justos y atención rápida en toda la ciudad.",
    
    // Services
    "services_title": "Nuestros Servicios",
    "services_desc": "Ofrecemos una amplia variedad de servicios técnicos para el hogar y empresas, con profesionales certificados y garantía de calidad.",
    
    // Search
    "search_title": "Encuentra tu especialista",
    "search_desc": "Selecciona el tipo de servicio y tu zona para encontrar al profesional ideal.",
    "service_type": "Tipo de servicio",
    "coverage_zone": "Zona de cobertura",
    "select_rubro": "Seleccionar rubro...",
    "select_zona": "Seleccionar zona...",
    
    // About
    "about_title": "Sobre Nosotros",
    "about_desc": "Somos una cooperativa de trabajo comprometida con brindar servicios de calidad y generar oportunidades laborales justas para nuestros asociados.",
    "services_done": "Servicios realizados",
    "active_experts": "Especialistas activos",
    "coverage_zones": "Zonas de cobertura",
    "satisfied_clients": "Clientes satisfechos",
    "cooperative_work": "Trabajo cooperativo",
    "cooperative_work_desc": "Distribución justa del trabajo entre todos los asociados de la cooperativa.",
    "guaranteed_quality": "Calidad garantizada",
    "guaranteed_quality_desc": "Técnicos certificados y con amplia experiencia en cada especialidad.",
    "quick_response": "Respuesta rápida",
    "quick_response_desc": "Atención inmediata y coordinación eficiente para resolver tu problema.",
    "social_commitment": "Compromiso social",
    "social_commitment_desc": "Precios justos y transparentes para toda la comunidad.",
    "mission_title": "Nuestra Misión",
    "mission_desc": "Brindar servicios técnicos de excelencia, generando trabajo digno para nuestros asociados y contribuyendo al desarrollo de la comunidad a través de la economía social y solidaria.",
    "vision_title": "Nuestra Visión",
    "vision_desc": "Ser la cooperativa de servicios técnicos de referencia en la región, reconocida por la calidad de nuestro trabajo, la innovación tecnológica y nuestro compromiso con los valores cooperativos.",
    
    // Contact
    "contact_title": "Contacto",
    "contact_desc": "Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios.",
    "whatsapp": "WhatsApp",
    "immediate_response": "Respuesta inmediata",
    "email": "Email",
    "general_inquiries": "Consultas generales",
    
    // Partners
    "partners_title": "Nuestros Partners",
    "partners_desc": "Empresas y organizaciones que confían en nosotros",
    
    // Footer
    "quick_links": "Enlaces rápidos",
    "services": "Servicios",
    "contact": "Contacto",
    "rights": "Todos los derechos reservados.",
    
    // Floating button
    "chat_with_us": "¡Chatea con nosotros!",
  },
  en: {
    // General
    "search_expert": "Search expert",
    "learn_more": "Learn more",
    "clear": "Clear",
    "searching": "Searching...",
    "assigned_expert": "Assigned expert",
    "contact_whatsapp": "Contact via WhatsApp",
    "no_results": "No experts found",
    "no_results_desc": "No experts available for the selected service and zone. Try another combination or contact us directly.",
    
    // Hero
    "hero_title": "Connecting experts with those who need them",
    "hero_desc": "We are a technical services cooperative that guarantees quality, fair prices, and fast service throughout the city.",
    
    // Services
    "services_title": "Our Services",
    "services_desc": "We offer a wide variety of technical services for homes and businesses, with certified professionals and quality guarantee.",
    
    // Search
    "search_title": "Find your expert",
    "search_desc": "Select the type of service and your zone to find the ideal professional.",
    "service_type": "Service type",
    "coverage_zone": "Coverage zone",
    "select_rubro": "Select service...",
    "select_zona": "Select zone...",
    
    // About
    "about_title": "About Us",
    "about_desc": "We are a work cooperative committed to providing quality services and creating fair job opportunities for our associates.",
    "services_done": "Services completed",
    "active_experts": "Active experts",
    "coverage_zones": "Coverage zones",
    "satisfied_clients": "Satisfied clients",
    "cooperative_work": "Cooperative work",
    "cooperative_work_desc": "Fair distribution of work among all cooperative associates.",
    "guaranteed_quality": "Guaranteed quality",
    "guaranteed_quality_desc": "Certified technicians with extensive experience in each specialty.",
    "quick_response": "Quick response",
    "quick_response_desc": "Immediate attention and efficient coordination to solve your problem.",
    "social_commitment": "Social commitment",
    "social_commitment_desc": "Fair and transparent prices for the entire community.",
    "mission_title": "Our Mission",
    "mission_desc": "Provide excellent technical services, generating dignified work for our associates and contributing to community development through social and solidarity economy.",
    "vision_title": "Our Vision",
    "vision_desc": "To be the reference technical services cooperative in the region, recognized for the quality of our work, technological innovation, and commitment to cooperative values.",
    
    // Contact
    "contact_title": "Contact",
    "contact_desc": "We're here to help you. Contact us through any of these means.",
    "whatsapp": "WhatsApp",
    "immediate_response": "Immediate response",
    "email": "Email",
    "general_inquiries": "General inquiries",
    
    // Partners
    "partners_title": "Our Partners",
    "partners_desc": "Companies and organizations that trust us",
    
    // Footer
    "quick_links": "Quick links",
    "services": "Services",
    "contact": "Contact",
    "rights": "All rights reserved.",
    
    // Floating button
    "chat_with_us": "Chat with us!",
  }
};

// Context for theme and language
type Theme = 'light' | 'dark';
type Language = 'es' | 'en';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

// Helper to get/set assignment counts from localStorage
function getAssignmentCounts(): Record<number, number> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem("conexion_assignments");
  return stored ? JSON.parse(stored) : {};
}

function setAssignmentCount(id: number, count: number) {
  const counts = getAssignmentCounts();
  counts[id] = count;
  localStorage.setItem("conexion_assignments", JSON.stringify(counts));
}

export default function HomePage() {
  const { theme, toggleTheme, language, setLanguage, t } = useApp();
  const [rubro, setRubro] = useState("");
  const [zona, setZona] = useState("");
  const [resultado, setResultado] = useState<Especialista | null>(null);
  const [sinResultados, setSinResultados] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [assignmentCounts, setAssignmentCountsState] = useState<Record<number, number>>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + 1 >= PARTNERS.length - slidesToShow + 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.max(0, PARTNERS.length - slidesToShow) : prev - 1
    );
  };

  const buscarEspecialista = () => {
    if (!rubro || !zona) return;
    
    setBuscando(true);
    setResultado(null);
    setSinResultados(false);

    setTimeout(() => {
      const candidatos = ESPECIALISTAS.filter(
        (e) => e.rubros.includes(rubro) && e.zonas.includes(zona)
      );

      if (candidatos.length === 0) {
        setSinResultados(true);
        setBuscando(false);
        return;
      }

      const counts = getAssignmentCounts();
      let seleccionado = candidatos[0];
      let minAssignments = counts[seleccionado.id] || 0;

      for (const candidato of candidatos) {
        const candidatoCount = counts[candidato.id] || 0;
        if (candidatoCount < minAssignments) {
          seleccionado = candidato;
          minAssignments = candidatoCount;
        }
      }

      const newCount = (counts[seleccionado.id] || 0) + 1;
      setAssignmentCount(seleccionado.id, newCount);
      setAssignmentCountsState({ ...counts, [seleccionado.id]: newCount });

      setResultado(seleccionado);
      setBuscando(false);
    }, 800);
  };

  const limpiarBusqueda = () => {
    setRubro("");
    setZona("");
    setResultado(null);
    setSinResultados(false);
  };

  const generarWhatsAppLink = (especialista: Especialista) => {
    const rubroLabel = RUBROS.find((r) => r.value === rubro)?.label[language] || rubro;
    const zonaLabel = ZONAS.find((z) => z.value === zona)?.label[language] || zona;
    const mensaje = encodeURIComponent(
      `Hola ${especialista.nombre}, te contacto desde Conexion Digital. Necesito un servicio de ${rubroLabel} en ${zonaLabel}.`
    );
    return `https://wa.me/${especialista.telefono}?text=${mensaje}`;
  };

  const getRubroLabels = (rubros: string[]) => {
    return rubros.map((r) => RUBROS.find((rb) => rb.value === r)?.label[language] || r);
  };

  const getZonaLabels = (zonas: string[]) => {
    return zonas.map((z) => ZONAS.find((zn) => zn.value === z)?.label[language] || z);
  };

  const getRubroLabel = (value: string) => {
    return RUBROS.find((r) => r.value === value)?.label[language] || value;
  };

  const getZonaLabel = (value: string) => {
    return ZONAS.find((z) => z.value === value)?.label[language] || value;
  };

  const getNavLabel = (href: string) => {
    return NAV_LINKS.find((l) => l.href === href)?.label[language] || href;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Left */}
            <div className="flex items-center">
              <a href="#" className="flex items-center flex-shrink-0">
                <div className="relative w-32 sm:w-40">
                  <img 
                    src="logoconexiondigitalhorizontal.png"
                    alt="Conexion Digital Logo"
                    className="w-full h-auto object-contain dark:brightness-90"
                  />
                </div>
              </a>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-2 absolute left-1/2 transform -translate-x-1/2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 lg:px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-950/50 rounded-lg transition-colors whitespace-nowrap"
                >
                  {getNavLabel(link.href)}
                </a>
              ))}
            </nav>

            {/* Right section - Theme Toggle, Language Switcher, Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle language"
              >
                <Globe className="w-5 h-5" />
                <span className="sr-only">Language</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-950/50 rounded-lg transition-colors"
                  >
                    {getNavLabel(link.href)}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
    
      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />

      {/* Debug Panel */}
      {showDebug && (
        <div className="bg-gray-900 dark:bg-black text-lime-400 p-4 font-mono text-sm">
          <div className="max-w-7xl mx-auto px-4">
            <p className="mb-2 text-white">Contadores de asignaciones:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {ESPECIALISTAS.map((e) => (
                <div key={e.id} className="bg-gray-800 p-2 rounded">
                  <p className="text-xs text-gray-400 truncate">{e.nombre}</p>
                  <p className="text-lg">{assignmentCounts[e.id] || 0}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("conexion_assignments");
                setAssignmentCountsState({});
              }}
              className="mt-3 text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Resetear contadores
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center justify-center text-center gap-8 lg:gap-12 min-h-[calc(100vh-80px)]">
              <div className="w-full max-w-md mx-auto">
                <img 
                  src="service_home.png"
                  alt="Conexion Digital Isometric"
                  className="w-full h-auto object-contain dark:brightness-95"
                />
              </div>
              
              <div className="text-center flex-1 w-full">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100 text-balance">
                  {t("hero_title")}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto text-pretty">
                  {t("hero_desc")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="#buscar"
                    className="inline-flex items-center justify-center gap-2 bg-lime-500 dark:bg-lime-600 text-gray-900 dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-lime-400 dark:hover:bg-lime-500 transition-all shadow-lg shadow-lime-500/30 text-base sm:text-lg"
                  >
                    <Search className="w-5 h-5" />
                    {t("search_expert")}
                  </a>
                  <a
                    href="#nosotros"
                    className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700 text-base sm:text-lg"
                  >
                    {t("learn_more")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-16 sm:py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
                {t("services_title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                {t("services_desc")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {RUBROS.map((r) => {
                const IconComponent = r.icon;
                return (
                  <div 
                    key={r.value} 
                    className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 hover:from-lime-50 hover:to-lime-100 dark:hover:from-lime-950/50 dark:hover:to-lime-950/30 p-6 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-lime-300 dark:hover:border-lime-800 transition-all cursor-pointer flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow">
                      <IconComponent 
                        className="w-12 h-12 text-lime-600 dark:text-lime-500" 
                        strokeWidth={1.5} 
                        fill="none"
                        stroke="currentColor"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-tight">{r.label[language]}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section id="buscar" className="py-16 sm:py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
                {t("search_title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {t("search_desc")}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 lg:p-10 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="space-y-4 sm:space-y-6">
                {/* Rubro Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("service_type")}
                  </label>
                  <select
                    value={rubro}
                    onChange={(e) => setRubro(e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-base"
                  >
                    <option value="">{t("select_rubro")}</option>
                    {RUBROS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label[language]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Zona Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("coverage_zone")}
                  </label>
                  <select
                    value={zona}
                    onChange={(e) => setZona(e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-base"
                  >
                    <option value="">{t("select_zona")}</option>
                    {ZONAS.map((z) => (
                      <option key={z.value} value={z.value}>
                        {z.label[language]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={buscarEspecialista}
                    disabled={!rubro || !zona || buscando}
                    className="flex-1 bg-lime-500 dark:bg-lime-600 text-gray-900 dark:text-white py-3 sm:py-4 px-6 rounded-xl font-semibold hover:bg-lime-400 dark:hover:bg-lime-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-lime-500/25 text-base"
                  >
                    {buscando ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-800/30 dark:border-white/30 border-t-gray-800 dark:border-t-white rounded-full animate-spin" />
                        {t("searching")}
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        {t("search_expert")}
                      </>
                    )}
                  </button>
                  <button
                    onClick={limpiarBusqueda}
                    className="px-6 py-3 sm:py-4 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
                  >
                    {t("clear")}
                  </button>
                </div>
              </div>

              {/* Results */}
              {resultado && (
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-lime-500" />
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("assigned_expert")}
                    </h4>
                  </div>
                  <div className="bg-gradient-to-br from-lime-50 to-gray-50 dark:from-lime-950/30 dark:to-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-lime-200 dark:border-lime-800">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      <img
                        src={resultado.foto}
                        alt={resultado.nombre}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg flex-shrink-0"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <h5 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
                          {resultado.nombre}
                        </h5>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-2">
                            <Wrench className="w-4 h-4 text-lime-600 dark:text-lime-500" />
                            {getRubroLabels(resultado.rubros).join(", ")}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-2">
                            <MapPin className="w-4 h-4 text-lime-600 dark:text-lime-500" />
                            {getZonaLabels(resultado.zonas).join(", ")}
                          </p>
                        </div>
                        <a
                          href={generarWhatsAppLink(resultado)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 bg-green-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-green-600 transition-colors shadow-lg shadow-green-500/25"
                        >
                          <Phone className="w-4 h-4" />
                          {t("contact_whatsapp")}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* No Results */}
              {sinResultados && (
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t("no_results")}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                      {t("no_results_desc")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="nosotros" className="py-16 sm:py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
                {t("about_title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
                {t("about_desc")}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
              <div className="bg-gradient-to-br from-lime-50 to-white dark:from-lime-950/30 dark:to-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-lime-200 dark:border-lime-800 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-lime-600 dark:text-lime-500 mb-1">+500</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t("services_done")}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-1">+50</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t("active_experts")}</p>
              </div>
              <div className="bg-gradient-to-br from-lime-50 to-white dark:from-lime-950/30 dark:to-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-lime-200 dark:border-lime-800 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-lime-600 dark:text-lime-500 mb-1">5</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t("coverage_zones")}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-1">98%</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t("satisfied_clients")}</p>
              </div>
            </div>
            
            {/* Values */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-lime-100 dark:bg-lime-950 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-lime-600 dark:text-lime-500" />
                </div>
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100 text-lg">{t("cooperative_work")}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t("cooperative_work_desc")}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100 text-lg">{t("guaranteed_quality")}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t("guaranteed_quality_desc")}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-lime-100 dark:bg-lime-950 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-lime-600 dark:text-lime-500" />
                </div>
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100 text-lg">{t("quick_response")}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t("quick_response_desc")}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100 text-lg">{t("social_commitment")}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t("social_commitment_desc")}
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6 mt-12 sm:mt-16">
              <div className="bg-gradient-to-br from-lime-500 to-lime-600 p-6 sm:p-8 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8" />
                  <h4 className="text-xl sm:text-2xl font-bold">{t("mission_title")}</h4>
                </div>
                <p className="text-lime-100 leading-relaxed">
                  {t("mission_desc")}
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900 p-6 sm:p-8 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="w-8 h-8" />
                  <h4 className="text-xl sm:text-2xl font-bold">{t("vision_title")}</h4>
                </div>
                <p className="text-gray-300 dark:text-gray-400 leading-relaxed">
                  {t("vision_desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-16 sm:py-20 px-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
                {t("contact_title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                {t("contact_desc")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-green-600 dark:text-green-500" />
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-lg">{t("whatsapp")}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{t("immediate_response")}</p>
                <a 
                  href="https://wa.me/5491112345678" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 dark:text-green-500 font-medium hover:text-green-700 dark:hover:text-green-400"
                >
                  +54 9 11 1234-5678
                </a>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-lime-100 dark:bg-lime-950 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-lime-600 dark:text-lime-500" />
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-lg">{t("email")}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{t("general_inquiries")}</p>
                <a 
                  href="mailto:contacto@conexiondigital.coop"
                  className="inline-flex items-center gap-2 text-lime-600 dark:text-lime-500 font-medium hover:text-lime-700 dark:hover:text-lime-400 break-all"
                >
                  contacto@conexiondigital.coop
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Carousel Section */}
        <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
                {t("partners_title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                {t("partners_desc")}
              </p>
            </div>

            <div className="relative px-12">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-lime-50 dark:hover:bg-lime-950/50 hover:border-lime-300 dark:hover:border-lime-800 transition-all z-10"
                aria-label="Previous partners"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-500" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-lime-50 dark:hover:bg-lime-950/50 hover:border-lime-300 dark:hover:border-lime-800 transition-all z-10"
                aria-label="Next partners"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-500" />
              </button>

              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex gap-6 transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
                >
                  {PARTNERS.map((partner) => (
                    <div
                      key={partner.id}
                      className="flex-shrink-0"
                      style={{ width: `calc(${100 / slidesToShow}% - ${(slidesToShow - 1) * 24 / slidesToShow}px)` }}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:border-lime-300 dark:hover:border-lime-800 group">
                        <div className="h-24 flex items-center justify-center">
                          <img
                            src={partner.logo}
                            alt={partner.alt}
                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 dark:brightness-90 dark:hover:brightness-100"
                          />
                        </div>
                        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4 font-medium group-hover:text-lime-600 dark:group-hover:text-lime-500 transition-colors">
                          {partner.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(PARTNERS.length / slidesToShow) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx * slidesToShow)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentSlide / slidesToShow) === idx
                        ? "w-8 bg-lime-500 dark:bg-lime-600"
                        : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5491112345678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Contactar por WhatsApp"
      >
        <div className="relative">
          {/* Pulsing animation ring */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
          {/* Button background */}
          <div className="relative bg-green-500 rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110">
            {/* WhatsApp Icon SVG */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="w-7 h-7 text-white"
            >
              <path d="M19.077 4.928C16.979 2.83 14.136 1.5 11.042 1.5c-6.095 0-11.034 4.94-11.043 11.023-.003 1.961.514 3.875 1.5 5.566L.5 22.5l4.441-1.166c1.625.888 3.468 1.354 5.344 1.354h.005c6.093 0 11.035-4.94 11.044-11.021.003-2.934-1.136-5.688-3.258-7.739zM11.042 20.77c-1.596.002-3.162-.43-4.542-1.252l-.328-.195-2.656.698.709-2.585-.212-.339c-.96-1.531-1.469-3.298-1.466-5.103.007-5.09 4.148-9.229 9.248-9.229 2.468.001 4.787.964 6.531 2.712 1.744 1.747 2.7 4.07 2.694 6.534-.007 5.09-4.147 9.234-9.248 9.234zm5.067-6.916c-.278-.139-1.642-.81-1.896-.902-.254-.093-.438-.139-.622.139-.184.278-.713.902-.874 1.087-.161.185-.323.208-.601.069-.278-.139-1.174-.433-2.235-1.38-.826-.736-1.383-1.644-1.545-1.922-.162-.278-.017-.428.122-.566.125-.124.278-.323.417-.485.139-.162.185-.278.278-.463.093-.185.046-.347-.023-.486-.069-.139-.622-1.5-.853-2.054-.224-.538-.453-.465-.622-.474-.161-.008-.346-.008-.53-.008-.185 0-.485.069-.739.347-.254.278-.97.947-.97 2.31 0 1.362.992 2.677 1.13 2.862.139.185 1.952 2.98 4.73 4.18.66.286 1.176.456 1.578.585.663.21 1.266.18 1.743.109.531-.079 1.642-.671 1.873-1.319.231-.648.231-1.203.162-1.319-.069-.116-.254-.185-.532-.324z"/>
            </svg>
          </div>
          {/* Tooltip text */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 dark:bg-gray-700 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            {t("chat_with_us")}
          </span>
        </div>
      </a>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-10 sm:py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
            {/* Logo & Description */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-10 h-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M75 20 Q90 35, 70 55 Q50 75, 25 70"
                      fill="none"
                      stroke="#84cc16"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <img src="logoconexiondigital.png" 
                     alt="Conexion Digital Logo"
                    className="w-full h-auto object-contain brightness-90"
                  />
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t("about_desc")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-semibold mb-4 text-white">{t("quick_links")}</h5>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-gray-400 hover:text-lime-500 transition-colors text-sm">
                      {getNavLabel(link.href)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h5 className="font-semibold mb-4 text-white">{t("services")}</h5>
              <ul className="space-y-2">
                {RUBROS.slice(0, 4).map((r) => (
                  <li key={r.value}>
                    <span className="text-gray-400 text-sm">{r.label[language]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-semibold mb-4 text-white">{t("contact")}</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-lime-500" />
                  +54 9 11 1234-5678
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-lime-500" />
                  contacto@conexiondigital.coop
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-lime-500" />
                  CABA, Argentina
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 Conexion Digital - Cooperativa de Servicios. {t("rights")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Wrap the app with providers
export function AppWrapper() {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  );
}