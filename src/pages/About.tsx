import { motion } from "framer-motion";

/**
 * About page component - Homepage with hero section and project showcase
 * Features:
 * - Responsive hero section with dynamic typography
 * - Project grid with hover effects and animations
 * - Mobile-optimized layout and spacing
 * - SF Pro Display typography for native feel
 */
export default function About() {
  // Static project data - could be moved to API in future
  const projects = [
    {
      title: "Friday",
      description: "AI assistant for email. Backed by Y Combinator.",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=386",
    },
    {
      title: "YouLearn",
      description: "AI tutor for students. 1M+ users.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=386",
    },
    {
      title: "Iris",
      description: "AI wearable that gives you infinite memory.",
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=386",
    },
    {
      title: "Commencement Speech",
      description:
        "Spoke about chasing rejection to over 10,000 students at my graduation.",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=386",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full bg-white overflow-y-scroll min-h-screen">
      {/* Main Container */}
      <main className="flex flex-col items-center w-full pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="flex flex-row justify-center items-center w-full min-h-screen">
          <div className="flex flex-col items-start px-4 sm:px-6 lg:px-10 w-full max-w-[1440px]">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-black font-normal leading-tight tracking-tight"
              style={{
                fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif",
                fontSize: "clamp(2rem, 4vw, 55.75px)",
                lineHeight: "clamp(2.5rem, 5vw, 77px)",
                letterSpacing: "clamp(-0.5px, -0.1vw, -1.28px)",
                maxWidth: "1357px",
              }}
            >
              Hi, I'm Shivacharan Mandhapuram — a 21 year old founder. I am
              passionate about building technology that makes a meaningful
              impact on people's lives.
            </motion.h1>
          </div>
        </section>

        {/* Projects Sections */}
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            {/* Separator Line */}
            <div className="w-full h-px border-t border-[#E5E7EB]"></div>

            {/* Project Container */}
            <div className="flex flex-col items-center px-10 w-full max-w-[1440px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col lg:flex-row justify-between items-start w-full py-20 gap-8 lg:gap-48"
              >
                {/* Text Content */}
                <div className="flex flex-col items-start gap-2 w-full lg:w-[480.94px] order-2 lg:order-1">
                  {/* Title */}
                  <div className="w-full h-[45px] flex items-center">
                    <h2
                      className="text-black font-normal flex items-center"
                      style={{
                        fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif",
                        fontSize: "clamp(18px, 2vw, 26.6016px)",
                        lineHeight: "45px",
                      }}
                    >
                      {project.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <div className="w-full h-[30px] flex items-center">
                    <p
                      className="text-[#707070] font-normal flex items-center"
                      style={{
                        fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif",
                        fontSize: "clamp(14px, 1.5vw, 17.3438px)",
                        lineHeight: "30px",
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Button Container */}
                  <div className="flex flex-col items-start pt-8 w-[85px] h-[79px]">
                    <button
                      className="flex flex-row items-center justify-center rounded-full bg-[#F5F5F5] w-[85px] h-[47px]"
                      style={{ padding: "10px 24px" }}
                    >
                      <span
                        className="text-black font-normal flex items-center justify-center"
                        style={{
                          fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif",
                          fontSize: "clamp(14px, 1vw, 16.0312px)",
                          lineHeight: "27px",
                        }}
                      >
                        View
                      </span>
                    </button>
                  </div>
                </div>

                {/* Image Container */}
                <div
                  className="flex flex-col items-start w-full lg:w-[687.06px] lg:h-[393.47px] order-1 lg:order-2"
                  style={{ paddingBottom: "7px" }}
                >
                  {index === 0 ? (
                    // Friday project - Purple gradient with email icon
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-purple-900 rounded-xl overflow-hidden shadow-lg flex items-center justify-center relative">
                      <div className="text-center text-white px-8">
                        <h3 className="text-3xl font-medium mb-2">Never check your<br />email again</h3>
                        <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mt-8 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : index === 1 ? (
                    // YouLearn project - Dark interface mockup
                    <div className="w-full h-full bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                      <div className="h-full p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="text-white text-lg font-medium">YouLearn</div>
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-800 rounded-lg p-4 h-20"></div>
                          <div className="bg-gray-800 rounded-lg p-4 h-20"></div>
                          <div className="bg-gray-700 rounded-lg p-4 h-16 col-span-2"></div>
                          <div className="bg-purple-600 rounded-lg p-4 h-12"></div>
                          <div className="bg-gray-800 rounded-lg p-4 h-12"></div>
                        </div>
                      </div>
                    </div>
                  ) : index === 2 ? (
                    // Iris project - Wearable device mockup
                    <div className="w-full h-full flex items-center justify-center space-x-8">
                      <div className="w-48 h-48 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center shadow-lg">
                        <div className="w-4 h-4 bg-black rounded-full"></div>
                      </div>
                      <div className="relative">
                        <div className="w-24 h-48 bg-white rounded-3xl border-2 border-gray-200 shadow-lg overflow-hidden">
                          <div className="bg-gray-900 h-6 rounded-t-2xl"></div>
                          <div className="p-2 space-y-2">
                            <div className="bg-gray-200 h-2 rounded"></div>
                            <div className="bg-gray-300 h-2 rounded w-3/4"></div>
                            <div className="bg-purple-200 h-4 rounded mt-4"></div>
                            <div className="bg-gray-200 h-2 rounded"></div>
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-8 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Smart reminder</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Commencement Speech - Video player mockup
                    <div className="w-full h-full bg-gray-900 rounded-xl overflow-hidden shadow-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm">02:34</span>
                            <div className="flex-1 h-1 bg-white bg-opacity-30 rounded-full">
                              <div className="h-full w-1/3 bg-white rounded-full"></div>
                            </div>
                            <span className="text-sm">15:42</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 grid grid-cols-3 gap-1">
                        <div className="w-8 h-6 bg-blue-600 rounded-sm"></div>
                        <div className="w-8 h-6 bg-green-600 rounded-sm"></div>
                        <div className="w-8 h-6 bg-purple-600 rounded-sm"></div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        ))}

        {/* Footer Section */}
        <footer className="py-16 border-t border-gray-200 w-full">
          <div className="max-w-[1440px] mx-auto px-10">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  Shiva Charan
                  <br />
                  Mandhpauram
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div className="space-y-3">
                  <a
                    href="https://x.com/shivacharan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-gray-600 transition-colors text-gray-900"
                  >
                    X
                  </a>
                  <a
                    href="https://linkedin.com/in/shivacharan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-gray-600 transition-colors text-gray-900"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/shivacharan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-gray-600 transition-colors text-gray-900"
                  >
                    GitHub
                  </a>
                </div>
                <div className="space-y-3">
                  <a
                    href="https://instagram.com/shivacharan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-gray-600 transition-colors text-gray-900"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://scholar.google.com/citations?user=shivacharan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-gray-600 transition-colors text-gray-900"
                  >
                    Google Scholar
                  </a>
                  <a
                    href="https://shivacharan.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-gray-600 transition-colors text-gray-900"
                  >
                    Substack
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
