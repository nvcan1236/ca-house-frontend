import { useEffect, useMemo, useState } from "react";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { MapPinIcon } from "lucide-react";
import MotelMarker from "./MotelMarker";
import { IMotel } from "@/utils/interfaces";
const Map = ({ motels }: { motels: IMotel[] }) => {
  const [current, setCurrent] = useState({
    latitude: 0,
    longitude: 0,
  });


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewState({
        ...viewState,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
      setCurrent({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });
  }, []);

  const MAP_TOKEN =
    "pk.eyJ1IjoibnZjYW4xMjM2IiwiYSI6ImNtMDVlNXc0cjBrNzUycXF4cHNlb3BoMjEifQ.KYmYtAQpsmkeZClpeujuNA";

  const [viewState, setViewState] = useState({
    longitude: current.longitude,
    latitude: current.latitude,
    zoom: 15,
  });

  const motelMarkers = useMemo(
    () =>
      motels?.map((motel, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={motel.longitude}
          latitude={motel.latitude}
          anchor="bottom"
        >
          <MotelMarker motel={motel}></MotelMarker>
        </Marker>
      )),
    [JSON.stringify(motels)]
  );

  // const motels = useMemo(
  //   () => (
  //     <>
  //       <Marker longitude={106.71} latitude={10.699}>
  //         <MotelMarker></MotelMarker>
  //       </Marker>
  //       <Marker longitude={106.72} latitude={10.7}>
  //         <MotelMarker></MotelMarker>
  //       </Marker>
  //       <Marker longitude={106.73} latitude={10.68}>
  //         <MotelMarker></MotelMarker>
  //       </Marker>
  //     </>
  //   ),
  //   [JSON.stringify(current)]
  // );

  return (
    <div className="w-full h-full relative">
      <div className="absolute bottom-0 p-3 bg-background z-30">
        Lon: ${viewState.longitude} - Lat: {viewState.latitude} - Radius: {viewState.zoom}
      </div>
      <ReactMapGL
        mapStyle={"mapbox://styles/nvcan1236/cm05einzd00hf01qs8oa59aji"}
        mapboxAccessToken={MAP_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
        onDblClick={console.log}
        {...viewState}
      >
        {/* <GeocoderControl mapboxAccessToken={MAP_TOKEN} position="top-left" /> */}
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl/>
        {motelMarkers}
        <Marker longitude={current.longitude} latitude={current.latitude}>
          <MapPinIcon size={32} fill="#ea4e2c" strokeWidth={1} />
        </Marker>
        <Marker longitude={viewState.longitude} latitude={viewState.latitude}>
          <MapPinIcon size={32} fill="#ea4e2c" strokeWidth={1} />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;

// import { useState, useMemo } from "react";
// import MapBox, {
//   Marker,
//   Popup,
//   NavigationControl,
//   FullscreenControl,
//   ScaleControl,
//   GeolocateControl,
// } from "react-map-gl";

// import { PinIcon } from "lucide-react";

// function Pin() {
//   return <PinIcon className="cursor-pointer fill-[#d00] stroke-none"></PinIcon>;
// }

// const CITIES = [
//   {
//     city: "New York",
//     population: "8,175,133",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",
//     state: "New York",
//     latitude: 40.6643,
//     longitude: -73.9385,
//   },
//   {
//     city: "Los Angeles",
//     population: "3,792,621",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg",
//     state: "California",
//     latitude: 34.0194,
//     longitude: -118.4108,
//   },
//   {
//     city: "Chicago",
//     population: "2,695,598",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2008-06-10_3000x1000_chicago_skyline.jpg/240px-2008-06-10_3000x1000_chicago_skyline.jpg",
//     state: "Illinois",
//     latitude: 41.8376,
//     longitude: -87.6818,
//   },
//   {
//     city: "Houston",
//     population: "2,100,263",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg/240px-Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg",
//     state: "Texas",
//     latitude: 29.7805,
//     longitude: -95.3863,
//   },
//   {
//     city: "Phoenix",
//     population: "1,445,632",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Downtown_Phoenix_Aerial_Looking_Northeast.jpg/207px-Downtown_Phoenix_Aerial_Looking_Northeast.jpg",
//     state: "Arizona",
//     latitude: 33.5722,
//     longitude: -112.088,
//   },
//   {
//     city: "Philadelphia",
//     population: "1,526,006",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Philly_skyline.jpg/240px-Philly_skyline.jpg",
//     state: "Pennsylvania",
//     latitude: 40.0094,
//     longitude: -75.1333,
//   },
//   {
//     city: "San Antonio",
//     population: "1,327,407",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Downtown_San_Antonio_View.JPG/240px-Downtown_San_Antonio_View.JPG",
//     state: "Texas",
//     latitude: 29.4724,
//     longitude: -98.5251,
//   },
//   {
//     city: "San Diego",
//     population: "1,307,402",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg/240px-US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg",
//     state: "California",
//     latitude: 32.8153,
//     longitude: -117.135,
//   },
//   {
//     city: "Dallas",
//     population: "1,197,816",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dallas_skyline_daytime.jpg/240px-Dallas_skyline_daytime.jpg",
//     state: "Texas",
//     latitude: 32.7757,
//     longitude: -96.7967,
//   },
//   {
//     city: "San Jose",
//     population: "945,942",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Downtown_San_Jose_skyline.PNG/240px-Downtown_San_Jose_skyline.PNG",
//     state: "California",
//     latitude: 37.2969,
//     longitude: -121.8193,
//   },
//   {
//     city: "Austin",
//     population: "790,390",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Austin2012-12-01.JPG/240px-Austin2012-12-01.JPG",
//     state: "Texas",
//     latitude: 30.3072,
//     longitude: -97.756,
//   },
//   {
//     city: "Jacksonville",
//     population: "821,784",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg/240px-Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg",
//     state: "Florida",
//     latitude: 30.337,
//     longitude: -81.6613,
//   },
//   {
//     city: "San Francisco",
//     population: "805,235",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/San_Francisco_skyline_from_Coit_Tower.jpg/240px-San_Francisco_skyline_from_Coit_Tower.jpg",
//     state: "California",
//     latitude: 37.7751,
//     longitude: -122.4193,
//   },
//   {
//     city: "Columbus",
//     population: "787,033",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Columbus-ohio-skyline-panorama.jpg/240px-Columbus-ohio-skyline-panorama.jpg",
//     state: "Ohio",
//     latitude: 39.9848,
//     longitude: -82.985,
//   },
//   {
//     city: "Indianapolis",
//     population: "820,445",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Downtown_indy_from_parking_garage_zoom.JPG/213px-Downtown_indy_from_parking_garage_zoom.JPG",
//     state: "Indiana",
//     latitude: 39.7767,
//     longitude: -86.1459,
//   },
//   {
//     city: "Fort Worth",
//     population: "741,206",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/d/db/FortWorthTexasSkylineW.jpg/240px-FortWorthTexasSkylineW.jpg",
//     state: "Texas",
//     latitude: 32.7795,
//     longitude: -97.3463,
//   },
//   {
//     city: "Charlotte",
//     population: "731,424",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Charlotte_skyline45647.jpg/222px-Charlotte_skyline45647.jpg",
//     state: "North Carolina",
//     latitude: 35.2087,
//     longitude: -80.8307,
//   },
//   {
//     city: "Seattle",
//     population: "608,660",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SeattleI5Skyline.jpg/240px-SeattleI5Skyline.jpg",
//     state: "Washington",
//     latitude: 47.6205,
//     longitude: -122.3509,
//   },
//   {
//     city: "Denver",
//     population: "600,158",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/DenverCP.JPG/240px-DenverCP.JPG",
//     state: "Colorado",
//     latitude: 39.7618,
//     longitude: -104.8806,
//   },
//   {
//     city: "El Paso",
//     population: "649,121",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Downtown_El_Paso_at_sunset.jpeg/240px-Downtown_El_Paso_at_sunset.jpeg",
//     state: "Texas",
//     latitude: 31.8484,
//     longitude: -106.427,
//   },
// ];

// const TOKEN =
//   "pk.eyJ1IjoibnZjYW4xMjM2IiwiYSI6ImNtMDVlNXc0cjBrNzUycXF4cHNlb3BoMjEifQ.KYmYtAQpsmkeZClpeujuNA";

// export default function Map() {
//   const [popupInfo, setPopupInfo] = useState(null);

//   const pins = useMemo(
//     () =>
//       CITIES.map((city, index) => (
//         <Marker
//           key={`marker-${index}`}
//           longitude={city.longitude}
//           latitude={city.latitude}
//           anchor="bottom"
//           onClick={(e) => {
//             e.originalEvent.stopPropagation();
//             setPopupInfo(city);
//           }}
//         >
//           <Pin />
//         </Marker>
//       )),
//     []
//   );

//   return (
//     <>
//       <MapBox
//         initialViewState={{
//           latitude: 40,
//           longitude: -100,
//           zoom: 3.5,
//           bearing: 0,
//           pitch: 0,
//         }}
//         mapStyle="mapbox://styles/nvcan1236/cm05einzd00hf01qs8oa59aji"
//         mapboxAccessToken={TOKEN}
//       >
//         <GeolocateControl position="top-left" />
//         <FullscreenControl position="top-left" />
//         <NavigationControl position="top-left" />
//         <ScaleControl />

//         {pins}

//         {popupInfo && (
//           <Popup
//             anchor="top"
//             longitude={Number(popupInfo.longitude)}
//             latitude={Number(popupInfo.latitude)}
//             onClose={() => setPopupInfo(null)}
//           >
//             <div>
//               {popupInfo.city}, {popupInfo.state} |{" "}
//               <a
//                 target="_new"
//                 href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
//               >
//                 Wikipedia
//               </a>
//             </div>
//             <img width="100%" src={popupInfo.image} />
//           </Popup>
//         )}
//       </MapBox>
//     </>
//   );
// }
