const express = require('express');
const jwt = require('jsonwebtoken');

const userRouter = new express.Router();
let tokenObject = {}; 

userRouter.post('/', async (req, res) => {
    if (req.headers.type === "get token") {
        let name = req.body.data.toString();
        const token = jwt.sign({ _id: name }, process.env.JWT_SECRET, {
            expiresIn: 90
        });
        tokenObject[req.body.data] = token;
        res.send({
            "data": {
                name: name,
                token: token
            }
        })
    } else res.status(400).send();
})

userRouter.post('/privileged', async (req, res) => {
    if (req.headers.type === "validate token") {
        const resObj = JSON.parse(req.body.data);
        try {
            let decoded = jwt.verify(tokenObject[resObj.name], process.env.JWT_SECRET);
            if (decoded) {
                res.status(200).send({
                    "data": "Token valid",
                    "exp": decoded.exp
                })
            }
        } catch (err) {
            res.status(400).send();
        }
    } else res.status(400).send();
})

module.exports = userRouter;


