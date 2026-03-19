import { compare, hash } from "bcryptjs";
import UserModel from "../model/users.model.js";
import { generateToken } from "../config/jwt.js";

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

interface LoginInput {
    email: string;
    password: string;
}


export const login = async ({ email, password }: LoginInput) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw {
            status: 401,
            message: "Invalid credentials"
        };
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        throw {
            status: 401,
            message: "Invalid credentials"
        };
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
    };
};


export const register = async ({ name, email, password }: RegisterInput) => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw {
            status: 400,
            message: "User already exists"
        };
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await UserModel.create({ name, email, password: hashedPassword });

    return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser._id.toString()),
    };
};


export const profiles = async () => {
    const users = await UserModel.find({}, { password: 0 });

    return users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email
    }));
};
