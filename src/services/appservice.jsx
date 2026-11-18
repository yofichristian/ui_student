import axiosInstance from '@/config/axios.jsx';
import {useMutation, useQuery} from "@tanstack/react-query";
import {useDispatch, useSelector} from "react-redux";
import {saveState} from "@/slice/menuslice.jsx";

export const useUserList = (moduleid, queryKey) => {
    return useQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            const response = await axiosInstance.get(`/user/list`);
            // console.log("debug 2", JSON.stringify(response.data));
            return await response.data;
        },
    })
};

export const useUserAdd = ({onSuccess, onError}) => {
    return useMutation({
        mutationFn: async (bodyRequest) => {
            const response = await axiosInstance.post("/user/create", bodyRequest);
            return response.data;
        },
        onSuccess,
        onError,
    })
};

export const useUserEdit = ({onSuccess, onError}) => {
    return useMutation({
        mutationFn: async (bodyRequest) => {
            const response = await axiosInstance.post(`/user/update`, bodyRequest);
            return response.data;
        },
        onSuccess,
        onError,
    })
};


export const getActiveState = (moduleid, initialState) => {
    const dispatch = useDispatch();

    const {liststate} = useSelector((state) => state.menu);
    const temp = liststate.filter ( e => e.moduleid === moduleid);
    if ((temp.length==0) && (initialState!==undefined)) {
        dispatch(saveState(initialState));
        return initialState;
    }
    return temp[0];
}


