import Sheet from 'react-modal-sheet';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/modal/atom';
import { clickMarkerAtom } from '@src/recoil/map/atom';

interface BottomSheetProps {
  children?: React.ReactNode;
  contentH?: number;
  dragOn?: boolean;
  bg?: boolean;
  open?: boolean;
}

type WithoutBgBottomSheetType = {
  [key: string]: boolean | undefined;
};

const WithoutBgBottomSheet = ({ backSheet }: WithoutBgBottomSheetType) => {
  if (!backSheet) {
    return null;
  }
  return <Sheet.Backdrop />;
};

const BottomSheet = ({
  children,
  contentH,
  dragOn,
  bg,
  open,
}: BottomSheetProps) => {
  // const [isOpen, setOpen] = useState(false);
  const sheetDetent = contentH ? 'full-height' : 'content-height';
  const [isOpenState, setOpenState] = useRecoilState(modalAtom);
  const [onClickMarkState, setOnClickMarkState] =
    useRecoilState(clickMarkerAtom);

  useEffect(() => {}, [open, isOpenState]);

  const onCloseSheet = () => {
    setOpenState(false);
    //닫으면 메인 모달 데이터 삭제
    setOnClickMarkState(null);
  };

  return (
    <>
      {/*클릭 버튼 */}
      {/* <button onClick={() => setOpen(true)}>Open sheet?</button> */}
      {/*Sheet */}
      <Sheet
        isOpen={isOpenState}
        onClose={onCloseSheet}
        detent={sheetDetent}
        disableDrag={dragOn}
      >
        <Sheet.Container className="pb-4 px-basic">
          <Sheet.Header />
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
        <WithoutBgBottomSheet backSheet={bg} />
      </Sheet>
    </>
  );
};

export default BottomSheet;
