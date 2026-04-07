import { redHat } from '@/lib/fonts';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Deleine - Frisör i Solna',
  description:
    'Exklusiv hårvård i en lugn salong i Solna. Klippning, färgning och hårförlängning anpassat efter dig. Boka din tid hos Deleine."',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className={`${redHat.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
