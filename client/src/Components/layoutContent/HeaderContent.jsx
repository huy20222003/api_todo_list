import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TodosContext } from '../../Context/TodosContext';
import { AuthContext } from '../../Context/AuthContext';

const HeaderContent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [subMenu, setSubMenu] = useState(false);
  const { searchTodos } = useContext(TodosContext);
  const { authState: { user }, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearchTodo = async (e) => {
    setSearchValue(e.target.value);
    try {
      const searchData = await searchTodos(e.target.value);
      if (!searchData.status) {
        console.log('An error has occurred');
      } else {
        // Xử lý dữ liệu sau khi tìm kiếm
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/auth/login');
  };

  return (
    <div className="h-[60px] border-2 border-b-gray-4300 w-full flex sm:justify-between justify-end items-center bg-blue-500">
      <div className="pl-3">
        <Link to="/dashboard" className="text-xl font-semibold text-white hidden sm:block">
          Todo List
        </Link>
      </div>
      <div className="ml-16">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchTodo}
          className="h-11 border-2 rounded-full border-gray-300 p-2 w-[300px] focus:border-blue-400 outline-none"
          placeholder="Search your Todo"
        />
      </div>
      <div className="flex items-center justify-center mr-8">
        <img className="w-9 rounded-full mr-1 ml-5 sm:ml-0" src={user?.image} alt="avatar" />
        <div className="cursor-pointer" onClick={() => setSubMenu(!subMenu)}>
          <span className="mr-1 text-sm font-normal text-white hidden sm:inline">Hi, {user?.username}</span>
          <i className="fa-solid fa-caret-down text-white relative"></i>
          <ul
            className={`absolute bg-white p-2 rounded-md shadow-xl transform -translate-x-1/2 z-10 ${
              subMenu ? 'block' : 'hidden'
            }`}
          >
            <li className="mb-2">
              <Link to="/dashboard/profile" className="flex items-center">
                <i className="fa-solid fa-user mr-3"></i>
                <span>Account</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link to='/dashboard/setting' className="flex items-center">
                <i className="fa-solid fa-gear mr-3"></i>
                <span>Settings</span>
              </Link>
            </li>
            <li className="mb-2" onClick={handleLogout}>
              <Link to="/auth/login" className="flex items-center">
                <i className="fa-solid fa-right-from-bracket mr-3"></i>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
