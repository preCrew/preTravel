import Sheet from 'react-modal-sheet';
import { useState } from 'react';

interface  BottomSheetProps{
    children?: React.ReactNode,
    contentH?: number,
    dragOn?: boolean,
}

const BottomSheet = ({children,contentH,dragOn}: BottomSheetProps) => {
  const [isOpen, setOpen] = useState(false);
  const sheetDetent = contentH ? 'full-height' : 'content-height'

  return (
    <>
      {/*클릭 버튼 */}
      <button onClick={() => setOpen(true)}>Open sheet?</button>
      {/*Sheet */}
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)} detent={sheetDetent} disableDrag={dragOn}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}

export default BottomSheet