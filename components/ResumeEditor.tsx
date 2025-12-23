
import React, { useState, useRef, useEffect } from 'react';
import { UserResume, ResumeContent, ResumeColors } from '../types';
import { editProfileImage, suggestSummary } from '../services/geminiService';

interface ResumeEditorProps {
  resume: UserResume;
  onSave: (updated: UserResume) => void;
  onClose: () => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ resume, onSave, onClose }) => {
  const [content, setContent] = useState<ResumeContent>(resume.content);
  const [colors, setColors] = useState<ResumeColors>(resume.colors);
  const [activeTab, setActiveTab] = useState<'content' | 'appearance' | 'ai'>('content');
  const [imagePrompt, setImagePrompt] = useState('');
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  const handleContentChange = (key: keyof ResumeContent, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const handleColorChange = (key: keyof ResumeColors, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave({ ...resume, content, colors });
  };

  const handleAIImageEdit = async () => {
    if (!content.profileImage || !imagePrompt) return;
    setIsProcessingAI(true);
    const result = await editProfileImage(content.profileImage, imagePrompt);
    if (result) {
      handleContentChange('profileImage', result);
      setImagePrompt('');
    }
    setIsProcessingAI(false);
  };

  const handleAISummary = async () => {
    setIsProcessingAI(true);
    const result = await suggestSummary(content);
    if (result) {
      handleContentChange('summary', result);
    }
    setIsProcessingAI(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleContentChange('profileImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const shareOnSocial = (platform: string) => {
    const text = `Check out my new professional resume built with ResuMaker Pro!`;
    const url = window.location.href;
    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Controls */}
      <div className="w-full md:w-96 bg-white border-r flex flex-col shadow-xl z-20 overflow-y-auto no-print">
        <div className="p-6 border-b flex justify-between items-center bg-blue-600 text-white">
          <h2 className="font-bold text-xl">Resume Editor</h2>
          <button onClick={onClose} className="hover:bg-blue-700 p-2 rounded"><i className="fas fa-times"></i></button>
        </div>

        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-3 font-medium transition-colors ${activeTab === 'content' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            Content
          </button>
          <button 
            onClick={() => setActiveTab('appearance')}
            className={`flex-1 py-3 font-medium transition-colors ${activeTab === 'appearance' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            Colors
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-3 font-medium transition-colors ${activeTab === 'ai' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            AI Magic
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First Name</label>
                  <input type="text" value={content.firstName} onChange={(e) => handleContentChange('firstName', e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Last Name</label>
                  <input type="text" value={content.lastName} onChange={(e) => handleContentChange('lastName', e.target.value)} className="w-full p-2 border rounded" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Professional Title</label>
                <input type="text" value={content.jobTitle} onChange={(e) => handleContentChange('jobTitle', e.target.value)} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Professional Summary</label>
                <textarea rows={4} value={content.summary} onChange={(e) => handleContentChange('summary', e.target.value)} className="w-full p-2 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Profile Photo</label>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Primary Color</label>
                <div className="flex items-center gap-4">
                  <input type="color" value={colors.primary} onChange={(e) => handleColorChange('primary', e.target.value)} className="h-10 w-10 cursor-pointer" />
                  <span className="text-sm text-gray-600">{colors.primary}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Secondary Color</label>
                <div className="flex items-center gap-4">
                  <input type="color" value={colors.secondary} onChange={(e) => handleColorChange('secondary', e.target.value)} className="h-10 w-10 cursor-pointer" />
                  <span className="text-sm text-gray-600">{colors.secondary}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Background Color</label>
                <div className="flex items-center gap-4">
                  <input type="color" value={colors.background} onChange={(e) => handleColorChange('background', e.target.value)} className="h-10 w-10 cursor-pointer" />
                  <span className="text-sm text-gray-600">{colors.background}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Text Color</label>
                <div className="flex items-center gap-4">
                  <input type="color" value={colors.text} onChange={(e) => handleColorChange('text', e.target.value)} className="h-10 w-10 cursor-pointer" />
                  <span className="text-sm text-gray-600">{colors.text}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                  <i className="fas fa-magic"></i> Image AI Editor
                </h3>
                <p className="text-xs text-purple-600 mb-4">Prompt Gemini to edit your profile picture (e.g., "Add a professional suit", "Convert to black and white").</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Try 'Make it cinematic'..." 
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    className="flex-1 p-2 text-sm border rounded"
                  />
                  <button 
                    onClick={handleAIImageEdit}
                    disabled={isProcessingAI || !imagePrompt}
                    className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    {isProcessingAI ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <i className="fas fa-pen-nib"></i> Smart Summary
                </h3>
                <p className="text-xs text-blue-600 mb-4">Let AI craft a professional summary based on your experience and skills.</p>
                <button 
                  onClick={handleAISummary}
                  disabled={isProcessingAI}
                  className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessingAI ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sparkles"></i>}
                  Generate AI Summary
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 sticky bottom-0">
          <button onClick={handleSave} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2">
            <i className="fas fa-save"></i> Save Changes
          </button>
          <div className="mt-4 flex gap-2">
            <button onClick={() => window.print()} className="flex-1 bg-white border border-gray-300 py-2 rounded text-sm font-medium hover:bg-gray-100">
              <i className="fas fa-file-pdf mr-1"></i> PDF
            </button>
            <button className="flex-1 bg-white border border-gray-300 py-2 rounded text-sm font-medium hover:bg-gray-100">
              <i className="fas fa-file-word mr-1"></i> DOCS
            </button>
            <button className="flex-1 bg-white border border-gray-300 py-2 rounded text-sm font-medium hover:bg-gray-100">
              <i className="fas fa-image mr-1"></i> PNG
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-4 text-gray-500">
            <button onClick={() => shareOnSocial('twitter')} className="hover:text-blue-400 transition-colors"><i className="fab fa-twitter text-xl"></i></button>
            <button onClick={() => shareOnSocial('linkedin')} className="hover:text-blue-700 transition-colors"><i className="fab fa-linkedin text-xl"></i></button>
          </div>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 bg-gray-200 p-4 md:p-12 overflow-y-auto flex flex-col items-center">
        <div 
          className="resume-container bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] p-12 transition-all"
          style={{ backgroundColor: colors.background, color: colors.text }}
        >
          {/* Header */}
          <div className="flex gap-8 items-start border-b-2 pb-8 mb-8" style={{ borderColor: colors.primary }}>
            {content.profileImage && (
              <img 
                src={content.profileImage} 
                alt="Profile" 
                className="w-32 h-32 rounded-lg object-cover shadow-md border-4" 
                style={{ borderColor: colors.primary }}
              />
            )}
            <div>
              <h1 className="text-4xl font-extrabold uppercase tracking-wider" style={{ color: colors.primary }}>
                {content.firstName} {content.lastName}
              </h1>
              <p className="text-xl font-medium mt-1" style={{ color: colors.secondary }}>{content.jobTitle}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm opacity-80">
                <span className="flex items-center gap-2"><i className="fas fa-envelope"></i> {content.email}</span>
                <span className="flex items-center gap-2"><i className="fas fa-phone"></i> {content.phone}</span>
                <span className="flex items-center gap-2"><i className="fas fa-map-marker-alt"></i> {content.address}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="col-span-1 space-y-8">
              <section>
                <h3 className="text-lg font-bold uppercase mb-4 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {content.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">{skill}</span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold uppercase mb-4 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>Education</h3>
                {content.education.map((edu, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-bold text-sm" style={{ color: colors.secondary }}>{edu.degree}</p>
                    <p className="text-xs font-medium">{edu.school}</p>
                    <p className="text-xs opacity-60">{edu.year}</p>
                  </div>
                ))}
              </section>
            </div>

            {/* Right Column */}
            <div className="col-span-2 space-y-8">
              <section>
                <h3 className="text-lg font-bold uppercase mb-4 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>Professional Summary</h3>
                <p className="text-sm leading-relaxed text-justify">{content.summary}</p>
              </section>

              <section>
                <h3 className="text-lg font-bold uppercase mb-4 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>Work Experience</h3>
                {content.experience.map((exp, i) => (
                  <div key={i} className="mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold" style={{ color: colors.secondary }}>{exp.role}</p>
                        <p className="text-sm font-bold opacity-75">{exp.company}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-gray-50 rounded" style={{ color: colors.primary }}>{exp.period}</span>
                    </div>
                    <p className="text-sm mt-2 leading-relaxed opacity-90">{exp.description}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
