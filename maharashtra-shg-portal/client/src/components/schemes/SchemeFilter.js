import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFilter, FaTags, FaBuilding } from 'react-icons/fa';

const SchemeFilter = ({ departments, availableTags, filters, handleFilterChange }) => {
  const { t } = useTranslation();
  const [selectedTags, setSelectedTags] = useState(filters.tags || []);

  // Handle department change
  const handleDepartmentChange = (e) => {
    handleFilterChange('department', e.target.value);
  };

  // Handle tag selection
  const handleTagChange = (tag) => {
    let newTags;
    if (selectedTags.includes(tag)) {
      // Remove tag if already selected
      newTags = selectedTags.filter((t) => t !== tag);
    } else {
      // Add tag if not selected
      newTags = [...selectedTags, tag];
    }
    setSelectedTags(newTags);
    handleFilterChange('tags', newTags);
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedTags([]);
    handleFilterChange('department', '');
    handleFilterChange('tags', []);
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold text-primary-700 mb-4 flex items-center">
        <FaFilter className="mr-2" /> {t('schemes.filters.title')}
      </h2>

      {/* Department filter */}
      <div className="mb-4">
        <h3 className="form-label flex items-center">
          <FaBuilding className="mr-2" /> {t('schemes.filters.department')}
        </h3>
        <select
          className="input-field"
          value={filters.department}
          onChange={handleDepartmentChange}
        >
          <option value="">{t('common.all')}</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {/* Tags filter */}
      <div className="mb-4">
        <h3 className="form-label flex items-center">
          <FaTags className="mr-2" /> {t('schemes.filters.tags')}
        </h3>
        <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-md p-2">
          {availableTags.map((tag) => (
            <div key={tag} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`tag-${tag}`}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`tag-${tag}`}
                className="ml-2 block text-sm text-gray-700"
              >
                {tag}
              </label>
            </div>
          ))}
          {availableTags.length === 0 && (
            <p className="text-sm text-gray-500 py-2 text-center">
              No tags available
            </p>
          )}
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={handleReset}
        className="btn-secondary w-full mb-2"
      >
        {t('schemes.filters.reset')}
      </button>
    </div>
  );
};

export default SchemeFilter;