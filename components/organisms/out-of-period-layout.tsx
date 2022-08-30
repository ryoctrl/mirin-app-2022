import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);
import Image from "next/image";

import { useExhibitions } from "hooks/exhibitions/use-exhibitions";

export const OutOfPeriodLayout = () => {
  const {
    exhibitionsState: { currentExhibition },
  } = useExhibitions();
  return (
    <div className="out-of-period">
      <div>
        <div className="out-of-period-line-image">
          <div className="out-of-period-hero-image">
            <Image
              alt="elephant"
              src="/coming-soon.png"
              layout="fill"
              objectFit="contain"
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
