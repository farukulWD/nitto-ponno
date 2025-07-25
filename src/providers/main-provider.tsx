"use client";

import MobileMenu from "@/components/common/mobile-menu";
import Navbar from "@/components/common/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

function MainProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  
  return (
    <>
      <Navbar />
      {children}

      {isMobile && <MobileMenu />}
    </>
  );
}

export default MainProvider;
