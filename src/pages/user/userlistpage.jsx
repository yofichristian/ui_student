import {useParams} from "react-router";
import {useUserList} from "@/services/appservice.jsx";
import UserListTable from "@/pages/user/userlisttable.jsx";
import UserAddPage from "@/pages/user/useraddpage.jsx";
import {UserEditPage} from "@/pages/user/usereditpage.jsx";

export const UserListPage = () => {

    const {moduleid, action} = useParams();

    // console.log("debug param ", moduleid, action);

    if (action==="add") {
        return (
            <UserAddPage/>
        )
    }

    if (action==="edit") {
        return (
            <UserEditPage/>
        )
    }

    showSpinner(true);

    const queryKey = `repo${moduleid}`;

    const {data, isLoading} = useUserList(moduleid, queryKey);

    if (isLoading) return null;

    showSpinner(false);

    // console.log("debug list user ", JSON.stringify(data));

    return (
        <div className=" w-full whitespace-nowrap  ">
            <UserListTable data={data.data} moduleid={moduleid}/>
        </div>
    )
}

export default UserListPage;