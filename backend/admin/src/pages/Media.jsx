import { useEffect, useState } from "react";

import {
  getMedia,
  uploadMedia,
  deleteMedia
} from "../services/api";


function Media() {

  const [media, setMedia] = useState([]);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [message, setMessage] =
    useState("");


  useEffect(() => {
    loadMedia();
  }, []);


  const loadMedia = async () => {

    const data = await getMedia();

    setMedia(data);
  };


  const handleFileChange = (event) => {

    setSelectedFile(
      event.target.files[0]
    );

    setMessage("");
  };


  const handleUpload = async () => {

    if (!selectedFile) {

      setMessage(
        "Please select an image."
      );

      return;
    }


    const result =
      await uploadMedia(selectedFile);


    if (result.media) {

      setMessage(
        "Image uploaded successfully."
      );

      setSelectedFile(null);

      document.getElementById(
        "media-file-input"
      ).value = "";

      loadMedia();

    } else {

      setMessage(
        result.message ||
        "Image upload failed."
      );
    }
  };


  const handleDelete = async (id) => {

    const result =
      await deleteMedia(id);

    setMessage(
      result.message ||
      "Media deleted successfully."
    );

    loadMedia();
  };


  return (

    <div>

      <h2>Media</h2>

      <p>
        Upload and manage your portfolio images.
      </p>


      <h3>
        Upload Image
      </h3>


      <input
        id="media-file-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />


      <br />
      <br />


      <button
        onClick={handleUpload}
      >
        Upload Image
      </button>


      {message && (
        <p>{message}</p>
      )}


      <hr />


      <h3>
        Uploaded Images
      </h3>


      {media.length === 0 ? (

        <p>
          No images uploaded yet.
        </p>

      ) : (

        <div>

          {media.map((item) => (

            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "20px",
                maxWidth: "500px"
              }}
            >

              <img
                src={
                  `http://localhost:5000${item.file_url}`
                }
                alt={item.filename}
                style={{
                  width: "300px",
                  maxHeight: "250px",
                  objectFit: "contain",
                  display: "block",
                  marginBottom: "15px"
                }}
              />


              <p>
                <strong>
                  Filename:
                </strong>{" "}
                {item.filename}
              </p>


              <p>
                <strong>
                  Media ID:
                </strong>{" "}
                {item.id}
              </p>


              <button
                onClick={() =>
                  handleDelete(item.id)
                }
              >
                Delete
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}


export default Media;