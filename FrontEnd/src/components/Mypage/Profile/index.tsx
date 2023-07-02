import useGetUserInfo from '@src/hooks/react-query/useGetUserInfo';
import profile from '@src/assets/svgs/ico_profile.svg?url';
import tw from 'twin.macro';
import { css } from '@emotion/react';

const Profile = () => {
  const {
    data: { member },
  } = useGetUserInfo('1');

  return (
    <div
      css={tw`relative z-10 flex flex-col items-center justify-center text-white h-1/2`}
    >
      <div
        css={[
          tw`mb-8 bg-white rounded-full w-110 h-110`,
          css`
            background: #fff url(${profile}) center center no-repeat;
          `,
        ]}
      ></div>
      <h3 css={tw`text-h2Bold`}>{member.name}</h3>
      <p css={tw`text-body3`}>{member.email}</p>
    </div>
  );
};

export default Profile;
