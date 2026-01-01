import { Router } from "express";
import todoRouts from "./todo.routes"

const app=Router()

app.use("/todo",todoRouts)


export default app