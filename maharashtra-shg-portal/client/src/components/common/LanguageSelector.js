import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../context/LanguageContext';
import { FaGlobe } from 'react-icons/fa';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useContext(LanguageContext);

  // List of available languages
  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'hi', name: t('language.hi') },
    { code: 'mr', name: t('language.mr') }
  ];

  return (
    <div className="flex items-center">
      <FaGlobe className="mr-2" />
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-primary-700 text-white rounded-md px-2 py-1 border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400"
        aria-label="Select language"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;