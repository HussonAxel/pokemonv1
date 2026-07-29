"use client";

import * as React from "react";
import { MoreVertical } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Copy01Icon,
  Delete02Icon,
  FavouriteIcon,
  PencilEdit02Icon,
  Share01Icon,
} from "@hugeicons/core-free-icons";
import { AnimatePresence, LayoutGroup, motion, type Transition, type Variants } from "motion/react";

export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export interface InlineDisclosureMenuProps {
  menuItems?: MenuItemProps[];
  showDelete?: boolean;
  onDelete?: () => void;
}

const spring: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

const menuVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: spring },
};

const deleteVariants: Variants = {
  initial: (confirm: boolean) => ({
    y: confirm ? 60 : -60,
  }),
  animate: {
    y: 0,
    transition: spring,
  },
  exit: (confirm: boolean) => ({
    y: confirm ? -60 : 60,
    transition: spring,
  }),
};

const confirmVariants: Variants = {
  initial: (confirm: boolean) => ({
    y: confirm ? 60 : -60,
  }),
  animate: {
    y: 0,
    transition: spring,
  },
  exit: (confirm: boolean) => ({
    y: confirm ? -60 : 60,
    transition: spring,
  }),
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-[#363538] transition-colors hover:bg-[#F6F5FA] dark:text-zinc-200 dark:hover:bg-zinc-800 ${className}`}
  >
    <span className="text-gray-500 dark:text-zinc-400">{icon}</span>
    <span className="font-medium tracking-tight">{label}</span>
  </button>
);

export function InlineDisclosureMenu({
  menuItems = [
    {
      icon: <HugeiconsIcon icon={PencilEdit02Icon} size={16} />,
      label: "Edit",
    },
    { icon: <HugeiconsIcon icon={Copy01Icon} size={16} />, label: "Duplicate" },
    {
      icon: <HugeiconsIcon icon={FavouriteIcon} size={16} />,
      label: "Favourite",
    },
    { icon: <HugeiconsIcon icon={Share01Icon} size={16} />, label: "Share" },
  ],
  showDelete = true,
  onDelete,
}: InlineDisclosureMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setConfirm(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative flex shrink-0">
      <div ref={ref} className="relative">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir les actions de l’équipe"
          aria-expanded={open}
          className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <MoreVertical className="size-4" />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute top-10 right-0 z-50 w-56 origin-top-right overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-xl"
            >
              <div className="border-b border-border bg-muted/50 px-3 py-2">
                <span className="text-xs font-medium text-muted-foreground">More Options</span>
              </div>

              <LayoutGroup>
                <div className="flex flex-col gap-2 px-2 py-2">
                  {menuItems.map((item, i) => (
                    <MenuItem key={i} {...item} />
                  ))}
                </div>

                {showDelete && (
                  <div className="relative h-[56px] overflow-hidden border-t-2 border-[#EEEEF2] dark:border-zinc-800">
                    <AnimatePresence custom={confirm} mode="popLayout" initial={false}>
                      {!confirm ? (
                        <motion.div
                          key="delete"
                          custom={confirm}
                          variants={deleteVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="absolute inset-0 flex items-center px-2"
                        >
                          <MenuItem
                            icon={<HugeiconsIcon icon={Delete02Icon} size={16} color="#e94447" />}
                            label="Delete"
                            className="cursor-pointer text-[#e94447]"
                            onClick={() => setConfirm(true)}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="confirm"
                          custom={confirm}
                          variants={confirmVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="absolute inset-0 flex items-center gap-2 px-2"
                        >
                          <button
                            onClick={onDelete}
                            className="h-10 flex-1 cursor-pointer rounded-xl bg-[#F24140] font-semibold text-white"
                          >
                            Yes, Delete
                          </button>

                          <button
                            onClick={() => setConfirm(false)}
                            className="h-10 flex-1 cursor-pointer rounded-xl border border-gray-200 text-gray-600 dark:border-zinc-700 dark:text-zinc-300"
                          >
                            Cancel
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </LayoutGroup>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
