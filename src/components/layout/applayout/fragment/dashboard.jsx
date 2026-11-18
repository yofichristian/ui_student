import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {BsArrowLeftShort} from "react-icons/bs"
import {FooterPage} from "./footer";
import {useLocation} from "react-router";
import {SidebarMenu} from "@/components/layout/applayout/fragment/sidebarmenu.jsx";
import {toggleSidebar} from "@/slice/menuslice.jsx";
import {NavbarPage} from "@/components/layout/applayout/fragment/navbarpage.jsx";
import {MainPage} from "@/components/layout/applayout/fragment/mainpage.jsx";

export const DashboardPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const {activetab, listtab, openSidebar} = useSelector((state) => state.menu);

    if (activetab !== null) {
        localStorage.setItem(activetab.id, location.pathname);
    }

    return (

        <div className="bg-white flex relative text-green text-sm">
            <div className={`p-5 flex flex-grow flex-col 
                ${openSidebar ? 'max-w-[250px] min-w-[250px]' : 'max-w-[70px] min-w-[70px]'}  
                transition-all duration-300 min-h-screen relative
                `}
            >

                <BsArrowLeftShort
                    className={`bg-white text-blue-900 text-3xl rounded-full
                                    absolute -right-3.5 
                                    top-6 border-2   border-blue-800 cursor-pointer z-[1]
                                    ${!openSidebar && "rotate-180"}
                                `}
                    onClick={() => dispatch(toggleSidebar())}
                />

                <a href="/welcome"
                   onClick={()=>{
                       listtab.forEach(e => {
                           localStorage.removeItem(e.id);
                       })
                   }}
                >
                    <div className="inline-flex">

                        <img src={`/image/avenger1.jpg`} alt="demo" className={`text-4xl
                            rounded cursor-pointer block float-left mr-2 duration-500 w-10 h-10 mt-1
                            ${!openSidebar && "rotate-[360deg]"}
                        `}/>

                        <span className={`text-[24pt] text-blue-900 ml-3 mt-0
                                        font-bold duration-500 
                                        ${!openSidebar && "scale-0 rotate-[360deg]"}
                                    `}
                        >DEMO</span>

                    </div>
                </a>

                <div className="min-h-60 mb-5 flex-grow pt-4 ">
                    <SidebarMenu/>
                </div>

            </div>

            <div className="bg-[#F5F5F5] w-1 border-0"/>

            <div className="p-0  flex flex-grow flex-col relative">

                <div className={`max-w-[1500px]`}>
                    <NavbarPage/>
                </div>

                <div className="main">
                    <MainPage/>
                </div>

                <div id="footer"
                     className="flex flex-grow bg-[#F5F5F5] mt-5 justify-center text-center absolute footer">
                    <FooterPage/>
                </div>

            </div>

        </div>

    )

}