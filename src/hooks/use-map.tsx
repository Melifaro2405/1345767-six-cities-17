import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { TLocation } from '../types/offers.ts';
import { VoyagerMapLayer } from '../const.ts';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  cityLocation: TLocation,
  isNearby?: boolean,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    const { latitude: lat, longitude: lng, zoom } = cityLocation;

    if (map) {
      map.panTo({ lat, lng });
    }

    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: { lat, lng },
        zoom,
        scrollWheelZoom: !isNearby,
      });

      const layer = new TileLayer(VoyagerMapLayer);

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, cityLocation, map, isNearby]);

  return map;
}

export default useMap;
