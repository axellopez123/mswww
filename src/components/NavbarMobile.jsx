import React, { useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";
export function NavbarMobile() {
  return (
    <div className="fixed top-0 left-0 right-0 px-3 pt-2">
      <div class="flex backdrop-blur-xl bg-white/10 border-white/10 rounded-xl pt-2 pb-1 shadow-lg">
        <div class="flex-none w-1/5"></div>
        <div class="grow flex items-center justify-center"><p className="font-bold text-3xl">MSWWW</p></div>
        <div class="flex-none w-1/5"><ThemeToggleButton/></div>
      </div>
    </div>
  );
}
