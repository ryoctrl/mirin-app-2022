import Link from "next/link";
import { ScriptProps } from "next/script";

import { HeaderScrollRefs, scroll } from "libs/utils/header";
import React from "react";

type PopUpMenu2023Props = ScriptProps & {
  isOpen: boolean;
  close: () => void;
};

export const PopUpMenu2023: React.FC<PopUpMenu2023Props> = (props) => {
  const { isOpen, close } = props;

  const scrollAndMenuClose = (ref : React.RefObject<HTMLDivElement>) => {
    close();
    scroll(ref);
  }

  return (
    <div
      className={`menu menu-open popupContainer ${isOpen ? "open" : "close"}`}
    >
      <div className="top-menu ">
        <a className="menu-x" onClick={close}>
          <img src="/2023/img/icon-x.webp" width="19px" />
        </a>
        <div className="flex">
          <img src="/2023/img/text-top.webp" width="46px" onClick={() => scrollAndMenuClose(HeaderScrollRefs.TOP)} />
          <img src="/2023/img/text-about.webp" width="79px" onClick={() => scrollAndMenuClose(HeaderScrollRefs.ABOUT)} />
          <img src="/2023/img/text-special.webp" width="98px" onClick={() => scrollAndMenuClose(HeaderScrollRefs.SPECIAL)} />
          <img src="/2023/img/text-gallery.webp" width="104px" onClick={() => scrollAndMenuClose(HeaderScrollRefs.GALLERY)} />
          <Link href="" >
            <img src="/2023/img/text-3d.webp" width="119px" onClick={close} />
          </Link>
        </div>
      </div>
      <div className="bottom-menu"></div>
    </div>
  );
};
