const API_URL = "http://localhost:5000";


// ===============================
// About
// ===============================

export const getAbout = async () => {
  try {
    const response = await fetch(
      `${API_URL}/about`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch About information"
      );
    }

    return await response.json();

  } catch (error) {

    console.error(
      "About API error:",
      error
    );

    return null;
  }
};


// ===============================
// Projects
// ===============================

export const getProjects = async () => {
  try {
    const response = await fetch(
      `${API_URL}/projects`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch Projects"
      );
    }

    return await response.json();

  } catch (error) {

    console.error(
      "Projects API error:",
      error
    );

    return [];
  }
};


// ===============================
// Skills
// ===============================

export const getSkills = async () => {
  try {
    const response = await fetch(
      `${API_URL}/skills`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch Skills"
      );
    }

    return await response.json();

  } catch (error) {

    console.error(
      "Skills API error:",
      error
    );

    return [];
  }
};


// ===============================
// Experience
// ===============================

export const getExperience = async () => {
  try {
    const response = await fetch(
      `${API_URL}/experience`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch Experience"
      );
    }

    return await response.json();

  } catch (error) {

    console.error(
      "Experience API error:",
      error
    );

    return [];
  }
};


// ===============================
// Blogs
// ===============================

export const getBlogs = async () => {
  try {
    const response = await fetch(
      `${API_URL}/blogs`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch Blogs"
      );
    }

    return await response.json();

  } catch (error) {

    console.error(
      "Blogs API error:",
      error
    );

    return [];
  }
};


// ===============================
// Contact
// ===============================

export const sendContactMessage = async (
  contactData
) => {

  try {

    const response = await fetch(
      `${API_URL}/contact`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(
          contactData
        )
      }
    );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Failed to send message"
      );

    }


    return data;


  } catch (error) {

    console.error(
      "Contact API error:",
      error
    );


    return {
      success: false,
      message: error.message
    };

  }
};