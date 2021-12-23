import { AdminRoleGuard } from "./guards/adminRole.guard";

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
    },      
    {
      path:'obrasSociales',
      loadChildren: ()=>
      import("./views/obrasSociales/obrasSociales.module").then((m)=>m.ObrasSocialesModule)
    },
    {
      path:'pacientes',
      loadChildren: ()=>
      import("./views/pacientes/pacientes.module").then((m)=>m.PacientesModule)
    },
    {
      path:'centrosAtencion',
      loadChildren: ()=>
      import("./views/centrosAtencion/centrosAtencion.module").then((m)=>m.CentrosAtencionModule)
    },
    // {
    //   path:'tiposCentros',
    //   loadChildren: ()=>
    //   import("./views/tiposCentros/tiposCentros.module").then((m)=>m.TiposCentrosModule)
    // },
    
    // {
    //   path:'asociacionesRegionales',
    //   loadChildren: ()=>
    //   import("./views/asociacionesRegionales/asociacionesRegionales.module").then((m)=>m.AsociacionesRegionalesModule)
    // },
    
    // {
    //   path:'conveniosGerenciadoras',
    //   loadChildren: ()=>
    //   import("./views/conveniosGerenciadoras/conveniosGerenciadoras.module").then((m)=>m.ConveniosGerenciadorasModule)
    // },
    
    // {
    //   path:'condicionesISIB',
    //   loadChildren: ()=>
    //   import("./views/condicionesISIB/condicionesISIB.module").then((m)=>m.CondicionesISIBModule)
    // },
    
    // {
    //   path:'condicionesFiscales',
    //   loadChildren: ()=>
    //   import("./views/condicionesFiscales/condicionesFiscales.module").then((m)=>m.CondicionesFiscalesModule)
    // },
    {
      path:'directoresRepresentantes',
      canActivate:[AdminRoleGuard],
      loadChildren: ()=>
      import("./views/directores-representantes/directores-representantes.module").then((m)=>m.DirectoresRepresentantesModule)
      // children:
      // [
      //   {
      //     path:'directoresMedicos',
      //     loadChildren: ()=>
      //     import("./views/directoresMedicos/directoresMedicos.module").then((m)=>m.DirectoresMedicosModule)
      //   },
      //   {
      //     path:'representantesLegales',
      //     loadChildren: ()=>
      //     import("./views/representantesLegales/representantesLegales.module").then((m)=>m.RepresentantesLegalesModule)
      //   },
    },
    {
      path:'comprobantes',
      loadChildren: ()=>
      import("./views/comprobantes/comprobantes.module").then((m)=>m.ComprobantesModule)
    },
    {
      path:'servicios',
      loadChildren: ()=>
      import("./views/servicios/servicios.module").then((m)=>m.ServiciosModule)
    },
]  
