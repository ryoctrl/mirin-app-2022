import Image from "next/image";

import { useExhibitions } from "hooks/exhibitions/use-exhibitions";

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
        />
      )}
      {currentExhibition?.heroImage.sp && (
        <Image
          alt={currentExhibition.title}
          src={currentExhibition.heroImage.sp}
          className="visible md:invisible"
          layout="fill"
        />
      )}
    </div>
  );
};
