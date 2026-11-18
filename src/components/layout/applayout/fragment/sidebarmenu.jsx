import * as React from "react";

import {useDispatch, useSelector} from "react-redux";
import {BsChevronDown} from "react-icons/bs";
import {useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router";

import {MasterMenus} from "@/config/menu.jsx";
import {addopensubmenu, removeopensubmenu, setactivetab} from "@/slice/menuslice.jsx";

const MenuItem = ({item, index, level}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryClient = useQueryClient();

    const {openSidebar, listopenmenu, activetab} = useSelector((state) => state.menu);
    // console.log(JSON.stringify(permissions));

    const isSubMenuOpened = listopenmenu.includes(item.id);

    // const asyncLocalStorage = {
    //     async setItem(key, value) {
    //         await null
    //         return localStorage.setItem(key, value)
    //     },
    //     async getItem(key) {
    //         await null
    //         return localStorage.getItem(key)
    //     }
    // }

    const clearCookies = async () => {
        // dispatch(clearRedux({},null));
        localStorage.clear();
        clearAllCookies();
    }

    const toggleSubMenu = () => {
        if (item.items && item.items.length > 0) {
            const isOpen = listopenmenu.includes(item.id);
            if (isOpen) {
                // console.log("debug close sub menu", item.title);
                dispatch(removeopensubmenu({id: item.id}));
            } else {
                // console.log("debug open sub menu", item.title);
                dispatch(addopensubmenu({id: item.id}));
            }
            return;
        }   //handle subMenu

        if (item.id === "logout") {
            if (!confirm(printBahasa("Are you sure you want to logout ?","Anda yakin mau keluar ?"))) {
                return;
            }

            queryClient.resetQueries();
            clearCookies();
            showSpinner(false);

            window.location.href = "/login";
            return;
        }

        // dispatch(setactivetab({activetab: item}));
        dispatch(setactivetab({
            activetab: {
                id: item.id,
                title: item.title,
                titlebhs: item.titlebhs,
                path: item.path,
            }
        }));

        const newpath = localStorage.getItem(item.id);
        if (newpath!==null) {
            navigate(newpath);
        } else {
            // updateUamPermission();
            navigate(item.path);
        }

    }

    // const updateUamPermission = () => {
    //     // console.log("update uam service");
    //     setTimeout(async () => {
    //         try {
    //             const temp = await axiosInstance.get("/user-access-matrix/permission-by-user");
    //             // console.log(JSON.stringify(temp.data));
    //             if (temp.data.success) {
    //                 // console.log(JSON.stringify(temp.data.result.permissions));
    //                 dispatch(savePermission(temp.data.result.permissions));
    //             } else {
    //                 dispatch(clearPermission());
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }, 0);
    // }

    const handleClick = (event) => {
        toggleSubMenu();
    }

    //set padding left
    let plx = "pl-1";
    if (openSidebar) {
        if (level === 2) plx = "pl-5";
        if (level === 3) plx = "pl-8";
    }

    return (
        <>
            <li key={item.id} className={` flex items-center gap-x-4 cursor-pointer p-2 
                                         hover:bg-blue-300
                                         rounded-md mb-1.5
                                         ${activetab && activetab.id === item.id ? ' bg-blue-500 text-white ' : ' '}
                                        `}
                onClick={handleClick}
            >
                <span className={`{text-2xl block float-left ${plx}`}>
                    {item.icon}
                </span>

                <span className={`flex-1 duration-200
                    ${!openSidebar && 'hidden'}
                `}>
                    {printBahasa(item.title, item.titlebhs)}
                </span>
                {
                    item.items && item.items.length > 0 &&
                    <BsChevronDown className={`${isSubMenuOpened && "rotate-180"}`}/>
                }
            </li>

            {
                (item.items && item.items.length > 0 && isSubMenuOpened)
                    ? (
                        <ListMenuItem items={item.items} level={level + 1}/>
                    )
                    : null
            }

        </>
    )
}

const isMenuVisible = (permissions, menu) => {
    // console.log("find menu ", menu, JSON.stringify(permissions));
    if (permissions===null) return true;
    if (sameString(menu.title,"Logout")) return true;
    // if (sameString(menu.title,"Parameter")) return true;
    // if (sameString(menu.title,"Report Templates")) return true;
    let found = false;

    let menu1 = menu.title.toString().trim().toLowerCase();
    permissions.map((item) => {
        const item1 = item.menu.toString().trim().toLowerCase();
        if (menu1===item1) {
            found = true;
            return;
        }
        if (menu1.includes(item1)) {
            found = true;
            return;
        }
        if (item1.includes(menu1)) {
            found = true;
            return;
        }
    });
    if (found) return true;

    menu1 = menu.title2.toString().trim().toLowerCase();
    permissions.map((item) => {
        const item1 = item.menu.toString().trim().toLowerCase();
        if (menu1===item1) {
            found = true;
            return;
        }
        if (menu1.includes(item1)) {
            found = true;
            return;
        }
        if (item1.includes(menu1)) {
            found = true;
            return;
        }
    });

    return found;

}

const ListMenuItem = ({items, level = 1}) => {
    if (items.length === 0) return null;

    const {permissions} = useSelector((state) => state.menu);

    return (
        <>
            <ul className="text-sm">
                {
                    items.map((item, index) => {
                        // console.log(JSON.stringify(item));
                        if (isMenuVisible(permissions, item)) {
                            return (
                                <MenuItem item={item} index={index} level={level} key={item.id} id={item.id}/>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}

export const SidebarMenu = (props) => {

    return (
        <ListMenuItem items={MasterMenus} level={1}/>
    )

}