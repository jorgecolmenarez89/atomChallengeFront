import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "login",
        loadComponent: () => import("./modules/auth/auth.component").then((m) => m.AuthComponent)
    },
    {
        path: "todo",
        loadComponent: () => import("./modules/todo-list/todo-list.component").then((m) => m.TodoListComponent),
        canActivate: [authGuard],
    }
];
