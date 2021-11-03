import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAutenticated } from "./middlewares/ensureAuthenticated";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
const a = 4;
const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listTagsController = new ListTagsController();
const listUserController = new ListUsersController();

router.post("/users", createUserController.handle);
router.post(
  "/tags",
  ensureAutenticated,
  ensureAdmin,
  createTagController.handle
);
router.post("/login", authenticateUserController.handle);
router.post(
  "/compliments",
  ensureAutenticated,
  createComplimentController.handle
);
router.get(
  "/users/compliments/send",
  ensureAutenticated,
  listUserSendComplimentsController.handle
);
router.get(
  "/users/compliments/receive",
  ensureAutenticated,
  listUserReceiveComplimentsController.handle
);
router.get("/tags", ensureAutenticated, listTagsController.handle);
router.get("/users", ensureAutenticated, listUserController.handle);

export { router };
