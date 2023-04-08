import { useState } from 'react';
import { File } from './react-query/useUpdateReviewQuery';

const useUploadFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  return { files, setFiles };
};

export default useUploadFiles;
