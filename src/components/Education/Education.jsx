import React from "react";
import { education } from "../../constants"; // Import the education data

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-3"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">EDUCATION</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          My education has been a journey of learning and development. Here are the details of my academic background
        </p>
      </div>

      {/* Education Timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 sm:left-1/2 transform sm:-translate-x-1/2 w-1 bg-white h-full"></div>

        {/* Education Entries */}
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className="relative mb-12 sm:mb-16"
          >
            {/* Timeline Circle */}
            <div className="absolute left-6 sm:left-1/2 transform -translate-x-1/2 sm:-translate-x-1/2 bg-gray-400 border-4 border-[#8245ec] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center z-10">
              <img
                src={edu.img}
                alt={edu.school}
                className="w-6 h-6 sm:w-10 sm:h-10 object-cover rounded-full"
              />
            </div>

            {/* Content Section */}
            <div
              className={`p-4 sm:p-6 rounded-2xl shadow-2xl border border-white bg-gray-900 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] transform transition-transform duration-300 hover:scale-105 ${
                index % 2 === 0 
                  ? "w-64 ml-16 sm:w-full sm:ml-auto sm:mr-8 sm:max-w-md sm:text-right text-left" 
                  : "w-64 ml-16 sm:w-full sm:ml-8 sm:mr-auto sm:max-w-md sm:text-left text-left"
              }`}
            >
              {/* School Info */}
              <div className="mb-3">
                <h3 className="text-sm sm:text-lg font-semibold text-white leading-tight">
                  {edu.degree}
                </h3>
                <h4 className="text-xs sm:text-base text-gray-300 mt-1">
                  {edu.school}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{edu.date}</p>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm font-bold mb-3 text-center">Grade: {edu.grade}</p>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-center">{edu.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
