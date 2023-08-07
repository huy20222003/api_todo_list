import { useState, startTransition, useContext } from 'react';
import { toast } from 'react-toastify';
import { TodosContext } from '../../../Context/TodosContext';
import { LabelsContext } from '../../../Context/LabelsContext';
import { useLocation } from 'react-router-dom';
import styles from './SearchItem.module.css';

const SearchItem = () => {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const { searchTodos } = useContext(TodosContext);
  const { searchLabels } = useContext(LabelsContext);

  const handleSearchTodo = async (e) => {
    startTransition(() => setSearchValue(e.target.value));
    try {
      if (e.target.value.length <= 100) {
        const searchData = await searchTodos(e.target.value);
        if (!searchData.status) {
          toast.error('An error has occurred');
        } else {
          // Xử lý dữ liệu sau khi tìm kiếm
        }
      } else {
        toast.error('Search value is too long');
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };

  const handleSearchLabel = async (e) => {
    startTransition(() => setSearchValue(e.target.value));
    try {
      if (e.target.value.length <= 100) {
        const searchData = await searchLabels(e.target.value);
        if (!searchData.status) {
          toast.error('An error has occurred');
        }
      } else {
        toast.error('Search value is too long');
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };

  let handleSearch = handleSearchTodo;
  if (location.pathname === '/dashboard/user/labels') {
    handleSearch = handleSearchLabel;
  }

  return (
    <>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        className={styles.searchInput}
        placeholder="Enter your name..."
        maxLength={100}
      />
    </>
  );
};

export default SearchItem;
