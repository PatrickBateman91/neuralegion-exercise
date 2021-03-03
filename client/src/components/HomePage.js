import React, { useState } from 'react';
import URL from './URL';

const HomePage = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleRequest = async (e) => {
        e.preventDefault();
        let dataToSend = {
            data: document.getElementById("nickname-input").value
        }

        if (dataToSend.data !== "") {
            dataToSend = JSON.stringify(dataToSend);
            let fetchPromise = await fetch(URL, {
                "method": "POST",
                "mode": "cors",
                "headers": {
                    "Content-Type": 'application/json',
                    "type": "get token"
                },
                "body": dataToSend
            })
            let responseObject = await fetchPromise.json();
            console.log(responseObject);
            localStorage.setItem('legion-token', JSON.stringify(responseObject.data));
            setSuccess(true);
        } else setError(true);

    }

    const handleType = () => {
        setError(false);
        setSuccess(false);
    }

    return (
        <div className="home-page-container">
            <span className="home-page-title">Home page accessible to everyone.</span>
            <div className="auth-holder">
                <form name="get-token" id="get-token" onSubmit={handleRequest} onChange={handleType}>
                    <label>Enter name</label>
                    <input type="text" id="nickname-input" />
                    {error ? <div className="home-message error">Enter at least one character.</div> : null}
                    {success ? <div className="home-message success">Token received and is eligible for 90 seconds. You may proceed.</div> : null}
                    {!success ? <button type="submit" form="get-token" className="auth-button">Get Token to access priviliged page</button> : null}
                </form>
               <a href="/privileged">Go to privileged page</a>
            </div>
        </div>
    );
};

export default HomePage;