import React, { useState } from "react";
import "../styles/CreateCar.scss";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

const CreateCar = () => {
  const [photos, setPhotos] = useState([]);
  const [formDetails, setFormDetails] = useState({
    title: "",
    description: "",
    tags: [],
  });
  const [error,setError]=useState("")
  const navigate = useNavigate();

  const creatorId = useSelector((state) => state.user._id);

  const handleChangeDetails = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    setError("")
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if(photos.length===0){
        setError("Atleast One Photo is required")
        setTimeout(()=>setError(""),5000)
        return
    }
    try {
      const carForm = new FormData();
      carForm.append("creator", creatorId);
      carForm.append("title", formDetails.title);
      carForm.append("description", formDetails.description);
      formDetails.tags.forEach((tag) => carForm.append("tags", tag));
      photos.forEach((photo) => carForm.append("carPhotos", photo));

      const response = await fetch("http://localhost:3030/api/cars/create", {
        method: "POST",
        body: carForm,
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("Publish Car Listing Failed", err.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="create-car">
        <h1>Publish Your Car Listing</h1>
        <form onSubmit={handlePost}>
          <div className="form-group">
            <p>Title</p>
            <input
              type="text"
              placeholder="Car Title"
              name="title"
              onChange={handleChangeDetails}
              value={formDetails.title}
              required
            />
            <p>Description</p>
            <textarea
              placeholder="Description"
              name="description"
              onChange={handleChangeDetails}
              value={formDetails.description}
              required
            />
            <p>Tags (Comma separated)</p>
            <input
              type="text"
              placeholder="e.g., SUV, Luxury"
              onChange={(e) => setFormDetails({ ...formDetails, tags: e.target.value.split(",").map(tag => tag.trim()) })}
              value={formDetails.tags.join(", ")}
            />
          </div>

          <h3>Upload Photos</h3>
          <DragDropContext onDragEnd={handleDragPhoto}>
            <Droppable droppableId="photos" direction="horizontal">
              {(provided) => (
                <div
                  className="photos"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {photos.length < 1 && (
                    <>
                      <input
                        id="carImage"
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleUploadPhotos}
                        multiple
                      />
                      <label htmlFor="carImage" className="upload-label">
                        <div className="icon">
                          <IoIosImages />
                        </div>
                        <p>Upload from your device</p>
                      </label>
                    </>
                  )}

                  {photos.length >= 1 && (
                    <>
                      {photos.map((photo, index) => (
                        <Draggable
                          key={index}
                          draggableId={index.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="photo"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                         Atleast One Photo is required     <img
                                src={URL.createObjectURL(photo)}
                                alt="car"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(index)}
                              >
                                <BiTrash />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      <input
                        id="carImage"
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleUploadPhotos}
                        multiple
                      />
                      <label htmlFor="carImage" className="upload-more">
                        <div className="icon">
                          <IoIosImages />
                        </div>
                        <p>Upload more photos</p>
                      </label>
                    </>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {error.length>0 && (
            <div>
                {error}
            </div>
          )}
          <button type="submit" className="submit-btn">
            Create Car Listing
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCar;
