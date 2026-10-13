import { useEffect, useState } from "react";

import { getAbout } from "../lib/api/api";

function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    const data = await getAbout();

    setAbout(data);
    setLoading(false);
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center bg-white py-24"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          About Me
        </h2>

        {loading ? (
          <p className="text-gray-600">
            Loading About information...
          </p>
        ) : about ? (
          <div className="max-w-3xl">
            <p className="text-lg text-gray-600 leading-8">
              {about.content}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">
            About information could not be loaded.
          </p>
        )}

      </div>
    </section>
  );
}

export default About;