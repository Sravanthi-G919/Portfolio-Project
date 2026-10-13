import { useEffect, useState } from "react";

import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} from "../services/api";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const data = await getBlogs();

    if (Array.isArray(data)) {
      setBlogs(data);
    } else {
      setBlogs([]);
    }
  };

  const handleAddBlog = async () => {
    if (!title || !content) {
      setMessage(
        "Please enter blog title and content."
      );
      return;
    }

    const result = await createBlog({
      title: title,
      content: content,
      image_url: imageUrl
    });

    if (result && result.id) {
      setTitle("");
      setContent("");
      setImageUrl("");

      setMessage("Blog added successfully.");

      loadBlogs();
    } else {
      setMessage(
        result.message || "Failed to add blog."
      );
    }
  };

  const handleEdit = (blog) => {
    setEditId(blog.id);

    setTitle(blog.title);

    setContent(blog.content);

    setImageUrl(blog.image_url || "");

    setMessage("");
  };

  const handleUpdateBlog = async () => {
    if (!title || !content) {
      setMessage(
        "Please enter blog title and content."
      );
      return;
    }

    const result = await updateBlog(
      editId,
      {
        title: title,
        content: content,
        image_url: imageUrl
      }
    );

    if (result && result.id) {
      setEditId(null);

      setTitle("");
      setContent("");
      setImageUrl("");

      setMessage("Blog updated successfully.");

      loadBlogs();
    } else {
      setMessage(
        result.message || "Failed to update blog."
      );
    }
  };

  const handleDeleteBlog = async (id) => {
    const result = await deleteBlog(id);

    if (result) {
      setMessage("Blog deleted successfully.");

      loadBlogs();
    } else {
      setMessage("Failed to delete blog.");
    }
  };

  return (
    <div>
      <h2>Blogs</h2>

      <h3>
        {editId ? "Edit Blog" : "Add Blog"}
      </h3>

      <input
        type="text"
        placeholder="Blog title"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Blog content"
        value={content}
        onChange={(event) =>
          setContent(event.target.value)
        }
        rows="8"
        cols="60"
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

      {editId ? (
        <button onClick={handleUpdateBlog}>
          Update Blog
        </button>
      ) : (
        <button onClick={handleAddBlog}>
          Add Blog
        </button>
      )}

      {message && <p>{message}</p>}

      <hr />

      <h3>Existing Blogs</h3>

      {blogs.length === 0 ? (
        <p>No blogs added yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>

            <p>{blog.content}</p>

            {blog.image_url && (
              <p>
                Image URL: {blog.image_url}
              </p>
            )}

            <button
              onClick={() => handleEdit(blog)}
            >
              Edit
            </button>

            {" "}

            <button
              onClick={() =>
                handleDeleteBlog(blog.id)
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

export default Blogs;