const UserModel = require('../models/UserModel');

class UserService {
    async createService(userInfo) {
        const emailExists = await UserModel.findOne({ email: userInfo.email });
        if (emailExists) {
            throw new Error('Email already exists');
        }

        const newUser = new UserModel(userInfo);
        const savedUser = await newUser.save();
        return savedUser;
    }

    async findAllUsers() {
        return await UserModel.find();
    }

    async findUserById(id) {
        return await UserModel.findById(id);
    }

    async updateUser(id, details) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        Object.assign(user, details);
        return await user.save();
    }

    async deleteUser(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}

module.exports = new UserService();
