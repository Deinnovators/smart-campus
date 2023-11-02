'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import { Trip } from 'database';
import { io } from 'socket.io-client';
import { TransportsEvents } from 'api-service';

const markers = new Map<number, Marker>();

const createMarker = (id: string) => {
  const iconMarker = document.createElement('div');
  iconMarker.className = 'marker';
  iconMarker.innerHTML = `
            ${id}
        `;
  const marker = new mapboxgl.Marker({
    element: iconMarker,
    draggable: false,
  });
  marker.setDraggable(false);
  return marker;
};

const Mapbox = ({ trips }: { trips: Trip[] }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const mapContainer = useRef<any>(null);

  useEffect(() => {
    const initializeMap = () => {
      mapboxgl.accessToken = process.env['NEXT_PUBLIC_MAP_KEY'] ?? '';
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/afridi563/ck8useswq1nru1jqnhbhdt5tj',
        center: [88.6431059, 25.6210762],
        zoom: 10,
      });

      map.on('load', () => {
        setMap(map);
        trips.forEach(tr => {
          const marker = createMarker(tr.schedule.transport.busNumber);
          marker
            .setLngLat({ lat: tr.currentLat!, lng: tr.currentLng! })
            .addTo(map);
          markers.set(tr.id, marker);
        });
      });
    };
    initializeMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTrip = useCallback(
    (tr: Trip) => {
      if (!map) return;
      const checkMarker = markers.get(tr.id);
      if (checkMarker) {
        return checkMarker.setLngLat({
          lat: tr.currentLat!,
          lng: tr.currentLng!,
        });
      }
      const marker = createMarker(tr.schedule.transport.busNumber);
      marker.setLngLat({ lat: tr.currentLat!, lng: tr.currentLng! }).addTo(map);
      markers.set(tr.id, marker);
    },
    [map],
  );

  const updateTrip = useCallback(
    (tr: Trip) => {
      if (!map) return;
      const checkMarker = markers.get(tr.id);
      if (checkMarker) {
        return checkMarker.setLngLat({
          lat: tr.currentLat!,
          lng: tr.currentLng!,
        });
      }
      const marker = createMarker(tr.schedule.transport.busNumber);
      marker.setLngLat({ lat: tr.currentLat!, lng: tr.currentLng! }).addTo(map);
      markers.set(tr.id, marker);
    },
    [map],
  );

  useEffect(() => {
    const socket = io(process.env['NEXT_PUBLIC_SOCKET_URL'] ?? '', {
      transports: ['websocket'],
    });
    socket.on(TransportsEvents.start, startTrip);

    socket.on(TransportsEvents.update, updateTrip);

    socket.on(TransportsEvents.finish, (tr: Trip) => {
      const checkMarker = markers.get(tr.id);
      if (checkMarker) {
        checkMarker.remove();
        markers.delete(tr.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={el => (mapContainer.current = el)} className={'map'} />;
};

export default Mapbox;
