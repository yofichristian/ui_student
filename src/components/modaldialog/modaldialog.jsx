import Modal from "react-modal";
import * as React from "react";

export const ModalDialog = ({ children, ...props }) => {
    const { modalIsOpen, afterOpenModal, closeModal} = props;
    // const { modalIsOpen, afterOpenModal} = props;

    // const closeModal = () => {
    //     console.log("debug 8");
    // }
    //
    // useEffect(() => {
    //     console.log("debug 4", modalIsOpen)
    // }, []);

    // if (!modalIsOpen) return null;

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={{
                overlay: {
                    position: 'fixed',
                    zIndex: 1020,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(255, 255, 255, 0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                content: {
                    background: 'white',
                    // width: '45rem',
                    // width: '4000px',
                    // height: '4000px',
                    maxWidth: 'calc(100vw - 8rem)',
                    maxHeight: 'calc(100vh - 8rem)',
                    overflowY: 'auto',
                    // overflowX: 'auto',
                    position: 'relative',
                    // border: '2px solid #ccc',
                    // borderRadius: '1.5rem',
                    // padding: '20px',
                }}}
            // className='rounded-xl shadow-lg p-8 border-2 border-gray-400'
            className='rounded-xl shadow  p-8 border-2 border-gray-300 text-sm'
            // className={`rounded-xl shadow p-8`}
            shouldCloseOnOverlayClick={false}
            appElement={document.getElementById('mainModal')}
        >

            {/*//rounded-xl shadow-lg p-8*/}

            <div id="tooltipsDlg"
                 className={`absolute top-0 left-0 z-50 bg-green-50 text-black hidden rounded-2xl px-3 py-1`}>
                Hallo Tooltips
            </div>

            <div id="spinnerDlg"
                 className={`w-full h-full absolute top-0 left-0 bottom-0 place-items-center hidden z-50 `}>
                <div className="top-1/3 sticky">
                    <div className="flex gap-8">
                        {/*<img src={`${import.meta.env.VITE_PUBLIC_URL}/image/logo.png`} alt="logo"*/}
                        {/*     className="bg-green-800 w-16 h-16 roundaed-full p-3 rotatelooping"/>*/}
                        <img src={`/image/avenger1.jpg`} alt="logo"
                             className="border-blue-800 border-2 border-b-0 border-r-0 w-16 h-16 rounded-full p-2 rotatelooping"/>
                    </div>
                </div>
            </div>

            <div id="toastDlg"
                 className={`w-full h-full absolute top-0 left-0 bottom-0 place-items-center z-50 hidden `}>
                <div className="top-1/3 sticky flex">
                    <div id="toastDlg2" className="flex gap-8 bg-blue-800 text-white py-2 px-10 rounded-3xl inline-flex">
                    </div>
                </div>
            </div>

            {children}

        </Modal>
    )


}