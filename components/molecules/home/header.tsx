import Image from "next/image";

import { useExhibitions } from "hooks/exhibitions/use-exhibitions";
import { HeaderScrollRefs, scroll } from "libs/utils/header";

export const HomeHeader: React.FC = () => {
  const {
    exhibitionsState: { currentExhibition },
  } = useExhibitions();
  return (
    <div className="home-header relative">
      {currentExhibition?.heroImage.pc && (
        <Image
          alt={currentExhibition.title}
          src={currentExhibition.heroImage.pc}
          className="invisible md:visible"
          layout="fill"
          objectFit="cover"
        />
      )}
      {currentExhibition?.heroImage.sp && (
        <div>
          <div className="header-title">
            <h2>漫画同好会</h2>
            <h2>海賊版</h2>
            <h2>パネル展示会</h2>
          </div>
          <Image
            alt={currentExhibition.title}
            src={currentExhibition.heroImage.sp}
            className="visible md:invisible"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="scroll-header-bar" onClick={() => scroll(HeaderScrollRefs.ABOUT)}>
        <div className="bar"></div>
        <p>scroll</p>
      </div>
    </div>
  );
};
