import Link from "next/link";
import { ReactNode } from "react";

export const WrapLink: React.FC<{
  path?: string;
  outerLink?: boolean;
  children: ReactNode;
}> = ({ path, outerLink, children }) => {
  if (path && outerLink) {
    return (
      <Link href={path} passHref>
        <a className="block" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Link>
    );
  }
  if (path) {
    return <Link href={path}>{children}</Link>;
  }
  return <> {children}</>;
};
