import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <div className="h-[60px] border-2 border-b-gray-4300 w-full flex justify-between items-center bg-blue-500">
                <div className="pl-3">
                    <Link to="/dashboard" className="text-3xl font-semibold text-white">
                        Todo List
                    </Link>
                </div>
                <div className="flex items-center cursor-pointer">
                    <Link to = '/auth/login' className='border px-2 py-1 bg-green-500 rounded mr-2'>
                        <i className="fa-solid fa-right-to-bracket mr-2 text-white"></i>
                        <button className="text-white text-2xl">Login</button>
                    </Link>
                    <Link to = '/auth/register' className='border px-2 py-1 bg-green-500 rounded mr-3'>
                        <i className="fa-solid fa-user mr-2 text-white"></i>
                        <button className="text-white text-2xl">Register</button>
                    </Link>
                </div>
            </div>
            <div className='container'>
                <div className="w-full h-[425px] bg-[url('./assets/images/images.jpg')] bg-contain relative">
                    <h2 className='text-center text-blue-500 text-8xl m-0 p-0 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>TODO LIST</h2>
                </div>
            </div>
            <footer className='bg-blue-400 p-4 mt-[220px]'>
                <h2 className='text-white text-center text-xl'>Copyright © 2023 Huy Nguyen</h2>
            </footer>
        </>
    );
}

export default Home;