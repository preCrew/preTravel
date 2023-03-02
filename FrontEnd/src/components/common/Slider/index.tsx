import { useRef } from 'react';
import tw from 'twin.macro';

interface DraggableProps {
  children: React.ReactNode;
  className?: string;
}

const isTouchable =
  navigator.maxTouchPoints > 0 || 'ontouchstart' in document.documentElement;

const Slider = ({ children, className }: DraggableProps) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  // 마우스 클릭
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    const innerLeft = innerRef.current?.getBoundingClientRect().left;
    let startX: number = 0;
    if (isTouchable) {
      startX =
        (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX - innerLeft!;
    } else {
      startX = (e as React.MouseEvent<HTMLDivElement>).clientX - innerLeft!;
    }

    // 마우스 이동 이벤트
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      let nowX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      innerRef.current!.style.left = `${nowX - startX}px`;

      const outterRect = outerRef.current?.getBoundingClientRect();
      const innerRect = innerRef.current?.getBoundingClientRect();

      // 안쪽 div의 left가 전체 div의 좌쪽을 넘어갔을 경우
      if (parseInt(innerRef.current?.style.left!) > 0) {
        innerRef.current!.style.left = `${0}px`;
      }
      // 안쪽 div의 left가 전체 div의 우측을 넘어갔을 경우
      else if (innerRect?.right! < outterRect?.right!) {
        // 안쪽 너비가 바깥보다 작으면 그냥 그대로 놔둠
        if (innerRect?.width! < outterRect?.width!) {
          innerRef.current!.style.left = `${0}px`;
        } else {
          const calc = (innerRect?.width! - outterRect?.width!) * -1;
          innerRef.current!.style.left = `${calc}px`;
        }
      }
    };

    // 마우스 뗏을경우
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
    };
    // 마우스 이벤트 등록
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);
  };

  return (
    <div
      ref={outerRef}
      css={tw`relative w-full h-100 `}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onScroll={() => {
        console.log('!!');
      }}
      className={className}
    >
      <div
        ref={innerRef}
        css={[tw`absolute pointer-events-none`]}
      >
        {children}
      </div>
    </div>
  );
};
// };

export default Slider;
