import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import URL from './URL';

const PrivilegedPage = () => {
    const [evalValue, setEvalValue] = useState("");
    const [evalMessage, setEvalMessage] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [pageLoaded, setPageLoaded] = useState(false);
    const [requestMade, setRequestMade] = useState(false);
    const [showEval, setShowEval] = useState(false)
    const [tokenCheck, setTokenCheck] = useState(false);

    useEffect(() => {
        if (!requestMade) {
            setRequestMade(true);
            let dataToSend = {
                data: localStorage.getItem('legion-token')
            };

            async function fetchData() {
                try {
                    dataToSend = JSON.stringify(dataToSend);
                    let fetchPromise = await fetch(`${URL}/privileged`, {
                        "method": "POST",
                        "mode": "cors",
                        "headers": {
                            "Content-Type": 'application/json',
                            "type": "validate token"
                        },
                        "body": dataToSend
                    })

                    let responseObject = await fetchPromise.json();
                    if (responseObject.data === "Token valid") {
                        let jwtDate = new Date(responseObject.exp * 1000);
                        let currentTime = Math.round(new Date())
                        let seconds = jwtDate.getTime();
                        setTokenCheck(true);
                        setPageLoaded(true);
                        setTimeout(() => {
                            localStorage.removeItem('legion-token');
                            setTokenCheck(false);
                            alert("Session expired")
                        }, seconds - currentTime)
                    }
                } catch (err) {
                    setTokenCheck(false);
                    setPageLoaded(true);
                }
            }
            fetchData();
        }
    }, [requestMade])

    const handleType = (e) => {
        setInputValue(e.target.value);
    }

    const handleEval = (e) => {
        setEvalValue(e.target.value);
        setShowEval(false);
    }

    const submitEval = (e) => {
        e.preventDefault();
        try {
            const result = eval(evalValue);
            setEvalMessage(`Eval: ${result !== undefined ? result : ""}`)
            if(result){
                setShowEval(true);
            }
        } catch (err) {
            setEvalMessage("Eval expression doesn't equal to anything")
            setShowEval(true);
        }
    }

    if (tokenCheck) {
        return (
            <div className="privileged-page-container" id="privileged">
                <form name="privileged-form" id="privileged-form" onSubmit={e => submitEval(e)}>
                    <label htmlFor="show-on-page">Show on page input</label>
                    <input type="text" id="show-on-page" onChange={handleType} />

                    <label htmlFor="eval-input">Eval input</label>
                    <input type="text" id="eval-input" onChange={handleEval} />
                    <button form="privileged-form" type="submit">Submit eval</button>
                </form>

                <div className="privileged-show">
                    <div className="show-item">Input value: {inputValue}</div>
                    <div className="show-item">{showEval ? <span>{evalMessage}</span> : null}</div>
                </div>

                <div className="back-to-home"><a href="/">Back to home</a></div>
            </div>
        )
    }

    else {
        if (pageLoaded && !tokenCheck) {
            return <Redirect to="/"></Redirect>
        } else {
            return <div className="waiter"><span>Checking token</span></div>
        }
    }
};

export default PrivilegedPage;