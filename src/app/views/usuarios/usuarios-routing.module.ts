import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormComponent } from "./pages/form/form.component";

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
export const routingComponents = [FormComponent];
