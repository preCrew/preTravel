export const getLoginUri = (where: 'naver' | 'kakao' | 'base') => {
  const mode = process.env.NODE_ENV as 'development' | 'production';
  const uri = {
    naver: {
      development:
        'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=76Nr2e2G6KuBeyuVPqbf&state=STATE_STRING&redirect_uri=https://web-pretravelfrontend-lhe2blhxg4o79.sel4.cloudtype.app/oauth/naver',
      production:
        'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=76Nr2e2G6KuBeyuVPqbf&state=STATE_STRING&redirect_uri=https://web-pretravelfrontend-lhe2blhxg4o79.sel4.cloudtype.app/oauth/naver',
    },
    kakao: {
      development:
        'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=2581cd83651b3e51982587f4cb1652f5&redirect_uri=https://port-0-pretravel-lhe2blhxg4o79.sel4.cloudtype.app/oauth/kakao',
      production:
        'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=2581cd83651b3e51982587f4cb1652f5&redirect_uri=https://port-0-pretravel-lhe2blhxg4o79.sel4.cloudtype.app/oauth/kakao',
    },
    base: {
      development: 'http://localhost:3001',
      production:
        'https://web-pretravelfrontend-lhe2blhxg4o79.sel4.cloudtype.app',
    },
  };
  return uri[where][mode];
};

// 브라우저(로그인 클릭) => 인증 서버 => 브라우저(코드, https://url/oauth/naver)
// =>
