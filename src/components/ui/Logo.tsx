"use client";

import { useState } from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

const LOGO_URL = "https://api.thepoonaayurveda.com/wp-content/uploads/2025/01/Frame-64-1.png";

export function Logo({ className = "h-12 w-12" }: LogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} bg-primary rounded-full flex items-center justify-center`}>
        <span className="text-white font-bold text-lg">PA</span>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden rounded-full`}>
      <Image
        src={LOGO_URL}
        alt="The Poona Ayurveda Logo"
        fill
        className="object-cover"
        sizes="48px"
        priority
        onError={() => setError(true)}
      />
    </div>
  );
}