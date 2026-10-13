import { useEffect, useState } from "react";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from "../services/api";

function Skills() {
  const [skills, setSkills] = useState([]);

  const [name, setName] = useState("");
  const [level, setLevel] = useState("");

  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    const data = await getSkills();

    if (Array.isArray(data)) {
      setSkills(data);
    } else {
      setSkills([]);
    }
  };

  const handleAddSkill = async () => {
    if (!name || !level) {
      setMessage("Please enter skill name and level.");
      return;
    }

    const result = await createSkill({
      name: name,
      level: level
    });

    if (result && result.id) {
      setName("");
      setLevel("");

      setMessage("Skill added successfully.");

      loadSkills();
    } else {
      setMessage(
        result.message || "Failed to add skill."
      );
    }
  };

  const handleEdit = (skill) => {
    setEditId(skill.id);

    setName(skill.name);

    setLevel(skill.level);

    setMessage("");
  };

  const handleUpdateSkill = async () => {
    if (!name || !level) {
      setMessage("Please enter skill name and level.");
      return;
    }

    const result = await updateSkill(
      editId,
      {
        name: name,
        level: level
      }
    );

    if (result && result.id) {
      setEditId(null);

      setName("");

      setLevel("");

      setMessage("Skill updated successfully.");

      loadSkills();
    } else {
      setMessage(
        result.message || "Failed to update skill."
      );
    }
  };

  const handleDeleteSkill = async (id) => {
    const result = await deleteSkill(id);

    if (result) {
      setMessage("Skill deleted successfully.");

      loadSkills();
    } else {
      setMessage("Failed to delete skill.");
    }
  };

  return (
    <div>
      <h2>Skills</h2>

      <h3>
        {editId ? "Edit Skill" : "Add New Skill"}
      </h3>

      <input
        type="text"
        placeholder="Skill name"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Skill level"
        value={level}
        onChange={(event) =>
          setLevel(event.target.value)
        }
      />

      <br />
      <br />

      {editId ? (
        <button onClick={handleUpdateSkill}>
          Update Skill
        </button>
      ) : (
        <button onClick={handleAddSkill}>
          Add Skill
        </button>
      )}

      {message && <p>{message}</p>}

      <hr />

      <h3>Existing Skills</h3>

      {skills.length === 0 ? (
        <p>No skills added yet.</p>
      ) : (
        skills.map((skill) => (
          <div key={skill.id}>
            <h4>{skill.name}</h4>

            <p>{skill.level}</p>

            <button
              onClick={() => handleEdit(skill)}
            >
              Edit
            </button>

            {" "}

            <button
              onClick={() =>
                handleDeleteSkill(skill.id)
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

export default Skills;