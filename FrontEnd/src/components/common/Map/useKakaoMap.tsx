// import { loadKakaoMapScript } from '@src/hooks/useKakaoMapScript';
import { modalAtom } from '@src/recoil/modal/atom';
import { userFavoriteAtom } from '@src/recoil/user/getLike/atom';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useScript from '../../../hooks/map/useScript';
import IcoFavorite from '@src/assets/svgs/ico-favorite.svg?url';
import IcoReview from '@src/assets/svgs/ico-review.svg?url';
import { userReviewAtom } from '@src/recoil/user/review/atom';
import { mapAreaInfoAtom, markerAtom } from '@src/recoil/marker/atom';
import useGetAreaMarker from '@src/hooks/react-query/useGetMapMarker';
import axios from 'axios';
import { categoryAtom } from '@src/recoil/marker/category/atom';
import useGetMapLike from '@src/hooks/react-query/useGetMapLike';
import useGetMapReview from '@src/hooks/react-query/useGetMapReview';
import { mapAtom } from '@src/recoil/map/atom';
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

function useKakaoMap() {
  // const [markers, setMarkers] = useState<any[]>([]);
  const [prevOverlay, setPrevOverlay] = useState<any[]>();
  const [prevPolygon, setPrevPolygon] = useState<any>();
  const [categoryName, setCategoryName] = useState('');
  const [currentMapState, setCurrentMapState] = useRecoilState(mapAtom);

  const map = useRef<any>(null);
  const mapCopy = useRef();
  const likeCurrentMarker = useRef([]);
  const reviewCurrentMarker = useRef([]);

  const [check, setCheck] = useState(false);
  const [categoryState, setCategoryState] = useRecoilState(categoryAtom);
  const [isOpenState, setIsOpenState] = useRecoilState(modalAtom);
  const [mapAreaInfoState, setMapAreaInfoState] =
    useRecoilState(mapAreaInfoAtom);
  // const { refetch: refetchLike, data: getLike } =
  //   useGetMapLike(mapAreaInfoState);
  const {
    refetch: refetchReview,
    data: getReview,
    isLoading,
  } = useGetMapReview(mapAreaInfoState);

  //map 불러오기
  const [success, error] = useScript(src);

  const Map = () => {
    return (
      <div
        id="map"
        style={{ width: '100vw', height: '100vh' }}
      />
    );
  };
  useEffect(() => {
    if (!success) return;
    console.log(success);
    window.kakao.maps.load(() => {
      let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      let options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 7, //지도의 레벨(확대, 축소 정도)
      };
      map.current = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    });
  }, [success, error]);

  useEffect(() => {
    console.log(map.current);
    mapCopy.current = map.current;
  }, [map.current]);

  //map 위치 이동
  const setNowLocation = (LatLng: LatLng) => {
    if (!map.current) return;
    const moveLatLon = new window.kakao.maps.LatLng(LatLng.lat, LatLng.lng);
    map.current.setCenter(moveLatLon);
  };

  // 스크롤 확대/이동 시 지도에 마커 그리기
  function drowOnMap(markerInfo: any) {
    // 마커이미지
    const imageSize = new window.kakao.maps.Size(35, 35);
    const categoryMarkerImage = categoryState.image;
    const markerImageArray = Array.isArray(categoryMarkerImage);

    const resultMarker = markerImageArray
      ? categoryMarkerImage[markerInfo.type - 1]
      : categoryMarkerImage;

    const markerImage = new window.kakao.maps.MarkerImage(
      resultMarker,
      imageSize,
    );

    if (markerInfo.type === 1) {
      createMarker(likeCurrentMarker);
    }
    if (markerInfo.type === 2) {
      createMarker(reviewCurrentMarker);
    }
    if (markerInfo.type === 3) {
      createMarker(likeCurrentMarker);
      createMarker(reviewCurrentMarker);
    }

    function createMarker(markerArr: any) {
      console.log(markerArr);
      for (let i = 0; i < markerInfo.data.length; i++) {
        markerArr.current.push(
          new window.kakao.maps.Marker({
            map: map.current, // 마커를 표시할 지도
            position: new window.kakao.maps.LatLng(
              markerInfo.data[i].latitude,
              markerInfo.data[i].longitude,
            ), // 마커를 표시할 위치
            title: markerInfo.data[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
            clickable: true,
          }),
        );
        window.kakao.maps.event.addListener(
          markerArr.current[i],
          'click',
          function () {
            console.log('클릭');
          },
        );
        markerArr.current[i].setMap(map.current);
        //마커 클릭했을때 바텀싯트에 장소 정보 표시
      }
    }
  }
  const test = () => {
    console.log('클릭');

    //setMarkerState(onMapType);
    //setIsOpenState(true);
  };

  //남서 북동 좌표 이벤트
  const idelEvent = () => {
    // 지도 영역정보를 얻어옵니다
    const bounds = map.current.getBounds();

    // 영역정보의 남서쪽 정보를 얻어옵니다
    const swLatlng = bounds.getSouthWest();

    // 영역정보의 북동쪽 정보를 얻어옵니다
    const neLatlng = bounds.getNorthEast();

    //La 경도 Ma 위도
    const data = {
      memberIdx: '12',
      smallLa: swLatlng.Ma,
      largeLa: neLatlng.Ma,
      smallLo: swLatlng.La,
      largeLo: neLatlng.La,
    };
    console.log(mapAreaInfoState);
    setMapAreaInfoState((state: any) => ({ ...state, ...data }));
  };

  // useEffect(() => {
  //   if (map.current) {
  //     setCategoryName(categoryState.title);
  //     if (categoryName !== categoryState.title) {
  //       console.log('이름바뀌다');
  //       removeMarker();
  //       idelEvent();
  //     }
  //     window.kakao.maps.event.addListener(map.current, 'idle', idelEvent);
  //   }

  //   return () => {
  //     if (map.current)
  //       window.kakao.maps.event.removeListener(map.current, 'idle', idelEvent);
  //   };
  // }, [map.current, categoryState.title]);

  // useEffect(() => {
  //   if (!mapAreaInfoState.memberIdx) return;

  //   switch (categoryState.type) {
  //     case 1:
  //       refetchLike();
  //       break;
  //     case 2:
  //       refetchReview();
  //       break;
  //     case 3:
  //       refetchReview();
  //       refetchLike();
  //       break;
  //   }
  // }, [mapAreaInfoState, categoryState.type]);

  // useEffect(() => {
  //   if (getLike && categoryState.type === 1) {
  //     drowOnMap({ data: getLike.data, type: 1 });
  //   }
  //   if (getReview && categoryState.type === 2) {
  //     drowOnMap({ data: getReview.data, type: 2 });
  //   }
  //   if (getLike && getReview && categoryState.type === 3) {
  //     drowOnMap({
  //       data: getLike.data,
  //       type: 1,
  //     });
  //     drowOnMap({
  //       data: getReview.data,
  //       type: 2,
  //     });
  //   }
  // }, [getLike, getReview, categoryState.type]);

  const removeMarker = () => {
    console.log('삭제');

    likeCurrentMarker.current.forEach((item: any) => {
      item.setMap(null);
    });
    likeCurrentMarker.current = [];

    reviewCurrentMarker.current.forEach((item: any) => {
      item.setMap(null);
    });
    reviewCurrentMarker.current = [];
  };

  // 지도에 다각형(순서) 그리기
  const drawOverlayOnMap = (overlayArr: any) => {
    //오버레이된 곳의 중앙을 불러와야 할것 같은데...
    // if (!map.current) {
    //   return alert('지도 로딩중...');
    // }

    const allLatitude =
      overlayArr.reduce((acc: number, curr: any) => {
        return acc + curr.la * 1;
      }, 0) / overlayArr.length;
    const allLongitude =
      overlayArr.reduce((acc: number, curr: any) => {
        return acc + curr.lo * 1;
      }, 0) / overlayArr.length;

    console.log(allLatitude, allLongitude);
    //setNowLocation({ lat: allLatitude, lng: allLongitude });
    setNowLocation({
      lat: allLatitude,
      lng: allLongitude,
    });

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
    console.log(customOverlaySetArr);
    // setPrevOverlay(customOverlaySetArr);

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
    // setPrevPolygon(prevPolygonTemporary);
    //선그리기
    prevPolygonTemporary[0].setMap(map.current);
  };

  // 현재 위치 불러오기
  // const getCurrentLocation = useCallback(() => {
  //   if (!('geolocation' in navigator)) {
  //     return console.log('위치정보가 없습니다.');
  //   }
  //   const onSucces = (position: any) => {
  //     //console.log(position.coords);
  //     const content = `<div class='absolute h-20 w-20 before:relative before:ml-[-100%] before:mt-[-100%] before:box-border before:block before:h-[300%] before:w-[300%] before:animate-pulse-ring before:rounded-[45px] before:content-[""] after:shadow-[0_0_8px_rgba(0,0,0,.3)] after:absolute after:left-0 after:top-0 after:block after:h-full after:w-full after:animate-pulse-dot after:rounded-[15px] after:bg-primary1 after:content-[""] before:bg-primary1'></div>`;
  //     //현재위치 마커 표시
  //     const markerPosition = new window.kakao.maps.LatLng(
  //       position.coords.latitude,
  //       position.coords.longitude,
  //     );
  //     const marker = new window.kakao.maps.CustomOverlay({
  //       position: markerPosition,
  //       content: content,
  //     });

  //     marker.setMap(map.current);
  //     //현재 위시 이동
  //     setNowLocation({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     });
  //   };
  //   const onError = (err: any) => {
  //     console.warn(`ERROR(${err.code}): ${err.message}`);
  //   };
  //   navigator.geolocation.getCurrentPosition(onSucces, onError);
  // }, [map.current]);

  return {
    Map,
    setNowLocation,
    removeMarker,
    drawOverlayOnMap,
    // getCurrentLocation,
  };
}

export default useKakaoMap;
