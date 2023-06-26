import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TodosContext } from '../../Context/TodosContext';
import { AuthContext } from '../../Context/AuthContext';

const HeaderContent = ()=> {
    const [searchValue, setSearchValue] = useState('');
    const [subMenu, setSubMenu] = useState(false);
    const { todoState: {todo, todos}, searchTodos } = useContext(TodosContext);
    const {authState: { user }, logoutUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSearchTodo = async (e)=> {
        setSearchValue(e.target.value);
        try {
            const searchData = await searchTodos(e.target.value);
            if(!searchData.status) {
                console.log('An error has occurred');
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = ()=> {
        logoutUser();
        navigate('/auth/login');
    }

    return (
        <div className="h-[60px] border-2 border-b-gray-4300 w-full flex sm:justify-between justify-end items-center bg-sky-400">
            <div className='pl-3'>
                <Link to = '/dashbroad' className='text-xl font-semibold text-white hidden sm:block'>Todo List</Link>
            </div>
            <div className="ml-16">
                <input 
                    type="text" 
                    value={searchValue} 
                    onChange={handleSearchTodo}
                    className="h-11 border-2 rounded-full border-slate-300 p-2 w-[300px] focus:border-slate-400 outline-none" 
                    placeholder="Search your Todo" />
            </div>
            <div className="flex items-center justify-center mr-8">
                <img className="w-9 rounded-full mr-1 ml-5 sm:ml-0" src={user?.image} alt="avatar" />
                <div className="cursor-pointer" onClick={()=>setSubMenu(!subMenu)}>
                    <span className="mr-1 text-sm font-normal text-white hidden sm:inline">Hi, {user?.username}</span>
                    <i className="fa-solid fa-caret-down relative"></i>
                    <ul className={`absolute bg-white p-2 rounded-md shadow-xl translate-x-[-30px] z-10 ${subMenu ? 'block' : 'hidden'}`}>
                        <Link to = './profile' className='mb-2'>
                            <i className="fa-solid fa-user mr-3"></i>
                            <span>Account</span>
                        </Link>
                        <li className='mb-2'>
                            <i className="fa-solid fa-gear mr-3"></i>
                            <span>Setting</span>
                        </li>
                        <li className='mb-2' onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket mr-3"></i>
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HeaderContent;