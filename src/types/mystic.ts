export type PaletteKey = 'gold' | 'nebula' | 'aurora' | 'eclipse';

export type RGBTuple = [number, number, number];

export interface CosmicPalette {
  bgDeep: string;
  accent1: string;
  accent1Rgb: string;
  accent2: string;
  accent2Rgb: string;
  accentSoft: string;
  nebulaCore: RGBTuple;
  nebulaMid: RGBTuple;
  nebulaOuter: RGBTuple;
}

export type CosmicTargetType = 'spiral' | 'grand-spiral' | 'blackhole' | 'nebula-cluster';

export interface CosmicTarget {
  id: string;
  name: string;
  shortLabel: string;
  type: CosmicTargetType;
  arms: number;
  tiltX: number;
  coreColor: RGBTuple;
  armColor1: RGBTuple;
  armColor2: RGBTuple;
  dustColor: RGBTuple;
  darkLaneColor: RGBTuple;
}

export interface FlightTelemetry {
  width: number;
  height: number;
  dpr: number;
  sliderSpeed: number;
  scrollBoost: number;
  state: 'APPROACH' | 'ORBIT';
  lockOrbit: boolean;
  targetIndex: number;
  galaxyDist: number;
  userOffsetX: number;
  userOffsetY: number;
  orbitRadius: number;
  orbitAzimuth: number;
  orbitPitch: number;
  orbitProgress: number;
  targetSteerX: number;
  targetSteerY: number;
  steerX: number;
  steerY: number;
  focalLength: number;
  maxDepth: number;
}

export interface EcoStage {
  step: number;
  cardTitle: string;
  cardTag: string;
  cardDescription: string;
  badge: string;
  title: string;
  footer: string;
}

export interface TarotCard {
  num: string;
  title: string;
  meaning: string;
}

export type ElementKey = 'fire' | 'water' | 'air' | 'earth';

export interface SynastryReading {
  score: number;
  text: string;
}

export interface ZodiacSign {
  name: string;
  glyph: string;
  max: [number, number];
}

export interface ArcanaGift {
  title: string;
  gift: string;
}

export interface DestinyReadingResult {
  name: string;
  sign: ZodiacSign;
  arcanaNumber: number;
  arcanaRoman: string;
  arcanaInfo: ArcanaGift;
}

export interface PricingTier {
  id: string;
  orbitBadge: string;
  title: string;
  price: string;
  period: string;
  features: string[];
  ctaText: string;
  featured?: boolean;
  popularTag?: string;
  actionPlanTitle?: string;
  href?: string;
}

