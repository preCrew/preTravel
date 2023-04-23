import cardListAtom from '@src/recoil/cardList/atom';
import { useRecoilState } from 'recoil';

const useCardListState = () => {
  const [cardList, setCardList] = useRecoilState(cardListAtom);

  const changeCardState = (id: number, isSelected: boolean) => {
    // 만약 누르기 전에 체크가 돼있었다면 현재 상태는 체크 안한상태
    // 배열에서 지워줌
    if (isSelected) {
      setCardList(prev => prev.filter(cardId => cardId !== id));
    }
    // 누르기 전에 체크가 돼있지 않았다면 현재 상태는 체크 한 상태
    // 배열에 추가해줌
    else {
      setCardList(prev => [...prev, id]);
    }
  };

  const clearCardState = () => {
    setCardList([]);
  };

  return { cardList, changeCardState, clearCardState };
};

export default useCardListState;
