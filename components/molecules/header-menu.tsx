import Image from "next/image";
import React, { useState } from "react";

import styles from "@styles/Home.module.scss";
import { HeaderScrollRefs, scroll } from "libs/utils/header";

export const HeaderMenu: React.FC = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);

  const scrollAndMenuClose = (ref : React.RefObject<HTMLDivElement>) => {
    setMenuOpen(false);
    scroll(ref);
  }

  return (
    <div className={styles.headerMenu}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerBar}>
          <div className={styles.titleLogo}>
            <Image
              alt="タイトルロゴ"
              src="/KUMD.svg"
              width="129px"
              height="33px"
              onClick={() => scrollAndMenuClose(HeaderScrollRefs.TOP)}
            />
          </div>
          <div className={styles.pcScrollBtns}>
            <span onClick={() => scrollAndMenuClose(HeaderScrollRefs.TOP)}>
              top
            </span>
            <span onClick={() => scrollAndMenuClose(HeaderScrollRefs.ABOUT)}>
              about
            </span>
            <span onClick={() => scrollAndMenuClose(HeaderScrollRefs.GALLERY)}>
              gallery
            </span>
          </div>
          <div className={styles.hamburgerWrapper}>
              <button className={`${styles.hamburger} ${menuOpen ? styles.openHamburger : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <div className={`${styles.headerContent} ${menuOpen ? styles.openContent : ""}`}>
          <div className={styles.borderTop}></div>
          <div className={styles.scrollBtnWrapper}>
            <div className={styles.scrollBtn} onClick={() => scrollAndMenuClose(HeaderScrollRefs.TOP)}>
              <div>01<br/>TOP</div>
            </div>
            <div className={styles.scrollBtn} onClick={() => scrollAndMenuClose(HeaderScrollRefs.ABOUT)}>
              <div>02<br/>ABOUT</div>
            </div>
            <div className={styles.scrollBtn} onClick={() => scrollAndMenuClose(HeaderScrollRefs.GALLERY)}>
              <div>03<br/>GALLERY</div>
            </div>
          </div>
          <div className={styles.borderBottom}></div>
        </div>
      </div>
    </div>
  );
};
