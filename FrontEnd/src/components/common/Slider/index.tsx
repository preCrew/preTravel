import { useState } from 'react';

import tw, { css } from 'twin.macro';

import useBoundingClientRect from '@src/hooks/useBoundingClientRect';

interface DraggableProps {
  itemNum: number;
  children: React.ReactNode;
  className?: string;
  onMovedLeft?: () => void;
  onMovedRight?: () => void;
}
interface State {
  left: number;
  startX: number;
  beforeLeft: number;
  isClick: boolean;
}

const Slider = ({
  itemNum,
  children,
  className,
  onMovedLeft,
  onMovedRight,
}: DraggableProps) => {
  const { ref: outerRef, rect: outerRect } = useBoundingClientRect();
  const { ref: innerRef, rect: innerRect } = useBoundingClientRect();

  const [state, setState] = useState<State>({
    left: 0,
    startX: 0,
    beforeLeft: 0,
    isClick: false,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setState(prev => ({ ...prev, startX: e.clientX, isClick: true }));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!state.isClick) return;

    setState(prev => ({
      ...prev,
      left: e.clientX - prev.startX + prev.beforeLeft,
    }));
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!state.isClick) return;

    setState(prev => ({ ...prev, isClick: false }));
    const moved = e.clientX - state.startX;

    // 실제로 드래그하고 움직인 거리가 0이라면 아무것도 하지 않음
    if (moved === 0) return;

    // moved가 음수라면 오른쪽으로 움직인 것이고, 양수라면 왼쪽으로 움직인 것
    const outerWidth = moved < 0 ? -outerRect?.width! : outerRect?.width!;
    let nextLeft = state.beforeLeft + outerWidth;

    // 아래 if문은 left가 끝까지 갔을 때 다시 원래대로 돌아오게 하는 코드
    // 왼쪽을 벗어나면
    if (nextLeft > 0) {
      nextLeft = 0;
    }
    // 오른쪽을 벗어나면
    else if (-nextLeft >= innerRect?.width!) {
      nextLeft = state.beforeLeft;
    }

    // 실제로 left가 바뀌었다면 이벤트를 실행
    if (nextLeft !== state.beforeLeft) {
      if (moved < 0) onMovedRight?.();
      else onMovedLeft?.();
    }

    setState(prev => ({
      ...prev,
      left: nextLeft,
      beforeLeft: nextLeft,
    }));
  };

  return (
    <div
      ref={outerRef}
      css={tw`relative w-h-full overflow-x-hidden`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={className}
    >
      <div
        ref={innerRef}
        css={[
          tw`absolute grid pointer-events-none`,
          !state.isClick && tw`transition-transform duration-500`,
          css`
            transform: translateX(${state.left}px);
            grid-template-columns: repeat(${itemNum}, 1fr);
            width: ${itemNum * 100}%;
          `,
        ]}
      >
        {children}
      </div>
    </div>
  );
};

export default Slider;
