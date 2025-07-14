"use client";
import React from "react";
import { cn } from "../lib/utils";
import ThemeToggleButton from "./ThemeToggleButton";

export function Navbear() {
  return (
    <>
      {/* Barra izquierda */}
      <div
        className={cn(
          "fixed top-5 left-5 w-fit backdrop-blur-lg z-50 shadow-sm shadow-black rounded-xl   px-4 py-2"
        )}
      >
      <div
  onClick={() => {
    const el = document.getElementById("input-nombre");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  }}
  className="flex items-center space-x-2 rounded-md px-8 
             bg-white dark:bg-white-900 
             hover:bg-gray-100 dark:hover:bg-white/80
             transition-colors duration-500 cursor-pointer"
>
  <img
    src="/images/tel.gif"
    alt="Llámanos"
    className="w-12 h-12 object-contain"
  />
</div>


      </div>

      {/* Barra derecha */}
      <div
        className={cn(
          "fixed top-5 right-5 w-fit backdrop-blur-lg z-50 shadow-sm shadow-black rounded-xl px-4 py-2"
        )}
      >
        <div className="flex items-center space-x-2">
          <ThemeToggleButton />
          {/* Puedes agregar más íconos a la derecha */}
        </div>
      </div>
    </>
  );
}
