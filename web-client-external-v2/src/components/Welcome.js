import React from 'react';

const WelcomeComponent = (props) => {
    return(
        <div>
            You are Logged In as {props.currentUser.user}
        </div>
    )
}

export default WelcomeComponent