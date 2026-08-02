import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { headerActionClassName } from "./header-action";
import { initializeSounds, playCue, updateSoundPreferences } from "#/lib/sounds";

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(initializeSounds().enabled);
  }, []);

  function toggleSounds() {
    const nextEnabled = !enabled;
    setEnabled(nextEnabled);
    updateSoundPreferences({ enabled: nextEnabled });
    if (nextEnabled) playCue("toggle");
  }

  const label = enabled ? "Désactiver les sons" : "Activer les sons";
  const Icon = enabled ? SpeakerHigh : SpeakerSlash;

  return (
    <button
      type="button"
      className={headerActionClassName}
      aria-label={label}
      aria-pressed={enabled}
      title={label}
      onClick={toggleSounds}
    >
      <Icon aria-hidden="true" size={20} weight="duotone" />
    </button>
  );
}
