import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, useState } from "react";

const Map = ({
  setPosition,
  position,
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  console.log(position);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = (options) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

export default function DisplayMap({ position, setPosition }) {
  const getPosition = (e) => {
    setPosition(e.latLng.toJSON());
  };

  return (
    <div style={{ display: "flex", height: "100%", width: "100vw" }}>
      <Wrapper apiKey={"AIzaSyDKgAqzYBRqqU7u9I3eqqHG9bZoKbbsZ-A"}>
        <Map
          position={position}
          center={position}
          onClick={getPosition}
          zoom={11}
          style={{ flexGrow: "1", height: "100%" }}
        >
          <Marker position={{ lat: position.lat, lng: position.lng }} />
        </Map>
      </Wrapper>
    </div>
  );
}
