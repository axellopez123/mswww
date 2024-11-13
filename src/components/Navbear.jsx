"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./Menu";
import { cn } from "../lib/utils";
import FloatingDock from "./FloatingDock";
import ThemeToggleButton from "./ThemeToggleButton";
import BackgroundGradient from "./BackgroundGradient";
export function Navbear() {
  const [active, setActive] = useState(null);
   
  const links = [
    {
      title: "Joyitas",
      icon: (
        <MenuItem setActive={setActive} active={active} item="Joyitas">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
      ),
      href: "#",
      emoji:"💎",
    },
    {
      title: "Servicios",
      icon: (
        <MenuItem setActive={setActive} active={active} item="Servicios">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
      ),
      href: "#",
      emoji:"✨",
    },
    {
      title: "Contacto",
      icon: (
        <MenuItem setActive={setActive} active={active} item="Contacto">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      ),
      href: "#",
      emoji:"☎",
    },
  ];

  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-5" active={active} setActive={setActive} links={links} />
    </div>

  );
}

function Navbar({ className, active, setActive, links }) {
  return (
    <div
      className={cn("fixed top-10 inset-x-0 w-11/12 mx-auto z-50", className)}
    >
    <BackgroundGradient>
      <Menu setActive={setActive}>
          <div id="logo" className="flex items-center">
<p className="font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-4xl">MSWWW</p>
          </div>
          <div id="menu" className="">
        <FloatingDock items={links} />
          </div>
      </Menu>
    </BackgroundGradient>
    </div>
  );
}
