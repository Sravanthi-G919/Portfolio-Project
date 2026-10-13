const API_URL = "http://localhost:5000";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const saveAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("adminUser");

  window.location.reload();
};

const apiRequest = async (url, options = {}, retry = true) => {
  let accessToken = getAccessToken();

  const headers = {
    ...(options.headers || {})
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response = await fetch(url, {
    ...options,
    headers
  });

  /*
    If access token expired,
    try to create a new access token
    using the refresh token.
  */
  if (response.status === 401 && retry) {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      logout();
      return response;
    }

    try {
      const refreshResponse = await fetch(
        `${API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            refreshToken: refreshToken
          })
        }
      );

      const refreshData = await refreshResponse.json();

      if (!refreshResponse.ok) {
        logout();
        return response;
      }

      saveAccessToken(refreshData.accessToken);

      accessToken = refreshData.accessToken;

      headers["Authorization"] =
        `Bearer ${accessToken}`;

      response = await fetch(url, {
        ...options,
        headers
      });

    } catch (error) {
      console.error(
        "Token refresh failed:",
        error
      );

      logout();

      return response;
    }
  }

  return response;
};


/* =========================
   ABOUT
========================= */

export const getAbout = async () => {
  const response = await apiRequest(
    `${API_URL}/about`
  );

  return response.json();
};

export const updateAbout = async (content) => {
  const response = await apiRequest(
    `${API_URL}/about`,
    {
      method: "PUT",
      body: JSON.stringify({
        content: content
      })
    }
  );

  return response.json();
};


/* =========================
   SKILLS
========================= */

export const getSkills = async () => {
  const response = await apiRequest(
    `${API_URL}/skills`
  );

  return response.json();
};

export const createSkill = async (skill) => {
  const response = await apiRequest(
    `${API_URL}/skills`,
    {
      method: "POST",
      body: JSON.stringify(skill)
    }
  );

  return response.json();
};

export const updateSkill = async (id, skill) => {
  const response = await apiRequest(
    `${API_URL}/skills/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(skill)
    }
  );

  return response.json();
};

export const deleteSkill = async (id) => {
  const response = await apiRequest(
    `${API_URL}/skills/${id}`,
    {
      method: "DELETE"
    }
  );

  return response.json();
};


/* =========================
   PROJECTS
========================= */

export const getProjects = async () => {
  const response = await apiRequest(
    `${API_URL}/projects`
  );

  return response.json();
};

export const createProject = async (project) => {
  const response = await apiRequest(
    `${API_URL}/projects`,
    {
      method: "POST",
      body: JSON.stringify(project)
    }
  );

  return response.json();
};

export const updateProject = async (id, project) => {
  const response = await apiRequest(
    `${API_URL}/projects/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(project)
    }
  );

  return response.json();
};

export const deleteProject = async (id) => {
  const response = await apiRequest(
    `${API_URL}/projects/${id}`,
    {
      method: "DELETE"
    }
  );

  return response.json();
};


/* =========================
   BLOGS
========================= */

export const getBlogs = async () => {
  const response = await apiRequest(
    `${API_URL}/blogs`
  );

  return response.json();
};

export const createBlog = async (blog) => {
  const response = await apiRequest(
    `${API_URL}/blogs`,
    {
      method: "POST",
      body: JSON.stringify(blog)
    }
  );

  return response.json();
};

export const updateBlog = async (id, blog) => {
  const response = await apiRequest(
    `${API_URL}/blogs/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(blog)
    }
  );

  return response.json();
};

export const deleteBlog = async (id) => {
  const response = await apiRequest(
    `${API_URL}/blogs/${id}`,
    {
      method: "DELETE"
    }
  );

  return response.json();
};


/* =========================
   EXPERIENCE
========================= */

export const getExperience = async () => {
  const response = await apiRequest(
    `${API_URL}/experience`
  );

  return response.json();
};

export const createExperience = async (experience) => {
  const response = await apiRequest(
    `${API_URL}/experience`,
    {
      method: "POST",
      body: JSON.stringify(experience)
    }
  );

  return response.json();
};

export const updateExperience = async (
  id,
  experience
) => {
  const response = await apiRequest(
    `${API_URL}/experience/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(experience)
    }
  );

  return response.json();
};

export const deleteExperience = async (id) => {
  const response = await apiRequest(
    `${API_URL}/experience/${id}`,
    {
      method: "DELETE"
    }
  );

  return response.json();
};


/* =========================
   TESTIMONIALS
========================= */

export const getTestimonials = async () => {
  const response = await apiRequest(
    `${API_URL}/testimonials`
  );

  return response.json();
};

export const createTestimonial = async (
  testimonial
) => {
  const response = await apiRequest(
    `${API_URL}/testimonials`,
    {
      method: "POST",
      body: JSON.stringify(testimonial)
    }
  );

  return response.json();
};

export const updateTestimonial = async (
  id,
  testimonial
) => {
  const response = await apiRequest(
    `${API_URL}/testimonials/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(testimonial)
    }
  );

  return response.json();
};

export const deleteTestimonial = async (id) => {
  const response = await apiRequest(
    `${API_URL}/testimonials/${id}`,
    {
      method: "DELETE"
    }
  );

  return response.json();
};


/* =========================
   SERVICES
========================= */

export const getServices = async () => {
  const response = await apiRequest(
    `${API_URL}/services`
  );

  return response.json();
};

export const createService = async (service) => {
  const response = await apiRequest(
    `${API_URL}/services`,
    {
      method: "POST",
      body: JSON.stringify(service)
    }
  );

  return response.json();
};

export const updateService = async (
  id,
  service
) => {
  const response = await apiRequest(
    `${API_URL}/services/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(service)
    }
  );

  return response.json();
};

export const deleteService = async (id) => {
  const response = await apiRequest(
    `${API_URL}/services/${id}`,
    {
      method: "DELETE"
    }
  );

  return response.json();
};


/* =========================
   MEDIA
========================= */

export const getMedia = async () => {
  const response = await apiRequest(
    `${API_URL}/upload`
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Get media failed:", data);

    return [];
  }

  return Array.isArray(data) ? data : [];
};

export const uploadMedia = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await apiRequest(
    `${API_URL}/upload/image`,
    {
      method: "POST",
      body: formData
    }
  );

  return response.json();
};

export const deleteMedia = async (id) => {
  const response = await apiRequest(
    `${API_URL}/upload/${id}`,
    {
      method: "DELETE"
    }
  );

  return response.json();
};