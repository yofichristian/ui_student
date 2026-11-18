import {useMutation} from "@tanstack/react-query";
import axiosInstance, {axiosUpload} from '@/config/axios.jsx';

export const useLogin = ({onSuccess, onError}) => {
    return useMutation({
        mutationFn: async (bodyRequest) => {
            // console.log(JSON.stringify(bodyRequest));
            // return {success: false};
            const response = await axiosInstance.post("/auth/login", bodyRequest);
            return response.data;
        },
        onSuccess,
        onError,
    })
};
