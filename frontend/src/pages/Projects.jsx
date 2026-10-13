import { useEffect, useState } from "react";
import { getProjects } from "../lib/api/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();

    setProjects(data);
    setLoading(false);
  };

  return (
    <section
      id="projects"
      className="min-h-screen bg-gray-50 py-24"
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          My Projects
        </h2>

        <p className="text-gray-600 text-lg mb-10">
          Some of the projects I have worked on.
        </p>

        {loading ? (
          <p className="text-gray-600">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <p className="text-gray-600">
            No projects available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">

            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-md
                overflow-hidden border border-gray-100"
              >

                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-6">

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 leading-7 mb-5">
                    {project.description}
                  </p>

                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-5 py-2
                      bg-blue-600 text-white rounded-lg
                      font-semibold hover:bg-blue-700 transition"
                    >
                      View Project
                    </a>
                  )}

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;