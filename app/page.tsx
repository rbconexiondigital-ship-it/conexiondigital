"use client";

import { useState } from "react";
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
  Heart
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
  { value: "electricidad", label: "Electricidad domiciliaria", icon: Zap },
  { value: "plomeria", label: "Plomeria", icon: Droplets },
  { value: "gasista", label: "Gasista matriculado", icon: Flame },
  { value: "aires", label: "Aires acondicionados", icon: Wind },
  { value: "herreria", label: "Herreria", icon: Shield },
  { value: "cerrajeria", label: "Cerrajeria", icon: Wrench },
];

const ZONAS = [
  { value: "norte", label: "Zona Norte" },
  { value: "sur", label: "Zona Sur" },
  { value: "centro", label: "Centro" },
  { value: "oeste", label: "Zona Oeste" },
  { value: "este", label: "Zona Este" },
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
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#buscar", label: "Buscar" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

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
  const [rubro, setRubro] = useState("");
  const [zona, setZona] = useState("");
  const [resultado, setResultado] = useState<Especialista | null>(null);
  const [sinResultados, setSinResultados] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [assignmentCounts, setAssignmentCountsState] = useState<Record<number, number>>({});

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
    const rubroLabel = RUBROS.find((r) => r.value === rubro)?.label || rubro;
    const zonaLabel = ZONAS.find((z) => z.value === zona)?.label || zona;
    const mensaje = encodeURIComponent(
      `Hola ${especialista.nombre}, te contacto desde Conexion Digital. Necesito un servicio de ${rubroLabel} en ${zonaLabel}.`
    );
    return `https://wa.me/${especialista.telefono}?text=${mensaje}`;
  };

  const getRubroLabels = (rubros: string[]) => {
    return rubros.map((r) => RUBROS.find((rb) => rb.value === r)?.label || r);
  };

  const getZonaLabels = (zonas: string[]) => {
    return zonas.map((z) => ZONAS.find((zn) => zn.value === z)?.label || z);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-gray-50 to-white">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Left */}
            <a href="#inicio" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M75 20 Q90 35, 70 55 Q50 75, 25 70"
                    fill="none"
                    stroke="#84cc16"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M70 25 Q82 38, 65 52"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-700 tracking-tight">
                  <span className="text-gray-600">c</span>
                  <span className="text-lime-500 font-black">O</span>
                  <span className="text-gray-600">nexion</span>
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-500 italic -mt-0.5">digital</p>
              </div>
            </a>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-2 flex-1 mx-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 lg:px-4 py-2 text-sm font-medium text-gray-600 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Debug Button - Right */}
            <div className="flex-shrink-0">
              <button
                onClick={() => {
                  setShowDebug(!showDebug);
                  setAssignmentCountsState(getAssignmentCounts());
                }}
                className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded transition-colors hidden md:block"
              >
                [Debug]
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-lime-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-base font-medium text-gray-600 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                {/* <button
                  onClick={() => {
                    setShowDebug(!showDebug);
                    setAssignmentCountsState(getAssignmentCounts());
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-sm text-gray-400 hover:text-gray-600 text-left"
                >
                  [Debug Mode]
                </button> */}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />

      {/* Debug Panel */}
      {showDebug && (
        <div className="bg-gray-900 text-lime-400 p-4 font-mono text-sm">
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
 {/* Hero Section */}
<section id="inicio" className="relative py-16 sm:py-20 lg:py-28 px-4 overflow-hidden">
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-10 right-0 sm:right-10 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 opacity-10">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path
          d="M150 30 Q180 60, 140 100 Q100 140, 50 130"
          fill="none"
          stroke="#84cc16"
          strokeWidth="20"
          strokeLinecap="round"
        />
      </svg>
    </div>
    <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 opacity-5">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path
          d="M50 170 Q20 140, 60 100 Q100 60, 150 70"
          fill="none"
          stroke="#84cc16"
          strokeWidth="20"
          strokeLinecap="round"
        />
      </svg>
    </div>
  </div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="flex flex-col items-center justify-center text-center gap-8 lg:gap-12">
      {/* Logo */}
      <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 flex-shrink-0 bg-white shadow-2xl flex items-center justify-center p-3 border-4 border-gray-100">
        <img 
          src="service_home.jpg"
          alt="Conexion Digital Logo"
          className="w-full h-full object-contain rounded-full"
        />
      </div>
      
      {/* Content */}
      <div className="text-center flex-1">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800 text-balance">
          Conectamos expertos con quienes los necesitan
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-pretty">
          Somos una cooperativa de servicios tecnicos que garantiza calidad, precios justos y atencion rapida en toda la ciudad.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href="#buscar"
            className="inline-flex items-center justify-center gap-2 bg-lime-500 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-lime-400 transition-all shadow-lg shadow-lime-500/30 text-base sm:text-lg"
          >
            <Search className="w-5 h-5" />
            Buscar especialista
          </a>
          <a
            href="#nosotros"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all border border-gray-200 text-base sm:text-lg"
          >
            Conocer mas
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
        {/* Services Section */}
        <section id="servicios" className="py-16 sm:py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                Nuestros Servicios
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                Ofrecemos una amplia variedad de servicios tecnicos para el hogar y empresas, 
                con profesionales certificados y garantia de calidad.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {RUBROS.map((r) => (
                <div 
                  key={r.value} 
                  className="group bg-gradient-to-br from-gray-50 to-gray-100 hover:from-lime-50 hover:to-lime-100 p-6 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-lime-300 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                    <r.icon className="w-6 h-6 text-lime-600" />
                  </div>
                  <h4 className="font-semibold text-gray-700 text-base sm:text-lg leading-tight">{r.label}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section id="buscar" className="py-16 sm:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                Encuentra tu especialista
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Selecciona el tipo de servicio y tu zona para encontrar al profesional ideal.
              </p>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 lg:p-10 border border-gray-200">
              <div className="space-y-4 sm:space-y-6">
                {/* Rubro Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de servicio
                  </label>
                  <select
                    value={rubro}
                    onChange={(e) => setRubro(e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-base"
                  >
                    <option value="">Seleccionar rubro...</option>
                    {RUBROS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Zona Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zona de cobertura
                  </label>
                  <select
                    value={zona}
                    onChange={(e) => setZona(e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-base"
                  >
                    <option value="">Seleccionar zona...</option>
                    {ZONAS.map((z) => (
                      <option key={z.value} value={z.value}>
                        {z.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={buscarEspecialista}
                    disabled={!rubro || !zona || buscando}
                    className="flex-1 bg-lime-500 text-gray-900 py-3 sm:py-4 px-6 rounded-xl font-semibold hover:bg-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-lime-500/25 text-base"
                  >
                    {buscando ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-800/30 border-t-gray-800 rounded-full animate-spin" />
                        Buscando...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Buscar especialista
                      </>
                    )}
                  </button>
                  <button
                    onClick={limpiarBusqueda}
                    className="px-6 py-3 sm:py-4 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all font-medium"
                  >
                    Limpiar
                  </button>
                </div>
              </div>

              {/* Results */}
              {resultado && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-lime-500" />
                    <h4 className="text-sm font-medium text-gray-700">
                      Especialista asignado
                    </h4>
                  </div>
                  <div className="bg-gradient-to-br from-lime-50 to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-lime-200">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      <img
                        src={resultado.foto}
                        alt={resultado.nombre}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <h5 className="text-xl sm:text-2xl font-semibold text-gray-800">
                          {resultado.nombre}
                        </h5>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start gap-2">
                            <Wrench className="w-4 h-4 text-lime-600" />
                            {getRubroLabels(resultado.rubros).join(", ")}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start gap-2">
                            <MapPin className="w-4 h-4 text-lime-600" />
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
                          Contactar por WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* No Results */}
              {sinResultados && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">
                      No encontramos especialistas
                    </h4>
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                      No hay especialistas disponibles para el rubro y zona seleccionados. 
                      Intenta con otra combinacion o contactanos directamente.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="nosotros" className="py-16 sm:py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                Sobre Nosotros
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
                Somos una cooperativa de trabajo comprometida con brindar servicios de calidad 
                y generar oportunidades laborales justas para nuestros asociados.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
              <div className="bg-gradient-to-br from-lime-50 to-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-lime-200 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-lime-600 mb-1">+500</p>
                <p className="text-gray-600 text-xs sm:text-sm">Servicios realizados</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-gray-700 mb-1">+50</p>
                <p className="text-gray-600 text-xs sm:text-sm">Especialistas activos</p>
              </div>
              <div className="bg-gradient-to-br from-lime-50 to-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-lime-200 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-lime-600 mb-1">5</p>
                <p className="text-gray-600 text-xs sm:text-sm">Zonas de cobertura</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-gray-700 mb-1">98%</p>
                <p className="text-gray-600 text-xs sm:text-sm">Clientes satisfechos</p>
              </div>
            </div>
            
            {/* Values */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-lime-600" />
                </div>
                <h4 className="font-semibold mb-2 text-gray-800 text-lg">Trabajo cooperativo</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Distribucion justa del trabajo entre todos los asociados de la cooperativa.
                </p>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-gray-600" />
                </div>
                <h4 className="font-semibold mb-2 text-gray-800 text-lg">Calidad garantizada</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Tecnicos certificados y con amplia experiencia en cada especialidad.
                </p>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-lime-600" />
                </div>
                <h4 className="font-semibold mb-2 text-gray-800 text-lg">Respuesta rapida</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Atencion inmediata y coordinacion eficiente para resolver tu problema.
                </p>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-gray-600" />
                </div>
                <h4 className="font-semibold mb-2 text-gray-800 text-lg">Compromiso social</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Precios justos y transparentes para toda la comunidad.
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6 mt-12 sm:mt-16">
              <div className="bg-gradient-to-br from-lime-500 to-lime-600 p-6 sm:p-8 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8" />
                  <h4 className="text-xl sm:text-2xl font-bold">Nuestra Mision</h4>
                </div>
                <p className="text-lime-100 leading-relaxed">
                  Brindar servicios tecnicos de excelencia, generando trabajo digno para nuestros 
                  asociados y contribuyendo al desarrollo de la comunidad a traves de la economia social y solidaria.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 sm:p-8 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="w-8 h-8" />
                  <h4 className="text-xl sm:text-2xl font-bold">Nuestra Vision</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Ser la cooperativa de servicios tecnicos de referencia en la region, reconocida por 
                  la calidad de nuestro trabajo, la innovacion tecnologica y nuestro compromiso con los valores cooperativos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-16 sm:py-20 px-4 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                Contacto
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                Estamos aqui para ayudarte. Contactanos por cualquiera de estos medios.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">WhatsApp</h4>
                <p className="text-gray-600 text-sm mb-4">Respuesta inmediata</p>
                <a 
                  href="https://wa.me/5491112345678" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700"
                >
                  +54 9 11 1234-5678
                </a>
              </div>
              
              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-lime-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">Email</h4>
                <p className="text-gray-600 text-sm mb-4">Consultas generales</p>
                <a 
                  href="mailto:contacto@conexiondigital.coop"
                  className="inline-flex items-center gap-2 text-lime-600 font-medium hover:text-lime-700 break-all"
                >
                  contacto@conexiondigital.coop
                </a>
              </div>
              
              {/* <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-gray-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">Oficina</h4>
                <p className="text-gray-600 text-sm mb-4">Atencion presencial</p>
                <p className="text-gray-700 font-medium">
                  Av. Corrientes 1234, CABA
                </p>
              </div> */}
            </div>

            {/* Hours */}
            {/* <div className="mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-lime-600" />
                <h4 className="font-semibold text-gray-800 text-lg">Horarios de atencion</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-center sm:text-left">
                <div>
                  <p className="text-gray-600 text-sm">Lunes a Viernes</p>
                  <p className="text-gray-800 font-medium">8:00 - 20:00 hs</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Sabados</p>
                  <p className="text-gray-800 font-medium">9:00 - 14:00 hs</p>
                </div>
              </div>
              <p className="text-center text-lime-600 font-medium mt-4 text-sm">
                Emergencias 24/7 via WhatsApp
              </p>
            </div> */}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 sm:py-14 px-4">
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
                  <span className="text-lg font-bold">
                    <span className="text-gray-400">c</span>
                    <span className="text-lime-500 font-black">O</span>
                    <span className="text-gray-400">nexion</span>
                  </span>
                  <span className="text-sm text-gray-500 italic ml-1">digital</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Cooperativa de servicios tecnicos comprometida con la calidad y el trabajo justo.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-semibold mb-4 text-white">Enlaces rapidos</h5>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-gray-400 hover:text-lime-500 transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h5 className="font-semibold mb-4 text-white">Servicios</h5>
              <ul className="space-y-2">
                {RUBROS.slice(0, 4).map((r) => (
                  <li key={r.value}>
                    <span className="text-gray-400 text-sm">{r.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-semibold mb-4 text-white">Contacto</h5>
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
              © 2025 Conexion Digital - Cooperativa de Servicios. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}