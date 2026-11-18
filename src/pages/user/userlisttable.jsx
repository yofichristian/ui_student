import {useDispatch, useSelector} from "react-redux";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {openModalEdit, saveState} from "@/slice/menuslice.jsx";
import {
    BsBootstrapReboot, BsCaretLeft, BsCaretRight, BsFeather,
    BsFileEarmarkPlus,
    BsFunnel,
    BsSortAlphaDown,
    BsSortAlphaDownAlt,
    BsTrash
} from "react-icons/bs";
import {getActiveState} from "@/services/appservice.jsx";
import {useNavigate} from "react-router";
import axiosInstance from "@/config/axios.jsx";

//{"createddate":"2026-09-18T04:39:10.08343","deleted":0,"fullname":"Admin",
// "id":"cccf10c7-b6ed-4849-a379-ff556b6292f0","password":"password","plainpswd":1,"role":"ADMIN",
// "status":1,"updateddate":"2026-09-18T04:39:10.08343","username":"admin"}

const headers = [
    {
        title: "Login",
        field: "username",
        width: "120px",
        canFilter: true,
    },
    {
        title: "Full Name",
        field: "fullname",
        width: "200",
        canFilter: true,
    },
    {
        title: "Role",
        field: "role",
        width: "80px",
        canFilter: true,
    },
    {
        title: "Status",
        field: "status",
        width: "80px",
        canFilter: true,
    },
]

export const UserListTable = (props) => {

    const {data, moduleid} = props;

    // console.log("debug 1", JSON.stringify(data));

    const dispatch = useDispatch();
    // const queryKey = `repo${moduleid}`;
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {activetab} = useSelector((state) => state.menu);

    const initialState = {
        moduleid: moduleid,
        maxrec: 50,
        curpage: 0,
        listfilter: {},
        sortingColumn: `${headers[0].field}`,
        sortingMode: "asc",
        sortingData: [],
    }

    const curState = getActiveState(moduleid, initialState);
    // console.log("debug current state 4", JSON.stringify(curState));

    const [maxrec, setMaxrec] = useState(curState.maxrec);
    const [curpage, setCurpage] = useState(curState.curpage);
    const [sortingMode, setSortingMode] = useState(curState.sortingMode);
    const [sortingColumn, setSortingColumn] = useState(curState.sortingColumn);
    const [sortingData, setSortingData] = useState([]);

    let listfilter = curState.listfilter;

    useEffect(() => {
        const datatemp1 = doFilterData(data, curState.listfilter);
        const datatemp2 = doSortingData(datatemp1, curState.sortingColumn, curState.sortingMode==="asc");
        setSortingData(datatemp2);
    },[])

    const savePageState = (pmaxrec, pcurpage) => {
        dispatch(saveState({
            moduleid: moduleid,
            maxrec: pmaxrec,
            curpage: pcurpage,
        }));
    }

    const applyFilter = () => {
        dispatch(saveState({
            moduleid: moduleid,
            listfilter: listfilter
        }));
    }

    const sortByColumn = (column) => {
        let sortMode = sortingMode==="asc" ? "desc" : "asc";
        if (column!==sortingColumn) {
            sortMode = "asc";
        }

        dispatch(saveState({
            moduleid: moduleid,
            sortingColumn : column,
            sortingMode: sortMode,
        }));
    };

    const RenderTableHeader = () => {
        return (
            <thead className="bg-gray-300 rounded-lg text-white font-semibold w-full">
            <tr key={0} className="align-top">
                <th className="py-3 px-3 text-[#212B36] justify-center items-center font-bold whitespace-nowrap group w-[100px]">
                    <div className="m-0 p-0 w-full flex flex-col">
                        <span className="mb-2">No</span>
                        <span>Filter</span>
                    </div>
                </th>
                {
                    headers.map((item, index) => (
                        // <th className="py-3 px-3 text-[#212B36] font-bold whitespace-nowrap group" style={{width: `${item.width}`}}>
                        <th className={`py-3 px-3 text-[#212B36] font-bold whitespace-nowrap group w-[${item.width}]`}>
                            <div className="flex items-center">
                                <BsSortAlphaDownAlt className={`w-4 h-4 cursor-pointer  
                                        ${sortingColumn===item.field ? "block" : "hidden"}
                                        ${sortingMode==="asc" ? "hidden" : "block"}
                                        `}
                                />
                                <BsSortAlphaDown className={`w-4 h-4 cursor-pointer  
                                        ${sortingColumn===item.field ? "block" : "hidden"}
                                        ${sortingMode==="asc" ? "block" : "hidden"}
                                        `}
                                />
                                <span className={`cursor-pointer pl-1
                                    ${sortingColumn===item.field ? "underline" : ""}
                                    `}
                                      onClick={() => sortByColumn(`${item.field}`)}>
                                  {item.title}
                                </span>
                            </div>
                            <div className="mt-1">
                                <input type="text" key={`inputfilter_${item.field}`} id={`inputfilter${item.field}`}
                                    // autoFocus={true}
                                       className="px-1 py-1 bg-white     border border-slate-200 rounded-lg ease shadow-sm w-full
                                                        focus:ring-1 focus:outline-none focus:border-slate-400 focus:shadow-md
                                                        hover:ring-1 hover:border-slate-400 font-normal
                                                        outline-none transition-all"
                                       defaultValue={listfilter[item.field]}
                                    // value={listfilter[item.field]}
                                       onChange={(e) => {
                                           e.preventDefault();
                                           listfilter = {
                                               ...listfilter,
                                               [item.field] : e.target.value
                                           };
                                       }}
                                       onKeyUp={(e) => {
                                           e.preventDefault();
                                           if (e.key==="Enter") {
                                               applyFilter();
                                           }
                                       }}
                                />
                            </div>
                        </th>
                    ))
                }
                <th className="py-3 px-3 text-[#212B36] font-bold whitespace-nowrap group flex-grow flex flex-col">
                    Action
                    <div className={`block w-full flex flex-wrap `}>

                        <div className={`h-8 w-8 text-[18px] flex justify-center align-middle hover:bg-blue-500 hover:text-white rounded-full 
                                        mr-2 pt-[6px] cursor-pointer tooltip`}
                             onClick={() => {
                                 applyFilter();
                             }}
                        >
                            <BsFunnel/>
                            <span className="tooltiptext">apply filter</span>
                        </div>

                        <div className={`h-8 w-8 text-[18px] flex justify-center align-middle hover:bg-blue-500 hover:text-white rounded-full 
                                        mr-2 pt-[6px] cursor-pointer tooltip`}
                             onClick={() => {
                                 listfilter = {};
                                 applyFilter();
                             }}
                        >
                            <BsTrash />
                            <span className="tooltiptext">clear filter</span>
                        </div>

                    </div>

                </th>
            </tr>
            </thead>
        )
    }

    const RenderTableBody = () => {
        if (sortingData.length === 0) return null;

        const totpage = Math.ceil(sortingData.length / maxrec);
        if (curpage >= totpage) {
            setCurpage(0);
            savePageState(maxrec, 0);
        }

        const istart = curpage * maxrec;
        const iend = istart + maxrec - 1;

        return (
            <tbody>
            {
                sortingData?.map((item, index) => {
                    if ((index < istart) || (index > iend)) return null;

                    return (
                        <tr key={item.id} className={`hover:bg-gray-300/[50%] align-top
                            ${item.status > 0 ? "" : "line-through "}
                            `}>
                            {/*<td className="py-2 px-2 text-base font-normal flex items-center justify-center h-full border-t">*/}
                            <td className="py-2 pr-3 border-t whitespace-nowrap text-end pr-[60px] ">
                                {index + 1}
                            </td>

                            <td className="py-2 px-3 border-t whitespace-nowrap">
                                {item?.username}
                            </td>
                            <td className="py-2 px-3 border-t whitespace-nowrap">
                                {item?.fullname}
                            </td>
                            <td className="py-2 px-3 border-t whitespace-nowrap">
                                {item?.role}
                            </td>
                            <td className="py-2 px-3 border-t whitespace-nowrap">
                                {item?.status===1 ? "active" : "inctive"}
                            </td>
                            {/*<td className="py-2 px-3 border-t whitespace-nowrap">*/}
                            {/*    {item?.value.length<=50 ? item.value : <textarea cols='50' rows='2' disabled defaultValue={item.value}/>}*/}
                            {/*</td>*/}
                            {/*<td className="py-2 px-3 border-t whitespace-nowrap">*/}
                            {/*    {item?.status==1 ? "Active" : "Inactive"}*/}
                            {/*</td>*/}
                            {/*<td className="py-2 px-3 border-t whitespace-nowrap">*/}
                            {/*    {item?.description}*/}
                            {/*</td>*/}
                            <td className="py-2 px-3 border-t whitespace-nowrap">
                                <div className={`block flex flex-wrap `}>

                                    <div className={`h-8 w-8 text-[18px] flex justify-center align-middle hover:bg-blue-500 hover:text-white rounded-full 
                                                    mr-4 pt-[6px] cursor-pointer tooltip
                                                    `}
                                         onClick={() => {
                                             showEditModalDialog(item);
                                         }}
                                    >
                                        <BsFeather/>
                                        <span className="tooltiptext">edit user</span>
                                    </div>

                                    <div className={`h-8 w-8 text-[18px] flex justify-center align-middle hover:bg-blue-500 hover:text-white rounded-full 
                                                    mr-4 pt-[6px] cursor-pointer tooltip
                                                    `}
                                         onClick={() => {
                                             deleteUser(item);
                                         }}
                                    >
                                        <BsTrash/>
                                        <span className="tooltiptext">delete user</span>
                                    </div>



                                </div>
                            </td>

                        </tr>
                    )
                })
            }
            </tbody>
        )
    }

    const showAddModalDialog = () => {
        // savePageState(maxrec, curpage);
        // dispatch(openModalAdd({modalid: 101, projectid: -99}));
        navigate(`/${moduleid}/add`)
    }

    const deleteUser = (param) => {
        if (!confirm("Are you sure you want to delete this user login " + param.username + " ?")) {
            return;
        }

        // console.log("debug user ", JSON.stringify(param));
        try {
            showSpinner(true);
            setTimeout(async () => {
                const response = await axiosInstance.get('/user/delete/' + param.username);
                // console.log("debug 1 ", response.data);
                showSpinner(false);
                if (response.data.responseCode==="00") {
                    toast("Login " + param.username + " is deleted successfully");
                    queryClient.resetQueries();
                } else {
                    toast("Fail to delete login  " + param.username, false);
                }
            }, 100);

        } catch (error) {
            console.log(error);
        }
    }

    function showEditModalDialog(item) {
        // savePageState(maxrec, curpage);

        // console.log("debug edit ", JSON.stringify(item));

        dispatch(saveState({
            moduleid: moduleid,
            dataupdate : item,
        }));

        navigate(`/${moduleid}/edit`);

        // dispatch(openModalEdit({
        // dispatch(openModalEdit({
        //     modalid: 102,
        //     projectid: item.id,
        //     dataheader: item
        // }));
    }


    const refreshData = () => {
        queryClient.resetQueries();
    }

    const RenderPagination = () => {
        const totpage = Math.ceil(sortingData.length / maxrec);

        // if (curpage > totpage) {
        //     setCurpage(0);
        //     savePageState(maxrec, 0);
        // }

        const rows = [];
        for (let i = 0; i < totpage; i++) {
            rows.push(i);
        }

        return (
            <div className="flex flex-grow">

                <div className="mr-4 relative">
                    <select
                        className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded
                        pl-3 pr-8 py-1.5
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm
                        focus:shadow-md appearance-none cursor-pointer"
                        onChange={(val) => {
                            setCurpage(parseInt(val.target.value));
                            savePageState(maxrec, parseInt(val.target.value));
                        }}
                        value={curpage}
                    >
                        {
                            rows.map((item, index) => (
                                <option key={index} value={item}>{item + 1}</option>
                            ))
                        }
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth="1.2" stroke="currentColor"
                         className="h-5 w-5 ml-1 absolute top-2 right-2.5 text-slate-700">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                    </svg>
                </div>

                <div className="mr-4 relative">
                    <button className={`bg-white   text-sm rounded border-2 px-3 py-1.5
                        hover:border-blue-700/[30%] hover:bg-blue-500  hover:text-white shadow-sm
                        `}
                            onClick={() => {
                                if (curpage > 0) {
                                    setCurpage(curpage - 1);
                                    savePageState(maxrec, curpage - 1);
                                }
                            }}
                    >
                        <span className="flex flex-wrap">
                            <BsCaretLeft className="mr-1 text-[18px]"/>
                            Prev
                        </span>

                    </button>
                </div>

                <div className="relative ">
                    <button className={`bg-white   text-sm rounded border-2 px-3 py-1.5
                    hover:border-blue-700/[30%] hover:bg-blue-500  hover:text-white shadow-sm
                    `}
                            onClick={() => {
                                if (curpage < totpage - 1) {
                                    setCurpage(curpage + 1);
                                    savePageState(maxrec, curpage + 1);
                                }
                            }}
                    >
                        <span className="flex flex-wrap">
                            Next
                            <BsCaretRight className="mr-1 text-[18px]"/>
                        </span>
                    </button>
                </div>

            </div>
        )
    }

    const RenderButton = () => {
        return (
            <>
                <a href="#" className={`py-2 rounded-2xl  text-white text-center ml-4
                                       justify-center flex flex-wrap w-[120px] cursor-pointer tooltip
                                       bg-blue-400 hover:text-white hover:bg-blue-500
                                       `}
                   onClick={showAddModalDialog}
                >
                    Add
                    <BsFileEarmarkPlus className="text-2xl ml-3"/>
                    <span className="tooltiptext">add user</span>
                </a>

                <a href="#" className={`py-2 rounded-2xl  text-white text-center ml-4
                                       justify-center flex flex-wrap w-[120px] cursor-pointer tooltip
                                       bg-blue-400 hover:text-white hover:bg-blue-500
                                       `}
                   onClick={refreshData}
                >
                    Refresh
                    <BsBootstrapReboot className="text-2xl ml-3"/>
                    <span className="tooltiptext">refresh data</span>
                </a>

            </>
        )
    }

    return (
        <>

            {/*<SystemParameterAddModal data={data}/>*/}
            {/*<SystemParameterEditModal data={data}/>*/}


            <div className=" bg-white rounded-xl border-3 shadow-lg border-gray-400 ">
                <div className="w-full">

                    <div id="panelMenuSyspar" className="panelMenu" style={{display:"none"}}>
                        <div className="my-4 mx-0  flex flex-wrap flex-grow justify-end text-end">
                            <RenderButton/>
                        </div>
                    </div>

                    {/*do not altered*/}
                    <div id="panelTitleSyspar" className="py-5 flex mx-5 ">

                        <h1 className="text-[14pt] font-bold">
                            {printBahasa(activetab.title,activetab.titlebhs)}
                        </h1>

                        <div className="flex flex-wrap flex-grow justify-end text-end">
                            <RenderButton/>
                        </div>

                    </div>

                    <div id="panelDetail" className="w-full overflow-x-auto 2xl:max-w-none">

                        <table
                            className="table-auto text-sm w-full text-sm text-left font-inter border-separate border-spacing-y-0 borer ">

                            <RenderTableHeader/>
                            <RenderTableBody/>

                        </table>

                    </div>

                    <div className="w-full flex flex-wrap font-bold mt-5 border-t-gray-300 border-t-2 py-6 px-3">

                        <div className="text-justify px-3 py-1.5 mr-5">
                            Total : {sortingData.length} recs
                        </div>

                        <span className="mr-2 py-1.5">Show  </span>
                        <div className="">
                            <div className="relative">
                                <select
                                    className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded
                                            pl-3 pr-8 py-1.5
                                            transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm
                                            focus:shadow-md appearance-none cursor-pointer"
                                    onChange={(val) => {
                                        setMaxrec(parseInt(val.target.value));
                                        savePageState(parseInt(val.target.value), curpage);
                                    }}
                                    value={maxrec}
                                >
                                    {
                                        [2, 5, 10, 20, 40, 50, 60, 70, 80, 90, 100].map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.2" stroke="currentColor"
                                     className="h-5 w-5 ml-1 absolute top-2 right-2.5 text-slate-700">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                                </svg>
                            </div>
                        </div>
                        <span className="ml-2 py-1.5">recs/page</span>

                        <div className="px-3 flex flex-grow justify-end ">

                            <div className="ml-5 w-[75px] py-1.5">
                                Goto :
                            </div>

                            <div className="">
                                <div className="relative">
                                    <RenderPagination/>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>


            </div>

        </>
    )
}

export default UserListTable;