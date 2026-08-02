import { bind, play, setEnabled, setVolume, type SoundName } from "cuelume";

const SOUND_PREFERENCES_KEY = "pokemon-home:sound-preferences";
const SOUND_PREFERENCES_VERSION = 2;
const DEFAULT_VOLUME = 0.18;

export type SoundPreferences = { enabled: boolean; volume: number };

const DEFAULT_PREFERENCES: SoundPreferences = { enabled: true, volume: DEFAULT_VOLUME };

function normalizeVolume(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(1, Math.max(0, value))
    : DEFAULT_VOLUME;
}

export function getSoundPreferences(): SoundPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const stored = JSON.parse(window.localStorage.getItem(SOUND_PREFERENCES_KEY) ?? "null");
    if (!stored || typeof stored !== "object") return DEFAULT_PREFERENCES;
    return {
      enabled: stored.enabled !== false,
      volume:
        stored.version === SOUND_PREFERENCES_VERSION
          ? normalizeVolume(stored.volume)
          : DEFAULT_VOLUME,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function saveSoundPreferences(preferences: SoundPreferences) {
  try {
    window.localStorage.setItem(
      SOUND_PREFERENCES_KEY,
      JSON.stringify({ ...preferences, version: SOUND_PREFERENCES_VERSION }),
    );
  } catch {
    // Audio preferences must never make the application fail.
  }
}

export function initializeSounds() {
  const preferences = getSoundPreferences();
  setEnabled(preferences.enabled);
  setVolume(preferences.volume);
  bind();
  return preferences;
}

export function updateSoundPreferences(patch: Partial<SoundPreferences>) {
  const next = { ...getSoundPreferences(), ...patch };
  next.volume = normalizeVolume(next.volume);
  setEnabled(next.enabled);
  setVolume(next.volume);
  saveSoundPreferences(next);
  return next;
}

export function playCue(name: SoundName, options?: { volume?: number }) {
  play(name, options);
}
