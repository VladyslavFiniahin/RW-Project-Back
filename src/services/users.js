import User from "../models/User.js";

export async function register(username, email, password) {
    try {
        const result = await User.create({
            username: username,
            email: email,
            password: password
        });

        return result;
        
    } catch (error) {
        console.log(error);
    }
}