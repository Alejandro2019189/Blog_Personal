import bcryptjs from "bcryptjs";
import Users from "../users/user.model.js";
import { generarJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const encryptedPassword = bcryptjs.hashSync(password);

        const user = await Users. create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        return res.status(200).json({
            msg: "| User has been added to database |",
            userDetails: {
                user: user.userName,
                password: user.password,
                email: user.email
            },
        })
    } catch (e) {
        console.log(e);
        return res.status(500).send("User cannot be added to database");
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res
             .status(400)
             .send(`Wrong credentials, ${email} doesn't exists en database`);
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
          return res.status(400).send("wrong password");
        }
    
        const token = await generarJWT(user.id, user.email);
    
        res.status(200).json({
          msg: "Login Successfully",
          userDetails: {
            username: user.username,
            token: token,
          },
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send("User cannot be added to database");   
    }
}