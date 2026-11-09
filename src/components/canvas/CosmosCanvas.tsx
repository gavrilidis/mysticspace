'use client';

import React, { useEffect, useRef } from 'react';
import { useCosmic } from '@/context/CosmicContext';
import { COSMIC_TARGETS, PALETTES } from '@/data/palettes';
import {
  buildGalaxyGeometry,
  clearNebulaSpriteCache,
  createUniverseField,
  DeepFieldGalaxy,
  GalaxyGeometryData,
  getEffectiveTarget,
  Star3D,
} from '@/lib/cosmosEngine';

export default function CosmosCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { flightRef, paletteKey, targetIndex, geometryVersion, selectCosmicTarget } = useCosmic();

  const starsRef = useRef<Star3D[]>([]);
  const deepFieldRef = useRef<DeepFieldGalaxy[]>([]);
  const geometryRef = useRef<GalaxyGeometryData>({
    galaxyParticles: [],
    nebulaPuffs: [],
    darkDustLanes: [],
  });
  const paletteKeyRef = useRef(paletteKey);
  paletteKeyRef.current = paletteKey;

  useEffect(() => {
    const pal = PALETTES[paletteKey];
    clearNebulaSpriteCache();
    const target = getEffectiveTarget(targetIndex, pal.nebulaCore, pal.nebulaMid);
    geometryRef.current = buildGalaxyGeometry(target);
  }, [paletteKey, targetIndex, geometryVersion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const flight = flightRef.current;

    const handleResize = () => {
      flight.width = window.innerWidth;
      flight.height = window.innerHeight;
      flight.dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = flight.width * flight.dpr;
      canvas.height = flight.height * flight.dpr;
      ctx.setTransform(flight.dpr, 0, 0, flight.dpr, 0, 0);
    };

    handleResize();
    const universe = createUniverseField(flight.maxDepth);
    starsRef.current = universe.stars3D;
    deepFieldRef.current = universe.deepFieldGalaxies;

    const initialPal = PALETTES[paletteKeyRef.current];
    const initialTarget = getEffectiveTarget(
      flight.targetIndex,
      initialPal.nebulaCore,
      initialPal.nebulaMid
    );
    geometryRef.current = buildGalaxyGeometry(initialTarget);

    let rafId = 0;

    const renderCosmosLoop = (now: number) => {
      const w = flight.width;
      const h = flight.height;
      const t = now * 0.001;

      flight.steerX += (flight.targetSteerX - flight.steerX) * 0.05;
      flight.steerY += (flight.targetSteerY - flight.steerY) * 0.05;
      flight.scrollBoost *= 0.92;

      const effectiveSpeed = flight.sliderSpeed + flight.scrollBoost * 0.25;
      const currentPal = PALETTES[paletteKeyRef.current];
      const targetObj = getEffectiveTarget(
        flight.targetIndex,
        currentPal.nebulaCore,
        currentPal.nebulaMid
      );

      let starForwardSpeed = effectiveSpeed * 2.1;

      if (flight.state === 'APPROACH') {
        const remaining = flight.galaxyDist - flight.orbitRadius;
        const approachStep = Math.max(0.8, remaining * 0.032) * (effectiveSpeed * 0.85);
        flight.galaxyDist -= approachStep;
        flight.orbitAzimuth += 0.0025 * effectiveSpeed;
        starForwardSpeed = effectiveSpeed * 3.4;

        if (flight.galaxyDist <= flight.orbitRadius + 6) {
          flight.galaxyDist = flight.orbitRadius;
          flight.state = 'ORBIT';
        }
      } else if (flight.state === 'ORBIT') {
        const angularVel = 0.0046 * effectiveSpeed;
        flight.orbitAzimuth += angularVel;
        flight.orbitProgress += angularVel;
        flight.galaxyDist = flight.orbitRadius + Math.sin(t * 0.55) * 22;
        starForwardSpeed = effectiveSpeed * 0.82;

        if (!flight.lockOrbit && flight.orbitProgress > Math.PI * 2.1) {
          const nextIdx = (flight.targetIndex + 1) % COSMIC_TARGETS.length;
          selectCosmicTarget(nextIdx);
        }
      }

      const vpX = w * 0.5 - flight.steerX * (w * 0.14);
      const vpY = h * 0.5 - flight.steerY * (h * 0.14);

      ctx.fillStyle = currentPal.bgDeep;
      ctx.fillRect(0, 0, w, h);

      const galCenterX = vpX + flight.userOffsetX + Math.sin(t * 0.35) * 16;
      const galCenterY = vpY + flight.userOffsetY - h * 0.03;

      const bgGlowRadius = Math.max(w, h) * 0.62;
      const bgGlow = ctx.createRadialGradient(
        galCenterX,
        galCenterY,
        0,
        galCenterX,
        galCenterY,
        bgGlowRadius
      );
      bgGlow.addColorStop(
        0,
        `rgba(${targetObj.armColor1[0]}, ${targetObj.armColor1[1]}, ${targetObj.armColor1[2]}, 0.09)`
      );
      bgGlow.addColorStop(
        0.45,
        `rgba(${targetObj.dustColor[0]}, ${targetObj.dustColor[1]}, ${targetObj.dustColor[2]}, 0.04)`
      );
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const deepFieldGalaxies = deepFieldRef.current;
      for (let i = 0; i < deepFieldGalaxies.length; i++) {
        const dg = deepFieldGalaxies[i];
        dg.z -= starForwardSpeed * 0.25;
        if (dg.z <= 200) dg.z = 2200;

        const sc = flight.focalLength / dg.z;
        const sx = vpX + dg.x * sc;
        const sy = vpY + dg.y * sc;
        if (sx < -40 || sx > w + 40 || sy < -40 || sy > h + 40) continue;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(dg.angle);
        const rx = dg.rx * sc * 1.8;
        const ry = dg.ry * sc * 1.8;
        const gGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
        gGrad.addColorStop(0, `rgba(255, 250, 240, ${dg.alpha})`);
        gGrad.addColorStop(0.45, `rgba(${dg.r}, ${dg.g}, ${dg.b}, ${dg.alpha * 0.45})`);
        gGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gGrad;
        ctx.scale(1, ry / Math.max(1, rx));
        ctx.beginPath();
        ctx.arc(0, 0, rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const stars3D = starsRef.current;
      const warpStreak = Math.max(0, (starForwardSpeed - 2.6) * 2.5);
      for (let i = 0; i < stars3D.length; i++) {
        const s = stars3D[i];
        s.z -= starForwardSpeed;
        s.x -=
          (flight.steerX * 1.6 + (flight.state === 'ORBIT' ? 1.5 : 0.4)) * effectiveSpeed;
        s.y -= flight.steerY * 1.4 * effectiveSpeed;

        if (s.z <= 5) {
          s.z = flight.maxDepth;
          s.x = (Math.random() - 0.5) * 2600;
          s.y = (Math.random() - 0.5) * 2600;
        }
        if (s.x > 1300) s.x -= 2600;
        if (s.x < -1300) s.x += 2600;
        if (s.y > 1300) s.y -= 2600;
        if (s.y < -1300) s.y += 2600;

        const scale = flight.focalLength / s.z;
        const sx = vpX + s.x * scale;
        const sy = vpY + s.y * scale;
        if (sx < -45 || sx > w + 45 || sy < -45 || sy > h + 45) continue;

        const depthAlpha = Math.min(1, (flight.maxDepth - s.z) / 380);
        const twinkle = 0.82 + 0.18 * Math.sin(t * 2.4 + s.twinklePhase);
        const alpha = depthAlpha * twinkle;
        const radius = Math.min(5.2, s.baseSize * scale * 1.32);

        if (warpStreak > 0.5) {
          const prevScale = flight.focalLength / (s.z + starForwardSpeed * 2.4);
          const px = vpX + (sx - vpX) * (prevScale / scale);
          const py = vpY + (sy - vpY) * (prevScale / scale);
          ctx.globalAlpha = alpha * 0.5;
          ctx.strokeStyle = `rgb(${s.r}, ${s.g}, ${s.b})`;
          ctx.lineWidth = Math.max(0.5, radius * 0.4);
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(px, py);
          ctx.stroke();
        }

        const drawDiam = radius * (s.isHeroStar ? 9.5 : 3.8);
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          s.sprite,
          sx - drawDiam * 0.5,
          sy - drawDiam * 0.5,
          drawDiam,
          drawDiam
        );
      }
      ctx.restore();

      const yaw = flight.orbitAzimuth + flight.steerX * 0.65;
      const pitch =
        targetObj.tiltX +
        Math.sin(flight.orbitAzimuth * 0.5) * 0.2 +
        flight.steerY * 0.48;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);

      const { galaxyParticles, nebulaPuffs, darkDustLanes } = geometryRef.current;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < nebulaPuffs.length; i++) {
        const np = nebulaPuffs[i];
        const x1 = np.x * cosY - np.z * sinY;
        const z1 = np.x * sinY + np.z * cosY;
        const y2 = np.y * cosP - z1 * sinP;
        const z2 = np.y * sinP + z1 * cosP + flight.galaxyDist;

        if (z2 <= 40) continue;
        const sc = flight.focalLength / z2;
        const sx = galCenterX + x1 * sc;
        const sy = galCenterY + y2 * sc;
        const sr = np.radius * sc * 1.45;

        if (sx + sr < 0 || sx - sr > w || sy + sr < 0 || sy - sr > h) continue;

        ctx.globalAlpha = np.alpha;
        ctx.drawImage(np.sprite, sx - sr, sy - sr, sr * 2, sr * 2);
      }

      ctx.globalCompositeOperation = 'source-over';
      for (let i = 0; i < darkDustLanes.length; i++) {
        const dl = darkDustLanes[i];
        const x1 = dl.x * cosY - dl.z * sinY;
        const z1 = dl.x * sinY + dl.z * cosY;
        const y2 = dl.y * cosP - z1 * sinP;
        const z2 = dl.y * sinP + z1 * cosP + flight.galaxyDist;

        if (z2 <= 45) continue;
        const sc = flight.focalLength / z2;
        const sx = galCenterX + x1 * sc;
        const sy = galCenterY + y2 * sc;
        const sr = dl.radius * sc * 1.35;

        if (sx + sr < 0 || sx - sr > w || sy + sr < 0 || sy - sr > h) continue;

        ctx.globalAlpha = dl.alpha;
        ctx.drawImage(dl.sprite, sx - sr, sy - sr, sr * 2, sr * 2);
      }

      ctx.globalCompositeOperation = 'screen';
      const coreDistScale = flight.focalLength / Math.max(60, flight.galaxyDist);

      if (targetObj.type === 'blackhole') {
        const shadowR = 38 * coreDistScale;

        const archGrad = ctx.createRadialGradient(
          galCenterX,
          galCenterY,
          shadowR * 0.9,
          galCenterX,
          galCenterY,
          shadowR * 2.9
        );
        archGrad.addColorStop(0, 'rgba(255, 248, 225, 0.98)');
        archGrad.addColorStop(0.18, 'rgba(255, 195, 110, 0.82)');
        archGrad.addColorStop(0.45, 'rgba(235, 88, 45, 0.35)');
        archGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = archGrad;
        ctx.beginPath();
        ctx.arc(galCenterX, galCenterY, shadowR * 2.9, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#010103';
        ctx.beginPath();
        ctx.arc(galCenterX, galCenterY, shadowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 238, 195, 0.85)';
        ctx.lineWidth = Math.max(1, 1.8 * coreDistScale);
        ctx.beginPath();
        ctx.arc(galCenterX, galCenterY, shadowR * 1.04, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalCompositeOperation = 'screen';
      } else {
        const coreHaloR = 165 * coreDistScale;
        const coreGrad = ctx.createRadialGradient(
          galCenterX,
          galCenterY,
          0,
          galCenterX,
          galCenterY,
          coreHaloR
        );
        coreGrad.addColorStop(0, 'rgba(255, 254, 248, 0.92)');
        coreGrad.addColorStop(
          0.14,
          `rgba(${targetObj.coreColor[0]}, ${targetObj.coreColor[1]}, ${targetObj.coreColor[2]}, 0.65)`
        );
        coreGrad.addColorStop(
          0.42,
          `rgba(${targetObj.armColor2[0]}, ${targetObj.armColor2[1]}, ${targetObj.armColor2[2]}, 0.22)`
        );
        coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(galCenterX, galCenterY, coreHaloR, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < galaxyParticles.length; i++) {
        const gp = galaxyParticles[i];

        const x1 = gp.x * cosY - gp.z * sinY;
        const z1 = gp.x * sinY + gp.z * cosY;
        const y2 = gp.y * cosP - z1 * sinP;
        const z2 = gp.y * sinP + z1 * cosP + flight.galaxyDist;

        if (z2 <= 30) continue;
        const sc = flight.focalLength / z2;
        const sx = galCenterX + x1 * sc;
        const sy = galCenterY + y2 * sc;

        if (sx < -36 || sx > w + 36 || sy < -36 || sy > h + 36) continue;

        const pr = Math.min(5.5, gp.size * sc);
        const shimmer = 0.84 + 0.16 * Math.sin(t * gp.twinkleSpeed + gp.twinklePhase);
        const spriteDiam = pr * (gp.hasSpikes ? 9.2 : gp.isHII ? 5.2 : 3.6);

        ctx.globalAlpha = Math.min(1, gp.alpha * shimmer);
        ctx.drawImage(
          gp.sprite,
          sx - spriteDiam * 0.5,
          sy - spriteDiam * 0.5,
          spriteDiam,
          spriteDiam
        );
      }

      ctx.restore();
      rafId = requestAnimationFrame(renderCosmosLoop);
    };

    rafId = requestAnimationFrame(renderCosmosLoop);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [flightRef, selectCosmicTarget]);

  return (
    <>
      <canvas
        id="cosmos-canvas"
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 block"
      />
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 58%, rgba(2, 3, 7, 0.65) 100%)',
        }}
      />
    </>
  );
}

