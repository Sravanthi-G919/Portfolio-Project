import { useEffect, useState } from "react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();

    if (Array.isArray(data)) {
      setProjects(data);
    } else {
      setProjects([]);
    }
  };

  const handleAddProject = async () => {
    if (!title || !description) {
      setMessage(
        "Please enter project title and description."
      );
      return;
    }

    const result = await createProject({
      title: title,
      description: description,
      image_url: imageUrl,
      project_url: projectUrl
    });

    if (result && result.id) {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setProjectUrl("");

      setMessage("Project added successfully.");

      loadProjects();
    } else {
      setMessage(
        result.message || "Failed to add project."
      );
    }
  };

  const handleEdit = (project) => {
    setEditId(project.id);

    setTitle(project.title);

    setDescription(project.description);

    setImageUrl(project.image_url || "");

    setProjectUrl(project.project_url || "");

    setMessage("");
  };

  const handleUpdateProject = async () => {
    if (!title || !description) {
      setMessage(
        "Please enter project title and description."
      );
      return;
    }

    const result = await updateProject(
      editId,
      {
        title: title,
        description: description,
        image_url: imageUrl,
        project_url: projectUrl
      }
    );

    if (result && result.id) {
      setEditId(null);

      setTitle("");
      setDescription("");
      setImageUrl("");
      setProjectUrl("");

      setMessage("Project updated successfully.");

      loadProjects();
    } else {
      setMessage(
        result.message || "Failed to update project."
      );
    }
  };

  const handleDeleteProject = async (id) => {
    const result = await deleteProject(id);

    if (result) {
      setMessage("Project deleted successfully.");

      loadProjects();
    } else {
      setMessage("Failed to delete project.");
    }
  };

  return (
    <div>
      <h2>Projects</h2>

      <h3>
        {editId ? "Edit Project" : "Add Project"}
      </h3>

      <input
        type="text"
        placeholder="Project title"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Project description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
        rows="5"
        cols="50"
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(event) =>
          setImageUrl(event.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Project URL"
        value={projectUrl}
        onChange={(event) =>
          setProjectUrl(event.target.value)
        }
      />

      <br />
      <br />

      {editId ? (
        <button onClick={handleUpdateProject}>
          Update Project
        </button>
      ) : (
        <button onClick={handleAddProject}>
          Add Project
        </button>
      )}

      {message && <p>{message}</p>}

      <hr />

      <h3>Existing Projects</h3>

      {projects.length === 0 ? (
        <p>No projects added yet.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>

            <p>{project.description}</p>

            {project.image_url && (
              <p>
                Image URL: {project.image_url}
              </p>
            )}

            {project.project_url && (
              <p>
                Project URL: {project.project_url}
              </p>
            )}

            <button
              onClick={() => handleEdit(project)}
            >
              Edit
            </button>

            {" "}

            <button
              onClick={() =>
                handleDeleteProject(project.id)
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

export default Projects;