import { useEffect, useState } from "react";

import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience
} from "../services/api";

function Experience() {
  const [experiences, setExperiences] = useState([]);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadExperience();
  }, []);

  const loadExperience = async () => {
    const data = await getExperience();

    if (Array.isArray(data)) {
      setExperiences(data);
    } else {
      setExperiences([]);
    }
  };

  const clearForm = () => {
    setTitle("");
    setCompany("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setEditId(null);
  };

  const handleAddExperience = async () => {
    if (!title || !company || !description) {
      setMessage(
        "Please enter title, company and description."
      );

      return;
    }

    const result = await createExperience({
      title: title,
      company: company,
      description: description,
      start_date: startDate || null,
      end_date: endDate || null
    });

    if (result && result.id) {
      clearForm();

      setMessage(
        "Experience added successfully."
      );

      loadExperience();
    } else {
      setMessage(
        result.message || "Failed to add experience."
      );
    }
  };

  const handleEdit = (experience) => {
    setEditId(experience.id);

    setTitle(experience.title || "");

    setCompany(experience.company || "");

    setDescription(
      experience.description || ""
    );

    setStartDate(
      experience.start_date
        ? experience.start_date.substring(0, 10)
        : ""
    );

    setEndDate(
      experience.end_date
        ? experience.end_date.substring(0, 10)
        : ""
    );

    setMessage("");
  };

  const handleUpdateExperience = async () => {
    if (!title || !company || !description) {
      setMessage(
        "Please enter title, company and description."
      );

      return;
    }

    const result = await updateExperience(
      editId,
      {
        title: title,
        company: company,
        description: description,
        start_date: startDate || null,
        end_date: endDate || null
      }
    );

    if (result && result.id) {
      clearForm();

      setMessage(
        "Experience updated successfully."
      );

      loadExperience();
    } else {
      setMessage(
        result.message ||
        "Failed to update experience."
      );
    }
  };

  const handleDeleteExperience = async (id) => {
    const result = await deleteExperience(id);

    if (result) {
      setMessage(
        "Experience deleted successfully."
      );

      loadExperience();
    } else {
      setMessage(
        "Failed to delete experience."
      );
    }
  };

  return (
    <div>
      <h2>Experience</h2>

      <h3>
        {editId
          ? "Edit Experience"
          : "Add Experience"}
      </h3>

      <input
        type="text"
        placeholder="Job title"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Company name"
        value={company}
        onChange={(event) =>
          setCompany(event.target.value)
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Experience description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
        rows="6"
        cols="60"
      />

      <br />
      <br />

      <label>
        Start Date:
      </label>

      <br />

      <input
        type="date"
        value={startDate}
        onChange={(event) =>
          setStartDate(event.target.value)
        }
      />

      <br />
      <br />

      <label>
        End Date:
      </label>

      <br />

      <input
        type="date"
        value={endDate}
        onChange={(event) =>
          setEndDate(event.target.value)
        }
      />

      <br />
      <br />

      {editId ? (
        <button
          onClick={handleUpdateExperience}
        >
          Update Experience
        </button>
      ) : (
        <button
          onClick={handleAddExperience}
        >
          Add Experience
        </button>
      )}

      {message && (
        <p>{message}</p>
      )}

      <hr />

      <h3>
        Existing Experience
      </h3>

      {experiences.length === 0 ? (
        <p>No experience added yet.</p>
      ) : (
        experiences.map((experience) => (
          <div key={experience.id}>
            <h3>
              {experience.title}
            </h3>

            <h4>
              {experience.company}
            </h4>

            <p>
              {experience.description}
            </p>

            <p>
              Start Date:{" "}
              {experience.start_date
                ? experience.start_date.substring(
                    0,
                    10
                  )
                : "Not provided"}
            </p>

            <p>
              End Date:{" "}
              {experience.end_date
                ? experience.end_date.substring(
                    0,
                    10
                  )
                : "Not provided"}
            </p>

            <button
              onClick={() =>
                handleEdit(experience)
              }
            >
              Edit
            </button>

            {" "}

            <button
              onClick={() =>
                handleDeleteExperience(
                  experience.id
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

export default Experience;