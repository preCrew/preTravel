const useRedirect = () => {
  // const { url } = location.state as { url: string };
  const redirect = (url: string) => {
    if (url) window.location.href = url;
    return null;
  };
  return { redirect };
};

export default useRedirect;
