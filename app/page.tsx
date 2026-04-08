import CtaButton from "@/components/CtaButton";

// ─────────────────────────────────────────────
// MUTABLE CONFIG — change this, not the markup
// ─────────────────────────────────────────────
const CONFIG = {
  brand: "AYOKA",
  tagline: "Move with your mood.",
  subtext: "The first mood-adaptive training platform built for those who know their body is the edge.",
  cta: {
    label: "Request Early Access",
    href: "/login",
  },
  badge: "Coming Soon",
  backgroundClass: "bg-black",
  accentColor: "#C8A97E",
};
// ─────────────────────────────────────────────

export default function Home() {
  return (
    <main
      className={`min-h-screen flex items-center justify-center ${CONFIG.backgroundClass} relative overflow-hidden`}
    >
      {/* Subtle background grain/texture layer */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Accent glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${CONFIG.accentColor}18 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-xl">

        {/* Optional badge */}
        {CONFIG.badge && (
          <span
            className="text-xs tracking-[0.2em] uppercase px-4 py-1.5 border rounded-full"
            style={{
              color: CONFIG.accentColor,
              borderColor: `${CONFIG.accentColor}50`,
              backgroundColor: `${CONFIG.accentColor}10`,
            }}
          >
            {CONFIG.badge}
          </span>
        )}

        {/* Brand wordmark */}
        <h1
          className="text-6xl font-black tracking-[-0.02em] text-white"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.08em" }}
        >
          {CONFIG.brand}
        </h1>

        {/* Tagline */}
        <p
          className="text-2xl font-light text-white/80 tracking-wide"
          style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          {CONFIG.tagline}
        </p>

        {/* Subtext */}
        <p className="text-sm text-white/50 leading-relaxed max-w-sm">
          {CONFIG.subtext}
        </p>

        {/* CTA */}
        <CtaButton
          href={CONFIG.cta.href}
          label={CONFIG.cta.label}
          accentColor={CONFIG.accentColor}
        />

      </div>
    </main>
  );
}