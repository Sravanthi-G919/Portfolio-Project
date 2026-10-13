import { useState } from "react";

import "./App.css";

import Login from "./pages/Login";

import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Experience from "./pages/Experience";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";
import Media from "./pages/Media";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("accessToken"))
  );

  const [page, setPage] = useState("dashboard");

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => {
          setIsLoggedIn(true);
          setPage("dashboard");
        }}
      />
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("adminUser");

    setIsLoggedIn(false);
    setPage("dashboard");
  };

  if (page === "about") {
    return (
      <AdminPage
        title="About"
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
      >
        <About />
      </AdminPage>
    );
  }

  if (page === "skills") {
    return (
      <AdminPage
        title="Skills"
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
      >
        <Skills />
      </AdminPage>
    );
  }

  if (page === "projects") {
    return (
      <AdminPage
        title="Projects"
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
      >
        <Projects />
      </AdminPage>
    );
  }

  if (page === "blogs") {
    return (
      <AdminPage
        title="Blogs"
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
      >
        <Blogs />
      </AdminPage>
    );
  }

  if (page === "experience") {
    return (
      <AdminPage
        title="Experience"
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
      >
        <Experience />
      </AdminPage>
    );
  }

  if (page === "testimonials") {
    return (
      <AdminPage
        title="Testimonials"
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
      >
        <Testimonials />
      </AdminPage>
    );
  }

  if (page === "services") {
    return (
      <AdminPage
        title="Services"
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
      >
        <Services />
      </AdminPage>
    );
  }

  if (page === "media") {
    return (
      <AdminPage
        title="Media"
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
      >
        <Media />
      </AdminPage>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div>
          <h1>Portfolio CMS</h1>
          <p>Admin Panel</p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard">
        <h2>Dashboard</h2>

        <p>
          Manage your portfolio content from here.
        </p>

        <div className="dashboard-grid">

          <div
            className="dashboard-card"
            onClick={() => setPage("about")}
          >
            <h3>About</h3>
            <p>Manage your About information.</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => setPage("skills")}
          >
            <h3>Skills</h3>
            <p>Manage your skills.</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => setPage("projects")}
          >
            <h3>Projects</h3>
            <p>Manage your projects.</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => setPage("blogs")}
          >
            <h3>Blogs</h3>
            <p>Manage your blog posts.</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => setPage("experience")}
          >
            <h3>Experience</h3>
            <p>Manage your experience.</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => setPage("testimonials")}
          >
            <h3>Testimonials</h3>
            <p>Manage testimonials.</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => setPage("services")}
          >
            <h3>Services</h3>
            <p>Manage your services.</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => setPage("media")}
          >
            <h3>Media</h3>
            <p>Manage uploaded images.</p>
          </div>

        </div>
      </main>
    </div>
  );
}

function AdminPage({
  title,
  onBack,
  onLogout,
  children
}) {
  return (
    <div className="admin-container">

      <header className="admin-header">

        <div>
          <h1>Portfolio CMS</h1>
          <p>Admin Panel</p>
        </div>

        <button onClick={onLogout}>
          Logout
        </button>

      </header>

      <main className="dashboard">

        <button onClick={onBack}>
          ← Back to Dashboard
        </button>

        <h2>{title}</h2>

        {children}

      </main>

    </div>
  );
}

export default App;