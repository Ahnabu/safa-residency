"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const user_validation_1 = require("../user/user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/auth', (req, res) => {
    res.status(200).json({ message: 'Auth API is working', status: 'OK' });
});
router.post('/auth', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserValidationSchema), auth_controller_1.AuthController.getToken);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserValidation.loginValidationSchema), auth_controller_1.AuthController.login);
router.get('/users', auth_controller_1.AuthController.getAllUser);
router.get('/admin', (0, auth_1.default)('admin', 'staff'), auth_controller_1.AuthController.getAdminStats);
router.get('/users/:email', (0, auth_1.default)('user', 'admin', 'staff'), auth_controller_1.AuthController.getUserByEmail);
// User self-update routes
router.patch('/profile', (0, auth_1.default)('user', 'admin', 'staff'), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserProfileValidationSchema), auth_controller_1.AuthController.updateOwnProfile);
router.patch('/password', (0, auth_1.default)('user', 'admin', 'staff'), (0, validateRequest_1.default)(user_validation_1.UserValidation.updatePasswordValidationSchema), auth_controller_1.AuthController.updatePassword);
// Admin only routes
router.put('/users/:id', (0, auth_1.default)('admin'), auth_controller_1.AuthController.updateUser);
router.delete('/users/:id', (0, auth_1.default)('admin'), auth_controller_1.AuthController.deleteUser);
exports.AuthRoutes = router;
