import React, { useCallback, useEffect, useRef, useState } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { useRecoilState } from 'recoil';
import { selectedDayAtom } from '@src/recoil/date/atom';

interface TabSlideProps {
  active?: boolean;
  data: any[];
  category: string;
  onClick?: (e: any) => void;
}

const TabSlide = ({ active, data, category, onClick }: TabSlideProps) => {
  const sliderRef = useRef<Slider>(null);
  const [selectedDayState, setSelectedDayState] =
    useRecoilState(selectedDayAtom);

  useEffect(() => {
    sliderRef.current?.slickGoTo(selectedDayState);
  }, [selectedDayState, sliderRef.current]);

  const onClickTabBtn = useCallback(
    (i: number) => (event: React.MouseEvent) => {
      setSelectedDayState(i);
      // if (!active) active = true;
      // console.log(active, i, selectedDayState);
    },
    [active],
  );

  const btnActive = (i: number) => {
    if (i < -1) {
      return (active = true);
    } else {
      return selectedDayState === i && `active`;
    }
  };

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
      <div className={`${category !== '카테고리별' && 'pl-10'}`}>
        <Slider
          {...settings}
          ref={sliderRef}
        >
          {data.map((item: any, i: number) => (
            <div
              className="mr-2"
              onClick={onClickTabBtn(i)}
              key={i}
            >
              <button
                type="button"
                data-idx={i}
                onClick={onClick}
                className={`${btnActive(
                  i,
                )} h-30 rounded border border-black bg-white px-1 text-body3`}
              >
                {category === '일차별' && `${i + 1}일차`}
                {category === '카테고리별' && `${item.category.title}`}
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default TabSlide;
