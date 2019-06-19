import UserController from './api/controllers/user.controller';
import App from './app';

const app = new App(
  [
    new UserController(),
  ],
  5000,
);

app.listen();
