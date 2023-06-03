import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
} from 'react-day-picker';
import { ko } from 'date-fns/esm/locale';
import { useRecoilState } from 'recoil';

import BottomSheet from '@src/components/BottomSheet';
import { modalAtom } from '@src/recoil/modal/atom';

interface InputCalendarProps {
  value: Dispatch<SetStateAction<any | undefined>>;
  defaultRange?: {
    from: string;
    to: string;
  };
}

const InputCalendar = ({ value, defaultRange }: InputCalendarProps) => {
  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenState, setOpenState] = useRecoilState(modalAtom);

  const handleFromChange: ChangeEventHandler<HTMLInputElement> = e => {
    setFromValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: undefined });
    }
    if (selectedRange?.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date });
    } else {
      setSelectedRange({ from: date, to: selectedRange?.to });
    }
  };

  const handleToChange: ChangeEventHandler<HTMLInputElement> = e => {
    setToValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange?.from, to: undefined });
    }
    if (selectedRange?.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from });
    } else {
      setSelectedRange({ from: selectedRange?.from, to: date });
    }
  };

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    setSelectedRange(range);
    if (range?.from) {
      setFromValue(format(range.from, 'y-MM-dd'));
    } else {
      setFromValue('');
    }
    if (range?.to) {
      setToValue(format(range.to, 'y-MM-dd'));
    } else {
      setToValue('');
    }
    value(range);
  };

  const onClickCalendar = () => {
    console.log(isOpen);

    setOpenState(true);
  };

  return (
    <>
      <div
        onClick={onClickCalendar}
        className="h-full"
      >
        <input
          size={8}
          placeholder="YYYY-MM-DD"
          value={fromValue || defaultRange?.from}
          onChange={handleFromChange}
          className="input-reset h-full w-90 bg-white text-body1"
        />
        {'–'}
        <input
          size={10}
          placeholder="YYYY-MM-DD"
          value={toValue || defaultRange?.to}
          onChange={handleToChange}
          className="input-reset ml-1 h-full w-90 bg-white text-body1"
        />
      </div>
      <BottomSheet open={isOpen}>
        <DayPicker
          locale={ko}
          mode="range"
          selected={selectedRange}
          onSelect={handleRangeSelect}
        />
      </BottomSheet>
    </>
  );
};

export default InputCalendar;
