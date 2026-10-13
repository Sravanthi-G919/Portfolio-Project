import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";


function App() {

  return (

    <div className="min-h-screen">

      <Navbar />

      <main>

        <Home />

        <About />

        <Projects />

        <Skills />

        <Experience />

        <Blog />

        <Contact />

      </main>

    </div>

  );
}


export default App;