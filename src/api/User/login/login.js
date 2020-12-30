import crypto from "crypto";
import { User } from "../../../sequelize";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        //resolver
        login: async (_, args) => {
            const { studentId, password } = args;
            const hashPassword = crypto.createHash("sha512").update(password).digest("base64");

            try {
                const userData = await User.findOne({ where: { studentId: studentId }, raw: true });
                console.log(userData);
                if (userData.password === hashPassword) {
                    console.log(jwt.sign({ id: userData.id }, "sdfsopfjspafjpodsjopvcxjopvxjzopv"));
                    return jwt.sign({ id: userData.id }, "sdfsopfjspafjpodsjopvcxjopvxjzopv"); //token 이 되버림 generated
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
};