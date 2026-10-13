function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <a
          href="#home"
          className="text-2xl font-bold text-blue-600"
        >
          Portfolio
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-gray-700 hover:text-blue-600">
            Home
          </a>

          <a href="#about" className="text-gray-700 hover:text-blue-600">
            About
          </a>

          <a href="#projects" className="text-gray-700 hover:text-blue-600">
            Projects
          </a>

          <a href="#skills" className="text-gray-700 hover:text-blue-600">
            Skills
          </a>

          <a href="#experience" className="text-gray-700 hover:text-blue-600">
            Experience
          </a>

          <a href="#blog" className="text-gray-700 hover:text-blue-600">
            Blog
          </a>

          <a href="#contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;