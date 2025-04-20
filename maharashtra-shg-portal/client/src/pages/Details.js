import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaSearch, FaUsers, FaSortAlphaDown, FaSortAlphaUp, FaFilter } from 'react-icons/fa';
import GroupSearch from '../components/details/GroupSearch';
import UserTable from '../components/details/UserTable';

const Details = () => {
  const { t } = useTranslation();
  const [groupCode, setGroupCode] = useState('');
  const [groupInfo, setGroupInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Sorting state
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Filter state
  const [filters, setFilters] = useState({
    name: '',
    gender: '',
    role: ''
  });
  
  // Handle search for group members
  const handleSearch = async () => {
    if (!groupCode) {
      toast.error('Please enter a group code');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch group info
      const groupResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/code/${groupCode}`
      );
      
      // Fetch group members
      const usersResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/${groupCode}/users`
      );
      
      setGroupInfo(groupResponse.data.data);
      setUsers(usersResponse.data.data);
      setCurrentPage(0); // Reset to first page
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch group details');
      setGroupInfo(null);
      setUsers([]);
      toast.error(err.response?.data?.error || 'Failed to fetch group details');
    }
    
    setLoading(false);
  };
  
  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
    setCurrentPage(0); // Reset to first page when filter changes
  };
  
  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Apply filters to user list
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.gender === '' || user.gender === filters.gender) &&
      (filters.role === '' || user.role === filters.role)
    );
  });
  
  // Apply sorting to filtered users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortField === 'age' || sortField === 'joinDate') {
      // Numeric or date sorting
      const valA = sortField === 'joinDate' ? new Date(a[sortField]) : a[sortField];
      const valB = sortField === 'joinDate' ? new Date(b[sortField]) : b[sortField];
      
      if (sortDirection === 'asc') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    } else {
      // String sorting
      if (sortDirection === 'asc') {
        return a[sortField].localeCompare(b[sortField]);
      } else {
        return b[sortField].localeCompare(a[sortField]);
      }
    }
  });
  
  // Calculate pagination
  const pageCount = Math.ceil(sortedUsers.length / itemsPerPage);
  const displayedUsers = sortedUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  
  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-800 text-center mb-8">
        {t('details.title')}
      </h1>
      
      {/* Search Section */}
      <GroupSearch
        groupCode={groupCode}
        setGroupCode={setGroupCode}
        handleSearch={handleSearch}
        loading={loading}
      />
      
      {/* Group Info Card */}
      {groupInfo && (
        <div className="card mt-8 mb-4">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-primary-700">
                {groupInfo.name}
              </h2>
              <p className="text-gray-600">
                <strong>{t('details.groupCode')}:</strong> {groupInfo.code}
              </p>
              <p className="text-gray-600">
                <FaUsers className="inline mr-1" /> {t('details.totalMembers')}: {groupInfo.totalMembers}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-600">
                <strong>{t('details.formed')}:</strong> {new Date(groupInfo.formationDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <strong>{t('details.location')}:</strong> {groupInfo.village || groupInfo.taluka}, {groupInfo.district}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters Section */}
      {users.length > 0 && (
        <div className="card mb-4">
          <h3 className="text-lg font-semibold mb-3">
            <FaFilter className="inline mr-2" /> {t('details.filter')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="nameFilter" className="form-label">
                {t('details.table.name')}
              </label>
              <input
                type="text"
                id="nameFilter"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                className="input-field"
                placeholder={t('details.search')}
              />
            </div>
            <div>
              <label htmlFor="genderFilter" className="form-label">
                {t('details.table.gender')}
              </label>
              <select
                id="genderFilter"
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">{t('common.all')}</option>
                <option value="Male">{t('register.male')}</option>
                <option value="Female">{t('register.female')}</option>
                <option value="Other">{t('register.other')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="roleFilter" className="form-label">
                {t('details.table.role')}
              </label>
              <select
                id="roleFilter"
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">{t('common.all')}</option>
                <option value="member">Member</option>
                <option value="secretary">Secretary</option>
                <option value="president">President</option>
                <option value="treasurer">Treasurer</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      {/* Results Table */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-2">{t('common.loading')}</p>
        </div>
      ) : users.length > 0 ? (
        <UserTable
          users={displayedUsers}
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      ) : error ? (
        <div className="text-center py-8 text-red-600">
          <p>{error}</p>
        </div>
      ) : groupCode ? (
        <div className="text-center py-8 text-gray-500">
          <p>{t('details.noResults')}</p>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>{t('details.instruction')}</p>
        </div>
      )}
    </div>
  );
};

export default Details;