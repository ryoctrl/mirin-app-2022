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
              src="/KUMD.png"
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
              <div>
                <h3>01</h3>
                <h3>TOP</h3>
              </div>
            </div>
            <div className={styles.scrollBtn} onClick={() => scrollAndMenuClose(HeaderScrollRefs.ABOUT)}>
              <div>
                <h3>02</h3>
                <h3>ABOUT</h3>
              </div>
            </div>
            <div className={styles.scrollBtn} onClick={() => scrollAndMenuClose(HeaderScrollRefs.GALLERY)}>
              <div>
                <h3>03</h3>
                <h3>GALLERY</h3>
              </div>
            </div>
          </div>
          <div className={styles.borderBottom}></div>
        </div>
      </div>
    </div>
  );
};
