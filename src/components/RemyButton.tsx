import { ChefHat, ChevronRight } from "lucide-react";
import { showRemyAssistant } from "./RemyAssistant";

export default function RemyButton() {
  return (
    <button
      onClick={() => showRemyAssistant.setState(true)}
      className="flex w-full items-center justify-between rounded-lg bg-linear-to-r from-primary to-primary/70 px-4 py-2.5 text-primary-foreground transition-opacity hover:opacity-90"
      aria-label="Open Remy Assistant"
    >
      <div className="flex items-center gap-2">
        <ChefHat size={24} />
        <span className="text-sm">Remy</span>
      </div>
      <ChevronRight className="w-4 h-4" />
    </button>
  );
}
