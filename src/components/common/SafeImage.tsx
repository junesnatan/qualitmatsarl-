"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { Building2 } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "src" | "onError"> {
  src?: string | null;
  categorySlug?: string;
  fallbackSrc?: string;
}

const CATEGORY_FALLBACKS: Record<string, string> = {
  "cat-gros-oeuvre": "/images/categories/gros-oeuvre.jpg",
  "gros-oeuvre": "/images/categories/gros-oeuvre.jpg",
  "cat-electricite": "/images/categories/electricite.jpg",
  "electricite": "/images/categories/electricite.jpg",
  "cat-plomberie": "/images/categories/plomberie.jpg",
  "plomberie": "/images/categories/plomberie.jpg",
  "cat-outillage": "/images/categories/outillage.jpg",
  "outillage": "/images/categories/outillage.jpg",
  "cat-peinture": "/images/categories/peinture.jpg",
  "peinture": "/images/categories/peinture.jpg",
  "cat-toiture": "/images/categories/gros-oeuvre.jpg",
  "toiture": "/images/categories/gros-oeuvre.jpg",
  "cat-ferraillage": "/images/categories/ferraillage.jpg",
  "ferraillage": "/images/categories/ferraillage.jpg",
  "cat-sanitaire": "/images/categories/sanitaire.jpg",
  "sanitaire": "/images/categories/plomberie.jpg",
};

const DEFAULT_IMAGE = "/images/categories/gros-oeuvre.jpg";

export default function SafeImage({
  src,
  alt,
  categorySlug,
  fallbackSrc,
  className = "",
  fill = false,
  width,
  height,
  ...rest
}: SafeImageProps) {
  const targetFallback =
    fallbackSrc ||
    (categorySlug ? CATEGORY_FALLBACKS[categorySlug] : undefined) ||
    DEFAULT_IMAGE;

  const [imgSrc, setImgSrc] = useState<string>(src || targetFallback);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setErrorCount(0);
    } else {
      setImgSrc(targetFallback);
    }
  }, [src, targetFallback]);

  const handleError = () => {
    if (errorCount === 0 && imgSrc !== targetFallback) {
      setErrorCount(1);
      setImgSrc(targetFallback);
    } else {
      setErrorCount(2);
    }
  };

  if (errorCount >= 2 || !imgSrc) {
    return (
      <div
        className={`bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-4 border border-slate-200 ${
          fill ? "absolute inset-0 w-full h-full" : ""
        } ${className}`}
      >
        <Building2 className="w-8 h-8 text-brand-900/40 mb-1" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center line-clamp-1">
          {alt || "QUALITMATSARL"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt || "QUALITMATSARL Matériaux"}
      className={className}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      onError={handleError}
      {...rest}
    />
  );
}
