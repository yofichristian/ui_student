import * as React from "react";

import {BsAndroid, BsAndroid2, BsCardChecklist, BsPeople, BsPower} from "react-icons/bs";

export const MasterMenus = [
    {
        title: "Data Management",
        icon: <BsAndroid2 />,
        // icon: <BsBoxes />,
        id: "datamanagement",
        items: [
            {
                title: "User Management",
                titlebhs: "User Management",
                path: "/user",
                icon: <BsPeople />,
                id: "user",
            },
            {
                title: "System Parameter",
                titlebhs: "System Parameter",
                path: "/syspar",
                icon: <BsCardChecklist />,
                id: "systemparameter",
            },
        ]
    },
    {
        title: "Logout",
        titlebhs: "Keluar",
        path: "/logout",
        // icon: <BsFillRocketTakeoffFill />,
        icon: <BsPower />,
        id: "logout",
    },

]
