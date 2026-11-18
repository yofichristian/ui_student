import * as React from 'react';
import {useState} from 'react';
import {BsPerson, BsPower} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {clearRedux} from "@/slice/menuslice.jsx";

export const NavbarPage = () => {

    const dispatch = useDispatch();

    const [showProfileMenu, setProfileMenu] = useState(false);

    const clearCookies = async () => {
        dispatch(clearRedux());
        clearAllCookies();
    }

    const logout = () => {
        if (!confirm(printBahasa("Are you sure you want to logout ?","Anda yakin mau keluar ?"))) {
            return;
        }

        // queryClient.resetQueries();
        clearCookies();
        showSpinner(false);

        window.location.href = "/login";
        return;
    }

    return (
        <>
            <nav className="bg-[#F5F5F5] text-blue-900 border-0 h-20">
                {/*<div className="mx-auto ml-10 max-w-7xl px-0 py-1.5">*/}
                <div className="mr-2 ml-10 px-0 py-1.5">
                    <div className="relative flex h-16 items-center justify-between">

                        <img src={`/image/avenger1.jpg`} className="w-10 h-10"/>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">

                                    <div className="text-[32pt] font-bold ml-[-14px]">Demo</div>

                                </div>
                            </div>
                        </div>

                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                            <div className="relative ml-3">

                                <div>
                                    <button type="button"
                                            className="relative flex rounded-full bg-[#BFBFBF] text-white text-sm
                                            focus:outline-none focus:ring-1 focus:ring-green-600 focus:ring-offset-1 focus:ring-offset-gray-300
                                            h-[32px] w-[32px] justify-center align-middle "
                                            id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                            onClick={() => {
                                                setProfileMenu(!showProfileMenu);
                                                setTimeout(async () => {
                                                    setProfileMenu(false);
                                                }, 4000)
                                            }}
                                    >
                                        <BsPerson className="w-[24px] h-[24px] mt-[2px]"/>
                                    </button>
                                </div>

                                <div
                                    className={`absolute scale-100 right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 px-1 shadow-lg ring-1 ring-black/5 focus:outline-none
                                        ${showProfileMenu ? "":"hidden"}
                                    `}
                                    role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                    <a href="#" className="block px-2 py-1 text-sm text-red-600 bg-white flex flex-wrap
                                        hover:bg-[#FF4D4F] hover:text-white rounded-md" role="menuitem"
                                        tabIndex="-1" id="user-menu-item-2"
                                        onClick={logout}
                                    >
                                        <BsPower className="mt-[1px] mr-2"/>
                                        Logout
                                    </a>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {/*<a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"*/}
                        {/*   aria-current="page">Dashboard</a>*/}
                        {/*<a href="#"*/}
                        {/*   className="block rounded-md px-3 py-2 text-base font-medium text-blue-700 hover:bg-gray-700 hover:text-white">Team</a>*/}
                        {/*<a href="#"*/}
                        {/*   className="block rounded-md px-3 py-2 text-base font-medium text-blue-700 hover:bg-gray-700 hover:text-white">Projects</a>*/}
                        {/*<a href="#"*/}
                        {/*   className="block rounded-md px-3 py-2 text-base font-medium text-blue-700 hover:bg-gray-700 hover:text-white">Calendar</a>*/}
                    </div>
                </div>
            </nav>

        </>
    )
}