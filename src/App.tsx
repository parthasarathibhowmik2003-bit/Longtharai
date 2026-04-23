import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppProvider } from './store/AppContext';
import Navigation from './components/Navigation';
import GrainOverlay from './components/GrainOverlay';
import CartDrawer from './components/CartDrawer';
import AccountModal from './components/AccountModal';
import ProductDetail from './components/ProductDetail';
import Section00Hero from './sections/Section00Hero';
import Section02Spices from './sections/Section02Spices';
import Section03Oil from './sections/Section03Oil';
import Section04Drinks from './sections/Section04Drinks';
import Section05Soybean from './sections/Section05Soybean';
import Section06Rice from './sections/Section06Rice';
import Section07Purity from './sections/Section07Purity';
import SectionHistory from './sections/SectionHistory';
import Section08Catalog from './sections/Section08Catalog';
import Section09Contact from './sections/Section09Contact';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  useEffect(() => {
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    const timer = setTimeout(setupSnap, 100);
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-charcoal">
      <Navigation />
      <GrainOverlay />
      <CartDrawer />
      <AccountModal />
      <ProductDetail />

      <main className="relative">
        <Section00Hero />
        <Section02Spices />
        <Section03Oil />
        <Section04Drinks />
        <Section05Soybean />
        <Section06Rice />
        <Section07Purity />
        <SectionHistory />
        <Section08Catalog />
        <Section09Contact />
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
