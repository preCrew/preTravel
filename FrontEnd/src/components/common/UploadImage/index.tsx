import { File } from '@src/hooks/react-query/useReviewUpdateQuery';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import tw, { css } from 'twin.macro';
import ImageBox from './ImageBox';

interface UploadImageProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const errorMessages = {
  selectMoreThan10:
    '사진은 최대 10장까지 선택 합니다.\n10장 외에는 선택되지 않습니다.',
  selectDuplicateOrOverSize: '중복된 사진이 있거나 사이즈가 1 MB를 초과합니다.',
  nowMoreThan10: '사진은 최대 10장까지 선택 가능합니다.',
};

const getDuplicateFilesNameSize = (files: { name: string; size: number }[]) =>
  files
    .map(file => {
      const name = file.name;
      const size = file.size / 1024 / 1024;
      let sizeString = '';

      if (size < 0.01) sizeString = size * 1024 + 'KB';
      else sizeString = size.toString().slice(0, 4) + 'MB';

      return `${name} (${sizeString})`;
    })
    .join('\n');

const UploadImage = ({
  files: imgFiles,
  setFiles: setImgFiles,
}: UploadImageProps) => {
  const [imgNum, setImgNum] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      // 종료시 무효화 시키지 않으면 메모리 누수 발생하므로 revoke 시켜줘야함 꼭!
      imgFiles.forEach(e => URL.revokeObjectURL(e?.toString()!));
    };
  });

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const duplicateFiles: { name: string; size: number }[] = [];
    const notDuplicateFiles: File[] = [];

    // 1. 중복된 파일을 걸러냄
    for (let i = 0; i < files.length; i++) {
      const current = {
        url: URL.createObjectURL(files[i]),
        file: files[i],
        key: files[i].name + files[i].size,
      };

      if (
        imgFiles.some(
          img => img.key === current.key || files[i].size >= 1024 * 1024,
        )
      ) {
        duplicateFiles.push({ name: files[i].name, size: files[i].size });
      } else {
        notDuplicateFiles.push(current);
      }
    }

    // 2. 중복되지 않은 파일 + imgFiles.length > 10 라면 배열을 자름
    if (notDuplicateFiles.length + imgFiles.length > 10) {
      alert(errorMessages.selectMoreThan10);
      notDuplicateFiles.splice(-1);
    }

    // 3. 중복되지 않은 파일 + imgFiles.length <= 10 이라면 imgFiles에 추가
    if (notDuplicateFiles.length + imgFiles.length <= 10) {
      setImgFiles(prev => [...prev, ...notDuplicateFiles]);
      setImgNum(prev => prev + notDuplicateFiles.length);
    }

    // 4. 중복 혹은 사이즈 초과된 파일이 있다면 경고창 띄움
    if (duplicateFiles.length > 0) {
      const duplicateFilesNameSize = getDuplicateFilesNameSize(duplicateFiles);
      alert(
        `${errorMessages.selectDuplicateOrOverSize}\n\n${duplicateFilesNameSize}`,
      );
    }
    // 동일요소 선택시 이벤트가 발생되지 않으므로 value를 비워줌
    e.target.value = '';
  };

  const handleClickUploadButton = () => {
    if (!inputRef.current) return;
    if (imgFiles.length >= 10) return alert(errorMessages.nowMoreThan10);

    inputRef.current.click();
  };

  const handleClickCloseButton = (key: string) => {
    setImgFiles(prev => prev.filter(img => img.key !== key));
    setImgNum(prev => prev - 1);
  };

  return (
    <>
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
          selectButton
          imgNum={imgNum}
        />
        {imgFiles.map(img => (
          <ImageBox
            key={img.key}
            onClose={() => handleClickCloseButton(img.key)}
            imgSrc={img.url}
          />
        ))}
      </div>
    </>
  );
};

export default UploadImage;
