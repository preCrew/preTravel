const getServerUri = () => {
  const mode = process.env.NODE_ENV as 'development' | 'production';
  if (mode === 'development') {
    return 'http://localhost:3001';
  } else {
    return 'https://port-0-pretravel-ll32glc6adwo3.gksl2.cloudtype.app';
  }
};

export default getServerUri;
