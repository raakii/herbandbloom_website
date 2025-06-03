import { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import '../../public/assets/scss/style.scss';
import '../../public/assets/css/materialdesignicons.min.css';
import PreloadAllPages from './preload-pages';
import { LanguageProvider } from './context/LanguageContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata = {
  title: 'Herb&Bloom',
  description: 'Herb&Bloom website',
  alternates: {
    languages: {
      'en': '/',
      'fr': '/fr'
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Script pour précharger les pages critiques dès le chargement */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Préchargement immédiat des pages principales
              document.addEventListener('DOMContentLoaded', function() {
                const criticalRoutes = ['/'];
                criticalRoutes.forEach(route => {
                  const link = document.createElement('link');
                  link.rel = 'prefetch';
                  link.href = route;
                  link.as = 'document';
                  document.head.appendChild(link);
                });
              });
            `,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          {/* Composant pour précharger toutes les pages */}
          <PreloadAllPages />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}