import { useEffect, useState } from "react";

import {
  getBlogs
} from "../lib/api/api";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const data = await getBlogs();

    setBlogs(data);
    setLoading(false);
  };

  return (
    <section
      id="blog"
      className="min-h-screen bg-white py-24"
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2
          className="text-4xl md:text-5xl
          font-bold text-gray-900 mb-4"
        >
          Blog
        </h2>

        <p
          className="text-gray-600
          text-lg mb-10"
        >
          Articles and thoughts about
          technology and web development.
        </p>

        {loading ? (
          <p className="text-gray-600">
            Loading blogs...
          </p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-600">
            No blogs available.
          </p>
        ) : (
          <div
            className="grid md:grid-cols-2
            gap-8"
          >

            {blogs.map((blog) => (

              <article
                key={blog.id}
                className="bg-gray-50
                border border-gray-200
                rounded-xl
                overflow-hidden
                shadow-sm"
              >

                {blog.image_url && (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-56
                    object-cover"
                  />
                )}

                <div className="p-6">

                  <h3
                    className="text-2xl
                    font-bold
                    text-gray-900 mb-4"
                  >
                    {blog.title}
                  </h3>

                  <p
                    className="text-gray-600
                    leading-7"
                  >
                    {blog.content}
                  </p>

                </div>

              </article>

            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Blog;