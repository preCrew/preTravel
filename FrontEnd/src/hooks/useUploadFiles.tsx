import { useState } from 'react';

const useUploadFiles = () => {
  const [files, setFiles] = useState<{ url: string; key: string }[]>([]);
  return { files, setFiles };
};

export default useUploadFiles;
