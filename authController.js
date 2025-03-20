const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt from "bcryptjs";

class authController {
    async registration(req, res) {
        try {
            const {username , password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'имя занято.'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'R error'})
        }
    }

    async login(req, res) {
        try {

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'L error'})
        }
    }

    async getUsers(req, res) {
        try {
            res.json('server work')
        } catch (e) {

        }
    }

}

module.exports = new authController()



