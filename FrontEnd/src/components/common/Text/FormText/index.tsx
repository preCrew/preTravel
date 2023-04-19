import tw from 'twin.macro';
import Column from '../../FlexBox/Column';
import Row from '../../FlexBox/Row';

interface FormTextProps {
  children: React.ReactNode;
  placeHolder?: string;
  required?: boolean;
}

const FormText = ({ children, placeHolder, required }: FormTextProps) => {
  return (
    <Column css={tw`gap-1 select-none`}>
      <Row css={tw`gap-1`}>
        {required && <span css={tw`text-red-500`}>*</span>}
        <span css={tw`text-body2Bold`}>{children}</span>
      </Row>
      {placeHolder && (
        <span css={tw`text-body2 text-gray1 `}>{placeHolder}</span>
      )}
    </Column>
  );
};

export default FormText;
