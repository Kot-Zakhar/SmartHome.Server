import { Router } from "express";

export default interface Controller {
    readonly router: Router;
}