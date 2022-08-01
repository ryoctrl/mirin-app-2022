import { ReactNode } from "react";

type ModalProps = {
  id: string;
  title: string;
  children: ReactNode;
  isOpen: boolean;
};

export const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div
      id={props.id}
      data-modal-show="true"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        props.isOpen ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white w-full rounded-lg shadow dark:bg-gray-500">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {props.title}
            </h3>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};
