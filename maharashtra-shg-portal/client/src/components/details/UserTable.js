import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import { FaSortAlphaDown, FaSortAlphaUp, FaEye, FaUser } from 'react-icons/fa';

const UserTable = ({
  users,
  sortField,
  sortDirection,
  handleSort,
  pageCount,
  currentPage,
  handlePageChange
}) => {
  const { t } = useTranslation();

  // Column definitions with sortable status
  const columns = [
    { id: 'name', label: t('details.table.name'), sortable: true },
    { id: 'age', label: t('details.table.age'), sortable: true },
    { id: 'gender', label: t('details.table.gender'), sortable: true },
    { id: 'phone', label: t('details.table.phone'), sortable: false },
    { id: 'role', label: t('details.table.role'), sortable: true },
    { id: 'joinDate', label: t('details.table.joinDate'), sortable: true },
    { id: 'actions', label: t('details.table.actions'), sortable: false }
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // Get sort icon for column
  const getSortIcon = (columnId) => {
    if (sortField !== columnId) {
      return null;
    }
    return sortDirection === 'asc' ? (
      <FaSortAlphaDown className="ml-1 inline" />
    ) : (
      <FaSortAlphaUp className="ml-1 inline" />
    );
  };

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  {column.sortable ? (
                    <button
                      className="group inline-flex items-center"
                      onClick={() => handleSort(column.id)}
                      aria-label={`Sort by ${column.label}`}
                    >
                      {column.label}
                      {getSortIcon(column.id)}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  <div className="flex items-center">
                    {user.photo && user.photo !== 'no-photo.jpg' ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/${user.photo}`}
                        alt={user.name}
                        className="h-8 w-8 rounded-full mr-2 object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                        <FaUser className="text-primary-600" />
                      </div>
                    )}
                    {user.name}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {user.age}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {user.gender}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {user.phone}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'president' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'secretary' ? 'bg-blue-100 text-blue-800' :
                    user.role === 'treasurer' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatDate(user.joinDate)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <button
                    className="text-primary-600 hover:text-primary-900 mr-2"
                    aria-label={`${t('common.view')} ${user.name}`}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                {t('details.showing')} <span className="font-medium">{currentPage * users.length + 1}</span>{' '}
                {t('details.to')}{' '}
                <span className="font-medium">
                  {Math.min((currentPage + 1) * users.length, users.length * pageCount)}
                </span>{' '}
                {t('details.of')}{' '}
                <span className="font-medium">{users.length * pageCount}</span>{' '}
                {t('details.results')}
              </p>
            </div>

            <ReactPaginate
              previousLabel={'← ' + t('common.previous')}
              nextLabel={t('common.next') + ' →'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={'flex justify-center mt-4'}
              pageClassName={'mx-1'}
              previousClassName={'mx-1'}
              nextClassName={'mx-1'}
              pageLinkClassName={'px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}
              previousLinkClassName={'px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}
              nextLinkClassName={'px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}
              breakClassName={'mx-1'}
              breakLinkClassName={'px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700'}
              activeClassName={'active'}
              activeLinkClassName={'bg-primary-600 text-white border-primary-600 hover:bg-primary-700'}
              forcePage={currentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;