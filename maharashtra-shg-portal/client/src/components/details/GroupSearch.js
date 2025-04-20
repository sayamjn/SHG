import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';

const GroupSearch = ({ groupCode, setGroupCode, handleSearch, loading }) => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="card">
      <p className="text-lg text-gray-700 mb-4">
        {t('details.instruction')}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <label htmlFor="groupCode" className="sr-only">
            {t('home.groupCode')}
          </label>
          <input
            type="text"
            id="groupCode"
            name="groupCode"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            className="input-field"
            placeholder={t('home.groupCode')}
            required
            aria-label={t('home.groupCode')}
          />
        </div>

        <button
          type="submit"
          className="btn-primary flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('common.loading')}
            </span>
          ) : (
            <span className="flex items-center">
              <FaSearch className="mr-2" /> {t('details.search')}
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default GroupSearch;