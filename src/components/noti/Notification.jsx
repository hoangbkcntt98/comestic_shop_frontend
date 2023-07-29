import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification() {
    // const notify = () => toast("Wow so easy!");

    return (
        <div>
            {/* <button onClick={notify}>Notify!</button> */}
            <ToastContainer
                toastStyle={{ backgroundColor: '#fff ', color: '#ed71a3', marginTop: '1em' }}
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            
        </div>
    );
}