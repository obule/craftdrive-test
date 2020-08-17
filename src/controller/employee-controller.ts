import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee';

export class EmployeeController {
  static create(req: Request, res: Response) {
    try {
      return res.status(201).json(EmployeeService.create(req.body));
    } catch (error) {
      return res.status(error.statusCode).send([{ message: error.message }]);
    }
  }
  static findOne(req: Request, res: Response) {
    try {
      return res
        .status(200)
        .json(EmployeeService.findOne(Number(req.params.id)));
    } catch (error) {
      return res.status(error.statusCode).send([{ message: error.message }]);
    }
  }
  static findAll(req: Request, res: Response) {
    try {
      return res.status(200).json(EmployeeService.findAll(req.query));
    } catch (error) {
      return res.status(error.statusCode).send([{ message: error.message }]);
    }
  }
  static update(req: Request, res: Response) {
    try {
      return res.status(200).json(EmployeeService.update(req.body));
    } catch (error) {
      return res.status(error.statusCode).send([{ message: error.message }]);
    }
  }
  static remove(req: Request, res: Response) {
    try {
      return res
        .status(200)
        .json(EmployeeService.remove(Number(req.params.id)));
    } catch (error) {
      return res.status(error.statusCode).send([{ message: error.message }]);
    }
  }
}
