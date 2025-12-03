import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { Download, Save, Edit, Eye } from 'lucide-react';
import jsPDF from 'jspdf';

const CoverLetter: React.FC = () => {
    const { state, dispatch } = useGlobalState();
    const [activeSection, setActiveSection] = useState('content');
    const [showPreview, setShowPreview] = useState(false);
    const [coverLetterData, setCoverLetterData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        date: new Date().toLocaleDateString(),
        companyName: '',
        companyAddress: '',
        position: '',
        salutation: 'Dear Hiring Manager,',
        body: '',
        closing: 'Sincerely,',
    });

    const sections = [
        { id: 'content', label: 'Cover Letter Content', icon: Edit },
    ];

    useEffect(() => {
        // Initialize with user data if available
        if (state.user) {
            setCoverLetterData(prev => ({
                ...prev,
                fullName: state.user?.name || '',
                email: state.user?.email || '',
            }));
        }
    }, [state.user]);

    const handleInputChange = (field: string, value: string) => {
        setCoverLetterData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const downloadCoverLetter = () => {
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

        // Sender Information
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(coverLetterData.fullName, left, y);
        y += lineHeight;

        if (coverLetterData.email) {
            doc.text(coverLetterData.email, left, y);
            y += lineHeight;
        }

        if (coverLetterData.phone) {
            doc.text(coverLetterData.phone, left, y);
            y += lineHeight;
        }

        if (coverLetterData.address) {
            doc.text(coverLetterData.address, left, y);
            y += lineHeight;
        }

        y += sectionGap;

        // Date
        doc.text(coverLetterData.date, left, y);
        y += lineHeight * 2;

        // Recipient Information
        if (coverLetterData.companyName) {
            doc.text(coverLetterData.companyName, left, y);
            y += lineHeight;
        }

        if (coverLetterData.companyAddress) {
            doc.text(coverLetterData.companyAddress, left, y);
            y += lineHeight * 2;
        }

        // Salutation
        doc.text(coverLetterData.salutation, left, y);
        y += lineHeight * 2;

        // Body
        wrapAndPrint(coverLetterData.body);
        y += lineHeight;

        // Closing
        doc.text(coverLetterData.closing, left, y);
        y += lineHeight * 2;

        // Signature
        doc.text(coverLetterData.fullName, left, y);

        doc.save('cover-letter.pdf');
    };

    const saveCoverLetter = () => {
        // In a real app, this would save to a database
        localStorage.setItem('coverLetterData', JSON.stringify(coverLetterData));
        alert('Cover letter saved successfully!');
    };

    const loadSavedCoverLetter = () => {
        const saved = localStorage.getItem('coverLetterData');
        if (saved) {
            setCoverLetterData(JSON.parse(saved));
            alert('Cover letter loaded successfully!');
        } else {
            alert('No saved cover letter found.');
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className={`text-4xl font-extrabold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-3 transition-colors`}>
                        Cover Letter Builder
                    </h1>
                    <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Create a professional cover letter to accompany your resume
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-10">
                    <button onClick={() => setShowPreview(!showPreview)} className="flex items-center px-4 py-2 space-x-2 text-white transition-all shadow-sm bg-sky-500 hover:bg-sky-600 rounded-xl">
                        <Eye className="w-4 h-4" />
                        <span>{showPreview ? 'Hide Preview' : 'Preview Letter'}</span>
                    </button>
                    <button onClick={saveCoverLetter} className="flex items-center px-4 py-2 space-x-2 text-white transition-all shadow-sm bg-emerald-500 hover:bg-emerald-600 rounded-xl">
                        <Save className="w-4 h-4" />
                        <span>Save Letter</span>
                    </button>
                    <button onClick={loadSavedCoverLetter} className="flex items-center px-4 py-2 space-x-2 text-white transition-all bg-purple-500 shadow-sm hover:bg-purple-600 rounded-xl">
                        <Edit className="w-4 h-4" />
                        <span>Load Saved</span>
                    </button>
                    <button onClick={downloadCoverLetter} className="flex items-center px-4 py-2 space-x-2 text-white transition-all bg-indigo-500 shadow-sm hover:bg-indigo-600 rounded-xl">
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                    </button>
                </div>

                {showPreview ? (
                    <div className={`${state.darkMode ? 'bg-white text-gray-900' : 'bg-white text-gray-900'} p-8 rounded-xl shadow-lg max-w-3xl mx-auto`}>
                        <div className="pb-4 mb-6 border-b border-gray-200">
                            <div className="text-sm">
                                <div className="font-semibold">{coverLetterData.fullName}</div>
                                {coverLetterData.email && <div>{coverLetterData.email}</div>}
                                {coverLetterData.phone && <div>{coverLetterData.phone}</div>}
                                {coverLetterData.address && <div>{coverLetterData.address}</div>
                                }
                            </div>
                            <div className="mt-4">
                                <div>{coverLetterData.date}</div>
                                <div className="mt-6">
                                    {coverLetterData.companyName && <div className="font-semibold">{coverLetterData.companyName}</div>}
                                    {coverLetterData.companyAddress && <div>{coverLetterData.companyAddress}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            {coverLetterData.salutation && <div className="mb-6">{coverLetterData.salutation}</div>}
                            {coverLetterData.body && <div className="mb-6 whitespace-pre-line">{coverLetterData.body}</div>}
                            {coverLetterData.closing && <div className="mt-8">{coverLetterData.closing}</div>}
                            <div className="mt-12 font-semibold">{coverLetterData.fullName}</div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                            {/* Left Nav */}
                            <div className="lg:col-span-1">
                                <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
                                    <h3 className={`text-lg font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Letter Sections
                                    </h3>
                                    <div className="space-y-2">
                                        {sections.map(section => {
                                            const Icon = section.icon;
                                            return (
                                                <button
                                                    key={section.id}
                                                    onClick={() => setActiveSection(section.id)}
                                                    className={`w-full p-3 rounded-lg border text-left transition-all ${activeSection === section.id
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
                                    <div className="space-y-6">
                                        {/* Sender Information */}
                                        <div>
                                            <h3 className={`text-xl font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                Your Information
                                            </h3>
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <label className={`block text-sm font-medium mb-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={coverLetterData.fullName}
                                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                        className={`w-full px-3 py-2 rounded-lg border ${state.darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                            }`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium mb-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={coverLetterData.email}
                                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                                        className={`w-full px-3 py-2 rounded-lg border ${state.darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                            }`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium mb-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Phone
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={coverLetterData.phone}
                                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                                        className={`w-full px-3 py-2 rounded-lg border ${state.darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                            }`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium mb-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={coverLetterData.address}
                                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                                        className={`w-full px-3 py-2 rounded-lg border ${state.darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                            }`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium mb-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={coverLetterData.date}
                                                        onChange={(e) => handleInputChange('date', e.target.value)}
                                                        className={`w-full px-3 py-2 rounded-lg border ${state.darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                            }`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recipient Information */}
                                        <div>
                                            <h3 className={`text-xl font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                Recipient Information
                                            </h3>
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <label className={`block text-sm font-medium mb-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Company Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={coverLetterData.companyName}
                                                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                                                        className={`w-full px-3 py-2 rounded-lg border ${state.darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                            }`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium mb-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Position
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={coverLetterData.position}
                                                        onChange={(e) => handleInputChange('position', e.target.value)}
                                                        className={`w-full px-3 py-2 rounded-lg border ${state.darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                            }`}
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className={`block text-sm font-medium mb-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Company Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={coverLetterData.companyAddress}
                                                        onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                                                        className={`w-full px-3 py-2 rounded-lg border ${state.darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                            }`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Letter Content */}
                                        <div>
                                            <h3 className={`text-xl font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                Letter Content
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className={`block text-sm font-medium mb-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Salutation
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={coverLetterData.salutation}
                                                        onChange={(e) => handleInputChange('salutation', e.target.value)}
                                                        className={`w-full px-3 py-2 rounded-lg border ${state.darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                            }`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium mb-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Body (Letter content)
                                                    </label>
                                                    <textarea
                                                        value={coverLetterData.body}
                                                        onChange={(e) => handleInputChange('body', e.target.value)}
                                                        rows={12}
                                                        className={`w-full px-3 py-2 rounded-lg border ${state.darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                            }`}
                                                        placeholder="Write your cover letter content here..."
                                                    />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium mb-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Closing
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={coverLetterData.closing}
                                                        onChange={(e) => handleInputChange('closing', e.target.value)}
                                                        className={`w-full px-3 py-2 rounded-lg border ${state.darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                            }`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CoverLetter;