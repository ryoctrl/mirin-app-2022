import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

import { useExhibitions } from "hooks/exhibitions/use-exhibitions";

export const OutOfPeriod = () => {
  const {
    exhibitionsState: { currentExhibition },
  } = useExhibitions();
  return (
    <div className="flex items-center flex-col w-full">
      <p>展示会は終了しました。 次回の開催をお待ちください。</p>
      <p>
        開催期間:
        {dayjs(currentExhibition?.startAt).format(
          "YYYY-MM-DD(ddd) HH:mm:ss"
        )} ~{" "}
        {dayjs(currentExhibition?.endAt).format("YYYY-MM-DD(ddd) HH:mm:ss")}
      </p>
    </div>
  );
};
