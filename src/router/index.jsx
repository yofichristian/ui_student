import {createBrowserRouter} from "react-router";
import WelcomePage from "@/pages/welcomepage/index.jsx";
import LoginPage from "@/pages/loginpage/index.jsx";
import RouterListPage from "@/pages/routerlistpage/index.jsx";
import Applayout from "@/components/layout/applayout/applayout.jsx";

export const router = createBrowserRouter([
        {
            path: '/login',
            element: <LoginPage/>,
        },
        {
            element: <Applayout/>,
            children: [
                {
                    index: true,     // Marks this as the default/index route
                    element: <WelcomePage />,
                },
                {
                    path: '/',
                    element: <WelcomePage/>,
                },
                // {
                //     path: '/about',
                //     element: <AboutPage/>,
                // },
                {
                    path: ':moduleid',
                    element: <RouterListPage/>,
                },
                {
                    path: ':moduleid/:action',
                    element: <RouterListPage/>,
                },
            ]
        }
    ],
    // {basename: import.meta.env.VITE_PUBLIC_URL}
    // {basename: "/ccc"}
)