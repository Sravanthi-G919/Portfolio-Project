function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gray-50 pt-20"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">

        <div className="max-w-3xl">

          <p className="text-blue-600 font-semibold text-lg mb-4">
            Hello, I'm
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Sravanthi
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            Computer Science Engineering Student
          </h2>

          <p className="text-lg text-gray-600 leading-8 mb-8">
            I am passionate about software development, artificial
            intelligence, and modern web technologies. I enjoy building
            useful applications and learning new technologies.
          </p>

          <div className="flex flex-wrap gap-4">

            <a
              href="#projects"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg
              font-semibold hover:bg-blue-700 transition"
            >
              View My Projects
            </a>

            <a
              href="#contact"
              className="px-6 py-3 border border-blue-600
              text-blue-600 rounded-lg font-semibold
              hover:bg-blue-600 hover:text-white transition"
            >
              Contact Me
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Home;