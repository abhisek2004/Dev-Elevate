import React, { useState, useRef } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { ScanLine, CheckCircle2, AlertCircle, Loader2, Download, FileText, TrendingUp, BarChart, Target, BadgeCheck, ArrowUpRight, Lightbulb, CheckCircle, XCircle, Key, Gauge, ChevronDown, Zap } from 'lucide-react';
import axios from '../../api/axiosinstance';
import resumeTemplates from '../../utils/resumeTemplates';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// ATS scan result type
interface ATSResult {
  score: number;
  totalKeywords: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  passedSections: string[];
  suggestions: string[];
  jobTitle?: string;
  sections?: string[];
}

const ATSScanner: React.FC = () => {
  const { state: globalState } = useGlobalState();

  // Get dark mode class based on global state
  const getDarkModeClass = (darkClass: string, lightClass: string) => {
    return globalState.darkMode ? darkClass : lightClass;
  };

  // Get background class based on theme
  const getBgClass = () => {
    return globalState.darkMode
      ? 'bg-gradient-to-b from-gray-900 to-black'
      : 'bg-gradient-to-b from-gray-50 to-white';
  };

  // Get border class based on theme
  const getBorderClass = () => {
    return globalState.darkMode ? 'border-gray-800' : 'border-gray-200';
  };

  // Get text class based on theme
  const getTextClass = (darkClass: string, lightClass: string) => {
    return globalState.darkMode ? darkClass : lightClass;
  };

  // Get input background class
  const getInputBgClass = () => {
    return globalState.darkMode ? 'bg-gray-900/70' : 'bg-white';
  };

  // Get card background class
  const getCardBgClass = () => {
    return globalState.darkMode ? 'bg-gray-900/50' : 'bg-white';
  };
  const [resumeText, setResumeText] = useState('');
  const [scanResult, setScanResult] = useState<ATSResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [historyScans, setHistoryScans] = useState<{ text: string, result: ATSResult }[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  // Convert resume data to text format
  const convertResumeToText = () => {
    if (!globalState.resume) return '';

    let text = '';

    // Personal Info
    const personal = globalState.resume.personalInfo;
    text += `${personal.name}\n`;
    text += `${personal.email}\n`;
    if (personal.phone) text += `${personal.phone}\n`;
    if (personal.location) text += `${personal.location}\n`;
    if (personal.linkedin) text += `LinkedIn: ${personal.linkedin}\n`;
    if (personal.github) text += `GitHub: ${personal.github}\n`;
    text += '\n';

    // Summary
    if (globalState.resume.summary) {
      text += `SUMMARY\n${globalState.resume.summary}\n\n`;
    }

    // Experience
    if (globalState.resume.experience.length > 0) {
      text += 'EXPERIENCE\n';
      globalState.resume.experience.forEach((exp: any) => {
        text += `${exp.position} at ${exp.company} (${exp.duration})\n`;
        exp.description?.forEach((desc: any) => {
          text += `- ${desc}\n`;
        });
        text += '\n';
      });
    }

    // Education
    if (globalState.resume.education.length > 0) {
      text += 'EDUCATION\n';
      globalState.resume.education.forEach((edu: any) => {
        text += `${edu.degree} at ${edu.institution} (${edu.duration})${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}\n`;
        text += '\n';
      });
    }

    // Projects
    if (globalState.resume.projects.length > 0) {
      text += 'PROJECTS\n';
      globalState.resume.projects.forEach((project: any) => {
        text += `${project.name}${project.url ? ` (${project.url})` : ''}\n`;
        if (project.description) text += `${project.description}\n`;
        if (project.technologies?.length > 0) text += `Technologies: ${project.technologies.join(', ')}\n`;
        text += '\n';
      });
    }

    // Skills
    if (globalState.resume.skills.technical.length > 0 || globalState.resume.skills.soft.length > 0) {
      text += 'SKILLS\n';
      if (globalState.resume.skills.technical.length > 0) {
        text += `Technical: ${globalState.resume.skills.technical.join(', ')}\n`;
      }
      if (globalState.resume.skills.soft.length > 0) {
        text += `Soft: ${globalState.resume.skills.soft.join(', ')}\n`;
      }
      text += '\n';
    }

    return text;
  };

  // Load resume data when component mounts or when resume changes
  React.useEffect(() => {
    const text = convertResumeToText();
    if (text && !resumeText) {
      setResumeText(text);
    }
  }, [globalState.resume]);

  const handleScan = async () => {
    if (!resumeText.trim()) {
      setError('Please enter or paste your resume text');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // If job title is provided, include it in the request
      const payload = {
        resumeText,
        ...(jobTitle ? { targetJobTitle: jobTitle } : {})
      };

      const response = await axios.post('/api/v1/ats/scan', payload);
      const result = response.data as ATSResult;

      setScanResult(result);

      // Add to history
      setHistoryScans(prev => {
        const newHistory = [...prev, { text: resumeText, result }];
        // Keep only last 5 scans
        if (newHistory.length > 5) {
          return newHistory.slice(newHistory.length - 5);
        }
        return newHistory;
      });

    } catch (err) {
      console.error('Error scanning resume:', err);
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTemplate = (templateKey: string) => {
    const template = resumeTemplates[templateKey as keyof typeof resumeTemplates];
    setResumeText(template.content);
  };

  const handleExportPDF = async () => {
    if (!resultRef.current || !scanResult) return;

    try {
      const canvas = await html2canvas(resultRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`ATS_Scan_Result_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error('Failed to export as PDF:', err);
      setError('Failed to export results as PDF.');
    }
  };

  const compareWithHistory = () => {
    if (historyScans.length < 2) {
      return null;
    }

    const current = historyScans[historyScans.length - 1].result;
    const previous = historyScans[historyScans.length - 2].result;

    const scoreDifference = current.score - previous.score;
    const newKeywords = current.matchedKeywords.filter(
      kw => !previous.matchedKeywords.includes(kw)
    );

    return {
      scoreDifference,
      newKeywords,
      isImproved: scoreDifference > 0
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  const getSummaryBasedOnScore = (score: number) => {
    if (score >= 70) {
      return 'Excellent! Your resume is well-optimized for ATS systems and has a high chance of passing automated screenings.';
    } else if (score >= 50) {
      return 'Your resume needs some improvements to better appeal to ATS systems and increase your chances of getting interviews.';
    } else {
      return 'Your resume needs significant optimization to effectively pass through ATS systems.';
    }
  };

  return (
    <div className={`relative p-6 overflow-hidden border shadow-xl rounded-xl ${getBgClass()} ${getBorderClass()}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-[10%] w-40 h-40 rounded-full filter blur-3xl animate-pulse-glow ${globalState.darkMode ? 'bg-purple-900/20' : 'bg-purple-200/20'}`}></div>
        <div className={`absolute bottom-0 right-[10%] w-60 h-60 rounded-full filter blur-3xl animate-pulse-glow ${globalState.darkMode ? 'bg-blue-900/20' : 'bg-blue-200/20'}`} style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className={`p-1 rounded ${globalState.darkMode ? 'bg-purple-500/20' : 'bg-purple-200/20'}`}>
                <ScanLine className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-xs font-medium tracking-wider text-purple-300 uppercase">AI-Powered</div>
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text">
              ATS Resume Scanner
            </h2>
          </div>

          <div className="flex gap-2">
            {scanResult && (
              <Button
                onClick={handleExportPDF}
                variant="gradient"
                size="sm"
                className="flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
            )}

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="glowing"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <FileText className="w-4 h-4" />
                  ATS Templates
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>ATS-Optimized Resume Templates</DialogTitle>
                  <DialogDescription>
                    Select a template to start with a pre-formatted ATS-friendly resume
                  </DialogDescription>
                </DialogHeader>
                <div className="grid max-h-[60vh] overflow-y-auto py-4">
                  <Tabs defaultValue="softwareEngineer">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="softwareEngineer">Software Engineer</TabsTrigger>
                      <TabsTrigger value="dataScientist">Data Scientist</TabsTrigger>
                      <TabsTrigger value="productManager">Product Manager</TabsTrigger>
                    </TabsList>
                    {Object.entries(resumeTemplates).map(([key, template]) => (
                      <TabsContent key={key} value={key} className="space-y-4">
                        <div className={`p-4 border rounded-lg ${globalState.darkMode ? 'border-gray-800 bg-black/50' : 'border-gray-200 bg-white'}`}>
                          <h4 className={`mb-2 font-medium ${getTextClass('text-white', 'text-gray-900')}`}>{template.title}</h4>
                          <p className={`mb-3 text-sm line-clamp-3 ${getTextClass('text-gray-400', 'text-gray-600')}`}>
                            {template.content.substring(0, 150)}...
                          </p>
                          <Button
                            variant="gradient"
                            size="sm"
                            onClick={() => handleSelectTemplate(key)}
                          >
                            Use this template
                          </Button>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <p className={`max-w-3xl mb-6 ${getTextClass('text-gray-300', 'text-gray-600')}`}>
          Optimize your resume for Applicant Tracking Systems. Higher scores increase your chances of passing automated resume screenings and landing interviews.
        </p>
      </div>

      <div className="relative z-10 grid gap-6 mb-6 md:grid-cols-2">
        <div className={`p-5 transition-colors border rounded-lg backdrop-blur-sm hover:border-gray-700 ${getCardBgClass()} ${getBorderClass()}`}>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-400" />
            <label className={`font-medium ${getTextClass('text-white', 'text-gray-900')}`}>Target Job Title</label>
          </div>
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Frontend Developer, Data Scientist..."
            className={`w-full p-3 transition-all border rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${getInputBgClass()} ${getBorderClass()} ${getTextClass('text-white', 'text-gray-900')}`}
          />
          <p className={`mt-3 text-sm flex items-center gap-1.5 ${getTextClass('text-blue-300/80', 'text-blue-600')}`}>
            <ArrowUpRight className="w-4 h-4" />
            Adding a job title customizes the analysis for specific roles
          </p>
        </div>

        <div className={`p-5 transition-colors border rounded-lg backdrop-blur-sm hover:border-gray-700 ${getCardBgClass()} ${getBorderClass()}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <label className={`font-medium ${getTextClass('text-white', 'text-gray-900')}`}>Resume Content</label>
            </div>
            {historyScans.length > 0 && (
              <span className={`px-2 py-1 text-xs rounded ${globalState.darkMode ? 'text-blue-300 bg-blue-900/30' : 'text-blue-700 bg-blue-100'}`}>
                {historyScans.length} previous {historyScans.length === 1 ? 'scan' : 'scans'}
              </span>
            )}
          </div>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your full resume content here..."
            className={`w-full p-3 transition-all border rounded-md outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 ${getInputBgClass()} ${getBorderClass()} ${getTextClass('text-white', 'text-gray-900')}`}
            rows={10}
          />
        </div>
      </div>

      {error && (
        <div className={`flex items-center gap-2 p-4 mb-6 border rounded-lg ${globalState.darkMode ? 'text-red-300 border-red-800 bg-red-900/20' : 'text-red-700 border-red-200 bg-red-100'}`}>
          <AlertCircle className="w-5 h-5 text-red-400" />
          {error}
        </div>
      )}

      {historyScans.length > 1 && compareWithHistory()?.scoreDifference && (
        <div className={`flex items-center gap-2 p-4 mb-6 border rounded-lg ${globalState.darkMode ? 'text-blue-300 border-blue-800 bg-blue-900/20' : 'text-blue-700 border-blue-200 bg-blue-100'}`}>
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <span>
            Your ATS score has improved by {compareWithHistory()?.scoreDifference.toFixed(1)}%
            from your previous scan.
          </span>
        </div>
      )}

      <div className="mt-6 mb-4 text-center">
        <Button
          onClick={handleScan}
          variant="gradient"
          size="lg"
          className="font-semibold"
          disabled={isLoading || !resumeText.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Resume...
            </>
          ) : (
            <>
              <ScanLine className="w-5 h-5 mr-2" />
              Scan Resume for ATS
            </>
          )}
        </Button>
      </div>

      {scanResult && (
        <div className="mt-10" id="scan-results" ref={resultRef}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-400 to-cyan-400"></div>
              <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text">
                ATS Scan Results
              </h3>
            </div>
            <Button
              variant="outline"
              onClick={handleExportPDF}
              className={`flex items-center gap-1.5 ${globalState.darkMode ? 'border-blue-700 hover:bg-blue-900/30 text-blue-400' : 'border-blue-300 hover:bg-blue-100 text-blue-700'}`}
            >
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>

          {/* Score summary */}
          <div className={`relative p-6 mb-8 overflow-hidden border rounded-xl backdrop-blur-sm ${globalState.darkMode ? 'border-gray-800 bg-gray-900/70' : 'border-gray-200 bg-white'}`}>
            {/* Decorative elements */}
            <div className={`absolute w-40 h-40 rounded-full -top-10 -right-10 blur-2xl ${globalState.darkMode ? 'bg-blue-500/10' : 'bg-blue-200/10'}`}></div>
            <div className={`absolute w-32 h-32 rounded-full -bottom-8 -left-8 blur-2xl ${globalState.darkMode ? 'bg-cyan-500/10' : 'bg-cyan-200/10'}`}></div>

            <div className="relative z-10">
              <div className="flex flex-col gap-4 mb-5 sm:flex-row sm:items-center sm:justify-between">
                <h3 className={`text-xl font-bold ${getTextClass('text-white', 'text-gray-900')}`}>
                  Overall ATS Score: <span className={getScoreColor(scanResult.score)}>
                    {scanResult.score}%
                  </span>
                </h3>

                <div className="flex items-center gap-2">
                  <ChevronDown className={`w-5 h-5 ${scanResult.score >= 70 ? 'text-green-400' :
                    scanResult.score >= 50 ? 'text-amber-400' : 'text-red-400'
                    }`} />
                  <span className={`text-sm ${scanResult.score >= 70 ? 'text-green-400' :
                    scanResult.score >= 50 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                    {scanResult.score >= 70
                      ? 'High Compatibility'
                      : scanResult.score >= 50
                        ? 'Medium Compatibility'
                        : 'Low Compatibility'
                    }
                  </span>
                </div>
              </div>

              <Progress
                value={scanResult.score}
                className={`h-2 mb-6 ${scanResult.score >= 70
                  ? 'bg-gradient-to-r from-green-500 to-green-400'
                  : scanResult.score >= 50
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                    : 'bg-gradient-to-r from-red-500 to-red-400'
                  }`}
              />

              <div className={`pl-3 mb-6 text-sm border-l-2 ${globalState.darkMode ? 'text-gray-300 border-blue-500' : 'text-gray-600 border-blue-400'}`}>
                {getSummaryBasedOnScore(scanResult.score)}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className={`flex items-center gap-2 mb-3 font-semibold ${getTextClass('text-white', 'text-gray-900')}`}>
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    Resume Sections
                  </h4>
                  <div className="space-y-2">
                    {scanResult.passedSections.map((section, index) => (
                      <div key={index} className={`flex items-center justify-between p-2 rounded-md ${globalState.darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                        <span className={getTextClass('text-gray-300', 'text-gray-700')}>{section}</span>
                        <Badge variant="success" className="text-xs">Found</Badge>
                      </div>
                    ))}

                    {/* Show missing important sections */}
                    {['Experience', 'Education', 'Skills'].filter(
                      section => !scanResult.passedSections.includes(section)
                    ).map((section, index) => (
                      <div key={`missing-${index}`} className={`flex items-center justify-between p-2 rounded-md ${globalState.darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                        <span className={getTextClass('text-gray-300', 'text-gray-700')}>{section}</span>
                        <Badge variant="destructive" className="text-xs">Missing</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className={`flex items-center gap-2 mb-3 font-semibold ${getTextClass('text-white', 'text-gray-900')}`}>
                    <BarChart className="w-4 h-4 text-cyan-400" />
                    Key Metrics
                  </h4>
                  <div className="space-y-2">
                    <div className={`flex items-center justify-between p-2 rounded-md ${globalState.darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                      <span className={getTextClass('text-gray-300', 'text-gray-700')}>Keyword Match</span>
                      <span className="font-medium text-blue-400">
                        {Math.round((scanResult.matchedKeywords.length / scanResult.totalKeywords) * 100)}%
                      </span>
                    </div>
                    <div className={`flex items-center justify-between p-2 rounded-md ${globalState.darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                      <span className={getTextClass('text-gray-300', 'text-gray-700')}>Format Score</span>
                      <span className={
                        scanResult.score < 60
                          ? 'font-medium text-red-400'
                          : scanResult.score < 80
                            ? 'font-medium text-amber-400'
                            : 'font-medium text-green-400'
                      }>
                        {(scanResult.score * 0.9).toFixed(0)}%
                      </span>
                    </div>
                    <div className={`flex items-center justify-between p-2 rounded-md ${globalState.darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                      <span className={getTextClass('text-gray-300', 'text-gray-700')}>Content Clarity</span>
                      <span className={
                        scanResult.score < 60
                          ? 'font-medium text-red-400'
                          : scanResult.score < 80
                            ? 'font-medium text-amber-400'
                            : 'font-medium text-green-400'
                      }>
                        {(scanResult.score * 0.8).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs for detailed results */}
          <div className="relative">
            <Tabs defaultValue="keywords" className="w-full">
              <TabsList className={`justify-start w-full mb-6 border ${globalState.darkMode ? 'border-gray-800 bg-gray-900/70' : 'border-gray-200 bg-white'}`}>
                <TabsTrigger value="keywords" className={`data-[state=active]:${globalState.darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                  <Key className="w-4 h-4 mr-2" /> Keywords
                </TabsTrigger>
                <TabsTrigger value="format" className={`data-[state=active]:${globalState.darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                  <FileText className="w-4 h-4 mr-2" /> Format Analysis
                </TabsTrigger>
                <TabsTrigger value="tips" className={`data-[state=active]:${globalState.darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                  <Lightbulb className="w-4 h-4 mr-2" /> Improvement Tips
                </TabsTrigger>
              </TabsList>

              {/* Keywords Tab */}
              <TabsContent value="keywords">
                <div className={`p-6 border rounded-xl backdrop-blur-sm ${globalState.darkMode ? 'border-gray-800 bg-gray-900/70' : 'border-gray-200 bg-white'}`}>
                  <div className="mb-6">
                    <h4 className={`flex items-center gap-2 mb-4 font-semibold ${getTextClass('text-white', 'text-gray-900')}`}>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Keywords Found ({scanResult.matchedKeywords.length})
                    </h4>
                    {scanResult.matchedKeywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {scanResult.matchedKeywords.map((keyword, i) => (
                          <span key={i} className={`px-3 py-1 text-sm border rounded-full ${globalState.darkMode ? 'text-green-300 bg-green-900/40 border-green-800/50' : 'text-green-700 bg-green-100 border-green-200'}`}>
                            {keyword}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className={`p-3 border rounded-md ${globalState.darkMode ? 'text-red-400 bg-red-900/20 border-red-800/30' : 'text-red-700 bg-red-100 border-red-200'}`}>
                        No relevant keywords found in your resume!
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className={`flex items-center gap-2 mb-4 font-semibold ${getTextClass('text-white', 'text-gray-900')}`}>
                      <XCircle className="w-4 h-4 text-red-400" />
                      Missing Keywords ({scanResult.missingKeywords.length})
                    </h4>
                    {scanResult.missingKeywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {scanResult.missingKeywords.map((keyword, i) => (
                          <span key={i} className={`px-3 py-1 text-sm border rounded-full ${globalState.darkMode ? 'text-red-300 bg-red-900/40 border-red-800/50' : 'text-red-700 bg-red-100 border-red-200'}`}>
                            {keyword}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className={`p-3 border rounded-md ${globalState.darkMode ? 'text-green-400 bg-green-900/20 border-green-800/30' : 'text-green-700 bg-green-100 border-green-200'}`}>
                        Great job! No missing keywords detected.
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Format Analysis Tab */}
              <TabsContent value="format">
                <div className={`p-6 border rounded-xl backdrop-blur-sm ${globalState.darkMode ? 'border-gray-800 bg-gray-900/70' : 'border-gray-200 bg-white'}`}>
                  <div className="flex items-center justify-between mb-5">
                    <h4 className={`flex items-center gap-2 font-semibold ${getTextClass('text-white', 'text-gray-900')}`}>
                      <Gauge className="w-4 h-4 text-blue-400" />
                      Format Score
                    </h4>
                    <span className={
                      scanResult.score < 60
                        ? 'text-red-400 text-lg font-bold'
                        : scanResult.score < 80
                          ? 'text-amber-400 text-lg font-bold'
                          : 'text-green-400 text-lg font-bold'
                    }>
                      {(scanResult.score * 0.9).toFixed(1)}%
                    </span>
                  </div>

                  <div className={`divide-y ${globalState.darkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
                    {/* Format analysis points */}
                    <div className="flex items-start py-3 first:pt-0">
                      {scanResult.passedSections.includes('Contact Information') ? (
                        <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${globalState.darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                      ) : (
                        <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${globalState.darkMode ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                        </div>
                      )}
                      <span className={getTextClass('text-gray-300', 'text-gray-700')}>
                        {scanResult.passedSections.includes('Contact Information')
                          ? 'Contact information is clearly provided and properly formatted'
                          : 'Contact information may be missing or not clearly formatted'
                        }
                      </span>
                    </div>

                    <div className="flex items-start py-3">
                      {scanResult.passedSections.includes('Experience') ? (
                        <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${globalState.darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                      ) : (
                        <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${globalState.darkMode ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                        </div>
                      )}
                      <span className={getTextClass('text-gray-300', 'text-gray-700')}>
                        {scanResult.passedSections.includes('Experience')
                          ? 'Work experience section is well-structured with clear role descriptions'
                          : 'Work experience section may be missing or poorly structured'
                        }
                      </span>
                    </div>

                    <div className="flex items-start py-3">
                      {scanResult.score > 60 ? (
                        <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${globalState.darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                      ) : (
                        <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${globalState.darkMode ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                        </div>
                      )}
                      <span className={getTextClass('text-gray-300', 'text-gray-700')}>
                        {scanResult.score > 60
                          ? 'Resume uses a clean, ATS-friendly format without complex tables or graphics'
                          : 'Resume may contain elements that are difficult for ATS systems to parse'
                        }
                      </span>
                    </div>

                    <div className="flex items-start py-3 last:pb-0">
                      {scanResult.matchedKeywords.length > scanResult.totalKeywords * 0.6 ? (
                        <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${globalState.darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                      ) : (
                        <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${globalState.darkMode ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                        </div>
                      )}
                      <span className={getTextClass('text-gray-300', 'text-gray-700')}>
                        {scanResult.matchedKeywords.length > scanResult.totalKeywords * 0.6
                          ? 'Good keyword optimization for the target role'
                          : 'Resume could use more relevant keywords for the target role'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Improvement Tips Tab */}
              <TabsContent value="tips">
                <div className={`p-6 border rounded-xl backdrop-blur-sm ${globalState.darkMode ? 'border-gray-800 bg-gray-900/70' : 'border-gray-200 bg-white'}`}>
                  <h4 className={`flex items-center gap-2 mb-5 font-semibold ${getTextClass('text-white', 'text-gray-900')}`}>
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Recommendations to Improve
                  </h4>

                  <div className="space-y-4">
                    {scanResult.suggestions.map((tip, i) => (
                      <div key={i} className={`flex items-start p-3 border rounded-lg ${globalState.darkMode ? 'bg-blue-900/20 border-blue-800/30' : 'bg-blue-50 border-blue-200'}`}>
                        <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${globalState.darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                          <Lightbulb className="w-4 h-4 text-yellow-400" />
                        </div>
                        <span className={getTextClass('text-gray-300', 'text-gray-700')}>
                          {tip}
                        </span>
                      </div>
                    ))}

                    {/* Add default suggestions if none provided */}
                    {scanResult.suggestions.length === 0 && (
                      <>
                        <div className={`flex items-start p-3 border rounded-lg ${globalState.darkMode ? 'bg-blue-900/20 border-blue-800/30' : 'bg-blue-50 border-blue-200'}`}>
                          <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${globalState.darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                            <Lightbulb className="w-4 h-4 text-yellow-400" />
                          </div>
                          <span className={getTextClass('text-gray-300', 'text-gray-700')}>
                            Include more industry-specific keywords that match the job description
                          </span>
                        </div>
                        <div className={`flex items-start p-3 border rounded-lg ${globalState.darkMode ? 'bg-blue-900/20 border-blue-800/30' : 'bg-blue-50 border-blue-200'}`}>
                          <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${globalState.darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                            <Lightbulb className="w-4 h-4 text-yellow-400" />
                          </div>
                          <span className={getTextClass('text-gray-300', 'text-gray-700')}>
                            Use standard section headings that ATS systems can easily recognize
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Action section */}
          <div className={`p-6 mt-6 border rounded-lg backdrop-blur-sm ${globalState.darkMode ? 'border-blue-800/40 bg-blue-900/20' : 'border-blue-200 bg-blue-50'}`}>
            <h4 className={`flex items-center gap-2 mb-4 font-semibold ${globalState.darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              <BadgeCheck className="w-5 h-5" />
              Next Steps to Improve Your ATS Score
            </h4>
            <ul className="space-y-3">
              {scanResult.score < 70 && (
                <>
                  <li className="flex items-start gap-3">
                    <span className={`flex items-center justify-center flex-shrink-0 w-6 h-6 border rounded-full ${globalState.darkMode ? 'text-blue-300 bg-blue-900/60 border-blue-700/50' : 'text-blue-700 bg-blue-100 border-blue-300'}`}>1</span>
                    <span className={getTextClass('text-gray-300', 'text-gray-700')}>Include more of the missing keywords in your resume, especially those relevant to your experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`flex items-center justify-center flex-shrink-0 w-6 h-6 border rounded-full ${globalState.darkMode ? 'text-blue-300 bg-blue-900/60 border-blue-700/50' : 'text-blue-700 bg-blue-100 border-blue-300'}`}>2</span>
                    <span className={getTextClass('text-gray-300', 'text-gray-700')}>Add quantifiable achievements with metrics (e.g., "Improved performance by 30%")</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`flex items-center justify-center flex-shrink-0 w-6 h-6 border rounded-full ${globalState.darkMode ? 'text-blue-300 bg-blue-900/60 border-blue-700/50' : 'text-blue-700 bg-blue-100 border-blue-300'}`}>3</span>
                    <span className={getTextClass('text-gray-300', 'text-gray-700')}>Use standard section headings: "Experience," "Education," "Skills," etc.</span>
                  </li>
                </>
              )}
              <li className="flex items-start gap-3">
                <span className={`flex items-center justify-center flex-shrink-0 w-6 h-6 border rounded-full ${globalState.darkMode ? 'text-blue-300 bg-blue-900/60 border-blue-700/50' : 'text-blue-700 bg-blue-100 border-blue-300'}`}>{scanResult.score < 70 ? '4' : '1'}</span>
                <span className={getTextClass('text-gray-300', 'text-gray-700')}>Export this report to PDF using the button above to save your analysis</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSScanner;
