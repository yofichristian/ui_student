export const Spinner = () => {

    // const basePath = import.meta.env.VITE_PUBLIC_URL;

    return (
        <div className="text-sm">
            <div id="tooltips"
                 className={`absolute top-0 left-0 z-50 bg-blue-200 text-black rounded-2xl hidden px-3 py-1`}>
                Hallo Indonesia
            </div>

            <div id="spinner"
                 className={`w-full h-full absolute top-0 left-0 bottom-0 place-items-center hidden z-50 `}>
                <div className="top-1/3 sticky">
                    <div className="flex gap-8">
                        {/*<img src={`/image/flowalytics.webp`} alt="logo"*/}
                        <img src={`/image/spinner.png`} alt="logo"
                          className="border-blue-600 border-2 border-b-0 border-r-0 w-16 h-16 rounded-full p-2 rotatelooping"/>
                    </div>
                </div>
            </div>

            <div id="toast"
                 className={`w-full h-full absolute top-0 left-0 bottom-0 place-items-center z-50 hidden `}>
                <div className="top-1/3 sticky flex">
                    <div id="toast2" className="flex gap-8 bg-blue-800 text-white py-2 px-10 rounded-3xl inline-flex">
                    </div>
                </div>
            </div>

            <div id="snackbar"
                 className={`fixed right-0 top-0 z-50 bg-red-700 text-white py-2 px-10 rounded-2xl text-base hidden`}>
                Indonesia Raya
            </div>

        </div>
    )
}

