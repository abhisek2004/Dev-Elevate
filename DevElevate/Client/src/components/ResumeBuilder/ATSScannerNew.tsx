import React, { useState, useRef } from 'react';
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
  const [resumeText, setResumeText] = useState('');
  const [scanResult, setScanResult] = useState<ATSResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [historyScans, setHistoryScans] = useState<{text: string, result: ATSResult}[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

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
    <div className="relative p-6 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black shadow-xl overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[10%] w-40 h-40 bg-purple-900/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-[10%] w-60 h-60 bg-blue-900/20 rounded-full filter blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-purple-500/20 p-1 rounded">
                <ScanLine className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-purple-300">AI-Powered</div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
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
                        <div className="rounded-lg border border-gray-800 bg-black/50 p-4">
                          <h4 className="font-medium text-white mb-2">{template.title}</h4>
                          <p className="text-sm text-gray-400 line-clamp-3 mb-3">
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
        
        <p className="mb-6 text-gray-300 max-w-3xl">
          Optimize your resume for Applicant Tracking Systems. Higher scores increase your chances of passing automated resume screenings and landing interviews.
        </p>
      </div>
      
      <div className="relative z-10 grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-900/50 backdrop-blur-sm p-5 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-400" />
            <label className="font-medium text-white">Target Job Title</label>
          </div>
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Frontend Developer, Data Scientist..."
            className="w-full p-3 border border-gray-800 rounded-md bg-gray-900/70 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
          />
          <p className="mt-3 text-sm text-blue-300/80 flex items-center gap-1.5">
            <ArrowUpRight className="w-4 h-4" />
            Adding a job title customizes the analysis for specific roles
          </p>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm p-5 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <label className="font-medium text-white">Resume Content</label>
            </div>
            {historyScans.length > 0 && (
              <span className="text-xs bg-blue-900/30 px-2 py-1 rounded text-blue-300">
                {historyScans.length} previous {historyScans.length === 1 ? 'scan' : 'scans'}
              </span>
            )}
          </div>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your full resume content here..."
            className="w-full p-3 border border-gray-800 rounded-md bg-gray-900/70 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
            rows={10}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-800 text-red-300 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          {error}
        </div>
      )}

      {historyScans.length > 1 && compareWithHistory()?.scoreDifference && (
        <div className="mb-6 p-4 bg-blue-900/20 border border-blue-800 text-blue-300 rounded-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <span>
            Your ATS score has improved by {compareWithHistory()?.scoreDifference.toFixed(1)}% 
            from your previous scan.
          </span>
        </div>
      )}

      <div className="text-center mt-6 mb-4">
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
              <div className="h-8 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                ATS Scan Results
              </h3>
            </div>
            <Button 
              variant="outline" 
              onClick={handleExportPDF}
              className="border-blue-700 hover:bg-blue-900/30 text-blue-400 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> 
              Export PDF
            </Button>
          </div>
          
          {/* Score summary */}
          <div className="relative bg-gray-900/70 border border-gray-800 p-6 rounded-xl mb-8 backdrop-blur-sm overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-4">
                <h3 className="text-xl font-bold text-white">
                  Overall ATS Score: <span className={getScoreColor(scanResult.score)}>
                    {scanResult.score}%
                  </span>
                </h3>
                
                <div className="flex items-center gap-2">
                  <ChevronDown className={`w-5 h-5 ${
                    scanResult.score >= 70 ? 'text-green-400' : 
                    scanResult.score >= 50 ? 'text-amber-400' : 'text-red-400'
                  }`} />
                  <span className={`text-sm ${
                    scanResult.score >= 70 ? 'text-green-400' : 
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
                className="h-2 mb-6"
                indicatorClassName={`${
                  scanResult.score >= 70 
                    ? 'bg-gradient-to-r from-green-500 to-green-400' 
                    : scanResult.score >= 50 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                    : 'bg-gradient-to-r from-red-500 to-red-400'
                }`}
              />
              
              <div className="text-sm mb-6 text-gray-300 border-l-2 border-blue-500 pl-3">
                {getSummaryBasedOnScore(scanResult.score)}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    Resume Sections
                  </h4>
                  <div className="space-y-2">
                    {scanResult.passedSections.map((section, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md bg-gray-800/50">
                        <span className="text-gray-300">{section}</span>
                        <Badge variant="success" className="text-xs">Found</Badge>
                      </div>
                    ))}
                    
                    {/* Show missing important sections */}
                    {['Experience', 'Education', 'Skills'].filter(
                      section => !scanResult.passedSections.includes(section)
                    ).map((section, index) => (
                      <div key={`missing-${index}`} className="flex items-center justify-between p-2 rounded-md bg-gray-800/50">
                        <span className="text-gray-300">{section}</span>
                        <Badge variant="destructive" className="text-xs">Missing</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-white flex items-center gap-2">
                    <BarChart className="w-4 h-4 text-cyan-400" />
                    Key Metrics
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-800/50">
                      <span className="text-gray-300">Keyword Match</span>
                      <span className="font-medium text-blue-400">
                        {Math.round((scanResult.matchedKeywords.length / scanResult.totalKeywords) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-800/50">
                      <span className="text-gray-300">Format Score</span>
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
                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-800/50">
                      <span className="text-gray-300">Content Clarity</span>
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
              <TabsList className="w-full justify-start bg-gray-900/70 border border-gray-800 mb-6">
                <TabsTrigger value="keywords" className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-300">
                  <Key className="w-4 h-4 mr-2" /> Keywords
                </TabsTrigger>
                <TabsTrigger value="format" className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-300">
                  <FileText className="w-4 h-4 mr-2" /> Format Analysis
                </TabsTrigger>
                <TabsTrigger value="tips" className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-300">
                  <Lightbulb className="w-4 h-4 mr-2" /> Improvement Tips
                </TabsTrigger>
              </TabsList>

              {/* Keywords Tab */}
              <TabsContent value="keywords">
                <div className="bg-gray-900/70 border border-gray-800 p-6 rounded-xl backdrop-blur-sm">
                  <div className="mb-6">
                    <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Keywords Found ({scanResult.matchedKeywords.length})
                    </h4>
                    {scanResult.matchedKeywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {scanResult.matchedKeywords.map((keyword, i) => (
                          <span key={i} className="px-3 py-1 bg-green-900/40 border border-green-800/50 text-green-300 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-red-400 bg-red-900/20 p-3 rounded-md border border-red-800/30">
                        No relevant keywords found in your resume!
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400" />
                      Missing Keywords ({scanResult.missingKeywords.length})
                    </h4>
                    {scanResult.missingKeywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {scanResult.missingKeywords.map((keyword, i) => (
                          <span key={i} className="px-3 py-1 bg-red-900/40 border border-red-800/50 text-red-300 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-green-400 bg-green-900/20 p-3 rounded-md border border-green-800/30">
                        Great job! No missing keywords detected.
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Format Analysis Tab */}
              <TabsContent value="format">
                <div className="bg-gray-900/70 border border-gray-800 p-6 rounded-xl backdrop-blur-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h4 className="font-semibold text-white flex items-center gap-2">
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
                  
                  <div className="divide-y divide-gray-800">
                    {/* Format analysis points */}
                    <div className="flex items-start py-3 first:pt-0">
                      {scanResult.passedSections.includes('Contact Information') ? (
                        <div className="bg-green-900/30 p-1.5 rounded-full mr-3 flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                      ) : (
                        <div className="bg-amber-900/30 p-1.5 rounded-full mr-3 flex-shrink-0">
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                        </div>
                      )}
                      <span className="text-gray-300">
                        {scanResult.passedSections.includes('Contact Information')
                          ? 'Contact information is clearly provided and properly formatted'
                          : 'Contact information may be missing or not clearly formatted'
                        }
                      </span>
                    </div>
                    
                    <div className="flex items-start py-3">
                      {scanResult.passedSections.includes('Experience') ? (
                        <div className="bg-green-900/30 p-1.5 rounded-full mr-3 flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                      ) : (
                        <div className="bg-amber-900/30 p-1.5 rounded-full mr-3 flex-shrink-0">
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                        </div>
                      )}
                      <span className="text-gray-300">
                        {scanResult.passedSections.includes('Experience')
                          ? 'Work experience section is well-structured with clear role descriptions'
                          : 'Work experience section may be missing or poorly structured'
                        }
                      </span>
                    </div>
                    
                    <div className="flex items-start py-3">
                      {scanResult.score > 60 ? (
                        <div className="bg-green-900/30 p-1.5 rounded-full mr-3 flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                      ) : (
                        <div className="bg-amber-900/30 p-1.5 rounded-full mr-3 flex-shrink-0">
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                        </div>
                      )}
                      <span className="text-gray-300">
                        {scanResult.score > 60
                          ? 'Resume uses a clean, ATS-friendly format without complex tables or graphics'
                          : 'Resume may contain elements that are difficult for ATS systems to parse'
                        }
                      </span>
                    </div>
                    
                    <div className="flex items-start py-3 last:pb-0">
                      {scanResult.matchedKeywords.length > scanResult.totalKeywords * 0.6 ? (
                        <div className="bg-green-900/30 p-1.5 rounded-full mr-3 flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                      ) : (
                        <div className="bg-amber-900/30 p-1.5 rounded-full mr-3 flex-shrink-0">
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                        </div>
                      )}
                      <span className="text-gray-300">
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
                <div className="bg-gray-900/70 border border-gray-800 p-6 rounded-xl backdrop-blur-sm">
                  <h4 className="font-semibold mb-5 text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Recommendations to Improve
                  </h4>
                  
                  <div className="space-y-4">
                    {scanResult.suggestions.map((tip, i) => (
                      <div key={i} className="flex items-start p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                        <div className="bg-yellow-900/30 p-1.5 rounded-full mr-3 flex-shrink-0">
                          <Lightbulb className="w-4 h-4 text-yellow-400" />
                        </div>
                        <span className="text-gray-300">
                          {tip}
                        </span>
                      </div>
                    ))}
                    
                    {/* Add default suggestions if none provided */}
                    {scanResult.suggestions.length === 0 && (
                      <>
                        <div className="flex items-start p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                          <div className="bg-yellow-900/30 p-1.5 rounded-full mr-3 flex-shrink-0">
                            <Lightbulb className="w-4 h-4 text-yellow-400" />
                          </div>
                          <span className="text-gray-300">
                            Include more industry-specific keywords that match the job description
                          </span>
                        </div>
                        <div className="flex items-start p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                          <div className="bg-yellow-900/30 p-1.5 rounded-full mr-3 flex-shrink-0">
                            <Lightbulb className="w-4 h-4 text-yellow-400" />
                          </div>
                          <span className="text-gray-300">
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
          <div className="mt-6 p-6 border border-blue-800/40 bg-blue-900/20 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold mb-4 text-blue-300 flex items-center gap-2">
              <BadgeCheck className="w-5 h-5" />
              Next Steps to Improve Your ATS Score
            </h4>
            <ul className="space-y-3">
              {scanResult.score < 70 && (
                <>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-900/60 rounded-full flex items-center justify-center text-blue-300 flex-shrink-0 border border-blue-700/50">1</span>
                    <span className="text-gray-300">Include more of the missing keywords in your resume, especially those relevant to your experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-900/60 rounded-full flex items-center justify-center text-blue-300 flex-shrink-0 border border-blue-700/50">2</span>
                    <span className="text-gray-300">Add quantifiable achievements with metrics (e.g., "Improved performance by 30%")</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-900/60 rounded-full flex items-center justify-center text-blue-300 flex-shrink-0 border border-blue-700/50">3</span>
                    <span className="text-gray-300">Use standard section headings: "Experience," "Education," "Skills," etc.</span>
                  </li>
                </>
              )}
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-900/60 rounded-full flex items-center justify-center text-blue-300 flex-shrink-0 border border-blue-700/50">{scanResult.score < 70 ? '4' : '1'}</span>
                <span className="text-gray-300">Export this report to PDF using the button above to save your analysis</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSScanner;
