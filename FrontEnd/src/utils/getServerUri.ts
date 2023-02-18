const getServerUri = () => {
  const mode = process.env.NODE_ENV as 'development' | 'production';
  if (mode === 'development') {
    return process.env.DEVELOPMENT_SERVER_URL;
  } else {
    return process.env.PORDUCTION_SERVER_URL;
  }
};

export default getServerUri;
