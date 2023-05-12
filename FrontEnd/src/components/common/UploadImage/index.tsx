import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import tw, { css } from 'twin.macro';

import ImageBox from './ImageBox';
import useUploadImages, { File } from '@src/hooks/react-query/useAddImages';
import useModal from '@src/hooks/useModal';
import LoadingModal from '@src/components/Modal/LoadingModal';
import useDeleteImage from '@src/hooks/react-query/useDeleteImage';

interface UploadImageProps {
  imgFiles: File[];
  setImgFiles: Dispatch<SetStateAction<File[]>>;
  imgNum: number;
  setImgNum: Dispatch<SetStateAction<number>>;
}

const errorMessages = {
  selectMoreThan10:
    '사진은 최대 10장까지 선택 합니다.\n10장 외에는 선택되지 않습니다.',
  selectDuplicateOrOverSize: '사이즈가 1 MB가 초과하는 사진은 제외됩니다.',
  nowMoreThan10: '사진은 최대 10장까지 선택 가능합니다.',
};

const UploadImage = ({
  imgFiles,
  setImgFiles,
  imgNum,
  setImgNum,
}: UploadImageProps) => {
  // const [imgNum, setImgNum] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { Modal, showModal } = useModal('loadingModal');

  const onSucessAddImages = (data: File[]) => {
    setImgFiles(prev => [...prev, ...data]);
  };

  const { mutate, isLoading: uploadingImages } =
    useUploadImages(onSucessAddImages);

  const { mutate: mutateDeleteImage } = useDeleteImage();

  useEffect(() => {
    return () => {
      // 종료시 무효화 시키지 않으면 메모리 누수 발생하므로 revoke 시켜줘야함 꼭!
      imgFiles.forEach(e => URL.revokeObjectURL(e?.toString()!));
    };
  });

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFiles = e.target.files;
    if (!targetFiles) return;

    const inputFiles = Array.from(targetFiles);
    const filesLen = imgFiles.length; // 3개
    const inputFilesLen = inputFiles.length; // 9개

    if (filesLen + inputFilesLen > 10) {
      const diff = filesLen + inputFilesLen - 10;
      inputFiles.splice(inputFilesLen - diff, diff);
      alert(errorMessages.selectMoreThan10);
    }

    mutate({ boardName: 'review', files: inputFiles });
    setImgNum(prev => prev + inputFiles.length);
    showModal();

    e.target.value = '';
  };

  const handleClickUploadButton = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleClickCloseButton = (idx: string) => {
    setImgFiles(prev => prev.filter(i => i.idx !== idx));
    setImgNum(prev => prev - 1);
    mutateDeleteImage(idx);
  };

  return (
    <>
      {uploadingImages && (
        <Modal noClose>
          <LoadingModal text="사진을 등록 중입니다..." />
        </Modal>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleUploadImage}
        onError={e => console.log(e)}
        css={tw`hidden`}
        multiple
      />
      <div
        css={[
          tw`grid gap-3 overflow-x-auto select-none`,
          css`
            grid-template-columns: repeat(${imgNum + 1}, 100px);
          `,
        ]}
      >
        <ImageBox
          onClick={handleClickUploadButton}
          imgNum={imgNum}
          type={'add'}
        />
        {imgFiles.map(img => (
          <ImageBox
            key={img.idx}
            onClose={() => handleClickCloseButton(img.idx)}
            imgSrc={img.url}
            type="image"
          />
        ))}
      </div>
    </>
  );
};

export default UploadImage;
