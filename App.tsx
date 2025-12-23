
import React, { useState, useEffect } from 'react';
import { User, UserResume, ResumeTemplate, AuthState } from './types';
import { DEFAULT_CONTENT, DEFAULT_COLORS, TEMPLATES } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import TemplateGrid from './components/TemplateGrid';
import ResumeEditor from './components/ResumeEditor';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [myResumes, setMyResumes] = useState<UserResume[]>([]);
  const [editingResume, setEditingResume] = useState<UserResume | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    // Load from local storage
    const savedUser = localStorage.getItem('resu_user');
    const savedResumes = localStorage.getItem('resu_resumes');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setAuthState('authenticated');
    }
    if (savedResumes) {
      setMyResumes(JSON.parse(savedResumes));
    }
  }, []);

  useEffect(() => {
    if (myResumes.length > 0) {
      localStorage.setItem('resu_resumes', JSON.stringify(myResumes));
    }
  }, [myResumes]);

  const handleAuth = (user: User) => {
    setCurrentUser(user);
    setAuthState('authenticated');
    localStorage.setItem('resu_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthState('login');
    localStorage.removeItem('resu_user');
  };

  const createNewResume = (template: ResumeTemplate) => {
    if (myResumes.length >= 4) {
      alert("You have reached the maximum limit of 4 CVs. You can edit existing ones but not create more.");
      return;
    }

    const newResume: UserResume = {
      id: Math.random().toString(36).substr(2, 9),
      templateId: template.id,
      content: { ...DEFAULT_CONTENT },
      colors: { ...DEFAULT_COLORS },
      createdAt: new Date().toISOString()
    };
    
    setMyResumes([...myResumes, newResume]);
    setEditingResume(newResume);
  };

  const updateResume = (updated: UserResume) => {
    setMyResumes(myResumes.map(r => r.id === updated.id ? updated : r));
    setEditingResume(null);
  };

  if (authState !== 'authenticated') {
    return <Auth onAuth={handleAuth} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onLogout={handleLogout} 
        userName={currentUser?.name || 'User'} 
        onHomeClick={() => setEditingResume(null)}
        onCreateNew={() => {
          if (myResumes.length < 4) {
            // Focus scroll to templates if not in limit
            window.scrollTo({ top: 800, behavior: 'smooth' });
          } else {
            alert("Maximum limit of 4 resumes reached.");
          }
        }}
        myResumeCount={myResumes.length}
      />

      {!editingResume ? (
        <main className="animate-fade-in">
          <Hero />
          
          <div className="max-w-7xl mx-auto px-4 py-12">
            {myResumes.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Resumes ({myResumes.length}/4)</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {myResumes.map((resume) => {
                    const template = TEMPLATES.find(t => t.id === resume.templateId);
                    return (
                      <div key={resume.id} className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all flex flex-col group">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                          <img src={template?.thumbnail} className="w-full h-full object-cover" alt="CV" />
                          <div className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                            <button onClick={() => setEditingResume(resume)} className="bg-white text-blue-600 font-bold px-4 py-2 rounded-full">Edit CV</button>
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-700 truncate">{resume.content.firstName} {resume.content.lastName}'s Resume</h3>
                        <p className="text-xs text-gray-400 mt-1">Created: {new Date(resume.createdAt).toLocaleDateString()}</p>
                      </div>
                    );
                  })}
                  {myResumes.length < 4 && (
                    <div 
                      onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                      className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-8 hover:bg-gray-50 transition-all cursor-pointer text-gray-400 hover:text-blue-500 hover:border-blue-500"
                    >
                      <i className="fas fa-plus-circle text-3xl mb-2"></i>
                      <span className="font-bold text-sm">Create New</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Categories 
              selectedCategory={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
            
            <TemplateGrid 
              category={selectedCategory} 
              onSelect={createNewResume} 
            />
          </div>

          <footer className="bg-white border-t py-12 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <i className="fas fa-file-invoice text-white text-xl"></i>
                </div>
                <span className="text-xl font-bold text-gray-900">ResuMaker<span className="text-blue-600">Pro</span></span>
              </div>
              <div className="flex gap-8 text-sm font-medium text-gray-500">
                <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600">Terms of Use</a>
                <a href="#" className="hover:text-blue-600">Support</a>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-all cursor-pointer">
                  <i className="fab fa-facebook-f"></i>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-all cursor-pointer">
                  <i className="fab fa-instagram"></i>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-all cursor-pointer">
                  <i className="fab fa-linkedin-in"></i>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center text-xs text-gray-400">
              &copy; 2024 ResuMaker Pro AI. Built with Gemini 2.5 Flash Image.
            </div>
          </footer>
        </main>
      ) : (
        <ResumeEditor 
          resume={editingResume} 
          onSave={updateResume} 
          onClose={() => setEditingResume(null)}
        />
      )}
    </div>
  );
};

export default App;
