import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { StoreType } from "@/interface";

interface MarkersProps {
  map: any;
  storeDatas: any[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({
  map,
  storeDatas,
  setCurrentStore,
}: MarkersProps) {
  const loadKakaoMarkers = useCallback(() => {
    // 식당 데이터 마커
    storeDatas?.map((store) => {
      const imageSrc = `/images/markers/${
        store?.bizcnd_code_nm ? store?.bizcnd_code_nm : "default"
      }.png`;
      const imageSize = new window.kakao.maps.Size(40, 40);
      const imageOptions = { offset: new window.kakao.maps.Point(27, 69) };

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOptions
      );

      const markerPosition = new window.kakao.maps.LatLng(
        store?.y_dnts,
        store?.x_cnts
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map);

      // 마커 커서 오버
      const content = `<div class="infowindow">${store?.upso_nm}</div>`;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        customOverlay.setMap(map);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        customOverlay.setMap(null);
      });

      // 선택한 가게 저장
      window.kakao.maps.event.addListener(marker, "click", () => {
        setCurrentStore(store);
      });
    });
  }, [map, setCurrentStore, storeDatas]);

  useEffect(() => {
    if (map) {
      loadKakaoMarkers();
    }
  }, [loadKakaoMarkers, map]);

  return <></>;
}
