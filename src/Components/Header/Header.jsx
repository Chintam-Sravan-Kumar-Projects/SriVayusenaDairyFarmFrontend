import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import brandLogo from "../../assets/Logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { existingUser, logout } from "../../Redux/Slices/authSlice";
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");
  const { token, user,loading,error } = useSelector((state) => state.auth);
  const [language,setLangauge] =useState('en')
   const { t,i18n } = useTranslation();
  
  const dispatch = useDispatch();
  const navigate=useNavigate();

  // change language
 
  
    const changeLanguage = (lag) => {

      i18n.changeLanguage(lagn);
    };
    
  

  // handle authication function
  const handleAuth = () => {
   
    if(token !="null" || user)
    {
      
     
      dispatch(logout(token));
      navigate("/admin/signin")
    }

     
    
    
  };

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };
  
  useEffect(()=>{
    if(!user && token!="null")
      {
        dispatch(existingUser(token))
        .then((res)=>{
          if(res.payload.admin)
          {
            
            navigate("/dashboard")
          }
          
         
        })

      }
  },[user,token])
 
  return (
    <header className="shadow sticky z-50 top-0" id="header">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavLink to="/" className="flex items-center">
            <img src={brandLogo} className="mr-3 h-14" alt="Logo" />
          </NavLink>
          <div className="flex items-center lg:order-2">
            <NavLink
            
              to={user?"/":"/admin/signin"}
              onClick={() => handleAuth()}
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              {user ? "Logout" : "Login"}

            </NavLink>
            <Link
              to={user ?"/Dashboard": "/admin/signup"}
              onPress={() => handleOpen(b)}
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
             {user? "Dashboard":"SignUp"}
            </Link>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                 {t('Home')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://github.com/CHINTAM-SRAVAN/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Github
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
