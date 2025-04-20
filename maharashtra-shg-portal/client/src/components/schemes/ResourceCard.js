import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaFilePdf, 
  FaFileWord, 
  FaFileExcel, 
  FaFileAlt, 
  FaDownload 
} from 'react-icons/fa';

const ResourceCard = ({ document }) => {
  const { t } = useTranslation();

  // Function to get file icon based on type
  const getFileIcon = (fileType) => {
    const type = fileType.toLowerCase();
    
    if (type === 'pdf') {
      return <FaFilePdf className="text-red-500" size={24} />;
    } else if (type === 'doc' || type === 'docx') {
      return <FaFileWord className="text-blue-500" size={24} />;
    } else if (type === 'xls' || type === 'xlsx') {
      return <FaFileExcel className="text-green-500" size={24} />;
    } else {
      return <FaFileAlt className="text-gray-500" size={24} />;
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    } else {
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
  };

  return (
    <a
      href={`${process.env.REACT_APP_API_URL}/uploads/${document.file}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
      aria-label={`Download ${document.name}`}
    >
      {/* File icon */}
      <div className="mr-3">
        {getFileIcon(document.fileType)}
      </div>
      
      {/* Document info */}
      <div className="flex-grow min-w-0">
        <div className="font-medium text-gray-900 truncate">{document.name}</div>
        <div className="text-xs text-gray-500 flex items-center">
          <span className="mr-2">
            {t('schemes.card.fileType')}: {document.fileType.toUpperCase()}
          </span>
          <span>
            {t('schemes.card.fileSize')}: {formatFileSize(document.fileSize)}
          </span>
        </div>
      </div>
      
      {/* Download icon */}
      <div>
        <FaDownload className="text-primary-600" />
      </div>
    </a>
  );
};

export default ResourceCard;