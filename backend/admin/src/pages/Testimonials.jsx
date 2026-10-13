import { useEffect, useState } from "react";

import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from "../services/api";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const [name, setName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [role, setRole] = useState("");

  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const data = await getTestimonials();

    if (Array.isArray(data)) {
      setTestimonials(data);
    } else {
      setTestimonials([]);
    }
  };

  const clearForm = () => {
    setName("");
    setMessageText("");
    setRole("");
    setEditId(null);
  };

  const handleAddTestimonial = async () => {
    if (!name || !messageText) {
      setMessage(
        "Please enter name and testimonial message."
      );

      return;
    }

    const result = await createTestimonial({
      name: name,
      message: messageText,
      role: role
    });

    if (result && result.id) {
      clearForm();

      setMessage(
        "Testimonial added successfully."
      );

      loadTestimonials();
    } else {
      setMessage(
        result.message ||
        "Failed to add testimonial."
      );
    }
  };

  const handleEdit = (testimonial) => {
    setEditId(testimonial.id);

    setName(testimonial.name || "");

    setMessageText(
      testimonial.message || ""
    );

    setRole(testimonial.role || "");

    setMessage("");
  };

  const handleUpdateTestimonial = async () => {
    if (!name || !messageText) {
      setMessage(
        "Please enter name and testimonial message."
      );

      return;
    }

    const result = await updateTestimonial(
      editId,
      {
        name: name,
        message: messageText,
        role: role
      }
    );

    if (result && result.id) {
      clearForm();

      setMessage(
        "Testimonial updated successfully."
      );

      loadTestimonials();
    } else {
      setMessage(
        result.message ||
        "Failed to update testimonial."
      );
    }
  };

  const handleDeleteTestimonial = async (id) => {
    const result = await deleteTestimonial(id);

    if (result) {
      setMessage(
        "Testimonial deleted successfully."
      );

      loadTestimonials();
    } else {
      setMessage(
        "Failed to delete testimonial."
      );
    }
  };

  return (
    <div>
      <h2>Testimonials</h2>

      <h3>
        {editId
          ? "Edit Testimonial"
          : "Add Testimonial"}
      </h3>

      <input
        type="text"
        placeholder="Person name"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Person role"
        value={role}
        onChange={(event) =>
          setRole(event.target.value)
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Testimonial message"
        value={messageText}
        onChange={(event) =>
          setMessageText(event.target.value)
        }
        rows="6"
        cols="60"
      />

      <br />
      <br />

      {editId ? (
        <button
          onClick={handleUpdateTestimonial}
        >
          Update Testimonial
        </button>
      ) : (
        <button
          onClick={handleAddTestimonial}
        >
          Add Testimonial
        </button>
      )}

      {message && (
        <p>{message}</p>
      )}

      <hr />

      <h3>
        Existing Testimonials
      </h3>

      {testimonials.length === 0 ? (
        <p>No testimonials added yet.</p>
      ) : (
        testimonials.map((testimonial) => (
          <div key={testimonial.id}>
            <h3>
              {testimonial.name}
            </h3>

            <h4>
              {testimonial.role}
            </h4>

            <p>
              {testimonial.message}
            </p>

            <button
              onClick={() =>
                handleEdit(testimonial)
              }
            >
              Edit
            </button>

            {" "}

            <button
              onClick={() =>
                handleDeleteTestimonial(
                  testimonial.id
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

export default Testimonials;