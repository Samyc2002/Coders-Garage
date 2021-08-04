import React from 'react';

import { ContextProvider } from '../../config/SocketContext';

const Interview = () => {
    return (
        <ContextProvider>
            <div>
                Interview
            </div>
        </ContextProvider>
    )
}

export default Interview;
