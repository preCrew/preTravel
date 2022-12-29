import Sheet from 'react-modal-sheet';
import { useState } from 'react';

interface  BottomSheetProps{
    children?: React.ReactNode,
    contentH?: number,
    dragOn?: boolean,
    bg?:boolean,
}

type WithoutBgBottomSheetType = {
  [key:string] : boolean | undefined
}

const WithoutBgBottomSheet = ({backSheet}: WithoutBgBottomSheetType) => {
  if(!backSheet) {
    return null
  }
  return (
    <Sheet.Backdrop />
  )
}

const BottomSheet = ({children,contentH,dragOn,bg}: BottomSheetProps) => {
  const [isOpen, setOpen] = useState(true);
  const sheetDetent = contentH ? 'full-height' : 'content-height'


  return (
    <>
      {/*클릭 버튼 */}
      <button onClick={() => setOpen(true)}>Open sheet?</button>
      {/*Sheet */}
      <Sheet 
        isOpen={isOpen} 
        onClose={() => setOpen(false)} 
        detent={sheetDetent} 
        disableDrag={dragOn}>
        <Sheet.Container className="px-basic">
          <Sheet.Header />
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
        <WithoutBgBottomSheet backSheet={bg}/>
      </Sheet>
    </>
  );
}

export default BottomSheet