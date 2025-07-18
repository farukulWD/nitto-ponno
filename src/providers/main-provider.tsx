"use client";

import MobileMenu from "@/components/common/mobile-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

function MainProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  return (
    <>
      {children}

      {isMobile && <MobileMenu />}
    </>
  );
}

export default MainProvider;
