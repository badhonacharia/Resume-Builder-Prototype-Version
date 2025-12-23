
import React, { useState } from 'react';
import { TEMPLATES } from '../constants';
import { ResumeTemplate } from '../types';

interface TemplateGridProps {
  onSelect: (template: ResumeTemplate) => void;
  category: string;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ onSelect, category }) => {
  const [visibleCount, setVisibleCount] = useState(15);
  
  const filteredTemplates = category 
    ? TEMPLATES.filter(t => t.category === category)
    : TEMPLATES;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {filteredTemplates.slice(0, visibleCount).map((template) => (
          <div 
            key={template.id} 
            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col cursor-pointer"
            onClick={() => onSelect(template)}
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img 
                src={template.thumbnail} 
                alt={template.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-gray-900 font-bold px-6 py-2 rounded-full shadow-lg">Use This Template</span>
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-bold text-gray-800">{template.name}</h3>
              <p className="text-xs text-blue-600 font-medium">{template.category}</p>
            </div>
          </div>
        ))}
      </div>
      
      {visibleCount < filteredTemplates.length && (
        <div className="mt-16 text-center">
          <button 
            onClick={handleLoadMore}
            className="bg-gray-900 text-white px-10 py-3 rounded-full font-bold hover:bg-gray-800 transition-all shadow-md inline-flex items-center gap-3"
          >
            Load More Templates
            <i className="fas fa-chevron-down text-sm"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateGrid;
