import * as React from 'react';
import {useDispatch} from "react-redux";

// import {useQueryClient} from "@tanstack/react-query";
import {Spinner} from "@/components/spinner/index.jsx";
import {clearToken} from "@/slice/authslice.jsx";
import {useEffect} from "react";
import {DashboardPage} from "@/components/layout/applayout/fragment/dashboard.jsx";

// import "react-datepicker/dist/react-datepicker.css";

export const AppLayout = (props) => {

    const dispatch = useDispatch();
    // const queryClient = useQueryClient();

    // console.log("debug 10 check token");
    // checkMainToken();

    // let idleTime = 0;
    // let idSession = null;

    // const handleBlur = () => {
    //     // console.log("blur");
    //     idSession = setInterval(() => {
    //         if (idleTime>15) { //idle for 15 minutes
    //             alert("Your session is expired !!!!");
    //             doLogout();
    //             clearInterval(idSession);
    //         }
    //         idleTime = 1 + idleTime;
    //         // console.log("idle time", idleTime);
    //     }, 60000);
    //     return () => clearInterval(idSession);
    // }
    //
    // const handleFocus = () => {
    //     // console.log("focus");
    //     idleTime = 0;
    //     try {
    //         clearInterval(idSession);
    //         // updateDateTime();
    //     } catch (e) {
    //         idSession = null;
    //     }
    // }
    //
    // useEffect(() => {
    //     window.addEventListener('blur', handleBlur);
    //     window.addEventListener('focus', handleFocus);
    // }, []);

    hideTooltips();

    useEffect(() => {
        // console.log("debug 10 check token");
        checkMainToken();
    }, []);

    const doLogout = () => {
        // console.log("Logged out");
        dispatch(clearToken());
        showSpinner(false);
        window.location.href = "/login";
    }

    const checkMainToken = () => {
        // console.log("check main token");

        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken || accessToken === "" || accessToken === null || accessToken === undefined) {
            console.log("token not found. logged out");
            doLogout();
            return;
        }

        const expiredDate = localStorage.getItem("expiredDate");
        if (expiredDate === null || expiredDate === "" || expiredDate === undefined) {
            console.log("expired date information is missing. logged out");
            doLogout();
            return;
        }

        const dateNow = new Date();
        const dateToken = new Date(expiredDate);
        if (dateToken<dateNow) {
            console.log("token is already expired. logged out");
            doLogout();
            return;
        }

    }

    useEffect(() => {
        // const id = setInterval(checkMainToken, 60000); //check token for 1 minute
        const id = setInterval(checkMainToken, 2000); //check token for 1 minute
        return () => clearInterval(id);
    }, []);


    return (
        <>
            <Spinner/>
            <DashboardPage props={props}/>
        </>
    )

};

export default AppLayout;
