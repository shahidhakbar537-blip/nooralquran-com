// Lightweight client for alquran.cloud API
const API = "https://api.alquran.cloud/v1";

// Abdul Basit Abdul Samad - Murattal (measured)
export const RECITER = "ar.abdulbasitmurattal";

export type SurahMeta = {
  number: number;
  name: string; // Arabic
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

export type Ayah = {
  number: number;
  numberInSurah: number;
  text: string;
  audio?: string;
  juz: number;
  page: number;
};

export type SurahFull = SurahMeta & { ayahs: Ayah[] };

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`Quran API ${res.status}`);
  const json = await res.json();
  if (json.code !== 200) throw new Error(json.status || "Quran API error");
  return json.data as T;
}

export const listSurahs = () => get<SurahMeta[]>("/surah");

export const getSurahArabic = (n: number) =>
  get<SurahFull>(`/surah/${n}/quran-uthmani`);

export const getSurahAudio = (n: number) =>
  get<SurahFull>(`/surah/${n}/${RECITER}`);

export const getJuz = (n: number) =>
  get<{ ayahs: (Ayah & { surah: SurahMeta })[] }>(`/juz/${n}/quran-uthmani`);

export const getAyah = (ref: string) =>
  get<Ayah & { surah: SurahMeta }>(`/ayah/${ref}/${RECITER}`);
