import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaFileAlt, FaLock, FaExclamationTriangle } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-800 text-white py-8 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <img 
                src="/images/emblem.png" 
                alt="Maharashtra State Emblem" 
                className="h-12 mr-3" 
              />
              <span className="text-lg font-bold">
                {process.env.REACT_APP_NAME}
              </span>
            </div>
            <p className="text-sm text-center md:text-left text-gray-300">
              &copy; {currentYear} {t('footer.rights')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-2 text-gray-300 text-center md:text-left">
              <li className="flex items-center justify-center md:justify-start">
                <FaPhone className="mr-2" />
                <span>{t('footer.helpline')}: 1800-123-4567</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-2" />
                <a 
                  href="mailto:support@maharashtrashg.gov.in"
                  className="hover:text-white transition-colors"
                >
                  support@maharashtrashg.gov.in
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2 text-gray-300 text-center md:text-left">
              <li className="flex items-center justify-center md:justify-start">
                <FaFileAlt className="mr-2" />
                <Link to="#" className="hover:text-white transition-colors">
                  {t('footer.rti')}
                </Link>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaLock className="mr-2" />
                <Link to="#" className="hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaExclamationTriangle className="mr-2" />
                <Link to="#" className="hover:text-white transition-colors">
                  {t('footer.disclaimer')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-primary-700 text-center text-gray-400 text-sm">
          <p>
            <Link 
              to="#" 
              className="hover:text-white transition-colors"
            >
              {t('footer.accessibility')}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;