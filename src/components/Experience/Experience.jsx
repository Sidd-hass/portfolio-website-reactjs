import React from "react";
import { experiences } from "../../constants"; // Import your data

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-2"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">EXPERIENCE</h2>
        <div className="w-24 sm:w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-base sm:text-lg font-semibold px-4">
          A collection of my work experience and the roles I have taken in
          various organizations
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 sm:left-1/2 transform sm:-translate-x-1/2 w-1 bg-white h-full"></div>

        {/* Experience Entries */}
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className="relative mb-12 sm:mb-16"
          >
            {/* Timeline Circle */}
            <div className="absolute left-6 sm:left-1/2 transform -translate-x-1/2 sm:-translate-x-1/2 bg-gray-400 border-4 border-[#8245ec] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center z-10">
              <img
                src={experience.img}
                alt={experience.company}
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
              {/* Company Info */}
              <div className="mb-3">
                <h3 className="text-sm sm:text-lg font-semibold text-white leading-tight">
                  {experience.role}
                </h3>
                <h4 className="text-xs sm:text-base text-gray-300 mt-1">
                  {experience.company}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{experience.date}</p>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 text-center">{experience.desc}</p>
              
              <div>
                <h5 className="font-medium text-white mb-2 text-xs sm:text-base">Skills:</h5>
                <ul className="flex flex-wrap gap-1 sm:gap-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="bg-[#8245ec] text-white px-2 py-1 text-xs rounded-lg border border-gray-400"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
