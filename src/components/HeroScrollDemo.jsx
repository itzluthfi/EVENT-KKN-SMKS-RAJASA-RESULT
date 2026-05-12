"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <section className="flex flex-col overflow-hidden bg-transparent">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-semibold text-primary dark:text-white">
              Unleash the power of <br />
              <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-emerald to-violet-light bg-clip-text text-transparent">
                Scroll Animations
              </span>
            </h2>
          </div>
        }
      >
        <div className="h-full w-full relative overflow-hidden rounded-2xl">
          <img
            src="/assets/fotbar-kelompok.jpeg"
            alt="Foto Bersama Kelompok 2 KKN ITATS"
            className="object-cover w-full h-full"
            draggable={false}
          />
          {/* Overlay to give it a more digital feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-40" />
        </div>
      </ContainerScroll>
    </section>
  );
}
