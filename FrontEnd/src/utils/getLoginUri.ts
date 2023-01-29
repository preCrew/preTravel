export const getLoginUri = (where: 'naver' | 'kakao') => {
  const mode = process.env.NODE_ENV as 'development' | 'production';
  const uri = {
    naver: {
      development:
        'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=76Nr2e2G6KuBeyuVPqbf&state=STATE_STRING&redirect_uri=http://localhost:8080/oauth/naver',
      production:
        'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=76Nr2e2G6KuBeyuVPqbf&state=STATE_STRING&redirect_uri=https://web-fronttest-ll32glc6adwo3.gksl2.cloudtype.app/oauth/naver',
    },
    kakao: {
      development:
        'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=b419b28c930a90dc96e0fd983b9025ef&redirect_uri=http://localhost:8080/oauth/kakao',
      production:
        'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=b419b28c930a90dc96e0fd983b9025ef&redirect_uri=https://web-fronttest-ll32glc6adwo3.gksl2.cloudtype.app/oauth/kakao',
    },
  };
  return uri[where][mode];
};
