import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conexion Digital - Cooperativa de Servicios",
  description: "Buscador de especialistas técnicos de la cooperativa. Electricidad, plomería, gasista, aires acondicionados, herrería y más.",
  icons: {
    icon: 'favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-[var(--background)]">
      <body className="antialiased">{children}</body>
    </html>
  );
}
