import { ARCANA_GIFTS, ROMAN, ZODIAC_SIGNS } from '@/data/astrology';
import { DestinyReadingResult, ZodiacSign } from '@/types/mystic';

export function reduceArcana(n: number): number {
  let v = Math.abs(n);
  while (v > 22) {
    v = String(v)
      .split('')
      .reduce((a, b) => a + parseInt(b, 10), 0);
  }
  return v === 0 ? 22 : v;
}

export function getZodiacSign(month: number, day: number): ZodiacSign {
  for (const s of ZODIAC_SIGNS) {
    if (month < s.max[0] || (month === s.max[0] && day <= s.max[1])) {
      return s;
    }
  }
  return ZODIAC_SIGNS[0];
}

export function calculateDestinyReading(rawName: string, dateStr: string): DestinyReadingResult {
  const name = (rawName || 'Искатель').trim();
  const validDate = dateStr || '1996-08-19';
  const [y, m, d] = validDate.split('-').map(Number);

  const sign = getZodiacSign(m || 8, d || 19);
  const arcanaNumber = reduceArcana(
    reduceArcana(d || 19) + reduceArcana(m || 8) + reduceArcana(y || 1996)
  );
  const arcanaInfo = ARCANA_GIFTS[arcanaNumber] || ARCANA_GIFTS[19];

  return {
    name,
    sign,
    arcanaNumber,
    arcanaRoman: ROMAN[arcanaNumber] || 'XIX',
    arcanaInfo,
  };
}

export function computeLunarReading(val: number): {
  phaseName: string;
  illum: number;
  text: string;
  rx: number;
  sweep: number;
} {
  const num = Math.max(1, Math.min(99, Math.round(val)));
  let phaseName = '';
  let text = '';
  let illum = 0;

  if (num < 15) {
    phaseName = 'Новолуние';
    illum = Math.round((num / 15) * 15);
    text =
      'Время тишины и посева намерений: запиши главные цели на месяц и не распыляй силы на суету.';
  } else if (num < 45) {
    phaseName = 'Растущая Луна';
    illum = Math.round(((num - 15) / 30) * 70 + 15);
    text =
      'Фаза активного набора высоты: идеальное время для смелых запусков, важных встреч и проявления себя.';
  } else if (num <= 58) {
    phaseName = 'Полнолуние';
    illum = 100;
    text =
      'Пик энергии и инсайтов: тайное становится явным, приходят яркие творческие озарения и ответы.';
  } else {
    phaseName = 'Убывающая Луна';
    illum = Math.max(5, Math.round((1 - (num - 58) / 42) * 85));
    text =
      'Гармоничное завершение дел, очищение пространства и бережное наполнение внутреннего ресурса.';
  }

  const rx = Math.abs(50 - num) * 1.1;
  const sweep = num <= 50 ? 0 : 1;

  return { phaseName, illum, text, rx, sweep };
}

