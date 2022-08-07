import { SVGProps } from "react";

export const AddIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      width="50px"
      height="50px"
      viewBox="0 0 50 50"
      enableBackground="new 0 0 50 50"
      xmlSpace="preserve"
      fill="currentColor"
      {...props}
    >
      <line
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="35.253"
        y1="14.747"
        x2="14.747"
        y2="35.254"
      />
      <circle fill="none" strokeLinejoin="round" cx="25" cy="25" r="23.668" />
      <line
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="35.253"
        y1="35.254"
        x2="14.747"
        y2="14.747"
      />
    </svg>
  );
};
