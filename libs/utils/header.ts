import React from "react";

export const HeaderScrollRefs = {
  TOP: React.createRef<HTMLDivElement>(),
  ABOUT: React.createRef<HTMLDivElement>(),
  GALLERY: React.createRef<HTMLDivElement>(),
} as const;

type HeaderScrollRef = typeof HeaderScrollRefs[keyof typeof HeaderScrollRefs];

export const scroll = (ref: HeaderScrollRef) => {
  ref!.current!.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
