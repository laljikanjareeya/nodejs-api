import express = require("express");
import humps from "humps";
import { User } from "../models/user";
export class UserController {
    public userList: User[] = [{
        id: 1,
        department: "IT",
        name: "Lalji",
    }];
    private path = '/users';
    private router = express.Router();

    constructor() {
        this.intializeRoutes();
      }

    intializeRoutes = () => {
        this.router.get(this.path, this.getAll);
        this.router.put(this.path, this.update);
        this.router.get(this.path + '/:id', this.getbyId);
      }

    getAll = (req: express.Request, res: express.Response) => {
        res.json(this.userList);
    }

    getbyId = (req: express.Request, res: express.Response) => {
        const id = +req.params.id;
        const userObject = this.userList.find((user) => user.id === id);
        res.json(userObject);
    }

    update = (req, res) => {
        const userToUpdate: User = req.body;
        const userIndex = this.userList.findIndex((user) => user.id === userToUpdate.id);
        this.userList[userIndex] = userToUpdate;
        res.json(this.userList);
    }
}

export default UserController;
