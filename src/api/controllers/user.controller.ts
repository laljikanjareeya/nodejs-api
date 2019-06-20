import express = require("express");
import HttpStatus from 'http-status-codes';
import { User } from "../models/user";

export class UserController {
    public userList: User[] = [{
        id: 1,
        department: "IT",
        name: "Lalji",
    }, {
        id: 2,
        department: "HR",
        name: "Vikash",
    }, {
        id: 3,
        department: "Support",
        name: "Ronak",
    }, {
        id: 4,
        department: "IT",
        name: "Vimal",
    }];
    private path = '/user';
    private router = express.Router();

    constructor() {
        this.intializeRoutes();
      }

    intializeRoutes = () => {
        this.router.get(this.path, this.getAll);
        this.router.get(this.path + '/:id', this.getbyId);
        this.router.post(this.path, this.create);
        this.router.put(this.path, this.update);
        this.router.delete(this.path + '/:id', this.delete);
      }

    getAll = (req: express.Request, res: express.Response) => {
        res.json(this.userList);
    }

    getbyId = (req: express.Request, res: express.Response) => {
        const id = +req.params.id;
        const userObject = this.userList.find((user) => user.id === id);
        res.json(userObject);
    }
    create = (req: express.Request, res: express.Response) => {
        const user: User = req.body;
        this.userList.push(user);
        res.json(user);
    }
    update = (req: express.Request, res: express.Response) => {
        const userToUpdate: User = req.body;
        const userFromDb = this.userList.find((x) => x.id === userToUpdate.id);
        const userIndex = this.userList.indexOf(userFromDb);
        this.userList[userIndex] = userToUpdate;
        res.json(this.userList);
    }

    delete = (req: express.Request, res: express.Response) => {
        const userId = +req.params.id;
        this.userList = this.userList.filter((x) => x.id !== userId);
        res.sendStatus(HttpStatus.OK);
    }
}

export default UserController;
