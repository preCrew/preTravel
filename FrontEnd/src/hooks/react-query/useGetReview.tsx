import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Response } from './responseInterfaces';

// ### Request - GET - QueryParameter

// | Key | 타입 | 설명 |
// | --- | --- | --- |
// | idx | String | 회원 idx |

// ### Response

// | Key | 타입 | 설명 |
// | --- | --- | --- |
// | code | String | 결과 코드 |
// | msg | String | 찜한장소 조회 |
// | data | Object |  |

// **data**

// | Key | 타입 | 설명 |
// | --- | --- | --- |
// | idx | String | 리뷰 idx |
// | memberIdx | String | 회원 idx |
// | name | String | 장소명 |
// | address | String | 주소 (’시’ 까지 나옴) |
// | star | String | 별점 |
// | latitude | String | 위도 |
// | longitude | String | 경도 |
// | revisit | String | 재방문의사 Y/N |
// | contents | String | 내용 |
// | createDate | String | 생성일 |
// | file | Array | 등록 사진 |
// - **file**

// | Key | 타입 | 설명 |
// | --- | --- | --- |
// | idx | String | 리뷰 idx |
// | boardName | String | 회원 idx |
// | boardIdx | String | 장소명 |
// | fileDir | String | 주소 (’시’ 까지 나옴) |
// | fileName | String | 별점 |

// ### RESPONSE 예시

// ```json
// {
//     "code": 200,
//     "msg": "리뷰 상세 조회",
//     "data": {
//         "idx": 31,
//         "memberIdx": "15",
//         "name": null,
//         "address": "시흥시",
//         "star": 3,
//         "latitude": 123.1233232,
//         "longitude": 32.32323232,
//         "revisit": "Y",
//         "contents": "에구구 집에가고싶다",
//         "createDate": "2023-04-16 13:55:29",
//         "file": [
//             {
//                 "idx": 11,
//                 "boardName": "review",
//                 "boardIdx": 31,
//                 "fileDir": "http://localhost:8080/file/img/review/11_test2.png",
//                 "fileName": "11_test2.png"
//             },
//             {
//                 "idx": 12,
//                 "boardName": "review",
//                 "boardIdx": 31,
//                 "fileDir": "http://localhost:8080/file/img/review/12_test2.png",
//                 "fileName": "12_test2.png"
//             },
//             {
//                 "idx": 13,
//                 "boardName": "review",
//                 "boardIdx": 31,
//                 "fileDir": "http://localhost:8080/file/img/review/13_test2.png",
//                 "fileName": "13_test2.png"
//             }
//         ]
//     }
// }
// ```
interface Review {
  idx: string;
  memberIdx: string;
  name: string;
  address: string;
  star: string;
  latitude: string;
  longitude: string;
  revisit: string;
  contents: string;
  createDate: string;
  file: {
    idx: string;
    boardName: string;
    boardIdx: string;
    fileDir: string;
    fileName: string;
  }[];
}
const reviewFetch = async (idx: string) => {
  try {
    const response = await axios.get<Response<Review>>(
      `${process.env.REAL_SERVER_URL}/review/detail?idx=${idx}`,
    );
    if (response.data.code !== 200) {
      throw new Error('리뷰 상세 조회 실패');
    }

    const createDate = response.data.data.createDate
      .split(' ')[0]
      .replaceAll('-', '.');
    const file = response.data.data.file.map(item => item.fileDir);
    const newData = {
      ...response.data.data,
      createDate,
      file,
      originFile: response.data.data.file,
    };
    return newData;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

const useGetReveiw = (idx: string) =>
  useQuery(['review', idx], () => reviewFetch(idx), {
    onError: err => console.log(err),
  });

export default useGetReveiw;
