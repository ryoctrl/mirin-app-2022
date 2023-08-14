import Link from "next/link";
import { ScriptProps } from "next/script";

type PopUpMenu2023Props = ScriptProps & {
  isOpen: boolean;
  close: () => void;
};

export const PopUpMenu2023: React.FC<PopUpMenu2023Props> = (props) => {
  const { isOpen, close } = props;
  return (
    <div
      className={`menu menu-open popupContainer ${isOpen ? "open" : "close"}`}
    >
      <div className="top-menu ">
        <a className="menu-x" onClick={close}>
          <img src="/2023/img/icon-x.webp" width="19px" />
        </a>
        <div className="flex">
          <Link href="/">
            <img src="/2023/img/text-top.webp" width="46px" />
          </Link>
          <Link href="/#about">
            <img src="/2023/img/text-about.webp" width="79px" />
          </Link>
          <Link href="/#special">
            <img src="/2023/img/text-special.webp" width="98px" />
          </Link>
          <Link href="/#works">
            <img src="/2023/img/text-gallery.webp" width="104px" />
          </Link>
          <Link href="">
            <img src="/2023/img/text-3d.webp" width="119px" />
          </Link>
        </div>
      </div>
      <div className="bottom-menu"></div>
    </div>
  );
};
