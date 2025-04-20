import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaAdjust, FaFont, FaSearch, FaUniversalAccess } from 'react-icons/fa';
import LanguageSelector from './LanguageSelector';
import AccessibilityTools from './AccessibilityTools';

const Header = ({
  toggleHighContrast,
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
  highContrast
}) => {
  const { t } = useTranslation();

  return (
    <header className="bg-primary-800 text-white">
      {/* Top Bar with Accessibility Tools */}
      <div className="bg-primary-900 py-2">
        <div className="container-custom flex flex-wrap justify-between items-center">
          <AccessibilityTools
            toggleHighContrast={toggleHighContrast}
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            resetFontSize={resetFontSize}
            highContrast={highContrast}
          />
          <LanguageSelector />
        </div>
      </div>

      {/* Main Header with Logo and Title */}
      <div className="container-custom py-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
          <div className="mr-4 mb-3 md:mb-0">
            <img
              src="/images/emblem.png"
              alt="Maharashtra State Emblem"
              className="h-16 md:h-20"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold" aria-label={t('header.title')}>
              {t('header.title')}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;