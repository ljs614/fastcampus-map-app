"use client";

/*global kakao*/
import { locationState, mapState } from "@/atom";
import Script from "next/script";
import { useRecoilValue, useSetRecoilState } from "recoil";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: new window.kakao.maps.LatLng(location.lat, location.lng),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOptions);
      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
