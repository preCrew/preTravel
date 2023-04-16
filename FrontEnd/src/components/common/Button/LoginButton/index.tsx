import Button from '..';
import kakao from '@src/assets/svgs/kakao.svg?url';
import naver from '@src/assets/svgs/naver.svg?url';
import Kakao from '@src/assets/svgs/kakao.svg';

interface LoginButtonProps {
  where: 'kakao' | 'naver';
  onClick?: () => void;
}

const LoginButton = ({ where, onClick }: LoginButtonProps) => {
  const source = {
    kakao: {
      src: kakao,
      text: '카카오 로그인',
      bg: 'bg-[#FEE500]',
      textColor: 'text-black',
      imageSize: 'w-40',
    },
    naver: {
      src: naver,
      text: '네이버 로그인',
      bg: 'bg-[#03C75A]',
      textColor: 'text-white',
      imageSize: 'w-50',
    },
  };
  return (
    <>
      <Button
        sizeType="large"
        onClick={onClick}
        className={`${source[where].bg} ${source[where].textColor}`}
      >

        <div css="w-50 flex justify-center ">

          <img
            src={source[where].src}
            className={source[where].imageSize}
          />
        </div>
        <p>{source[where].text}</p>
      </Button>
      <Kakao />
    </>
  );
};

export default LoginButton;
