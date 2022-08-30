import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export const OutOfPeriodLayout = () => {
  const [heroSrc, setHeroSrc] = useState("/coming-soon-stop.png");

  useEffect(() => {
    const heroSrc =
      window?.innerWidth > 768 ? "/coming-soon.png" : "/coming-soon-stop.png";
    setHeroSrc(heroSrc);
  }, [global.window]);

  return (
    <div className="out-of-period">
      <div>
        <div className="out-of-period-line-image">
          <div className="out-of-period-hero-image">
            <Image
              id="test"
              alt="hero-image"
              src={heroSrc}
              layout="fill"
              unoptimized={true}
              objectFit="contain"
              onClick={(e) => {
                setHeroSrc((heroSrc) => {
                  if (heroSrc === "/coming-soon.png") {
                    return heroSrc;
                  }
                  return "/coming-soon.png";
                });
              }}
            />
          </div>
        </div>
        <div className="out-of-period-line-text">
          <p className="animate-before">第一回漫画同好会海賊版パネル展示会は</p>
          <p className="animate-before">2022年8月31日をもって終了しました</p>
          <p className="animate-before">またのご参加是非よろしくお願いします</p>
          <p className="animate-after">乞うご期待</p>
        </div>

        <div className="out-of-period-logo">
          <Image
            alt="タイトルロゴ"
            src="/KUMD.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};
