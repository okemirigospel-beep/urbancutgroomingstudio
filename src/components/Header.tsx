"use client";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { hero } from "@/lib/hero";
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
      className="masthead"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <a
        className="masthead-logo"
        href="#home"
        aria-label="URBANCUT Grooming Studio home"
      >
        <Image
          src="/media/urbancut-logo-header.svg"
          width={1368}
          height={692}
          alt=""
          priority
        />
      </a>
      <nav className="masthead-links" aria-label="Main navigation">
        {links.map(([name, href]) => (
          <a key={href} href={href}>
            {name}
          </a>
        ))}
      </nav>
      <button
        ref={toggle}
        className="masthead-toggle"
        aria-expanded={open}
        aria-controls="masthead-mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <a className="booking-button masthead-booking" href="#services">
        {hero.action}
      </a>
      {open && (
        <nav
          id="masthead-mobile-navigation"
          className="masthead-mobile"
          aria-label="Mobile navigation"
        >
          {links.map(([name, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {name}
            </a>
          ))}
          <a
            className="menu-booking"
            href="#services"
            onClick={() => setOpen(false)}
          >
            {hero.action}
          </a>
        </nav>
      )}
    </header>
  );
}
