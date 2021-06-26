import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const Profile = () => {
    return (
        <Scrollbars autoHide autoHideTimeout={2000} style={{ height: '100vh', width: '100vw' }}>
            <div>
                Profile
            </div>
        </Scrollbars>
    )
}

export default Profile;
