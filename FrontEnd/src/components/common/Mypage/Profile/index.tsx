import React from 'react';
import tw from 'twin.macro';

const Profile = () => {
  return (
    <div
      css={tw`relative z-10 flex flex-col items-center justify-center text-white h-1/2`}
    >
      <div css={tw`mb-8 bg-white rounded-full w-110 h-110`}></div>
      <h3 css={tw`text-h2Bold`}>이채영</h3>
      <p css={tw`text-body3`}>dddd@naver.com</p>
    </div>
  );
};

export default Profile;
