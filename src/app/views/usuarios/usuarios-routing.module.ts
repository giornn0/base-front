import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserResolver, UsersResolver } from "../../services/http/users/users.resolver";
import { FormComponent } from "./pages/form/form.component";
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Usuarios",
    },
    children: [
      {
        path: "crear",
        component: FormComponent,
        data: { title: "Nuevo Usuario" },
      },
      {
        path: "listar",
        component: ListComponent,
        resolve:{users: UsersResolver},
        data: { title: "Listado Usuario" },
      },
      {
        path: ":id/editar",
        component: FormComponent,
        resolve:{user: UserResolver},
        data: { title: "Editar Usuario" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
export const routingComponents = [FormComponent,ListComponent];
