import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeaderContent from "../../Components/layoutContent/HeaderContent";
import { AuthContext } from "../../Context/AuthContext";

const Profile = () => {
  const { authState: { user }, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = ()=> {
    logoutUser();
    navigate('/auth/login');
  }

  const handleGoBack = ()=> {
    history.back();
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-screen">
        <HeaderContent />
      </div>
      <div className="w-10/12 mt-8">
        <div className="mt-14 mb-2 w-full text-center">
            <i className="fa-solid fa-arrow-left absolute top-0 left-0 mt-16 ml-4 text-gray-600 text-lg cursor-pointer" onClick={handleGoBack}></i>
        </div>
        <div className="mt-14 mb-2 w-full text-center">
          <img src={user?.image} className="w-36 h-36 rounded-full mx-auto" alt={user?.fullName} />
          <h2 className="mt-1 text-2xl font-light">{user?.fullName}</h2>
        </div>
        <div className="mt-20">
          <h1 className="text-2xl font-normal">Information</h1>
          <form className="mt-4">
            <div className="mb-4">
              <p>Full Name:</p>
              <input
                type="text"
                name="fullName"
                className="border-2 border-gray-300 outline-none rounded-md p-2 bg-gray-200 w-full"
                value={user?.fullName}
                readOnly={true}
              />
            </div>
            <div className="mb-4">
              <p>Username:</p>
              <input
                type="text"
                name="username"
                className="border-2 border-gray-300 outline-none rounded-md p-2 bg-gray-200 w-full"
                value={user?.username}
                readOnly={true}
              />
            </div>
            <div className="mb-4">
              <p>Email:</p>
              <input
                type="email"
                name="email"
                className="border-2 border-gray-300 outline-none rounded-md p-2 bg-gray-200 w-full"
                value={user?.email}
                readOnly={true}
              />
            </div>
          </form>
          <div className="flex justify-center mt-8 mb-20">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
