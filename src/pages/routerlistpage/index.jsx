import {useParams} from "react-router";
import UserListPage from "@/pages/user/userlistpage.jsx";

export const RouterListPage = () => {

    const {moduleid, action} = useParams();

    // console.log("modulid ", moduleid);
    // console.log("action ", action);

    if ("user" === moduleid) {
        return (
            <UserListPage/>
        )
    }

    return (
        <div className="w-full mt-[50px] flex flex-col justify-center items-center">

            <h1>Modul {moduleid.toUpperCase()} is UNDER CONSTRUCTION !</h1>

            <h2 className={`${action===undefined ? 'hidden' :''}`}>Action = {action}</h2>

        </div>
    )

};



export default RouterListPage;