import Image from "next/image";

import { HeaderScrollRefs, scroll } from "libs/utils/header";
import { useExhibitions } from "hooks/exhibitions/use-exhibitions";

export const HomeFooter: React.FC = () => {
  const {
    exhibitionsState: { currentExhibition },
  } = useExhibitions();
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="footer-btn-wrapper">
          <div className="footer-btn" onClick={() => scroll(HeaderScrollRefs.TOP)}>
            <h4>01</h4>
            <h4>TOP</h4>
          </div>
          <div className="footer-btn" onClick={() => scroll(HeaderScrollRefs.ABOUT)}>
            <h4>02</h4>
            <h4>ABOUT</h4>
          </div>
          <div className="footer-btn" onClick={() => scroll(HeaderScrollRefs.GALLERY)}>
            <h4>03</h4>
            <h4>GALLERY</h4>
          </div>
          <div className="page-top-btn">
            <Image
              alt="タイトルロゴ"
              src="/pageTopBtn.png"
              layout="fill"
              objectFit="contain"
              onClick={() => scroll(HeaderScrollRefs.TOP)}
            />
          </div>
        </div>
        <div className="footer-title-logo">
          <Image
            alt="タイトルロゴ"
            src="/KUMD.png"
            layout="fill"
            objectFit="contain"
            onClick={() => scroll(HeaderScrollRefs.TOP)}
          />
        </div>
      </div>
    </div>
  );
};