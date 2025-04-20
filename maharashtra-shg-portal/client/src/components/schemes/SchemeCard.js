import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaChevronRight, FaTag, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import ResourceCard from './ResourceCard';

const SchemeCard = ({ scheme }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Scheme header */}
      <div className="bg-primary-50 p-4 border-b border-primary-100">
        <h2 className="text-xl font-bold text-primary-800">{scheme.title}</h2>
        <p className="text-sm text-gray-600">{scheme.department}</p>
      </div>
      
      {/* Scheme content */}
      <div className="p-4">
        <p className="text-gray-700 mb-4">{scheme.description}</p>
        
        {/* Eligibility section */}
        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            {t('schemes.card.eligibility')}
          </h3>
          <p className="text-gray-700">{scheme.eligibility}</p>
        </div>
        
        {/* Tags */}
        {scheme.tags && scheme.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {scheme.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center"
              >
                <FaTag className="mr-1" /> {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Toggle button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-primary-600 hover:text-primary-800 font-semibold flex items-center mb-2"
          aria-expanded={expanded}
        >
          {expanded ? (
            <FaChevronDown className="mr-1" />
          ) : (
            <FaChevronRight className="mr-1" />
          )}
          {t('schemes.card.learnMore')}
        </button>
        
        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 border-t pt-4">
            {/* Benefits */}
            {scheme.benefits && (
              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  Benefits
                </h3>
                <p className="text-gray-700">{scheme.benefits}</p>
              </div>
            )}
            
            {/* Application Process */}
            {scheme.applicationProcess && (
              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  Application Process
                </h3>
                <p className="text-gray-700">{scheme.applicationProcess}</p>
              </div>
            )}
            
            {/* Contact Info */}
            {scheme.contactInfo && (
              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-700">{scheme.contactInfo}</p>
              </div>
            )}
            
            {/* Website */}
            {scheme.website && (
              <div className="mb-4">
                <a
                  href={scheme.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800 flex items-center"
                >
                  <FaExternalLinkAlt className="mr-1" /> Visit Official Website
                </a>
              </div>
            )}
            
            {/* Documents */}
            {scheme.documents && scheme.documents.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-semibold text-gray-800 mb-3">
                  {t('schemes.card.resources')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scheme.documents.map((doc, index) => (
                    <ResourceCard key={index} document={doc} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Last updated */}
            <div className="mt-4 text-sm text-gray-500">
              Last updated: {formatDate(scheme.lastUpdated)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeCard;