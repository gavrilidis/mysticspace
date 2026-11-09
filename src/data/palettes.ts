import { CosmicPalette, CosmicTarget, PaletteKey, RGBTuple } from '@/types/mystic';

export const PALETTES: Record<PaletteKey, CosmicPalette> = {
  gold: {
    bgDeep: '#030408',
    accent1: '#E5C158',
    accent1Rgb: '229, 193, 88',
    accent2: '#60A5FA',
    accent2Rgb: '96, 165, 250',
    accentSoft: '#F5E6C8',
    nebulaCore: [215, 165, 85],
    nebulaMid: [70, 115, 210],
    nebulaOuter: [130, 85, 195],
  },
  nebula: {
    bgDeep: '#05030A',
    accent1: '#C084FC',
    accent1Rgb: '192, 132, 252',
    accent2: '#22D3EE',
    accent2Rgb: '34, 211, 238',
    accentSoft: '#F3E8FF',
    nebulaCore: [185, 95, 250],
    nebulaMid: [45, 190, 230],
    nebulaOuter: [220, 70, 165],
  },
  aurora: {
    bgDeep: '#020709',
    accent1: '#34D399',
    accent1Rgb: '52, 211, 153',
    accent2: '#38BDF8',
    accent2Rgb: '56, 189, 248',
    accentSoft: '#D1FAE5',
    nebulaCore: [45, 210, 155],
    nebulaMid: [55, 165, 245],
    nebulaOuter: [110, 95, 235],
  },
  eclipse: {
    bgDeep: '#080305',
    accent1: '#FB923C',
    accent1Rgb: '251, 146, 60',
    accent2: '#F43F5E',
    accent2Rgb: '244, 63, 94',
    accentSoft: '#FFEDD5',
    nebulaCore: [250, 135, 65],
    nebulaMid: [235, 65, 100],
    nebulaOuter: [140, 60, 180],
  },
};

export const PALETTE_OPTIONS: { key: PaletteKey; label: string; dotColor: string }[] = [
  { key: 'gold', label: 'Золото', dotColor: '#E5C158' },
  { key: 'nebula', label: 'Орион', dotColor: '#C084FC' },
  { key: 'aurora', label: 'Сияние', dotColor: '#34D399' },
  { key: 'eclipse', label: 'Затмение', dotColor: '#FB923C' },
];

export const COSMIC_TARGETS: CosmicTarget[] = [
  {
    id: 'andromeda',
    name: 'ЗВЁЗДНАЯ СПИРАЛЬ',
    shortLabel: 'Спираль',
    type: 'spiral',
    arms: 2,
    tiltX: 0.56,
    coreColor: [255, 232, 185],
    armColor1: [115, 178, 255],
    armColor2: [238, 192, 105],
    dustColor: [235, 95, 135],
    darkLaneColor: [6, 8, 18],
  },
  {
    id: 'whirlpool',
    name: 'ВИХРЬ СУДЬБЫ',
    shortLabel: 'Вихрь',
    type: 'grand-spiral',
    arms: 2,
    tiltX: 0.34,
    coreColor: [255, 240, 215],
    armColor1: [72, 195, 255],
    armColor2: [188, 135, 255],
    dustColor: [248, 105, 165],
    darkLaneColor: [8, 5, 18],
  },
  {
    id: 'gargantua',
    name: 'ЧЁРНОЕ СОЛНЦЕ',
    shortLabel: 'Затмение',
    type: 'blackhole',
    arms: 4,
    tiltX: 0.25,
    coreColor: [255, 225, 165],
    armColor1: [255, 152, 68],
    armColor2: [238, 72, 98],
    dustColor: [165, 95, 245],
    darkLaneColor: [4, 3, 9],
  },
  {
    id: 'orion',
    name: 'ЭФИР ДУШИ',
    shortLabel: 'Эфир',
    type: 'nebula-cluster',
    arms: 3,
    tiltX: 0.42,
    coreColor: [255, 238, 195],
    armColor1: [48, 198, 225],
    armColor2: [238, 158, 78],
    dustColor: [215, 85, 145],
    darkLaneColor: [7, 10, 20],
  },
];

export const MYSTIC_REALM_NAMES = COSMIC_TARGETS.map((t) => t.name);

export const STAR_SPECTRA: RGBTuple[] = [
  [155, 188, 255], // Class O - Blue-violet supergiant
  [185, 212, 255], // Class B - Deep sapphire-white
  [235, 243, 255], // Class A - Pure crisp white
  [255, 249, 238], // Class F - Warm ivory
  [255, 236, 198], // Class G - Solar champagne gold
  [255, 204, 142], // Class K - Rich amber giant
  [255, 162, 112], // Class M - Deep ruby-orange
];

