export const getLoginUri = (where: 'naver' | 'kakao' | 'base') => {
  const mode = process.env.NODE_ENV as 'development' | 'production';
  const uri = {
    naver: {
      development: 'http://localhost:3001/getCode/naver',
      production:
        'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=76Nr2e2G6KuBeyuVPqbf&state=STATE_STRING&redirect_uri=https://web-fronttest-ll32glc6adwo3.gksl2.cloudtype.app/oauth/naver',
    },
    kakao: {
      development: 'http://localhost:3001/getCode/kakao',
      production:
        'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=b419b28c930a90dc96e0fd983b9025ef&redirect_uri=https://web-fronttest-ll32glc6adwo3.gksl2.cloudtype.app/oauth/kakao',
    },
    base: {
      development: 'http://localhost:3001',
      production: 'https://port-0-pretravel-ll32glc6adwo3.gksl2.cloudtype.app',
    },
  };
  return uri[where][mode];
};

// 브라우저(로그인 클릭) => 인증 서버 => 브라우저(코드, https://url/oauth/naver)
// =>
