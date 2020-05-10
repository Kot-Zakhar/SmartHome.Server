import { Container } from "inversify";
import AuthController from "./controllers/authController";
import Controller from "./controllers/controller";
import UserService from "./services/userService";
import SequelizeDb from "./sequelize/SequelizeDb";
import { DeviceController } from "./controllers/deviceController";

const diContainer = new Container();
// Services
diContainer.bind<UserService>(UserService).toSelf();

// Controllers
diContainer.bind<Controller>(AuthController).to(AuthController);
diContainer.bind<Controller>(DeviceController).to(DeviceController);

// DB
diContainer.bind<SequelizeDb>(SequelizeDb).toSelf().inSingletonScope();

export { diContainer };