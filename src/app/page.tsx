'use client';

import React from 'react';
import CosmosCanvas from '@/components/canvas/CosmosCanvas';
import FlightControllerHud from '@/components/hud/FlightControllerHud';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import ActionModal from '@/components/modals/ActionModal';
import EcosystemSection from '@/components/sections/EcosystemSection';
import ExpressCodeSection from '@/components/sections/ExpressCodeSection';
import HeroSection from '@/components/sections/HeroSection';
import InteractiveLabSection from '@/components/sections/InteractiveLabSection';
import PricingSection from '@/components/sections/PricingSection';
import { useScrollMorph } from '@/hooks/useScrollMorph';

export default function HomePage() {
  useScrollMorph();

  return (
    <>
      {/* 1. 3D Galaxy & Deep Space Engine */}
      <CosmosCanvas />

      {/* 2. Main UI Layer */}
      <div id="ui-layer" className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <EcosystemSection />
          <InteractiveLabSection />
          <ExpressCodeSection />
          <PricingSection />
        </main>
        <Footer />
      </div>

      {/* 3. Floating Space Flight Controller HUD */}
      <FlightControllerHud />

      {/* 4. Action Modal Dialog */}
      <ActionModal />
    </>
  );
}

