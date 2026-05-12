import User from "../models/usersController.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Nombre y email son obligatorios",
        data: null
      });
    }

    const user = await User.create({ name, email });

    res.status(201).json({
      success: true,
      message: "Usuario creado",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      message: "Usuarios obtenidos",
      data: users
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
        data: null
      });
    }

    res.json({
      success: true,
      message: "Usuario eliminado",
      data: user
    });
  } catch (error) {
    next(error);
  }
};