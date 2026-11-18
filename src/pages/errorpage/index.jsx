import {useLocation, useRouteError} from "react-router";

export const ErrorPage = () => {
    // const { controller, data } = useAdministrationPageHooks();
    // const { controller, data } = useErrorPageHooks();

    const error = useRouteError()
    const location = useLocation();

    const errormsg = error?.statusText || error?.message

    return (
        <div className="w-full mt-[10%] flex flex-col justify-center items-center">
            <h1>Oops !</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                Path <b>{location.pathname}</b> is&nbsp;
                <i>{errormsg}</i>
            </p>

        </div>
    )
};

// export const ErrorProjectPage = () => {
//   const error = useRouteError();
//
//   return (
//     <div className="flex flex-col justify-center items-center">
//       <h1>Error Project Page</h1>
//       <p>Sorry, an unexpected error has occurred.</p>
//       <p>
//         <i>{error.statusText || error.message}</i>
//       </p>
//
//     </div>
//   )
// };


export default ErrorPage;