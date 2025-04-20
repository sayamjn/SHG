import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaChevronUp, FaCalendarAlt } from 'react-icons/fa';

const Accordion = ({ title, icon, content, lastReviewed }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Accordion header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 text-left flex items-center justify-between ${
          isOpen ? 'bg-primary-50' : 'bg-white'
        } hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset`}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title}`}
      >
        <div className="flex items-center">
          {/* Section icon */}
          <span className="text-primary-600">
            {icon}
          </span>
          
          {/* Section title */}
          <span className="font-semibold text-gray-800">
            {title}
          </span>
        </div>
        
        {/* Toggle icon */}
        <span className="text-primary-600">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      
      {/* Accordion content */}
      <div
        id={`accordion-content-${title}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="p-4 bg-white border-t border-gray-200">
          {/* Main content */}
          <p className="text-gray-700 mb-3">
            {content}
          </p>
          
          {/* Last reviewed date */}
          {lastReviewed && (
            <div className="text-sm text-gray-500 mt-3 flex items-center">
              <FaCalendarAlt className="mr-1" />
              <span>
                {t('about.objectives.lastReviewed')}: {formatDate(lastReviewed)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;