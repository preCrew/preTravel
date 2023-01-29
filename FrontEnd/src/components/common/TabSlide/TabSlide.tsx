import React, {
  DOMElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
import { useQuery } from '@tanstack/react-query';

interface TabSlideProps {
  style?: string;
}

const TabSlide = ({ style }: TabSlideProps) => {
  const currentScheduleState = useRecoilValue(currentScheduleAtom);
  const [selectedDayState, setSelectedDayState] =
    useRecoilState(selectedDayAtom);
  const sliderRef = useRef<Slider>(null);
  const scheduleDaysArr: number[] = Array(currentScheduleState.schedule.length)
    .fill(null)
    .map((_, i) => i + 1);

  const onClickTabBtn = useCallback(
    (i: number) => (event: React.MouseEvent) => {
      setSelectedDayState(i);
    },
    [],
  );

  useEffect(() => {
    sliderRef.current?.slickGoTo(selectedDayState);
  }, [selectedDayState, sliderRef.current]);

  const settings = {
    className: 'tab__slide',
    infinite: false,
    slide: 'ul',
    slidesToShow: 5,
    swipeToSlide: true,
    variableWidth: true,
    arrows: false,
  };

  return (
    <>
      {currentScheduleState && (
        <div className="pl-10">
          <Slider
            {...settings}
            ref={sliderRef}
          >
            {scheduleDaysArr.map((_, i) => (
              <li
                className="mr-2"
                onClick={onClickTabBtn(i)}
                key={i}
              >
                <button
                  type="button"
                  className={`${
                    selectedDayState === i && `active`
                  } px-1 bg-white border border-black rounded h-30 text-body3`}
                >
                  {i + 1}일차
                </button>
              </li>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default TabSlide;
