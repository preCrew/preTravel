import useGetUserInfo from '@src/hooks/react-query/useGetUserInfo';
import React from 'react';
import tw from 'twin.macro';

const Profile = () => {
  const {
    data: { member },
  } = useGetUserInfo('1');

  return (
    <div
      css={tw`relative z-10 flex flex-col items-center justify-center text-white h-1/2`}
    >
      <div css={tw`mb-8 bg-white rounded-full w-110 h-110`}></div>
      <h3 css={tw`text-h2Bold`}>{member.name}</h3>
      <p css={tw`text-body3`}>{member.email}</p>
    </div>
  );
};

export default Profile;
