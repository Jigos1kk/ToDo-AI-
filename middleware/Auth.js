'use strict'

require('dotenv').config();
const jwt = require('jsonwebtoken')
const db = require('../models')
const UserModel = db.user;

class Auth {
    constructor() {
        this.secret_key = process.env.SECRET_KEY

        this.generate = this.generate.bind(this)
        this.verify = this.verify.bind(this)
        this.decode = this.decode.bind(this)
        this.middleware = this.middleware.bind(this)
    }

    generate(payload) {
        return jwt.sign(payload, this.secret_key)
    }

    verify(token) {
        return jwt.verify(token, this.secret_key)
    }

    decode(token) {
        return jwt.decode(token)
    }

    async middleware(req, res, next) {
        const auth = req.headers.authorization;

        if(!auth){
            return res.status(401).json({ error: "Токен авторизации обязателен" })
        }

        const [bearer, token] = auth.split(' ');

        if(bearer !== "Bearer" || !token) {
            return res.status(401).json({ error: "Сломанный формат авторизации" })
        }

        try {
            const verify = this.decode(token)

            if(verify.isBlocked) {
                return res.status(403).json({ error: "Доступ запрешен" })
            }

            req.user = await UserModel.findOne({ where: { uuid: verify }});
            next()
        } catch (error) {
            return res.status(401).json({
                error: "Ошибка авторизации",
                details: error.message
            })
        }
    }
}

module.exports = new Auth();