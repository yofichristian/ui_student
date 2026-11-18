import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useQueryClient} from "@tanstack/react-query";
import {Outlet, useNavigate} from "react-router";
import {BsXCircle} from "react-icons/bs";

import {clearStateModule, closetab, setactivetab} from "@/slice/menuslice";
import WelcomePage from "@/pages/welcomepage/index.jsx";

export const MainPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const {activetab, listtab} = useSelector((state) => state.menu);

    const TabPanel = () => {
        if (listtab.length === 0) {
            return null;
        }

        // console.log("debug 1");

        return (
            <div className="border-b-2  border-gray-700 z-50 ">
                <ul key="tabpanelkey" className="flex flex-wrap -mb-px text-sm font-medium text-center text-lime-950">
                    {
                        listtab.map((item, index) => (
                                <li key={item.id} id={item.id} className="me-2 mb-1.5">
                                    <a className={`inline-flex items-center justify-center py-2 px-4 border-b-2 rounded-t-lg
                                        ${activetab && activetab.id === item.id
                                        ? "text-white bg-blue-500 rounded-t-lg active"
                                        : "hover:text-black hover:border-blue-800 hover:bg-blue-200 bg-gray-300 text-black border-gray-600"}
                                        group`}
                                    >
                                        {/*<{item.icon} className="mr-2"/>*/}
                                        <>
                                            <span className="mr-2 cursor-pointer"
                                                  onClick={() => {
                                                      dispatch(setactivetab({activetab: {id: item.id, title: item.title, titlebhs: item.titlebhs, path: item.path}}));
                                                      const newpath = localStorage.getItem(item.id);
                                                      if (newpath!==null) {
                                                          navigate(newpath);
                                                      } else {
                                                          navigate(item.path);
                                                      }
                                                  }}
                                            >
                                                {printBahasa(item.title, item.titlebhs)}
                                            </span>

                                            <BsXCircle
                                                className="hover:bg-red-800 rounded-full text-[18px] cursor-pointer"
                                                onMouseOver={(e) => (showTooltips(e, `Close ${item.title}`))}
                                                onMouseOut={hideTooltips}
                                                onClick={() => {
                                                    dispatch(clearStateModule({modulename: item.id}));
                                                    dispatch(closetab({activetab: item}));
                                                    localStorage.removeItem(item.id);

                                                    const queryKey = `repo${item.id}`;
                                                    // console.log("debug 32 query key ", queryKey);
                                                    queryClient.invalidateQueries({queryKey: [queryKey]})

                                                    if (listtab.length===1) {
                                                        navigate("/");
                                                        return;
                                                    }

                                                    if (activetab.id !== item.id) {
                                                        //refresh active tab
                                                        dispatch(setactivetab({activetab: activetab}));
                                                        const newpath = localStorage.getItem(activetab.id);
                                                        if (newpath!==null) {
                                                            navigate(newpath);
                                                        } else {
                                                            navigate(newtab.path);
                                                        }
                                                    } else {
                                                        //find new tab
                                                        let newtab = null;
                                                        listtab.map((cc, index) => {
                                                            if ((newtab === null) && (item.id !== cc.id)) {
                                                                newtab = cc;
                                                            }
                                                        });

                                                        dispatch(setactivetab({activetab: {id: newtab.id, title: newtab.title, titlebhs: newtab.titlebhs, path: newtab.path}}));
                                                        const newpath = localStorage.getItem(newtab.id);
                                                        if (newpath!==null) {
                                                            navigate(newpath);
                                                        } else {
                                                            navigate(newtab.path);
                                                        }
                                                    }

                                                }}
                                            />
                                        </>
                                    </a>

                                </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

    const handleClose = () => {
        dispatch(closetab({activetab: activetab}));
        localStorage.removeItem(activetab.id);

        const queryKey = `repo${activetab.id}`;
        // console.log("debug 31 ", queryKey);
        queryClient.invalidateQueries({queryKey: [queryKey]})

        //find new tab
        let newtab = null;
        listtab.map((cc, index) => {
            if ((newtab === null) && (activetab.id !== cc.id)) {
                newtab = cc;
            }
        });

        if (newtab===null) {
            navigate("/");
            return;
        }

        dispatch(setactivetab({activetab: {id: newtab.id, title: newtab.title, titlebhs: newtab.titlebhs, path: newtab.path}}));
        const newpath = localStorage.getItem(newtab.id);

        if (newpath!==null) {
            navigate(newpath);
        } else {
            navigate(newtab.path);
        }
    }

    const MainPage = () => {
        if (activetab===null && listtab.length === 0)
            return (
                <WelcomePage />
            )

        if (activetab===null && listtab.length > 0)
            return null;

        return (
            <Outlet className="flex-grow"/>
        )
    }


    return (
        <>
            <div>
                <TabPanel/>
                <div  id="container1" className="tabmain m-0 p-0 text-sm">
                    <div className={`${activetab ? 'mt-5' : 'mt-0'}`}>
                        <MainPage />
                    </div>
                </div>
            </div>
        </>
    )
}