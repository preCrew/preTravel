import Column from '@src/components/common/FlexBox/Column';
import tw from 'twin.macro';

interface LoadingModalProps {
  text: string;
}

const LoadingModal = ({ text }: LoadingModalProps) => {
  return (
    <div css={tw`w-h-full flex-with-center`}>
      <Column
        gap={3}
        css={[
          tw` justify-center items-center absolute`,
          tw` w-[60%] h-[20%] top-[30%] bg-white m-auto rounded-2xl `,
        ]}
      >
        <div>LoadingSpiner위치</div>
        <span css={tw`text-body1`}>{text}</span>
      </Column>
    </div>
  );
};

export default LoadingModal;
