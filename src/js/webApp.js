M.AutoInit();

import Model from "./modules/Model.mjs";
import View from "./modules/View.mjs";
import Controller from "./modules/Controller.mjs";

const app = new Controller(new Model(), new View());
