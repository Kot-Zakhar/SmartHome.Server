import { Container } from "inversify";
import AuthController from "./controllers/authController";
import { Controller } from "./controllers/controller";
import { UserService } from "./services/userService";

const diContainer = new Container();
// Controllers
diContainer.bind<Controller>(AuthController).to(AuthController);

// Services
diContainer.bind<UserService>(UserService).toSelf();

export { diContainer };