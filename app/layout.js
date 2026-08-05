import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import FloatingContactButton from '@/components/FloatingContactButton';

export const metadata = {
  title: 'Mevakkatu Shree Nagaraja Kshetram | Sacred Serpent Temple Kerala',
  description: 'Official website of Mevakkatu Shree Nagaraja Kshetram. Discover daily rituals, Ayilyam Mahotsavam, Sarpa Kavu, book poojas online, and support temple preservation.',
  keywords: 'Mevakkatu, Shree Nagaraja, Nagadevatas, Sarpa Kavu, Kerala Temple, Noorum Palum, Ayilyam, Pooja Booking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Forum&family=Gloock&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0D1A12] text-[#F7F2E7] flex flex-col min-h-screen selection:bg-[#9B7A41] selection:text-[#0D1A12]">
        <AnnouncementBanner />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <FloatingContactButton />
        <Footer />
      </body>
    </html>
  );
}
