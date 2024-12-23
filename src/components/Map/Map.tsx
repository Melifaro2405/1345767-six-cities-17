import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map.tsx';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const.ts';
import { Icon, layerGroup, Marker } from 'leaflet';
import { TOffer, TOfferById } from '../../types/offers.ts';
import 'leaflet/dist/leaflet.css';

type TMapProps = {
  offers: TOffer[];
  activeOffer?: TOffer | TOfferById;
  isNearby?: boolean;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

function Map({ offers, activeOffer, isNearby }: TMapProps) {
  const { location: cityLocation } =
    (isNearby && activeOffer?.city) || offers[0].city;

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation, isNearby);

  useEffect(() => {
    if (isNearby && map && activeOffer) {
      const markerLayer = layerGroup().addTo(map);
      const { latitude: lat, longitude: lng } = activeOffer.location;
      const marker = new Marker({ lat, lng });

      marker.setIcon(currentCustomIcon).addTo(markerLayer);
    }
  }, [activeOffer, isNearby, map]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach(({ location, id }) => {
        const { latitude: lat, longitude: lng } = location;

        const marker = new Marker({ lat, lng });

        marker
          .setIcon(
            activeOffer?.id === id ? currentCustomIcon : defaultCustomIcon,
          )
          .addTo(markerLayer);
      });

      if (isNearby && activeOffer?.location) {
        const { latitude: lat, longitude: lng } = activeOffer.location;
        const marker = new Marker({ lat, lng });

        marker.setIcon(currentCustomIcon).addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOffer, isNearby]);

  return <div style={{ height: '100%' }} ref={mapRef} />;
}

export default Map;
