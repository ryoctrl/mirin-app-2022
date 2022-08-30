import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

import { useExhibitions } from "hooks/exhibitions/use-exhibitions";

export const OutOfPeriod = () => {
  const {
    exhibitionsState: { currentExhibition },
  } = useExhibitions();
  return (
    <div className="out-of-period">
      <div className="out-of-period-line">
        <p>展示会は終了しました。 </p>
        <p>次回の開催をお待ちください。</p>
      </div>
      <div className="out-of-period-line">
        <p>開催期間</p>
        <p>
          {dayjs(currentExhibition?.startAt).format("YYYY-MM-DD(ddd) HH:mm:ss")}
        </p>
        <p> ~ </p>
        <p>
          {dayjs(currentExhibition?.endAt).format("YYYY-MM-DD(ddd) HH:mm:ss")}
        </p>
      </div>
    </div>
  );
};
