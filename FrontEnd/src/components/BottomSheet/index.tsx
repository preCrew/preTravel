import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Sheet, { SheetRef } from 'react-modal-sheet';

import { modalAtom } from '@src/recoil/modal/atom';
import { clickMarkerAtom } from '@src/recoil/map/atom';
import { currentPlaceAtom } from '@src/recoil/place/atom';
import Button from '../common/Button';

interface BottomSheetProps {
  children?: React.ReactNode;
  contentH?: number;
  dragOn?: boolean;
  bg?: boolean;
  open?: boolean;
  snapIndex?: number | undefined;
  moreOnClick?: boolean;
  setMoreOnClick?: React.Dispatch<React.SetStateAction<boolean>>;
}

type WithoutBgBottomSheetType = {
  [key: string]: boolean | undefined;
};

const BottomSheet = ({
  children,
  contentH,
  dragOn,
  bg,
  moreOnClick,
  snapIndex = undefined,
  setMoreOnClick,
}: BottomSheetProps) => {
  // const [isOpen, setOpen] = useState(false);

  const sheetDetent = contentH ? 'full-height' : 'content-height';
  const ref = useRef<SheetRef>(null);
  const snapTo = (i: number) => ref.current?.snapTo(i);
  const [sheetHeight, setSheetHeight] = useState('80%');

  const [isOpenState, setOpenState] = useRecoilState(modalAtom);
  const currentPlaceState = useRecoilValue(currentPlaceAtom);
  const [onClickMarkState, setOnClickMarkState] =
    useRecoilState(clickMarkerAtom);

  const [moreBtn, setMoreBtn] = useState(false);

  useEffect(() => {
    console.log(snapIndex);
    if (snapIndex === 0) snapTo(snapIndex);
  }, [snapIndex]);

  // useEffect(() => {
  //   // 장소 리스트가 5개 이상이면 더보기 버튼 노출
  //   if (currentPlaceState.list.length > 5) {
  //     setMoreBtn(true);
  //   } else {
  //     setMoreBtn(false);
  //   }
  //   console.log(currentPlaceState, moreBtn);
  // }, [currentPlaceState]);

  const onCloseSheet = () => {
    console.log('닫힘', isOpenState);
    // setOpenState(false);
    snapTo(3);
    //닫으면 mainModal 데이터 삭제
    setOnClickMarkState(null);
  };

  const onClickSnap = () => {
    snapTo(0);
    //setMoreOnClick?.(false);
  };

  const WithoutBgBottomSheet = ({ backSheet }: WithoutBgBottomSheetType) => {
    if (!backSheet) {
      return null;
    }
    return <Sheet.Backdrop />;
  };

  return (
    <>
      {/*클릭 버튼 */}
      {/* <button onClick={() => setOpen(true)}>Open sheet?</button> */}
      {/*Sheet */}
      <Sheet
        ref={ref}
        isOpen={isOpenState}
        onClose={onCloseSheet}
        snapPoints={[-50, 0.4, 100, 100]}
        initialSnap={1}
        detent="full-height"
        disableDrag={dragOn}
      >
        <Sheet.Container className="pb-4 px-basic">
          <Sheet.Header />
          <Sheet.Content>
            {children}
            {moreOnClick && moreBtn && (
              <button
                className="mt-2 text-body1"
                onClick={onClickSnap}
              >
                더 보기
              </button>
            )}
          </Sheet.Content>
        </Sheet.Container>
        <WithoutBgBottomSheet backSheet={bg} />
      </Sheet>
    </>
  );
};

export default BottomSheet;
