'use strict'

require('dotenv').config()

const db = require('../models')
const UAParser = require('ua-parser-js')
const Auth = require('../middleware/Auth')
const parser_device = new UAParser();
const { Op } = require('sequelize')
const UserModel = db.user;

class UserController {
    constructor() {
        this.create = this.create.bind(this)
    }

    async create(req, res) {
        try {
            const new_user = await this._createNewUser(req);

            const token = Auth.generate(new_user.uuid);

            return res.status(201).json({
                message: "Пользователь успешно создан",
                token
            });
        } catch (error) {
            console.log(`Ошибка при регистрации нового пользователя: ${error}`);
            return res.status(error.status || 500).json({ error: error.message || "Ошибка создания нового пользователя" })
        }
    }

    async _createNewUser(req) {
        const device_result = parser_device.setUA(req.get('User-Agent')).getResult();
        const user_agent = req.get('User-Agent');
        const ip_address = req.ip;
        const device = device_result.device.type || 'desktop';

        const existing_user = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { ip_address: ip_address },
                    { user_agent: user_agent },
                    { device: device }
                ]
            }
        });

        if (existing_user) {
            const error = new Error("Пользователь с таким IP, User-Agent или устройством уже существует");
            error.status = 400;
            throw error;
        }

        const user_data = {
            ip_address: ip_address,
            user_agent: user_agent,
            device: device
        };

        const new_user = await UserModel.create(user_data);
        return new_user;
    }
}

module.exports = new UserController()