// import React, { useEffect, useRef, useState } from 'react';
// import { useRecoilState } from 'recoil';

// import useKakaoMap from '@src/components/common/Map/useKakaoMap';
// import { categoryAtom } from '@src/recoil/marker/category/atom';
// import useGetReview from '../react-query/useGetReview';
// import useGetLike from '../react-query/useGetLike';
// import { mapAreaInfoAtom } from '@src/recoil/marker/atom';
// import useCurrentMap from './useCurrentMap';

// // const useMarkerOnMap = () => {
// //   const [categoryName, setCategoryName] = useState('');
// //   const likeCurrentMarker = useRef([]);
// //   const reviewCurrentMarker = useRef([]);
// //   const [categoryState, setCategoryState] = useRecoilState(categoryAtom);
// //   const [mapAreaInfoState, setMapAreaInfoState] =
// //     useRecoilState(mapAreaInfoAtom);
// //   const { refetch: refetchLike, data: getLike } = useGetLike(mapAreaInfoState);
// //   const {
// //     refetch: refetchReview,
// //     data: getReview,
// //     isLoading,
// //   } = useGetReview(mapAreaInfoState);
// //   // 스크롤 확대/이동 시 지도에 마커 그리기
// //   function drowOnMap(markerInfo: any) {
// //     // 마커이미지
// //     const imageSize = new window.kakao.maps.Size(35, 35);
// //     const categoryMarkerImage = categoryState.image;
// //     const markerImageArray = Array.isArray(categoryMarkerImage);
// //     const resultMarker = markerImageArray
// //       ? categoryMarkerImage[markerInfo.type - 1]
// //       : categoryMarkerImage;
// //     const markerImage = new window.kakao.maps.MarkerImage(
// //       resultMarker,
// //       imageSize,
// //     );
// //     if (markerInfo.type === 1) {
// //       createMarker(likeCurrentMarker);
// //     }
// //     if (markerInfo.type === 2) {
// //       createMarker(reviewCurrentMarker);
// //     }
// //     if (markerInfo.type === 3) {
// //       createMarker(likeCurrentMarker);
// //       createMarker(reviewCurrentMarker);
// //     }
// //     function createMarker(markerArr: any) {
// //       for (let i = 0; i < markerInfo.data.length; i++) {
// //         markerArr.current.push(
// //           new window.kakao.maps.Marker({
// //             map: map.current, // 마커를 표시할 지도
// //             position: new window.kakao.maps.LatLng(
// //               markerInfo.data[i].latitude,
// //               markerInfo.data[i].longitude,
// //             ), // 마커를 표시할 위치
// //             title: markerInfo.data[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
// //             image: markerImage, // 마커 이미지
// //             clickable: true,
// //           }),
// //         );
// //         markerArr.current[i].setMap(map.current);
// //         //마커 클릭했을때 바텀싯트에 장소 정보 표시
// //         // window.kakao.maps.event.addListener(markerArr.current[i], 'click', function () {
// //         //   console.log('클릭', markerArr.current[i]);
// //         //   setMarkerState(onMapType);
// //         //   setIsOpenState(true);
// //         // });
// //       }
// //     }
// //   }
// //   //남서 북동 좌표 이벤트
// //   const idelEvent = () => {
// //     // 지도 영역정보를 얻어옵니다
// //     const bounds = map.current.getBounds();
// //     // 영역정보의 남서쪽 정보를 얻어옵니다
// //     const swLatlng = bounds.getSouthWest();
// //     // 영역정보의 북동쪽 정보를 얻어옵니다
// //     const neLatlng = bounds.getNorthEast();
// //     //La 경도 Ma 위도
// //     const data = {
// //       memberIdx: '12',
// //       smallLa: swLatlng.Ma,
// //       largeLa: neLatlng.Ma,
// //       smallLo: swLatlng.La,
// //       largeLo: neLatlng.La,
// //     };
// //     console.log(mapAreaInfoState);
// //     setMapAreaInfoState(state => ({ ...state, ...data }));
// //   };
// //   useEffect(() => {
// //     console.log(map.current);
// //     if (map.current) {
// //       setCategoryName(categoryState.title);
// //       if (categoryName !== categoryState.title) {
// //         console.log('이름바뀌다');
// //         removeMarker();
// //         idelEvent();
// //       }
// //       window.kakao.maps.event.addListener(map.current, 'idle', idelEvent);
// //     }
// //     return () => {
// //       if (map.current)
// //         window.kakao.maps.event.removeListener(map.current, 'idle', idelEvent);
// //     };
// //   }, [map.current, categoryState.title]);
// //   useEffect(() => {
// //     if (!mapAreaInfoState.memberIdx) return;
// //     switch (categoryState.type) {
// //       case 1:
// //         refetchLike();
// //         break;
// //       case 2:
// //         refetchReview();
// //         break;
// //       case 3:
// //         refetchReview();
// //         refetchLike();
// //         break;
// //     }
// //   }, [mapAreaInfoState, categoryState.type]);
// //   useEffect(() => {
// //     if (getLike && categoryState.type === 1) {
// //       drowOnMap({ data: getLike.data, type: 1 });
// //     }
// //     if (getReview && categoryState.type === 2) {
// //       drowOnMap({ data: getReview.data, type: 2 });
// //     }
// //     if (getLike && getReview && categoryState.type === 3) {
// //       drowOnMap({
// //         data: getLike.data,
// //         type: 1,
// //       });
// //       drowOnMap({
// //         data: getReview.data,
// //         type: 2,
// //       });
// //     }
// //   }, [getLike, getReview, categoryState.type]);
// //   //마커 삭제
// //   const removeMarker = () => {
// //     console.log('삭제');
// //     likeCurrentMarker.current.forEach((item: any) => {
// //       item.setMap(null);
// //     });
// //     likeCurrentMarker.current = [];
// //     reviewCurrentMarker.current.forEach((item: any) => {
// //       item.setMap(null);
// //     });
// //     reviewCurrentMarker.current = [];
// //   };
// // };

// // export default useMarkerOnMap;
