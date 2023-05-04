import { useState } from 'react';

const useUploadFiles = () => {
  const [files, setFiles] = useState<string[]>([]);
  return { files, setFiles };
};

export default useUploadFiles;
