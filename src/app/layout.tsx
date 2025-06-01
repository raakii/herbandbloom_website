import { ReactNode } from 'react';
import { Poppins, Ubuntu, Teko, Noto_Sans, Libre_Baskerville, Kaushan_Script } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import '../../public/assets/scss/style.scss';
import '../../public/assets/css/materialdesignicons.min.css';
import PreloadAllPages from './preload-pages';

// Configuration des polices
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
});

const teko = Teko({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-teko',
});

const noto = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto',
});

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre',
});

const kaushan = Kaushan_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-kaushan',
});

export const metadata = {
  title: 'Herb&Bloom',
  description: 'Herb&Bloom website',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
      <body className={`${poppins.variable} ${ubuntu.variable} ${teko.variable} ${noto.variable} ${libre.variable} ${kaushan.variable}`}>
        {/* Composant pour précharger toutes les pages */}
        <PreloadAllPages />
        {children}
      </body>
    </html>
  );
}