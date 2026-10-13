import { useEffect, useState } from "react";

import {
  getServices,
  createService,
  updateService,
  deleteService
} from "../services/api";

function Services() {
  const [services, setServices] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const data = await getServices();

    if (Array.isArray(data)) {
      setServices(data);
    } else {
      setServices([]);
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setEditId(null);
  };

  const handleAddService = async () => {
    if (!title || !description) {
      setMessage(
        "Please enter service title and description."
      );

      return;
    }

    const result = await createService({
      title: title,
      description: description
    });

    if (result && result.id) {
      clearForm();

      setMessage(
        "Service added successfully."
      );

      loadServices();
    } else {
      setMessage(
        result.message ||
        "Failed to add service."
      );
    }
  };

  const handleEdit = (service) => {
    setEditId(service.id);

    setTitle(service.title || "");

    setDescription(
      service.description || ""
    );

    setMessage("");
  };

  const handleUpdateService = async () => {
    if (!title || !description) {
      setMessage(
        "Please enter service title and description."
      );

      return;
    }

    const result = await updateService(
      editId,
      {
        title: title,
        description: description
      }
    );

    if (result && result.id) {
      clearForm();

      setMessage(
        "Service updated successfully."
      );

      loadServices();
    } else {
      setMessage(
        result.message ||
        "Failed to update service."
      );
    }
  };

  const handleDeleteService = async (id) => {
    const result = await deleteService(id);

    if (result) {
      setMessage(
        "Service deleted successfully."
      );

      loadServices();
    } else {
      setMessage(
        "Failed to delete service."
      );
    }
  };

  return (
    <div>
      <h2>Services</h2>

      <h3>
        {editId
          ? "Edit Service"
          : "Add Service"}
      </h3>

      <input
        type="text"
        placeholder="Service title"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Service description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
        rows="6"
        cols="60"
      />

      <br />
      <br />

      {editId ? (
        <button
          onClick={handleUpdateService}
        >
          Update Service
        </button>
      ) : (
        <button
          onClick={handleAddService}
        >
          Add Service
        </button>
      )}

      {message && (
        <p>{message}</p>
      )}

      <hr />

      <h3>
        Existing Services
      </h3>

      {services.length === 0 ? (
        <p>No services added yet.</p>
      ) : (
        services.map((service) => (
          <div key={service.id}>
            <h3>
              {service.title}
            </h3>

            <p>
              {service.description}
            </p>

            <button
              onClick={() =>
                handleEdit(service)
              }
            >
              Edit
            </button>

            {" "}

            <button
              onClick={() =>
                handleDeleteService(
                  service.id
                )
              }
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Services;