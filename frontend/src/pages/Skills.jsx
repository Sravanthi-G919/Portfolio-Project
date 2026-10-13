import { useEffect, useState } from "react";
import { getSkills } from "../lib/api/api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    const data = await getSkills();

    setSkills(data);
    setLoading(false);
  };

  return (
    <section
      id="skills"
      className="min-h-screen bg-white py-24"
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Skills
        </h2>

        <p className="text-gray-600 text-lg mb-10">
          Technologies and skills I am learning.
        </p>

        {loading ? (
          <p className="text-gray-600">
            Loading skills...
          </p>
        ) : skills.length === 0 ? (
          <p className="text-gray-600">
            No skills available.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-gray-50 border border-gray-200
                rounded-xl p-6 shadow-sm"
              >

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {skill.name}
                </h3>

                <p className="text-blue-600 font-semibold">
                  {skill.level}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Skills;