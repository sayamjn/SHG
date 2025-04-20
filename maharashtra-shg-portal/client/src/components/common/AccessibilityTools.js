import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaAdjust, FaFont, FaMinus, FaPlus, FaUndo, FaUniversalAccess } from 'react-icons/fa';

const AccessibilityTools = ({
  toggleHighContrast,
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
  highContrast
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-2 flex-wrap">
      {/* Font Size Controls */}
      <div className="flex items-center mr-4">
        <button
          onClick={increaseFontSize}
          className="px-2 py-1 bg-primary-700 hover:bg-primary-600 rounded-md mr-1 flex items-center"
          aria-label={t('header.fontSizeIncrease')}
        >
          <FaPlus className="mr-1" /><FaFont />
        </button>
        <button
          onClick={decreaseFontSize}
          className="px-2 py-1 bg-primary-700 hover:bg-primary-600 rounded-md mr-1 flex items-center"
          aria-label={t('header.fontSizeDecrease')}
        >
          <FaMinus className="mr-1" /><FaFont />
        </button>
        <button
          onClick={resetFontSize}
          className="px-2 py-1 bg-primary-700 hover:bg-primary-600 rounded-md flex items-center"
          aria-label={t('header.fontSizeReset')}
        >
          <FaUndo className="mr-1" /><FaFont />
        </button>
      </div>

      {/* High Contrast Toggle */}
      <button
        onClick={toggleHighContrast}
        className={`px-3 py-1 rounded-md flex items-center ${
          highContrast ? 'bg-yellow-400 text-black' : 'bg-primary-700 hover:bg-primary-600'
        }`}
        aria-pressed={highContrast}
        aria-label={t('header.highContrast')}
      >
        <FaAdjust className="mr-1" />
        {t('header.highContrast')}
      </button>

      {/* Screen Reader Link */}
      <a
        href="https://www.nvaccess.org/download/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 bg-primary-700 hover:bg-primary-600 rounded-md flex items-center"
        aria-label={t('header.screenReader')}
      >
        <FaUniversalAccess className="mr-1" />
        {t('header.screenReader')}
      </a>
    </div>
  );
};

export default AccessibilityTools;