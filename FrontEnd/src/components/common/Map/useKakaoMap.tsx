// import { loadKakaoMapScript } from '@src/hooks/useKakaoMapScript';
import { modalAtom } from '@src/recoil/modal/atom';
import { userFavoriteAtom } from '@src/recoil/user/getLike/atom';
import { useEffect, useRef, useState } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useScript from '../../../hooks/useScript';
import IcoFavorite from '@src/assets/svgs/ico-favorite.svg?url';
import IcoReview from '@src/assets/svgs/ico-review.svg?url';
import { userReviewAtom } from '@src/recoil/user/review/atom';
import { markerAtom } from '@src/recoil/marker/atom';
import useGetAreaMarker from '@src/hooks/react-query/useGetAreaMarker';
import axios from 'axios';
declare global {
  interface Window {
    kakao: any;
  }
  interface LatLng {
    lat: number;
    lng: number;
  }
}
interface Marker {
  marker: any;
  id: number;
}

const url = '//dapi.kakao.com/v2/maps/sdk.js';
const libraries = ['services', 'clusterer', 'drawing'];
const apikey = process.env.KAKAOMAP_API_KEY;
const src = `${url}?appkey=${apikey}&libraries=${libraries}&autoload=false`;

const imageSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

function useKakaoMap() {
  // const [markers, setMarkers] = useState<any[]>([]);
  const [prevOverlay, setPrevOverlay] = useState<any[]>();
  const [prevPolygon, setPrevPolygon] = useState<any>();

  const map = useRef<any>(null);
  const markers = useRef<Marker[]>([]);
  let markerArr: any = [];
  const favoritePlace = useRef([]);
  const reviewPlace = useRef([]);
  const userLikeState = useRecoilValue(userFavoriteAtom);
  const setUserFavoriteState = useSetRecoilState(userFavoriteAtom);
  const setUserReivewState = useSetRecoilState(userReviewAtom);
  const setMarkerState = useSetRecoilState(markerAtom);
  const [isOpenState, setIsOpenState] = useRecoilState(modalAtom);
  const { mutate, isLoading } = useGetAreaMarker();
  //테스트용 변수
  let bounds: any;
  let sw;
  let ne;

  const Map = () => {
    const [success, error] = useScript(src);
    useEffect(() => {
      if (!success) return;
      window.kakao.maps.load(() => {
        let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        let options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 7, //지도의 레벨(확대, 축소 정도)
        };

        map.current = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      });
    }, [success, error]);

    return (
      <div
        id="map"
        style={{ width: '100vw', height: '100vh' }}
      />
    );
  };

  const setNowLocation = (LatLng: LatLng) => {
    if (!map.current) return;

    const moveLatLon = new window.kakao.maps.LatLng(LatLng.lat, LatLng.lng);
    map.current.setCenter(moveLatLon);
  };

  //스크롤,확대시 북동,남서 좌표 불러오기
  const mapAreaChange = (type: number) => {
    window.kakao.maps.event.addListener(map.current, 'idle', function () {
      // 지도 영역정보를 얻어옵니다
      bounds = map.current.getBounds();
      // 영역정보의 남서쪽 정보를 얻어옵니다
      sw = bounds.getSouthWest();
      // 영역정보의 북동쪽 정보를 얻어옵니다
      ne = bounds.getNorthEast();

      const formData = new FormData();

      formData.append('memberIdx', '1');
      formData.append('smallLa', sw.La); //좌상단 위도
      formData.append('largeLa', ne.La); //우하단 위도
      formData.append('smallLo', sw.Ma); //좌상단 경도
      formData.append('largeLo', ne.Ma); //우하단 경도

      // for (let value of formData.values()) {
      //   console.log(value);
      // }

      mutate({
        memberIdx: '1',
        smallLa: sw.La,
        largeLa: ne.La,
        smallLo: sw.Ma,
        largeLo: ne.Ma,
      });

      // if (favoritePlace.current.length && type === 0) {
      //   return alert('이미 불러왔어요');
      // }
      // if (reviewPlace.current.length && type === 1) {
      //   return alert('이미 불러왔어요');
      // }
      // 마커이미지
      const imageSize = new window.kakao.maps.Size(35, 35);
      const favoriteImage = new window.kakao.maps.MarkerImage(
        IcoFavorite,
        imageSize,
      );
      const reveiwImage = new window.kakao.maps.MarkerImage(
        IcoReview,
        imageSize,
      );
      //초기화
      markerArr = [];

      for (let i = 0; i < userLikeState.length; i++) {
        markerArr.push(
          new window.kakao.maps.Marker({
            map: map.current, // 마커를 표시할 지도
            position: new window.kakao.maps.LatLng(
              userLikeState[i].latitude,
              userLikeState[i].longitude,
            ), // 마커를 표시할 위치
            title: userLikeState[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: type ? reveiwImage : favoriteImage, // 마커 이미지
            clickable: true,
          }),
        );
        markerArr[i].setMap(map.current);

        if (type === 0) favoritePlace.current = markerArr;
        if (type === 1) reviewPlace.current = markerArr;

        //마커 클릭했을때 바텀싯트에 장소 정보 표시
        window.kakao.maps.event.addListener(markerArr[i], 'click', function () {
          console.log('클릭', markerArr[i]);

          setMarkerState(type);
          setIsOpenState(true);
        });
      }
    });
  };

  const addUserSavedMarker = (type: number) => {
    // if (favoritePlace.current.length && type === 0) {
    //   return alert('이미 불러왔어요');
    // }
    // if (reviewPlace.current.length && type === 1) {
    //   return alert('이미 불러왔어요');
    // }
    // //스크롤 or 확대 함수
    // mapAreaChange();
    // //초기화
    // markerArr = [];
    // for (let i = 0; i < userLikeState.length; i++) {
    //   markerArr.push(
    //     new window.kakao.maps.Marker({
    //       map: map.current, // 마커를 표시할 지도
    //       position: new window.kakao.maps.LatLng(
    //         userLikeState[i].latitude,
    //         userLikeState[i].longitude,
    //       ), // 마커를 표시할 위치
    //       title: userLikeState[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //       image: type ? reveiwImage : favoriteImage, // 마커 이미지
    //       clickable: true,
    //     }),
    //   );
    //   markerArr[i].setMap(map.current);
    //   if (type === 0) favoritePlace.current = markerArr;
    //   if (type === 1) reviewPlace.current = markerArr;
    //   //마커 클릭했을때 바텀싯트에 장소 정보 표시
    //   window.kakao.maps.event.addListener(markerArr[i], 'click', function () {
    //     console.log('클릭', markerArr[i]);
    //     setMarkerState(type);
    // //     if (type === 0) {
    // //       setUserFavoriteState({
    // //         id: data[i].memberIdx,
    // //         title: data[i].name,
    // //         address: data[i].address,
    // //         positions: {
    // //           latitude: data[i].latitude,
    // //           longitude: data[i].longitude,
    // //         },
    // //       });
    // //     }
    // //     if (type === 1) {
    // //       setUserReivewState({
    // //         id: data[i].memberIdx,
    // //         title: data[i].name,
    // //         address: data[i].address,
    // //         image: data[i].image,
    // //         positions: {
    // //           latitude: data[i].latitude,
    // //           longitude: data[i].longitude,
    // //         },
    // //       });
    // //     }
    //      setIsOpenState(true);
    //   });
    // }
  };

  const removeMarker = (type: number) => {
    console.log('삭제');
    // 0 찜한장소, 1 리뷰장소
    console.log(favoritePlace, reviewPlace);
    if (0 === type) {
      favoritePlace.current.forEach((item: any) => {
        item.setMap(null);
      });
      favoritePlace.current = [];
      return;
    }
    if (1 === type) {
      reviewPlace.current.forEach((item: any) => {
        item.setMap(null);
      });
      reviewPlace.current = [];
      return;
    }
    // markers.current.forEach((marker, index) => {
    //   if (marker.id === id) {
    //     marker.marker.setMap(null);
    //     markers.current.splice(index, 1);
    //   }
    // });
  };

  const drawOverlayOnMap = (overlayArr: any) => {
    //오버레이된 곳의 중앙을 불러와야 할것 같은데...
    if (!map.current) {
      return alert('지도 로딩중...');
    }

    const allLatitude =
      overlayArr.reduce((acc: number, curr: any) => {
        return acc + curr.la;
      }, 0) / overlayArr.length;
    const allLongitude =
      overlayArr.reduce((acc: number, curr: any) => {
        return acc + curr.lo;
      }, 0) / overlayArr.length;

    setNowLocation({ lat: allLatitude, lng: allLongitude });

    //오버레이칸텐트
    const content = (i: number) => `
    <div class="marker-box bg-primary3 rounded-full flex justify-center items-center w-25 h-25 text-white text-body1Bold">
      <span>${i}</span>
    </div>`;

    const customOverlaySetArr: any[] = [];
    const polygonPath: any[] = [];
    const prevPolygonTemporary = [];

    //const position = new window.kakao.maps.LatLng(la, lo);
    const customOverlay = (lat: number, lng: number, order: number) => {
      return new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(lat, lng),
        content: content(order),
      });
    };

    for (let i = 0; i < overlayArr.length; i++) {
      customOverlaySetArr.push(
        customOverlay(overlayArr[i].la, overlayArr[i].lo, overlayArr[i].order),
      );
      polygonPath.push(
        new window.kakao.maps.LatLng(overlayArr[i].la, overlayArr[i].lo),
      );
      //오버레이 그리기
      customOverlaySetArr[i].setMap(map.current);
    }

    // 이전 오버레이&선 삭제
    if (prevOverlay && prevPolygon) {
      prevOverlay.forEach(val => {
        val.setMap(null);
      });
      prevPolygon[0].setMap(null);
    }

    setPrevOverlay(customOverlaySetArr);

    const polygon = new window.kakao.maps.Polygon({
      path: polygonPath, // 그려질 다각형의 좌표 배열입니다
      strokeWeight: 2, // 선의 두께입니다
      strokeColor: '#000', // 선의 색깔입니다
      strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일입니다
      fillColor: '#A2FF99', // 채우기 색깔입니다
      fillOpacity: 0, // 채우기 불투명도 입니다
    });
    prevPolygonTemporary.push(polygon);
    setPrevPolygon(prevPolygonTemporary);
    //선그리기
    prevPolygonTemporary[0].setMap(map.current);
  };

  const currentLocation = () => {
    if (!('geolocation' in navigator)) {
      return console.log('위치정보가 없습니다.');
    }

    const onSucces = (position: any) => {
      console.log(position.coords);
      const content = `<div class='absolute h-20 w-20 before:relative before:ml-[-100%] before:mt-[-100%] before:box-border before:block before:h-[300%] before:w-[300%] before:animate-pulse-ring before:rounded-[45px] before:content-[""] after:shadow-[0_0_8px_rgba(0,0,0,.3)] after:absolute after:left-0 after:top-0 after:block after:h-full after:w-full after:animate-pulse-dot after:rounded-[15px] after:bg-primary1 after:content-[""] before:bg-primary1'></div>`;
      //현재위치 마커 표시
      const markerPosition = new window.kakao.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude,
      );
      const marker = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
      });

      marker.setMap(map.current);

      //현재 위시 이동
      setNowLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const onError = (err: any) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(onSucces, onError);
  };

  return {
    Map,
    setNowLocation,
    addUserSavedMarker,
    removeMarker,
    drawOverlayOnMap,
    currentLocation,
    mapAreaChange,
  };
}

export default useKakaoMap;
