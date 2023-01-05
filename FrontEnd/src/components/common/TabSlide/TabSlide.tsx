import React, { DOMElement, useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useRecoilState } from 'recoil';
import dateAtom, { IdateAtom } from '@src/recoil/date/atom';

const travelDate: any = {
  from: '2022-05-01',
  to: '2022-05-05',
};

interface TabSlideProps {
  style?: string;
}
interface Itabslide {
  oldSlide?: number;
  activeSlide?: number;
  activeSlide2?: number;
}

const TabSlide = ({ style }: TabSlideProps) => {
  const [currentDays, setCurrentDays] = useState(0);
  // const [currentDays,setCurrentDays] = useState<Itabslide>({
  //     oldSlide: 0,
  //     activeSlide: 0,
  //     activeSlide2: 0
  // })
  const diffDay =
    (new Date(travelDate.to).getTime() - new Date(travelDate.from).getTime()) /
    1000 /
    60 /
    60 /
    24;
  const daysArr: number[] = Array(diffDay)
    .fill(null)
    .map((_, i) => i + 1);

  const [dateVlaue, setDateValue] = useRecoilState(dateAtom);
  useEffect(() => {
    setDateValue(prevValue => ({
      ...prevValue,
      selecteddayDiff: diffDay,
    }));
  }, []);

  const settings = {
    className: 'tab__slide',
    infinite: false,
    slide: 'ul',
    //centerPadding: "8px",
    slidesToShow: 5,
    swipeToSlide: true,
    variableWidth: true,
    //beforeChange: ({current, next}: any) => setCurrentDays({ oldSlide: current, activeSlide: next }),
    //afterChange: (current: any) => setCurrentDays({ activeSlide2: current })
  };

  const onClickTabBtn = (i: number) => (event: React.MouseEvent) => {
    console.log(i);
    setCurrentDays(i);
    //console.log('일차클릭')
  };

  const sliderRef = useRef<Slider>(null);
  useEffect(() => {
    console.log('d업뎃', dateVlaue.selectedDayDiff);
    sliderRef.current?.slickGoTo(dateVlaue.selectedDayDiff);
    setCurrentDays(dateVlaue.selectedDayDiff);
  }, [dateVlaue, sliderRef.current]);

  return (
    <div className="pl-10">
      <Slider
        {...settings}
        ref={sliderRef}
      >
        {daysArr.map((_, i) => (
          <li
            className="mr-2"
            onClick={onClickTabBtn(i)}
          >
            <button
              type="button"
              className={`${
                currentDays === i && `active`
              } px-1 bg-white border border-black rounded h-30 text-body3`}
            >
              {i + 1}일차
            </button>
          </li>
        ))}
      </Slider>
    </div>
  );
};

export default TabSlide;
