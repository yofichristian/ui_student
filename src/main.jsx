// import { StrictMode } from 'react'
import {createRoot} from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import store from "./stores/index.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            refetchOnWindowFocus: false //prohibited recall api
        },
    },
})

sessionStorage.clear();

createRoot(document.getElementById('root')).render(
    <>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    </>

);
