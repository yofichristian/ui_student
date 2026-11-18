import {Spinner} from "@/components/spinner/index.jsx";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useLogin} from "@/services/authservice.jsx";
import {clearToken, saveToken} from "@/slice/authslice.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

export const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearToken());
    },[])

    const initialValues = {
        username: "",
        password: "",
    };

    const schema = Yup.object().shape({
        username: Yup.string()
            .min(3,"min length is 3 char")
            .max(15, "max length 15 chars")
            .required("username is required"),
        //email: yup.string().email("Enter a valid email address").required("Email is required"),
        password: Yup.string()
            .min(2,"min length is 2 char")
            .max(30, "max length 30 chars")
            .required("password is required"),
    });

    const [inProcessing, setInProcessing] = useState(false);

    const submitForm = (values, actions) => {
        if (inProcessing) return;
        setInProcessing(true);

        showSpinner(true)
        mutate(values);
    }

    const {mutate, isLoading: isLoadingFileUpload, isSuccess} = useLogin({
        onSuccess: async (response) => {
            // console.log("debug 3 response ", JSON.stringify(response));
            setInProcessing(false);
            showSpinner(false);

            if (response.accessToken!=="") {
                dispatch(saveToken(response));
                navigate("/welcome");
            } else {
                dispatch(clearToken());
            }
        },
        onError: async (error) => {
            setInProcessing(false);
            showSpinner(false);
            console.log("error ", error);
        },
    });


    return (
        <>
            <Spinner/>

            <div className=" w-full h-full flex p-0 m-0 ">

                <div className="w-[30%] h-full">
                    <img src="/image/background.jpg" className="w-full h-full"/>
                </div>

                <div className="w-full flex ">
                    {/*<div className="max-w-md w-full bg-[#F9FAFB]  rounded-xl shadow-lg p-8">*/}
                    <div className="max-w-[600px] w-full p-[40px]">

                        <div className="flex mb-2 ">
                            <img src={`/image/avenger1.jpg`} className="w-[60px] h-[80px]"
                                 alt="Avenger Inc" />
                            <span className="pl-4 pt-4 text-5xl text-blue-900 font-bold">Avenger Corp</span>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={submitForm}
                        >
                            {(formik) => {
                                const {
                                    values, errors, touched, isValid, dirty,
                                    setFieldValue, resetForm
                                } = formik;
                                return (
                                    <Form id="form1" name="form1" className="space-y-2" onSubmit={formik.handleSubmit}>

                                        <div className="w-full place-items-start mb-4 flex flex-col">
                                            <label className="label1">User Name (yofi)</label>
                                            <Field
                                                name="username" id="username" type="text"
                                                className={`fieldnormal
                                                                ${errors.username && touched.usernamename ? 'input-error' : null}
                                                            `}
                                                placeholder="user name"
                                            />
                                            <ErrorMessage name="username" component="username" className="error text-red-600"/>
                                        </div>


                                        <div className="w-full place-items-start mb-4 flex flex-col">
                                            <label className="label1">Password (password)</label>
                                            <Field
                                                name="password" id="password" type="password"
                                                className={`fieldnormal
                                                                ${errors.password && touched.password ? 'input-error' : null}
                                                            `}
                                                placeholder="user name"
                                            />
                                            <ErrorMessage name="password" component="password" className="error text-red-600"/>
                                        </div>

                                        <div className="h-2"></div>

                                        <div className="w-full flex justify-end border-t-2 border-t-gray-300 pt-4">
                                            <button type="submit" className={`buttonsave`}>
                                                Login
                                            </button>

                                            {/*<button type="button"*/}
                                            {/*        className={`w-40 bg-red-900 text-white font-medium py-2.5 rounded-lg transition-colors*/}
                                            {/*                hover:bg-red-500 hover:font-bold*/}
                                            {/*            `}*/}
                                            {/*        onClick={() => {*/}
                                            {/*            closeDialog();*/}
                                            {/*        }}*/}
                                            {/*>*/}
                                            {/*    {t("cancel")}*/}
                                            {/*</button>*/}

                                        </div>

                                    </Form>

                                )
                            }}


                        </Formik>



                        {/*<div className="bg-black my-4 h-0.5 w-full"></div>*/}
                        {/*<h2 className="text-2xl font-bold  mb-3 text-center">Sign In</h2>*/}


                    </div>
                </div>

            </div>

        </>

    )

};

export default LoginPage;