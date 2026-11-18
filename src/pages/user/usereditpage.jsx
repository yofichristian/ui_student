import {useNavigate, useParams} from "react-router";
import {useQueryClient} from "@tanstack/react-query";
import * as Yup from "yup";
import {getActiveState, useUserAdd, useUserEdit} from "@/services/appservice.jsx";
import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {UserRole} from "@/pages/user/userservice.jsx";
import {ModalDialog} from "@/components/modaldialog/modaldialog.jsx";


export const UserEditPage = () => {

    const {moduleid, action} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const curState = getActiveState(moduleid, undefined);
    // console.log("debug 12 current state ", moduleid, action, JSON.stringify(curState));

    if (curState?.dataupdate===undefined) {
        navigate(`/${moduleid}`);
        return;
    }

    const initialValues = curState?.dataupdate;

    // const initialValues = {
    //     username: "",
    //     fullname: "",
    //     role: "",
    //     password: "",
    //     status: null,
    // };
    // //

    const schema = Yup.object().shape({
        username : Yup.string().required("username is required"),
        fullname : Yup.string().required("full name is required"),
        role : Yup.string().required("role is required"),
        password : Yup.string().required("password is required"),
        status : Yup.string().required("status is required"),
    });

    const [inProcessing, setInProcessing] = useState(false);

    const submitForm = (values, actions) => {
        if (inProcessing) return;
        setInProcessing(true);

        // console.log("debug values", JSON.stringify(values));

        // const payload = {
        //     ...values,
        //     description : getInnerText("description"),
        //     modulename
        // }
        // // console.log("payload", JSON.stringify(payload));
        // mutate(payload);

        mutate(values);
    }

    const {mutate, isLoading: isLoadingFileUpload, isSuccess} = useUserEdit( {
        onSuccess: async (response) => {
            // console.log("debug response 3 ", response);
            setInProcessing(false);
            if (response.responseCode==="00") {
                toastModal("Update user successfully saved");
                setTimeout(() => {
                    // queryClient.invalidateQueries({queryKey: [`repo${modulename}`]});
                    queryClient.resetQueries();
                    closeDialog();
                },1100)
            } else {
                console.log(response.responseMessage);
                toastModal("Update user failed. " + response.responseMessage + " !!!",false);
            }
        },
        onError: async (error) => {
            setInProcessing(false);
            console.log("error ", error);
            toastModal("Update user failed " + error.message, false);
        },
    });

    function closeDialog() {
        navigate(`/${moduleid}`);
    }

    return (
        <>
            <ModalDialog modalIsOpen={action==="edit"} >

                <div className="w-[600px]">

                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={submitForm}
                    >
                        {(formik) => {
                            const {values, errors, touched, isValid, dirty,
                                setFieldValue, resetForm} = formik;
                            return (
                                <>
                                    <h2 className="text-base font-bold mb-6 pb-4 text-center border-b-2 border-gray-400">
                                        New User
                                    </h2>

                                    <Form id="form1" name="form1" className="space-y-2" onSubmit={formik.handleSubmit}>

                                        <div className="w-full place-items-start mb-2 flex flex-wrap">

                                            <div className="w-[300px] place-items-start mb-0 flex flex-col">
                                                <label className="block font-medium mb-1 items-start ">Full Name</label>
                                                <Field
                                                    name="fullname" id="fullname" type="text"
                                                    className={`px-4 py-2 border border-slate-200 rounded-lg ease shadow-sm w-full
                                                        focus:ring-1 focus:outline-none focus:border-slate-400 focus:shadow-md
                                                        hover:ring-1 hover:border-slate-400
                                                        outline-none transition-all
                                                        ${errors.fullname && touched.fullname ? 'input-error' : null}
                                                        `}
                                                    maxLength={30}
                                                    placeholder="fullname"
                                                />
                                                <ErrorMessage name="fullname" component="fullname" className="error text-red-600"/>
                                            </div>
                                        </div>

                                        <div className="w-full place-items-start mb-2 flex flex-wrap">

                                            <div className="w-[200px] place-items-start mb-0 flex flex-col mr-8">
                                                <label className="block font-medium mb-1 items-start ">Login</label>
                                                <Field
                                                    name="username" id="username" type="text"
                                                    className={`px-4 py-2 border border-slate-200 rounded-lg ease shadow-sm w-full
                                                        focus:ring-1 focus:outline-none focus:border-slate-400 focus:shadow-md
                                                        hover:ring-1 hover:border-slate-400
                                                        outline-none transition-all
                                                        ${errors.username && touched.username ? 'input-error' : null}
                                                        `}
                                                    disabled
                                                    // maxLength={20}
                                                    // placeholder="username/login"
                                                />
                                                <ErrorMessage name="username" component="username" className="error text-red-600"/>
                                            </div>

                                            <div className="w-[200px] place-items-start mb-0 flex flex-col">
                                                <label className="block font-medium mb-1 items-start ">Password</label>
                                                <Field
                                                    name="password" id="password" type="text"
                                                    className={`px-4 py-2 border border-slate-200 rounded-lg ease shadow-sm w-full
                                                        focus:ring-1 focus:outline-none focus:border-slate-400 focus:shadow-md
                                                        hover:ring-1 hover:border-slate-400
                                                        outline-none transition-all
                                                        ${errors.password && touched.password ? 'input-error' : null}
                                                        `}
                                                    maxLength={30}
                                                    placeholder="password"
                                                />
                                                <ErrorMessage name="password" component="password" className="error text-red-600"/>
                                            </div>

                                        </div>

                                        <div className="w-full place-items-start mb-2 flex flex-wrap">

                                            <div className="w-[200px] place-items-start mb-0 flex flex-col mr-8">
                                                <label className="block font-medium mb-1 items-start ">Role</label>
                                                <div className="flex flex-wrap">
                                                    <div className="relative flex">
                                                        <select
                                                            className="bg-transparent placeholder:text-slate-400 text-slate-700
                                                            border border-slate-200 rounded-lg
                                                            pl-3 pr-8 py-2 w-[100px]
                                                            focus:ring-1 focus:outline-none focus:border-slate-400 focus:shadow-md
                                                            hover:ring-1 hover:border-slate-400
                                                            transition duration-300 ease shadow-sm
                                                             appearance-none cursor-pointer"
                                                            onChange={(val)=> {
                                                                // console.log("val", val.target.value);
                                                                setFieldValue("role", val.target.value)
                                                            }}
                                                            value={values.role}
                                                        >
                                                            {
                                                                ["",...UserRole]
                                                                    // .slice().sort((a,b) => {return (a>b ? 1 : -1)})
                                                                    .map((item,index) => (
                                                                        <option key={index} value={item}>{item}</option>
                                                                    ))
                                                            }
                                                        </select>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                             strokeWidth="1.2" stroke="currentColor"
                                                             className="h-5 w-5 ml-1 absolute top-[10px] right-2.5 text-slate-700">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                                                        </svg>
                                                    </div>

                                                </div>
                                                <ErrorMessage name="role" component="role" className="error text-red-600"/>
                                            </div>

                                            <div className="w-[250px] place-items-start mb-0 flex flex-col">

                                                <label className="block font-medium mb-3 items-start ">Status</label>
                                                <div className="mb-2" >
                                                    <label className="  mb-1 mr-5 ">
                                                        <input type="radio" name="status" className="radio mr-2"
                                                               checked={values.status === 1}
                                                               onChange={(val) => {
                                                                   setFieldValue("status", 1);
                                                               }}
                                                        />
                                                        Active
                                                    </label>

                                                    <label className="  mb-1 ">
                                                        <input type="radio" name="status" className="radio mr-2"
                                                               checked={values.status === 0}
                                                               onChange={(val) => {
                                                                   setFieldValue("status", 0);
                                                               }}
                                                        />
                                                        In-Active
                                                    </label>

                                                </div>
                                                <ErrorMessage name="status" component="status" className="error text-red-600 mb-1 w-full"/>
                                            </div>


                                        </div>

                                        {/*<div className="w-full place-items-start mb-0 flex flex-col">*/}

                                        {/*<div className="w-full place-items-start mb-0 flex flex-col">*/}
                                        {/*    <label*/}
                                        {/*        className="block font-medium mb-1 items-start ">{t("description")}</label>*/}
                                        {/*    <textarea name="description" id="description" rows="2"*/}
                                        {/*              className={`px-4 py-2 border border-slate-200 rounded-lg ease shadow-sm w-full  */}
                                        {/*            focus:ring-1 focus:outline-none focus:border-slate-400 focus:shadow-md*/}
                                        {/*            hover:ring-1 hover:border-slate-400*/}
                                        {/*            outline-none */}
                                        {/*            ${errors.description && touched.description ? 'input-error' : null}*/}
                                        {/*    `}*/}
                                        {/*              maxLength={100}*/}
                                        {/*              defaultValue={values.description}*/}
                                        {/*    />*/}
                                        {/*    <ErrorMessage name="description" component="description" className="error text-red-600"/>*/}
                                        {/*</div>*/}

                                        <div className="h-2"></div>

                                        <div className="w-full flex justify-end border-t-2 border-t-gray-300 pt-4">

                                            <button type="submit"
                                                    className={`w-40 bg-blue-800 text-white font-medium py-2.5 rounded-lg transition-colors
                                                hover:bg-blue-600 hover:font-bold mr-5
                                            `}>
                                                Save
                                            </button>

                                            <button type="button"
                                                    className={`w-40 bg-red-900 text-white font-medium py-2.5 rounded-lg transition-colors
                                                    hover:bg-red-500 hover:font-bold
                                                `}
                                                    onClick={() => {
                                                        closeDialog();
                                                    }}
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    </Form>

                                </>

                            );
                        }}

                    </Formik>
                </div>

            </ModalDialog>
        </>
    )
}

export default UserEditPage;