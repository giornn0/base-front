
export const projectRoutes = [
    {
      path: "home",
      loadChildren: () =>
        import("./views/home/home.module").then(
          (m) => m.HomeModule
        ),
    },
    {
      path:'usuarios',
      loadChildren: ()=>
        import("./views/usuarios/usuarios.module").then((m)=>m.UsuariosModule)
    }      
  ]