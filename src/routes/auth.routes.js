import { Router } from "express";
import { checkSchema } from "express-validator";
import { LoginValidationSchema, SignUpValidationSchema } from "../validations/auth.validation.js";
import validate from "../middlewares/validate.js";
import { Login, SignUp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login",checkSchema(LoginValidationSchema),validate,Login);

router.post("/signUp",checkSchema(SignUpValidationSchema),validate,SignUp)

export default router;