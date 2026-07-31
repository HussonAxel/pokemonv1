import type { CSSProperties } from "react";

export type BentoTone = "paper" | "cobalt" | "butter" | "ink" | "coral";
export type BentoCardKind = "intro" | "image" | "team" | "cores" | "chart";

export type BentoImage = {
  src: string;
  alt: string;
};

export type BentoCard = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  tone: BentoTone;
  kind: BentoCardKind;
  href: string;
  images?: BentoImage[];
  metric?: string;
  bars?: number[];
};

export type MenuBentoProps = {
  brand?: string;
  brandMark?: string;
  cards?: BentoCard[];
  className?: string;
};

const paperAssets = {
  lucario:
    "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/2S39XXR18PTZ4924HK2JEMXBZ0.png",
  team: "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/7JJQCA79G9BKKMMVEGFEF63X5Z.png",
  arcanine:
    "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/13QV4NRZWT6N40PSKH0HKY4QFG.png",
  venusaur:
    "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/2G0WQFVQ1KB9WHH3SPMM2DPRN1.png",
  gengar:
    "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/545PD06C59MSFJRDC21EC12KH7.png",
  lapras:
    "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/5JP50EZQHD1GDHMYB8AYK7AD63.png",
  pelipper:
    "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/6ZSSRMH0RJRNP3EHQ9W0DTMZE4.png",
  roserade:
    "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/4RD5K7YH15WBXV10AY6WE9VEMK.png",
  charizard:
    "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/039S4V9HVJNPMEQ5HHBHQXMX9G.png",
  whimsicott:
    "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/6KNVWTS1RJDN8DQ5P1EJQXNDAR.png",
  garchomp:
    "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/66WD83TTM7JH0RWAWRGNS2ZZ49.png",
  bisharp:
    "https://app.paper.design/file-assets/01KYN13FAKP39XZGVGZRQT878A/7QK8JJ1WV6J663Z8KDD3XWXEFM.png",
};

const image = (src: string, alt: string): BentoImage => ({ src, alt });

export const defaultMenuCards: BentoCard[] = [
  {
    id: "intro",
    title:
      "Le compagnon Gen 9 pour explorer les données du jeu, construire une équipe et progresser.",
    tone: "paper",
    kind: "intro",
    href: "/explorer",
    eyebrow: "01 · EXPLORER",
  },
  {
    id: "strategie",
    title: "Constructeur d’équipe",
    tone: "cobalt",
    kind: "image",
    href: "/strategie",
    eyebrow: "02 · STRATÉGIE",
    images: [image(paperAssets.lucario, "Lucario")],
  },
  {
    id: "outils",
    title: "Analyse d’équipe",
    description: "Couverture, faiblesses et rôles clés.",
    tone: "butter",
    kind: "team",
    href: "/outils",
    eyebrow: "03 · OUTILS",
    metric: "6 / 6 active",
    images: [
      image(paperAssets.arcanine, "Arcanine"),
      image(paperAssets.venusaur, "Venusaur"),
      image(paperAssets.gengar, "Gengar"),
      image(paperAssets.lapras, "Lapras"),
    ],
  },
  {
    id: "collectionner",
    title: "Collection",
    description: "Vus, obtenus et encore à trouver.",
    tone: "ink",
    kind: "image",
    href: "/collectionner",
    eyebrow: "04 · COLLECTION",
    images: [image(paperAssets.team, "Umbreon")],
  },
  {
    id: "chasser",
    title: "Chasse shiny",
    tone: "paper",
    kind: "cores",
    href: "/chasser",
    eyebrow: "05 · CHASSE",
    images: [
      image(paperAssets.pelipper, "Pelipper"),
      image(paperAssets.roserade, "Roserade"),
      image(paperAssets.charizard, "Charizard"),
      image(paperAssets.whimsicott, "Whimsicott"),
      image(paperAssets.garchomp, "Garchomp"),
      image(paperAssets.bisharp, "Bisharp"),
    ],
  },
  {
    id: "jouer",
    title: "Jeux quotidiens",
    description: "Défis Pokédle et Pokédoku de la Gen 9.",
    tone: "coral",
    kind: "chart",
    href: "/jouer",
    eyebrow: "06 · JEUX",
    bars: [38, 62, 49, 82, 68, 94],
  },
];

function Arrow({ dark = false }: { dark?: boolean }) {
  return <span className={`menu-bento__arrow ${dark ? "menu-bento__arrow--dark" : ""}`}>→</span>;
}

function TeamStrip({ images }: { images: BentoImage[] }) {
  return (
    <div className="menu-bento__team-strip" aria-hidden="true">
      {images.map((item, index) => (
        <div
          className="menu-bento__team-card"
          key={item.src}
          style={{ "--tilt": `${[-6, 3, -2, 5][index] ?? 0}deg` } as CSSProperties}
        >
          <img src={item.src} alt="" />
        </div>
      ))}
    </div>
  );
}

function CoreCards({ images }: { images: BentoImage[] }) {
  const labels = ["Rain offense", "Tailwind sun", "Ground balance"];
  const protocols = ["RAIN PROTOCOL", "SUN CONTROL", "BALANCED CORE"];
  return (
    <div className="menu-bento__core-list" aria-label="Trending team cores">
      {[0, 1, 2].map((index) => (
        <div className="menu-bento__core-card" key={labels[index]}>
          <span className="menu-bento__micro">{protocols[index]}</span>
          <div className="menu-bento__core-pair">
            <img src={images[index * 2]?.src} alt={images[index * 2]?.alt ?? ""} />
            <img src={images[index * 2 + 1]?.src} alt={images[index * 2 + 1]?.alt ?? ""} />
          </div>
          <div>
            <strong>{labels[index]}</strong>
            <small>
              {["1,248 saves · 68% WR", "986 saves · 64% WR", "742 saves · 61% WR"][index]}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

function MenuCard({ card }: { card: BentoCard }) {
  const style = { "--card-images": card.images?.length ?? 0 } as CSSProperties;
  return (
    <a
      className={`menu-bento__card menu-bento__card--${card.id} menu-bento__card--${card.tone}`}
      href={card.href}
      style={style}
    >
      {card.eyebrow && <span className="menu-bento__eyebrow">{card.eyebrow}</span>}
      {card.kind === "intro" && <p className="menu-bento__intro-copy">{card.title}</p>}
      {card.kind === "image" && (
        <>
          <span className="menu-bento__orb" />
          <img className="menu-bento__hero-image" src={card.images?.[0]?.src} alt="" />
          <span className="menu-bento__card-bottom">
            <span className="menu-bento__card-title">{card.title}</span>
            <Arrow />
          </span>
        </>
      )}
      {card.kind === "team" && (
        <>
          <span className="menu-bento__metric">{card.metric}</span>
          <TeamStrip images={card.images ?? []} />
          <span className="menu-bento__card-bottom">
            <span>
              <span className="menu-bento__card-title">{card.title}</span>
              <small>{card.description}</small>
            </span>
            <Arrow dark />
          </span>
        </>
      )}
      {card.kind === "cores" && (
        <>
          <span className="menu-bento__cores-title">
            <span>
              <span className="menu-bento__micro">{card.eyebrow}</span>
              <strong>{card.title}</strong>
            </span>
            <span className="menu-bento__pager">
              ←　<span>→</span>
            </span>
          </span>
          <CoreCards images={card.images ?? []} />
        </>
      )}
      {card.kind === "chart" && (
        <>
          <div className="menu-bento__bars" aria-hidden="true">
            {(card.bars ?? []).map((height, index) => (
              <span key={`${height}-${index}`} style={{ height: `${height}%` }} />
            ))}
          </div>
          <span className="menu-bento__card-bottom">
            <span>
              <span className="menu-bento__card-title">{card.title}</span>
              <small>{card.description}</small>
            </span>
            <Arrow />
          </span>
        </>
      )}
    </a>
  );
}

export function MenuBento({
  brand = "Pokémon Home",
  brandMark = "PH",
  cards = defaultMenuCards,
  className = "",
}: MenuBentoProps = {}) {
  return (
    <main className={`menu-bento menu-bento--editorial ${className}`}>
      <div className="menu-bento__masthead">
        <span className="menu-bento__brand-mark">{brandMark}</span>
        <strong>{brand}</strong>
      </div>
      <div className="menu-bento__grid">
        {cards.map((card) => (
          <MenuCard card={card} key={card.id} />
        ))}
      </div>
    </main>
  );
}

export default MenuBento;
