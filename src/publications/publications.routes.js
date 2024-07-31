import { Router } from "express";
import { validateFields } from "../middleware/validateFields.js";
import { validarJWT } from "../middleware/validate-jwt.js";
import { publicationsPost, publicationsPut, publicationsDelete, publicationsGet, commentsPost, commentsPut, commentsDelete, commentsGet
} from "./publications.controller.js";
import { check } from "express-validator";

const router = Router();

//Esta es la funcion de Publicaciones
router.post(
    '/',
    [
        validarJWT,
        check("title"),
        check("content"),
        check("author"),
        check("creationDate"),
        validateFields
    ],
publicationsPost);

router.put(
    '/:id',
    [
        validarJWT,
        check("title"),
        check("content"),
        check("author"),
        check("creationDate"),
        validateFields
    ],
publicationsPut);

router.delete(
    '/:id',
    [
        validarJWT,
        validateFields
    ],
publicationsDelete);

router.get(
    '/',
    [
        validarJWT,
        validateFields
    ],
publicationsGet);

//Esta es la funcion de Comentarios
router.post(
    '/:id/comments',
    [
        validarJWT,
        check("author").not().isEmpty(),
        check("content").not().isEmpty(),
        validateFields
    ],
commentsPost);

router.put(
    '/:publicationId/comments/:commentId',
    [
        validarJWT,
        check("author").not().isEmpty(),
        check("content").not().isEmpty(),
        validateFields
    ],
    commentsPut
);

router.delete(
    '/:publicationId/comments/:commentId',
    [
        validarJWT,
        validateFields
    ],
commentsDelete);

router.get(
    '/:publicationId/comments',
    [
        validarJWT,
        validateFields
    ],
commentsGet);

export default router;