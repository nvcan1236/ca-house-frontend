import DecorativeHeading from "@/components/common/DecorativeHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { geoMapEndpoint } from "@/configs/APIconfig";
import { getDistricts, getProvinces, getWards } from "@/configs/provincesData";
import { useAppDispatch } from "@/stores/hooks";
import { nextStep, prevStep } from "@/stores/slices/createMotelSlice";
import { District, Ward } from "@/utils/interfaces";
import { Location } from "@/utils/types";
import axios from "axios";
import { MapPinIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";

const LocationInfo = () => {
  const dispatch = useAppDispatch();
  const provinces = getProvinces();
  const [districtList, setDistrictList] = useState<District[]>([]);
  const [wardList, setWardList] = useState<Ward[]>([]);
  const [locationList, setLocationList] = useState([]);
  const [location, setLocation] = useState<Location>({
    province: "",
    district: "",
    ward: "",
    street: "",
    other: "",
    longitude: null,
    latitude: null,
  });
  const MAP_TOKEN =
    "pk.eyJ1IjoibnZjYW4xMjM2IiwiYSI6ImNtMDVlNXc0cjBrNzUycXF4cHNlb3BoMjEifQ.KYmYtAQpsmkeZClpeujuNA";

  const getCoordinate = async () => {
    axios
      .get(
        geoMapEndpoint(
          `${location?.street},${location?.ward},${location?.district},${location?.province}`
        )
      )
      .then((data) => setLocationList(data.data.map((loc) => loc)));
  };
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

  const [current, setCurrent] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [viewState, setViewState] = useState({
    longitude: current.longitude,
    latitude: current.latitude,
    zoom: 15,
  });
  const handleClickLocation = (loc) => {
    setLocation({
      ...location,
      longitude: loc.lon,
      latitude: loc.lat,
    });
    setViewState({
      ...viewState,
      longitude: loc.lon,
      latitude: loc.lat,
    });
  };

  return (
    <div className="">
      <div className="flex flex-col gap-10">
        <div className="w-full max-w-[800px] mx-auto">
          <DecorativeHeading className="!text-2xl mb-5 text-main-blue-s3 mt-10">
            Thêm vị trí
          </DecorativeHeading>

          <div className="flex flex-col gap-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="city">Tỉnh, thành phồ</Label>
                <Select
                  defaultValue={""}
                  onValueChange={(value) => {
                    setLocation({ ...location, province: value });
                    setDistrictList(getDistricts(value));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province.name} value={province.name}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">Quận huyện</Label>
                <Select
                  defaultValue={""}
                  onValueChange={(value) => {
                    setLocation({ ...location, district: value });
                    setWardList(getWards(location.province, value));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {districtList?.map((district) => (
                      <SelectItem key={district.name} value={district.name}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="citya">Xã, Phường</Label>
                <Select
                  defaultValue={""}
                  onValueChange={(value) => {
                    setLocation({ ...location, ward: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {wardList.map((province) => (
                      <SelectItem key={province.name} value={province.name}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-[180px]">
                <Label htmlFor="city">Đường</Label>
                <Input
                  placeholder="Tên đường..."
                  value={location.street}
                  onChange={(e) =>
                    setLocation({ ...location, street: e.target.value })
                  }
                ></Input>
              </div>
            </div>
            <div className="w-full flex gap-3 items-end">
              <div className="flex-1 ">
                <Label htmlFor="city">ĐỊa chỉ khác (Tự chọn)</Label>
                <Input
                  placeholder={`Ấp, xóm,..`}
                  value={location.other}
                  onChange={(e) =>
                    setLocation({ ...location, other: e.target.value })
                  }
                />
              </div>
              <Popover>
                <PopoverTrigger>
                  <Button type="button" onClick={getCoordinate}>
                    Xem trên Map
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="lg:w-[600px]">
                  <ul>
                    {locationList.map((loc) => (
                      <li
                        className="px-4 py-2 hover:bg-main-yellow-t9 transition-all"
                        onClick={() => handleClickLocation(loc)}
                      >
                        {loc.display_name}
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-[400px] rounded-xl">
              {location.longitude},{location.latitude}
              <ReactMapGL
                mapStyle={"mapbox://styles/nvcan1236/cm05einzd00hf01qs8oa59aji"}
                mapboxAccessToken={MAP_TOKEN}
                onMove={(evt) => setViewState(evt.viewState)}
                {...viewState}
              >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                {location.longitude && location.latitude && (
                  <Marker
                    draggable
                    longitude={location.longitude}
                    latitude={location.latitude}
                    onDrag={(e) =>
                      setLocation({
                        ...location,
                        longitude: e.lngLat.lng,
                        latitude: e.lngLat.lat,
                      })
                    }
                  >
                    <MapPinIcon size={32} fill="#009639" strokeWidth={1} />
                  </Marker>
                )}
                <Marker
                  longitude={current.longitude}
                  latitude={current.latitude}
                >
                  <MapPinIcon size={32} fill="#ea4e2c" strokeWidth={1} />
                </Marker>
              </ReactMapGL>
            </div>
          </div>
        </div>

        <div className=" flex justify-end gap-2 fixed bottom-0 left-0 right-0 bg-background px-10 py-4 border-t z-20">
          <Button
            size={"lg"}
            variant={"secondary"}
            onClick={() => dispatch(prevStep())}
          >
            Quay lại
          </Button>
          <Button
            size={"lg"}
            onClick={() => {
              console.log(location);
              dispatch(nextStep());
            }}
            // disabled={location.longitude === null || location.latitude === null}
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
