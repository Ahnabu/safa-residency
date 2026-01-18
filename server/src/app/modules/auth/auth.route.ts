import express from 'express';
import { AuthController } from './auth.controller';
import { UserValidation } from '../user/user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/auth', (req, res) => {
  res.status(200).json({ message: 'Auth API is working', status: 'OK' });
});

router.post('/auth', validateRequest(UserValidation.createUserValidationSchema), AuthController.getToken)
router.post('/login', AuthController.login)

router.get('/users', AuthController.getAllUser)
router.get('/admin', auth('admin', 'staff'), AuthController.getAdminStats)
router.get('/users/:email', auth('user', 'admin', 'staff'), AuthController.getUserByEmail)

// User self-update routes
router.patch('/profile', auth('user', 'admin', 'staff'), validateRequest(UserValidation.updateUserProfileValidationSchema), AuthController.updateOwnProfile)
router.patch('/password', auth('user', 'admin', 'staff'), validateRequest(UserValidation.updatePasswordValidationSchema), AuthController.updatePassword)

// Admin only routes
router.put('/users/:id', auth('admin'), AuthController.updateUser)
router.delete('/users/:id', auth('admin'), AuthController.deleteUser)

export const AuthRoutes = router;