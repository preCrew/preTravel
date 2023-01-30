// import { loadKakaoMapScript } from '@src/hooks/useKakaoMapScript';
import { useEffect, useRef, useState } from 'react';
import { icons } from 'react-icons/lib';
import useScript from '../../../hooks/useScript';

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

  const addMarker = (LatLng: LatLng, title: string, id: number) => {
    console.log(LatLng, title);
    const imageSize = new window.kakao.maps.Size(24, 35);
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    const latlng = new window.kakao.maps.LatLng(LatLng.lat, LatLng.lng);
    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      map: map.current, // 마커를 표시할 지도
      position: latlng, // 마커를 표시할 위치
      title: title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage, // 마커 이미지
    });

    // 마커에 마우스오버 이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, 'mouseover', function () {});

    // 마커에 마우스아웃 이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, 'mouseout', function () {});

    // 마우스 클릭 이벤트
    window.kakao.maps.event.addListener(marker, 'click', function () {});

    markers.current.push({ marker, id });
    console.log(markers.current);
  };

  const removeMarker = (id: number) => {
    markers.current.forEach((marker, index) => {
      if (marker.id === id) {
        marker.marker.setMap(null);
        markers.current.splice(index, 1);
      }
    });
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

  return { Map, setNowLocation, addMarker, removeMarker, drawOverlayOnMap };
}

export default useKakaoMap;
