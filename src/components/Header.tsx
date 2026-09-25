"use client";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
const links = [
  ["Services", "#services"],
  ["About", "#about"],
  ["Gallery", "#gallery"],
  ["Academy", "#academy"],
  ["Contact", "#contact"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <a className="brand-mark" href="#home" aria-label="URBANCUT home">
        <Image
          src="/media/urbancut-logo.svg"
          width={78}
          height={78}
          alt="URBANCUT Grooming Studio"
          priority
        />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([name, href]) => (
          <a key={href} href={href}>
            {name}
          </a>
        ))}
      </nav>
      <a className="button small header-cta" href="#services">
        Find your service <ArrowUpRight size={16} />
      </a>
      <button
        ref={toggle}
        className="icon-button menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map(([name, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {name}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
