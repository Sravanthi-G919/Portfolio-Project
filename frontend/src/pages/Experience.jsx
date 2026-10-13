import { useEffect, useState } from "react";

import {
  getExperience
} from "../lib/api/api";

function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperience();
  }, []);

  const loadExperience = async () => {
    const data = await getExperience();

    setExperience(data);
    setLoading(false);
  };

  const formatDate = (date) => {
    if (!date) {
      return "Present";
    }

    const formattedDate = new Date(date);

    return formattedDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });
  };

  return (
    <section
      id="experience"
      className="min-h-screen bg-gray-50 py-24"
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2
          className="text-4xl md:text-5xl
          font-bold text-gray-900 mb-4"
        >
          Experience
        </h2>

        <p
          className="text-gray-600 text-lg mb-10"
        >
          My professional experience and internships.
        </p>

        {loading ? (
          <p className="text-gray-600">
            Loading experience...
          </p>
        ) : experience.length === 0 ? (
          <p className="text-gray-600">
            No experience available.
          </p>
        ) : (
          <div className="space-y-6">

            {experience.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-xl
                border border-gray-200
                shadow-sm p-6"
              >

                <h3
                  className="text-2xl font-bold
                  text-gray-900 mb-2"
                >
                  {item.title}
                </h3>

                <p
                  className="text-blue-600
                  font-semibold mb-3"
                >
                  {item.company}
                </p>

                <p
                  className="text-gray-600
                  leading-7 mb-4"
                >
                  {item.description}
                </p>

                <p
                  className="text-sm
                  text-gray-500"
                >
                  {formatDate(item.start_date)}
                  {" → "}
                  {formatDate(item.end_date)}
                </p>

              </div>

            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Experience;