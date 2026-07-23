import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnnouncementBanner from '@/components/AnnouncementBanner';

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
      <body className="bg-[#0F1B16] text-[#F3EFE3] flex flex-col min-h-screen selection:bg-[#C6A15B] selection:text-[#0F1B16]">
        <AnnouncementBanner />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
