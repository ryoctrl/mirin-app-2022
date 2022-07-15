import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const SectionTitle: React.FC<Props> = (props) => {
  return (
    <div className="section-title">
      <h1>{props.children}</h1>
    </div>
  );
};
