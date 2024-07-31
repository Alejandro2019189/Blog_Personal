import { Router } from "express";
import { check } from "express-validator";
import { register, login } from "./auth.controller.js";
import { validateFields } from '../middleware/validateFields.js';
import { existEmail } from '../helpers/db-validators.js';

const router = Router();

router.post(
    '/register',
    [
        check('userName', 'Username is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('email').custom(existEmail),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ], register);

router.post(
    '/login',
    [
        check("email", "Este no es un correo válido").isEmail(),
        check("password", "El password es obligatorio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({min: 6,}),
        validateFields
    ], login);

export default router;