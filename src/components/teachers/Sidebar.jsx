import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import man from '../../assets/boy.png';
import { IoFlower } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from 'react-icons/bi';
import { IoPersonAdd } from "react-icons/io5";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { RiHealthBookFill } from "react-icons/ri";
import { FcLeave } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { BiChild } from "react-icons/bi";


function StaffSideBar() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem('UserId');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    if (id === null) {
      navigate('/');
    }
  }, [id, navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-72 bg-gray-800 text-white flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <h1 className="mt-8 ml-20 mb-16 text-3xl font-bold">STAFF</h1>
          <ul className="mt-8 space-y-4 ml-6">
            <li className="relative flex items-center space-x-3 py-3 px-6 rounded-md hover:bg-gray-700">
              <Link to="/addchild" className="flex items-center space-x-3">
              <IoPersonAdd/>
                <span>Enroll Child</span>
              </Link>
            </li>
            <li className="relative flex items-center space-x-3 py-3 px-6 rounded-md hover:bg-gray-700">
              <Link to="/childattend" className="flex items-center space-x-3">
                <BiChild />
                <span>Child Attendance</span>
              </Link>
            </li>
            <li className="relative flex items-center space-x-3 py-3 px-6 rounded-md hover:bg-gray-700">
              <Link to="/childhealth" className="flex items-center space-x-3">
                <RiHealthBookFill />
                <span>Child Health</span>
              </Link>
            </li>
            <li className="relative flex items-center space-x-3 py-3 px-6 rounded-md hover:bg-gray-700">
              <Link to="/leaverequest" className="flex items-center space-x-3">
                <FcLeave />
                <span>Leave Request</span>
              </Link>
            </li>
            <li className="relative flex items-center space-x-3 py-3 px-6 rounded-md hover:bg-gray-700">
              <Link to="/chat" className="flex items-center space-x-3">
                <MdMarkUnreadChatAlt />
                <span>Chat With Parent</span>
              </Link>
            </li>
            <li className="relative flex items-center space-x-3 py-3 px-6 rounded-md hover:bg-gray-700">
              <Link to="/cpass" className="flex items-center space-x-3">
                <MdPassword />
                <span>Change Password</span>
              </Link>
            </li>
            <li className="relative flex items-center space-x-3 py-3 px-6 rounded-md hover:bg-gray-700">
              <a href="/" onClick={handleLogout} className="flex items-center space-x-3">
                <BiLogOut className="text-red-400" size={24} />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-auto mb-6 mx-6 flex items-center">
          <img className="h-12 w-12 rounded-full" src={man} alt="User profile" />
          <div className="ml-4">
            <p className="font-medium text-lg">Staff</p>
            <p className="text-sm text-gray-300">John Durairaj</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffSideBar;
