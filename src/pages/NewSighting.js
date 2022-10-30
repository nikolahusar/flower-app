import axios from "axios";
import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import GoogleMaps from "../components/GoogleMap";
import { getSightings } from "../redux/apiCalls";
const NewSighting = () => {
  const [position, setPosition] = useState({
    lat: 45.2,
    lng: 19.82,
  });
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const id = useParams();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://flowrspot-api.herokuapp.com/api/v1/sightings",
        {
          flower_id: id.id,
          name: name,
          description: desc,
          latitude: position.lat,
          longitude: position.lng,
          picture: image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) =>
        setPosition({
          lat: res.data.sightings.latitude,
          lng: res.data.sightings.longitude,
        })
      );

    navigate(-2);
  };
  return (
    <>
      <div className="flex items-center flex-col justify-center">
        <div className="h-[400px] w-full overflow-hidden">
          <GoogleMaps position={position} setPosition={setPosition} />
        </div>
        <div className="mx-auto h-[570px] z-1 mt-[-50px] bg-white max-w-[1180px] rounded-[3px] shadow-lg z-10">
          <div className="text-secondary flex flex-col justify-center items-center py-[50px]">
            <h1 className="text-[40px] mb-6">Add New Sighting</h1>
            <p className="text-[17px] opacity-[70%]">
              Explore between more than 8.427 sightings
            </p>
          </div>
          <form className="inputs px-[30px]" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <input
                className="w-[550px] bg-[#DFE5EA] px-[15px] h-[50px]"
                placeholder="Title of the sighting"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="w-[150px] bg-[#DFE5EA] h-[50px] px-[15px]"
                placeholder="latitude"
                value={position.lat}
                onChange={(e) =>
                  setPosition({ ...position, lat: Number(e.target.value) })
                }
                type="number"
              />
              <input
                className="w-[150px] bg-[#DFE5EA] h-[50px] px-[15px]"
                placeholder="longitude"
                value={position.lng}
                onChange={(e) =>
                  setPosition({ ...position, lng: Number(e.target.value) })
                }
                type="number"
              />
              <div className="w-[200px] bg-white h-[50px] flex items-center justify-center  border-[1px] border-[#DF9186] ">
                <label
                  htmlFor="file"
                  className="cursor-pointer flex items-center gap-[8px]  text-primary font-medium"
                >
                  <MdAddAPhoto className={image && "text-red-800"} />
                  <span className="text-[14px]">Add a Photo</span>
                </label>
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>
            </div>
            <div className="mt-5">
              <textarea
                type="text"
                className="w-full h-[150px] bg-[#DFE5EA] p-5 resize-none"
                placeholder="write a description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-[30px] mb-[96px]">
              <button className=" bg-primary text-white py-[18px] px-[35px] text-[14px] font-medium">
                Create New Sighting
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewSighting;
