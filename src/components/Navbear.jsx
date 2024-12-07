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
        <MenuItem setActive={setActive} active={active} item="Joyitas" emoji={<i class='bx bxl-sketch text-cyan-400 hover:text-cyan-500 text-5xl'></i>}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
      ),
      href: "#",
      emoji:<i class='bx bxl-sketch'></i>,
      target:"joyitas",
    },
    {
      title: "Servicios",
      icon: (
        <MenuItem setActive={setActive} active={active} item="Servicios" emoji={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-12 text-amber-400 hover:text-amber-500">
          <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
        </svg>}>
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
      emoji:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
      <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
    </svg>,
      target:"servicios",
    },
    // {
    //   title: "Contacto",
    //   icon: (
    //     <MenuItem setActive={setActive} active={active} item="Contacto" emoji="☎">
    //       <div className="flex flex-col space-y-4 text-sm">
    //         <HoveredLink href="/hobby">Hobby</HoveredLink>
    //         <HoveredLink href="/individual">Individual</HoveredLink>
    //         <HoveredLink href="/team">Team</HoveredLink>
    //         <HoveredLink href="/enterprise">Enterprise</HoveredLink>
    //       </div>
    //     </MenuItem>
    //   ),
    //   href: "#",
    //   emoji:"☎",
    //   target:"contacto",
    // },
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
      className={cn("fixed inset-x-0 w-11/12 mx-auto backdrop-blur-lg z-50", className)}
    >
    <div>
      <Menu setActive={setActive}>
          <div id="logo" className="flex items-center backdrop-blur-lg px-5 rounded-2xl">
            <p className="font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent dark:text-white text-black  text-4xl">ARWAX</p>
            
          </div>
          <div id="menu" className="">
            <FloatingDock items={links} />
          </div>
      </Menu>
    </div>
    </div>
  );
}
