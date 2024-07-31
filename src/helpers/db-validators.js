import User from '../users/user.model.js';

export const existEmail = async (email = '') => {
    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error(`The email ${email} is already registered`);
    }
};

export const existUserById = async (id = '') => {
    const existeUsuario = await User.findById(id)
    if (!existeUsuario) {
        throw new Error(` el ID: ${id} no existe`)
    }
}