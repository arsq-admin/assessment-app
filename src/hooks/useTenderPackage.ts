import { PublicTenderPackage } from "@/api/tenderPackage/type";
import { useState } from "react";

export const useTenderPackage = () => {
  const [tenderPackage, setTenderPackage] =
    useState<PublicTenderPackage | null>(null);

  return {
    tenderPackage,
    setTenderPackage,
  };
};
