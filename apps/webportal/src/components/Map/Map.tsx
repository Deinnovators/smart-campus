'use client';
import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useAppThemeMode } from '@webportal/libs/hooks';

const Map = () => {
  const themeMode = useAppThemeMode();
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainer = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const mapStyle =
    themeMode === 'light'
      ? 'mapbox://styles/afridi563/ck8ut3l0f1ok61in0thektj1u'
      : 'mapbox://styles/afridi563/ck8useswq1nru1jqnhbhdt5tj';

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }: any) => {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiYWZyaWRpNTYzIiwiYSI6ImNrYTBkb3VqODBmYXczbXJ0MXp0czdreHYifQ.5TJnOHd9PW9Hl8HPtzuUpw';
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [88.6431059, 25.6210762],
        zoom: 10,
      });

      map.on('load', () => {
        setMap(map);
        const iconMarker = document.createElement('div');
        iconMarker.className = 'marker';
        iconMarker.innerHTML = `
            ${13}
        `;
        const iconMarker2 = document.createElement('div');
        iconMarker2.className = 'marker';
        iconMarker2.innerHTML = `
            ${19}
        `;
        //   const popupHtml = `<span class='popup-content'>
        //   <h2>${country}</h2>
        //   <ul>
        //     <li><strong>Infected:</strong><span> ${cases}</span></li>
        //     <li><strong>Deaths:</strong><span style='color:red'> ${deaths}</span></li>
        //     <li><strong>Recovered:</strong><span style='color:green'> ${recovered}</span></li>
        //     <li><strong>Active:</strong><span style='color:orange'> ${active}</span></li>
        //   </ul>
        // </span>`;
        const marker = new mapboxgl.Marker({
          element: iconMarker,
          draggable: false,
        });
        marker.setLngLat({ lng: 88.649986, lat: 25.634042 }).addTo(map);

        const marker2 = new mapboxgl.Marker({
          element: iconMarker2,
          draggable: false,
        });

        marker2.setLngLat({ lng: 88.649858, lat: 25.633614 }).addTo(map);
        setLoading(false);
      });
    };
    if (!map) {
      initializeMap({ setMap, mapContainer });
    }

    if (map) {
      if (themeMode === 'light') {
        map.setStyle('mapbox://styles/afridi563/ck8ut3l0f1ok61in0thektj1u');
      } else {
        map.setStyle('mapbox://styles/afridi563/ck8useswq1nru1jqnhbhdt5tj');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, themeMode]);

  return <div ref={el => (mapContainer.current = el)} className={'map'} />;
};

export default Map;
