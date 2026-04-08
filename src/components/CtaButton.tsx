"use client";

import Link from "next/link";

interface Props {
  href: string;
  label: string;
  accentColor: string;
}

export default function CtaButton({ href, label, accentColor }: Props) {
  return (
    <Link
      href={href}
      className="mt-2 text-sm tracking-widest uppercase px-8 py-3 border transition-all duration-300 hover:scale-[1.02]"
      style={{ color: accentColor, borderColor: accentColor, backgroundColor: "transparent" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = accentColor;
        (e.currentTarget as HTMLAnchorElement).style.color = "#000";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
        (e.currentTarget as HTMLAnchorElement).style.color = accentColor;
      }}
    >
      {label}
    </Link>
  );
}