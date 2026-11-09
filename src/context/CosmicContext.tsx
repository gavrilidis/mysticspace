'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { COSMIC_TARGETS, PALETTES } from '@/data/palettes';
import { CosmicPalette, FlightTelemetry, PaletteKey } from '@/types/mystic';

interface CosmicContextValue {
  paletteKey: PaletteKey;
  palette: CosmicPalette;
  setCosmicPalette: (key: PaletteKey) => void;
  flightRef: React.MutableRefObject<FlightTelemetry>;
  sliderSpeed: number;
  setSliderSpeed: (val: number) => void;
  galaxyDist: number;
  setGalaxyDist: (val: number) => void;
  userOffsetX: number;
  setUserOffsetX: (val: number) => void;
  userOffsetY: number;
  setUserOffsetY: (val: number) => void;
  lockOrbit: boolean;
  toggleOrbitLock: () => void;
  targetIndex: number;
  selectCosmicTarget: (idx: number) => void;
  pureSpace: boolean;
  togglePureSpace: () => void;
  triggerScrollBoost: (amount?: number) => void;
  modalPlanTitle: string | null;
  modalSubmitted: boolean;
  openActionModal: (planTitle?: string) => void;
  closeActionModal: () => void;
  submitActionModal: () => void;
  geometryVersion: number;
}

const CosmicContext = createContext<CosmicContextValue | null>(null);

export function CosmicProvider({ children }: { children: React.ReactNode }) {
  const [paletteKey, setPaletteKeyState] = useState<PaletteKey>('gold');
  const [sliderSpeed, setSliderSpeedState] = useState<number>(1.2);
  const [galaxyDist, setGalaxyDistState] = useState<number>(640);
  const [userOffsetX, setUserOffsetXState] = useState<number>(0);
  const [userOffsetY, setUserOffsetYState] = useState<number>(0);
  const [lockOrbit, setLockOrbitState] = useState<boolean>(true);
  const [targetIndex, setTargetIndexState] = useState<number>(0);
  const [pureSpace, setPureSpaceState] = useState<boolean>(false);
  const [geometryVersion, setGeometryVersion] = useState<number>(0);

  const [modalPlanTitle, setModalPlanTitle] = useState<string | null>(null);
  const [modalSubmitted, setModalSubmitted] = useState<boolean>(false);

  const flightRef = useRef<FlightTelemetry>({
    width: 1440,
    height: 900,
    dpr: 1,
    sliderSpeed: 1.2,
    scrollBoost: 0,
    state: 'APPROACH',
    lockOrbit: true,
    targetIndex: 0,
    galaxyDist: 640,
    userOffsetX: 0,
    userOffsetY: 0,
    orbitRadius: 430,
    orbitAzimuth: 0.4,
    orbitPitch: 0.46,
    orbitProgress: 0,
    targetSteerX: 0,
    targetSteerY: 0,
    steerX: 0,
    steerY: 0,
    focalLength: 520,
    maxDepth: 2200,
  });

  const applyPaletteCssVars = useCallback((p: CosmicPalette) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--bg-deep', p.bgDeep);
    root.style.setProperty('--accent-1', p.accent1);
    root.style.setProperty('--accent-1-rgb', p.accent1Rgb);
    root.style.setProperty('--accent-2', p.accent2);
    root.style.setProperty('--accent-2-rgb', p.accent2Rgb);
    root.style.setProperty('--accent-soft', p.accentSoft);
    root.style.setProperty('--card-border', `rgba(${p.accent1Rgb}, 0.24)`);
  }, []);

  const setCosmicPalette = useCallback(
    (key: PaletteKey) => {
      const p = PALETTES[key];
      if (!p) return;
      setPaletteKeyState(key);
      applyPaletteCssVars(p);
      setGeometryVersion((v) => v + 1);
    },
    [applyPaletteCssVars]
  );

  const setSliderSpeed = useCallback((val: number) => {
    const num = isNaN(val) ? 1.2 : val;
    flightRef.current.sliderSpeed = num;
    setSliderSpeedState(num);
  }, []);

  const setGalaxyDist = useCallback((val: number) => {
    const dist = isNaN(val) ? 640 : val;
    flightRef.current.galaxyDist = dist;
    flightRef.current.orbitRadius = dist;
    setGalaxyDistState(dist);
  }, []);

  const setUserOffsetX = useCallback((val: number) => {
    const offset = isNaN(val) ? 0 : val;
    flightRef.current.userOffsetX = offset;
    setUserOffsetXState(offset);
  }, []);

  const setUserOffsetY = useCallback((val: number) => {
    const offset = isNaN(val) ? 0 : val;
    flightRef.current.userOffsetY = offset;
    setUserOffsetYState(offset);
  }, []);

  const toggleOrbitLock = useCallback(() => {
    setLockOrbitState((prev) => {
      const next = !prev;
      flightRef.current.lockOrbit = next;
      return next;
    });
  }, []);

  const selectCosmicTarget = useCallback((idx: number) => {
    const safeIdx = ((idx % COSMIC_TARGETS.length) + COSMIC_TARGETS.length) % COSMIC_TARGETS.length;
    flightRef.current.targetIndex = safeIdx;
    flightRef.current.state = 'APPROACH';
    flightRef.current.galaxyDist = 640;
    flightRef.current.orbitRadius = 430;
    flightRef.current.userOffsetX = 0;
    flightRef.current.userOffsetY = 0;
    flightRef.current.orbitProgress = 0;

    setTargetIndexState(safeIdx);
    setGalaxyDistState(640);
    setUserOffsetXState(0);
    setUserOffsetYState(0);
    setGeometryVersion((v) => v + 1);
  }, []);

  const togglePureSpace = useCallback(() => {
    setPureSpaceState((prev) => {
      const next = !prev;
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('pure-space', next);
      }
      return next;
    });
  }, []);

  const triggerScrollBoost = useCallback((amount = 9) => {
    flightRef.current.scrollBoost = amount;
  }, []);

  const openActionModal = useCallback((planTitle?: string) => {
    setModalPlanTitle(planTitle || 'Открыть полный доступ');
    setModalSubmitted(false);
  }, []);

  const closeActionModal = useCallback(() => {
    setModalPlanTitle(null);
    setModalSubmitted(false);
  }, []);

  const submitActionModal = useCallback(() => {
    setModalSubmitted(true);
  }, []);

  useEffect(() => {
    applyPaletteCssVars(PALETTES[paletteKey]);
  }, [applyPaletteCssVars, paletteKey]);

  const value: CosmicContextValue = {
    paletteKey,
    palette: PALETTES[paletteKey],
    setCosmicPalette,
    flightRef,
    sliderSpeed,
    setSliderSpeed,
    galaxyDist,
    setGalaxyDist,
    userOffsetX,
    setUserOffsetX,
    userOffsetY,
    setUserOffsetY,
    lockOrbit,
    toggleOrbitLock,
    targetIndex,
    selectCosmicTarget,
    pureSpace,
    togglePureSpace,
    triggerScrollBoost,
    modalPlanTitle,
    modalSubmitted,
    openActionModal,
    closeActionModal,
    submitActionModal,
    geometryVersion,
  };

  return <CosmicContext.Provider value={value}>{children}</CosmicContext.Provider>;
}

export function useCosmic(): CosmicContextValue {
  const ctx = useContext(CosmicContext);
  if (!ctx) {
    throw new Error('useCosmic must be used within a CosmicProvider');
  }
  return ctx;
}

