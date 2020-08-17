import express from 'express';
import { body } from 'express-validator';
import { EmployeeController } from '../controller/employee-controller';
import { currentUser as requireAuth } from '../middlewares/current-user';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/employee/',
  requireAuth,
  [
    body('email').notEmpty().isEmail().withMessage('Email must be valid'),
    body('firstName')
      .notEmpty()
      .isString()
      .trim()
      .withMessage('First name is required'),
    body('lastName')
      .notEmpty()
      .isString()
      .trim()
      .withMessage('Last name is required'),
    body('gender')
      .notEmpty()
      .isString()
      .trim()
      .withMessage('Gender is required'),
  ],
  validateRequest,
  EmployeeController.create,
);
router.patch(
  '/employee/',
  requireAuth,
  [
    body('email').isEmail().withMessage('Email must be valid').optional(),
    body('id').isNumeric().withMessage('id is required'),
    body('firstName')
      .isString()
      .trim()
      .withMessage('First name is required')
      .optional(),
    body('lastName')
      .isString()
      .trim()
      .withMessage('Last name is required')
      .optional(),
    body('gender')
      .isString()
      .trim()
      .withMessage('Gender is required')
      .optional(),
  ],
  validateRequest,
  EmployeeController.update,
);
router.get('/employee/:id', requireAuth, EmployeeController.findOne);
router.get('/employee/', requireAuth, EmployeeController.findAll);
router.delete('/employee/:id', requireAuth, EmployeeController.remove);

export { router as EmployeeRouter };
