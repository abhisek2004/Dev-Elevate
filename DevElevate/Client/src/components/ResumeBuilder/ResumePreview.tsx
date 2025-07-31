import React from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
interface ResumePreviewProps {
  sections?: {
    personal: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    skills: boolean;
  };
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ sections }) => {
  const { state } = useGlobalState();

  if (!state.resume) return null;

  // Default: if no sections prop, show all
  const show = sections || {
    personal: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
  };

  return (
    <div className={`max-w-4xl mx-auto ${state.darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-8 rounded-lg shadow-lg`}>
      {/* Header */}
      {show.personal && (
        <div className="border-b-2 border-gray-200 dark:border-gray-700 pb-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {state.resume.personalInfo.name || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm">
            {state.resume.personalInfo.email && (
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>{state.resume.personalInfo.email}</span>
              </div>
            )}
            {state.resume.personalInfo.phone && (
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>{state.resume.personalInfo.phone}</span>
              </div>
            )}
            {state.resume.personalInfo.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{state.resume.personalInfo.location}</span>
              </div>
            )}
            {state.resume.personalInfo.linkedin && (
              <div className="flex items-center space-x-1">
                <Linkedin className="w-4 h-4" />
                <a href={state.resume.personalInfo.linkedin} className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              </div>
            )}
            {state.resume.personalInfo.github && (
              <div className="flex items-center space-x-1">
                <Github className="w-4 h-4" />
                <a href={state.resume.personalInfo.github} className="text-blue-600 hover:underline">
                  GitHub
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Professional Summary */}
{show.personal && state.resume.summary && (
  <div className="mb-6 break-words whitespace-pre-wrap">
    <h2 className="text-xl font-bold mb-3">Professional Summary</h2>
    <p className="text-sm leading-relaxed">{state.resume.summary}</p>
  </div>
)}



      {/* Experience */}
      {show.experience && state.resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Experience</h2>
          {state.resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold">{exp.position}</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">{exp.duration}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{exp.company}</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {exp.description.map((desc, descIndex) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {show.education && state.resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Education</h2>
          {state.resume.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold">{edu.degree}</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">{edu.duration}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {edu.institution}
                {edu.gpa && ` • GPA: ${edu.gpa}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {show.projects && state.resume.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Projects</h2>
          {state.resume.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold mb-1">{project.name}</h3>
              <p className="text-sm mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  className="text-blue-600 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {show.skills && (state.resume.skills.technical.length > 0 || state.resume.skills.soft.length > 0) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Skills</h2>
          {state.resume.skills.technical.length > 0 && (
            <div className="mb-3">
              <h3 className="font-semibold mb-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {state.resume.skills.technical.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {state.resume.skills.soft.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {state.resume.skills.soft.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;