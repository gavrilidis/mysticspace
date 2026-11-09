import { COSMIC_TARGETS, STAR_SPECTRA } from '@/data/palettes';
import { CosmicTarget } from '@/types/mystic';

export interface Star3D {
  x: number;
  y: number;
  z: number;
  r: number;
  g: number;
  b: number;
  baseSize: number;
  isHeroStar: boolean;
  sprite: HTMLCanvasElement;
  twinklePhase: number;
}

export interface DeepFieldGalaxy {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  angle: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
}

export interface GalaxyParticle {
  x: number;
  y: number;
  z: number;
  r: number;
  g: number;
  b: number;
  size: number;
  alpha: number;
  isHII: boolean;
  hasSpikes: boolean;
  sprite: HTMLCanvasElement;
  twinkleSpeed: number;
  twinklePhase: number;
}

export interface NebulaPuff {
  x: number;
  y: number;
  z: number;
  radius: number;
  sprite: HTMLCanvasElement;
  alpha: number;
  rotation: number;
}

export interface DarkDustLane {
  x: number;
  y: number;
  z: number;
  radius: number;
  sprite: HTMLCanvasElement;
  alpha: number;
}

export interface GalaxyGeometryData {
  galaxyParticles: GalaxyParticle[];
  nebulaPuffs: NebulaPuff[];
  darkDustLanes: DarkDustLane[];
}

const STAR_COUNT = 2400;
const GALAXY_PARTICLE_COUNT = 3600;

const starSpriteCache = new Map<string, HTMLCanvasElement>();
const nebulaSpriteCache = new Map<string, HTMLCanvasElement>();

export function clearNebulaSpriteCache(): void {
  nebulaSpriteCache.clear();
}

export function getGlowingStarSprite(
  r: number,
  g: number,
  b: number,
  hasSpikes = false
): HTMLCanvasElement {
  const key = `${r},${g},${b},${hasSpikes ? 1 : 0}`;
  const cached = starSpriteCache.get(key);
  if (cached) return cached;

  const size = hasSpikes ? 96 : 36;
  const half = size / 2;
  const off = document.createElement('canvas');
  off.width = size;
  off.height = size;
  const octx = off.getContext('2d')!;

  const grad = octx.createRadialGradient(
    half,
    half,
    0,
    half,
    half,
    hasSpikes ? half * 0.58 : half
  );
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.11, 'rgba(255, 255, 255, 0.98)');
  grad.addColorStop(0.24, `rgba(${r}, ${g}, ${b}, 0.82)`);
  grad.addColorStop(0.52, `rgba(${r}, ${g}, ${b}, 0.22)`);
  grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

  octx.fillStyle = grad;
  octx.beginPath();
  octx.arc(half, half, half, 0, Math.PI * 2);
  octx.fill();

  if (hasSpikes) {
    const angles = [0, Math.PI / 6, Math.PI / 2, (5 * Math.PI) / 6];
    angles.forEach((ang, idx) => {
      octx.save();
      octx.translate(half, half);
      octx.rotate(ang);

      const reach = idx === 0 ? half * 0.72 : half * 0.98;
      const thickness = idx === 2 ? 1.55 : 1.15;

      const spikeGrad = octx.createLinearGradient(-reach, 0, reach, 0);
      spikeGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
      spikeGrad.addColorStop(0.25, `rgba(${r}, ${g}, ${b}, 0.35)`);
      spikeGrad.addColorStop(0.45, 'rgba(255, 250, 235, 0.92)');
      spikeGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
      spikeGrad.addColorStop(0.55, 'rgba(255, 250, 235, 0.92)');
      spikeGrad.addColorStop(0.75, `rgba(${r}, ${g}, ${b}, 0.35)`);
      spikeGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      octx.fillStyle = spikeGrad;
      octx.fillRect(-reach, -thickness * 0.5, reach * 2, thickness);
      octx.restore();
    });
  }

  starSpriteCache.set(key, off);
  return off;
}

export function getOrganicNebulaSprite(
  r: number,
  g: number,
  b: number,
  variant = 0,
  isDarkDust = false
): HTMLCanvasElement {
  const key = `${r},${g},${b},${variant},${isDarkDust ? 1 : 0}`;
  const cached = nebulaSpriteCache.get(key);
  if (cached) return cached;

  const size = 160;
  const half = size / 2;
  const off = document.createElement('canvas');
  off.width = size;
  off.height = size;
  const octx = off.getContext('2d')!;

  const subLobes = 7;
  for (let i = 0; i < subLobes; i++) {
    const a = i * 2.39996 + variant * 1.7;
    const dist = (i === 0 ? 0 : 10 + i * 4.5) * (isDarkDust ? 0.85 : 1);
    const lx = half + Math.cos(a) * dist;
    const ly = half + Math.sin(a) * dist * 0.72;
    const rad = half * (i === 0 ? 0.78 : 0.42 + (i % 3) * 0.14);

    const gLobe = octx.createRadialGradient(lx, ly, 0, lx, ly, rad);
    if (isDarkDust) {
      gLobe.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.68)`);
      gLobe.addColorStop(0.48, `rgba(${r}, ${g}, ${b}, 0.34)`);
      gLobe.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    } else {
      gLobe.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.36)`);
      gLobe.addColorStop(0.42, `rgba(${r}, ${g}, ${b}, 0.16)`);
      gLobe.addColorStop(0.75, `rgba(${r}, ${g}, ${b}, 0.04)`);
      gLobe.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    }
    octx.fillStyle = gLobe;
    octx.beginPath();
    octx.arc(lx, ly, rad, 0, Math.PI * 2);
    octx.fill();
  }

  nebulaSpriteCache.set(key, off);
  return off;
}

export function buildGalaxyGeometry(target: CosmicTarget): GalaxyGeometryData {
  const galaxyParticles: GalaxyParticle[] = [];
  const nebulaPuffs: NebulaPuff[] = [];
  const darkDustLanes: DarkDustLane[] = [];

  for (let i = 0; i < GALAXY_PARTICLE_COUNT; i++) {
    let x = 0;
    let y = 0;
    let z = 0;
    let r = 255;
    let g = 255;
    let b = 255;
    let size = 1;
    let alpha = 1;
    let isHII = false;
    let hasSpikes = false;

    if (target.type === 'blackhole') {
      if (i < 420) {
        const side = i % 2 === 0 ? 1 : -1;
        const distY = 28 + Math.pow(Math.random(), 0.72) * 340;
        const coneSpread = distY * 0.075;
        x = (Math.random() - 0.5) * coneSpread;
        z = (Math.random() - 0.5) * coneSpread;
        y = side * distY;
        r = 165;
        g = 218;
        b = 255;
        size = 1.1 + Math.random() * 1.7;
        alpha = 0.78 * (1 - distY / 370);
      } else {
        const rad = 44 + Math.pow(Math.random(), 1.55) * 330;
        const angle = Math.random() * Math.PI * 2 + (380 / rad) * 1.8;
        x = Math.cos(angle) * rad;
        z = Math.sin(angle) * rad;
        y = (Math.random() - 0.5) * (3.2 + (rad - 44) * 0.045);

        const heat = Math.max(0, 1 - (rad - 44) / 270);
        r = Math.round(target.coreColor[0] * heat + target.armColor1[0] * (1 - heat));
        g = Math.round(target.coreColor[1] * heat + target.armColor2[1] * (1 - heat));
        b = Math.round(target.coreColor[2] * heat + target.dustColor[2] * (1 - heat));
        hasSpikes = Math.random() < 0.018;
        size = rad < 64 ? 2.1 : 0.75 + Math.random() * 1.45;
        alpha = Math.min(1, 0.38 + heat * 0.62);
      }
    } else if (target.type === 'nebula-cluster') {
      const rad = Math.pow(Math.random(), 0.88) * 340;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const ridge = 1 + 0.42 * Math.sin(theta * 3) * Math.cos(phi * 2.5);
      x = rad * Math.sin(phi) * Math.cos(theta) * ridge;
      y = rad * Math.cos(phi) * 0.62 + Math.sin(x * 0.02) * 18;
      z = rad * Math.sin(phi) * Math.sin(theta) * ridge;

      const mix = Math.random();
      const col =
        mix < 0.42 ? target.armColor1 : mix < 0.82 ? target.armColor2 : target.dustColor;
      r = Math.min(255, col[0] + Math.round((Math.random() - 0.5) * 28));
      g = Math.min(255, col[1] + Math.round((Math.random() - 0.5) * 28));
      b = Math.min(255, col[2] + Math.round((Math.random() - 0.5) * 28));

      isHII = Math.random() < 0.065;
      hasSpikes = isHII && Math.random() < 0.52;
      size = isHII ? 2.2 + Math.random() * 2.1 : 0.7 + Math.random() * 1.35;
      alpha = isHII ? 0.98 : 0.32 + (1 - rad / 355) * 0.62;
    } else {
      const isCoreBulge = i < 780;
      if (isCoreBulge) {
        const rad = Math.pow(Math.random(), 1.85) * 95;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        x = rad * Math.sin(phi) * Math.cos(theta);
        y = rad * Math.cos(phi) * 0.42;
        z = rad * Math.sin(phi) * Math.sin(theta);
        r = Math.min(255, target.coreColor[0] + Math.round((Math.random() - 0.5) * 18));
        g = Math.min(255, target.coreColor[1] + Math.round((Math.random() - 0.5) * 18));
        b = Math.min(255, target.coreColor[2] + Math.round((Math.random() - 0.5) * 18));
        hasSpikes = Math.random() < 0.015;
        size = 0.95 + Math.random() * 1.65;
        alpha = 0.92 * (1 - rad / 102) + 0.14;
      } else {
        const armIdx = i % target.arms;
        const isSpur = Math.random() < 0.22;
        const rad = 32 + Math.pow(Math.random(), 1.08) * 345;
        const winding =
          (rad / 340) * Math.PI * (target.type === 'grand-spiral' ? 3.55 : 2.95);
        const armBaseAngle = (armIdx * Math.PI * 2) / target.arms + (isSpur ? 0.42 : 0);
        const scatter =
          ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) *
          (0.42 + (rad / 340) * 0.58);
        const angle = armBaseAngle + winding + scatter;

        x = Math.cos(angle) * rad;
        z = Math.sin(angle) * rad;
        const warpY = Math.sin(angle * 2) * (rad > 170 ? (rad - 170) * 0.07 : 0);
        y =
          ((Math.random() + Math.random()) / 2 - 0.5) * (11 + rad * 0.035) + warpY;

        const coreBlend = Math.max(0, 1 - rad / 220);
        isHII = Math.random() < 0.058;
        if (isHII) {
          r = target.dustColor[0];
          g = target.dustColor[1];
          b = target.dustColor[2];
          hasSpikes = Math.random() < 0.28;
          size = 2.0 + Math.random() * 1.85;
          alpha = 0.94;
        } else {
          const armCol = Math.random() < 0.62 ? target.armColor1 : target.armColor2;
          r = Math.round(target.coreColor[0] * coreBlend + armCol[0] * (1 - coreBlend));
          g = Math.round(target.coreColor[1] * coreBlend + armCol[1] * (1 - coreBlend));
          b = Math.round(target.coreColor[2] * coreBlend + armCol[2] * (1 - coreBlend));
          hasSpikes = Math.random() < 0.018;
          size = 0.68 + Math.random() * 1.48;
          alpha = Math.max(0.22, (1 - rad / 390) * 0.88);
        }
      }
    }

    const sprite = getGlowingStarSprite(r, g, b, hasSpikes);
    galaxyParticles.push({
      x,
      y,
      z,
      r,
      g,
      b,
      size,
      alpha,
      isHII,
      hasSpikes,
      sprite,
      twinkleSpeed: 1.2 + Math.random() * 2.2,
      twinklePhase: Math.random() * Math.PI * 2,
    });
  }

  for (let i = 0; i < 64; i++) {
    const rad = i < 10 ? Math.random() * 48 : 42 + Math.random() * 295;
    const armIdx = i % target.arms;
    const winding =
      (rad / 340) * Math.PI * (target.type === 'grand-spiral' ? 3.55 : 2.95);
    const angle =
      (armIdx * Math.PI * 2) / target.arms + winding + (Math.random() - 0.5) * 0.38;
    const x = Math.cos(angle) * rad;
    const z = Math.sin(angle) * rad;
    const y = (Math.random() - 0.5) * (target.type === 'nebula-cluster' ? 95 : 22);
    const col =
      i < 10
        ? target.coreColor
        : i % 3 === 0
          ? target.dustColor
          : i % 2 === 0
            ? target.armColor1
            : target.armColor2;

    nebulaPuffs.push({
      x,
      y,
      z,
      radius: i < 10 ? 128 : 64 + Math.random() * 98,
      sprite: getOrganicNebulaSprite(col[0], col[1], col[2], i % 6, false),
      alpha: i < 10 ? 0.34 : 0.16,
      rotation: Math.random() * Math.PI * 2,
    });
  }

  const dustCount = target.type === 'blackhole' ? 16 : 38;
  for (let i = 0; i < dustCount; i++) {
    const rad = 38 + (i / dustCount) * 285;
    const armIdx = i % target.arms;
    const winding =
      (rad / 340) * Math.PI * (target.type === 'grand-spiral' ? 3.55 : 2.95);
    const angle =
      (armIdx * Math.PI * 2) / target.arms +
      winding -
      0.16 +
      (Math.random() - 0.5) * 0.15;
    const x = Math.cos(angle) * rad;
    const z = Math.sin(angle) * rad;
    const y = (Math.random() - 0.5) * (target.type === 'nebula-cluster' ? 65 : 10);
    const dc = target.darkLaneColor || [6, 8, 18];

    darkDustLanes.push({
      x,
      y,
      z,
      radius: 46 + Math.random() * 68,
      sprite: getOrganicNebulaSprite(dc[0], dc[1], dc[2], i % 5, true),
      alpha: target.type === 'nebula-cluster' ? 0.72 : 0.62,
    });
  }

  return { galaxyParticles, nebulaPuffs, darkDustLanes };
}

export function createUniverseField(maxDepth: number): {
  stars3D: Star3D[];
  deepFieldGalaxies: DeepFieldGalaxy[];
} {
  const stars3D: Star3D[] = [];
  const deepFieldGalaxies: DeepFieldGalaxy[] = [];
  const spread = 2600;

  for (let i = 0; i < STAR_COUNT; i++) {
    const x = (Math.random() - 0.5) * spread;
    const y = (Math.random() - 0.5) * spread;
    const z = Math.random() * maxDepth + 1;
    const spec =
      STAR_SPECTRA[Math.floor(Math.pow(Math.random(), 1.35) * STAR_SPECTRA.length)];
    const isHeroStar = Math.random() < 0.028;
    const sprite = getGlowingStarSprite(spec[0], spec[1], spec[2], isHeroStar);

    stars3D.push({
      x,
      y,
      z,
      r: spec[0],
      g: spec[1],
      b: spec[2],
      baseSize: isHeroStar
        ? 2.2 + Math.random() * 1.6
        : 0.45 + Math.pow(Math.random(), 1.8) * 1.25,
      isHeroStar,
      sprite,
      twinklePhase: Math.random() * Math.PI * 2,
    });
  }

  for (let i = 0; i < 45; i++) {
    const spec = STAR_SPECTRA[3 + (i % 4)];
    deepFieldGalaxies.push({
      x: (Math.random() - 0.5) * 2800,
      y: (Math.random() - 0.5) * 2200,
      z: 900 + Math.random() * 1300,
      rx: 8 + Math.random() * 16,
      ry: 3 + Math.random() * 6,
      angle: Math.random() * Math.PI,
      r: spec[0],
      g: spec[1],
      b: spec[2],
      alpha: 0.18 + Math.random() * 0.28,
    });
  }

  return { stars3D, deepFieldGalaxies };
}

export function getEffectiveTarget(targetIndex: number, paletteCore: [number, number, number], paletteMid: [number, number, number]): CosmicTarget {
  const base = COSMIC_TARGETS[targetIndex] || COSMIC_TARGETS[0];
  if (targetIndex === 0) {
    return {
      ...base,
      armColor1: paletteMid,
      armColor2: paletteCore,
    };
  }
  return base;
}

