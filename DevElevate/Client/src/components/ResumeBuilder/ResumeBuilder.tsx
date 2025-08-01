import React, { useState } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { Download, Save, Edit, Eye } from 'lucide-react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import ProjectsForm from './ProjectsForm';
import SkillsForm from './SkillsForm';
import ResumePreview from './ResumePreview';
import ATSScanner from './ATSScanner';
import jsPDF from 'jspdf';

const ResumeBuilder: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [selectedSections] = useState({
    personal: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
  });

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: Edit },
    { id: 'experience', label: 'Experience', icon: Edit },
    { id: 'education', label: 'Education', icon: Edit },
    { id: 'projects', label: 'Projects', icon: Edit },
    { id: 'skills', label: 'Skills', icon: Edit },
  ];

  const initializeResume = () => {
    if (!state.resume) {
      const defaultResume = {
        id: '1',
        personalInfo: {
          name: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          github: '',
        },
        summary: '',
        experience: [],
        education: [],
        projects: [],
        skills: {
          technical: [],
          soft: [],
        },
      };
      dispatch({ type: 'UPDATE_RESUME', payload: defaultResume });
    }
  };

  React.useEffect(() => {
    initializeResume();
  }, []);

  const renderActiveSection = () => {
    if (!state.resume) return null;
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'skills':
        return <SkillsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  const downloadResume = () => {
    if (!state.resume) {
      alert('No resume data found.');
      return;
    }

    const resume = state.resume;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

    const left = 40;
    const top = 40;
    const lineHeight = 16;
    const sectionGap = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - left * 2;
    let y = top;

    const wrapAndPrint = (text: string, indent: number = 0) => {
      const x = left + indent;
      const lines = doc.splitTextToSize(text, maxLineWidth - indent);
      doc.text(lines, x, y);
      y += lines.length * lineHeight;
    };

    const drawSectionTitle = (title: string) => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(title, left, y);
      y += lineHeight;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
    };

    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(resume.personalInfo.name || 'Your Name', left, y);
    y += lineHeight;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    let contactX = left;
    if (resume.personalInfo.email) {
      doc.textWithLink(resume.personalInfo.email, contactX, y, { url: `mailto:${resume.personalInfo.email}` });
      contactX += doc.getTextWidth(resume.personalInfo.email) + 15;
    }
    if (resume.personalInfo.phone) {
      doc.text(resume.personalInfo.phone, contactX, y);
      contactX += doc.getTextWidth(resume.personalInfo.phone) + 15;
    }
    if (resume.personalInfo.location) {
      doc.text(resume.personalInfo.location, contactX, y);
      contactX += doc.getTextWidth(resume.personalInfo.location) + 15;
    }
    if (resume.personalInfo.linkedin) {
      doc.textWithLink('LinkedIn', contactX, y, { url: resume.personalInfo.linkedin });
      contactX += doc.getTextWidth('LinkedIn') + 15;
    }
    if (resume.personalInfo.github) {
      doc.textWithLink('GitHub', contactX, y, { url: resume.personalInfo.github });
    }
    y += lineHeight + 2;

    if (resume.summary) {
      drawSectionTitle('Professional Summary');
      wrapAndPrint(resume.summary);
      y += sectionGap;
    }

    if (resume.experience?.length > 0) {
      drawSectionTitle('Experience');
      resume.experience.forEach(exp => {
        doc.setFont('helvetica', 'bold');
        doc.text(`${exp.position} at ${exp.company} (${exp.duration})`, left, y);
        y += lineHeight;
        doc.setFont('helvetica', 'normal');
        exp.description?.forEach(desc => {
          wrapAndPrint(`- ${desc}`, 10);
        });
        y += 6;
      });
      y += sectionGap;
    }

    if (resume.education?.length > 0) {
      drawSectionTitle('Education');
      resume.education.forEach(edu => {
        doc.text(
          `${edu.degree} at ${edu.institution} (${edu.duration})${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}`,
          left,
          y
        );
        y += lineHeight;
      });
      y += sectionGap;
    }

    if (resume.projects?.length > 0) {
      drawSectionTitle('Projects');
      resume.projects.forEach(project => {
        if (project.url) {
          doc.textWithLink(project.name, left, y, { url: project.url });
        } else {
          doc.text(project.name, left, y);
        }
        y += lineHeight;
        if (project.description) wrapAndPrint(project.description, 10);
        if (project.technologies?.length > 0)
          wrapAndPrint(`Tech: ${project.technologies.join(', ')}`, 10);
        y += 6;
      });
      y += sectionGap;
    }

    if (resume.skills?.technical?.length || resume.skills?.soft?.length) {
      drawSectionTitle('Skills');
      if (resume.skills.technical.length > 0)
        wrapAndPrint(`Technical: ${resume.skills.technical.join(', ')}`);
      if (resume.skills.soft.length > 0)
        wrapAndPrint(`Soft: ${resume.skills.soft.join(', ')}`);
      y += sectionGap;
    }

    doc.save('resume.pdf');
  };

  const saveResume = () => {
    alert('Resume saved successfully!');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className={`text-4xl font-extrabold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-3 transition-colors`}>
            Resume Builder
          </h1>
          <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Create an ATS-friendly resume that gets you noticed
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-10 flex flex-wrap gap-4">
          <button onClick={() => setShowPreview(!showPreview)} className="flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl shadow-sm transition-all">
            <Eye className="w-4 h-4" />
            <span>{showPreview ? 'Hide Preview' : 'Preview Resume'}</span>
          </button>
          <button onClick={saveResume} className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-sm transition-all">
            <Save className="w-4 h-4" />
            <span>Save Resume</span>
          </button>
          <button onClick={downloadResume} className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow-sm transition-all">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>

        {showPreview ? (
          <div ref={previewRef}>
            <ResumePreview sections={selectedSections} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Nav */}
              <div className="lg:col-span-1">
                <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
                  <h3 className={`text-lg font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Resume Sections
                  </h3>
                  <div className="space-y-2">
                    {sections.map(section => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full p-3 rounded-lg border text-left transition-all ${
                            activeSection === section.id
                              ? 'bg-blue-500 text-white border-blue-500'
                              : state.darkMode
                              ? 'border-gray-700 hover:border-gray-600 text-gray-300'
                              : 'border-gray-200 hover:border-gray-300 text-gray-900'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{section.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="lg:col-span-3">
                <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
                  <div ref={previewRef}>{renderActiveSection()}</div>
                </div>
              </div>
            </div>

            {/* ATS Scanner UI */}
            <div className="mt-10">
              <ATSScanner />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
