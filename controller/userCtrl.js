const e = require('express');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if(!findUser) {
        //Crear nuevo Usuario
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("Usuario ya Existente");
    }
});

const loginUserCtrl = asyncHandler (async(req, res) => {
    const {email, password} = req.body;

    //Chequeo si el usuario existe o no
    const findUser = await User.findOne({email});
    if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lassname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id),
    });
    } else {
        throw new Error('Credenciales Incorrecta')
    }
});

//Actualizar Usuario

const updatedUser = asyncHandler(async(req, res) =>{
    console.log();
    const { _id } = req.user;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req?.body.firstname,
                lastname: req?.body.lastname,
                email: req?.body.email,
                mobile: req?.body.mobile,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }

});




//Obtener todos los usuarios

const getallUser = asyncHandler(async(req, res) =>{
    try {
        const getUsers = await User.find();
        res.json(getUsers);
      } catch (error) {
        throw new Error('error');
      }
    });

//Obtener usuario único

const getaUser = asyncHandler(async(req, res) =>{
    const { id } = req.params;
    try {
    const getaUser = await User.findById(id);
    res.json({ 
        getaUser,
    });
    } catch(error) {
      throw new Error(error);
    }
});

//Eliminar usuario

const deleteaUser = asyncHandler(async(req, res) =>{
    const { id } = req.params;
    try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({ 
        deleteaUser,
    });
    } catch(error) {
      throw new Error(error);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
    const block = User.findByIdAndUpdate(
        id, 
        {
        isBlocked: true,
        },
        {
         new: true,
        }
    );
    res.json({
        message: "Usuario Bloqueado"
    })
    } catch(error) {
      throw new Error(error);
    }
});
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
    const unblock = User.findByIdAndUpdate(
        id, 
        {
        isBlocked: false,
        },
        {
         new: true,
        }
    );
    res.json({
        message: "Usuario Desbloqueado"
    })
    } catch(error) {
      throw new Error(error);
    }
});


module.exports = {createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser};