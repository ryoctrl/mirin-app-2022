import DatePicker from "react-datepicker";
import { forwardRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

type DateRangePickerProps = {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
};

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div className="flex">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
            selectsStart
            showTimeSelect
            startDate={startDate}
            endDate={endDate}
            dateFormat="Pp"
            nextMonthButtonLabel=">"
            previousMonthButtonLabel="<"
            popperClassName="react-datepicker-left"
            customInput={<ButtonInput />}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-lg text-gray-700">
                  {dayjs(date).format("YYYY/MM")}
                </span>

                <div className="space-x-2">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type="button"
                    className={`
                                            ${
                                              prevMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                  </button>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type="button"
                    className={`
                                            ${
                                              nextMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          />
        </div>
        <span>~</span>
        <div className="relative w-40">
          <DatePicker
            selected={endDate}
            onChange={(date) => date && setEndDate(date)}
            selectsEnd
            showTimeSelect
            startDate={startDate}
            endDate={endDate}
            nextMonthButtonLabel=">"
            previousMonthButtonLabel="<"
            dateFormat="Pp"
            popperClassName="react-datepicker-right"
            customInput={<ButtonInput />}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-lg text-gray-700">
                  {format(date, "MMMM yyyy")}
                </span>

                <div className="space-x-2">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type="button"
                    className={`
                                            ${
                                              prevMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                  </button>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type="button"
                    className={`
                                            ${
                                              nextMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

const ButtonInput = forwardRef<HTMLButtonElement>((props, ref) => {
  const { value, onClick } = props as { value: Date; onClick: () => void };
  return (
    <button
      onClick={onClick}
      ref={ref}
      type="button"
      className="inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
    >
      {dayjs(value).format("YYYY/MM/DD HH:mm")}
    </button>
  );
});
ButtonInput.displayName = "ButtonInput";
