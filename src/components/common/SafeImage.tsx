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
  "cat-gros-oeuvre": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  "gros-oeuvre": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  "cat-electricite": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  "electricite": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  "cat-plomberie": "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
  "plomberie": "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
  "cat-outillage": "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80",
  "outillage": "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80",
  "cat-peinture": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  "peinture": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  "cat-toiture": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
  "toiture": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
  "cat-ferraillage": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
  "ferraillage": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
  "cat-sanitaire": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
  "sanitaire": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80";

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
