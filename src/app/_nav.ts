import { INavData } from "@coreui/angular";

export const navItems: INavData[] =[
  // {
  //   name: "Inicio",
  //   url: "/dashboard",
  //   icon: "icon-home",
  //   class:"strong-font"
  // },  
  {
    title:true,
    name:'Centros Atencion',
    class:"strong-font",
    children:[
      {
        name:'Listar',
        url:'centrosAtencion/listar',
        icon:'fa fa-building scaling strong-icon',
        class:"strong-font"
      },
      {
        name:'Crear Centro',
        url:'centrosAtencion/crear',
        icon:'fa fa-paint-brush scaling strong-icon',
        class:"strong-font"
      },
    ]
  },
  {
    title:true,
    name:'Facturas',
    class:"strong-font",
    children:[
      {
       name:'Listar',
       url:'comprobantes/listar',
       icon:'fa fa-money-check scaling strong-icon',
       class:"strong-font"
      },
    ]
   },
  {
      title:true,
      name:'Directores y Representantes',
      class:"strong-font",
      children:[
        {
          name:'Listar ',
          url:'directoresRepresentantes/listar',
          icon:'fa fa-suitcase fa-2x strong-icon',
          class:"strong-font"
        },
      ]
    },
  {
    title:true,
    name:'Obras Sociales',
    class:"strong-font",
    children:[
      {
        name:'Listar',
        url:'obrasSociales/listar',
        icon:'fa fa-institution scaling strong-icon',
        class:"strong-font"
      },
      {
        name:'Crear Obra',
        url:'obrasSociales/crear',
        icon:'fa fa-paint-brush scaling strong-icon',
        class:"strong-font"
      },

    ]
  },
  {
    title:true,
    name:'Servicios',
    class:"strong-font",
    children:[
      {
        name:'Listar',
        url:'servicios/listar',
        icon:'fas fa-hospital-user scaling strong-icon',
        class:"strong-font"
      },
      {
        name:'Nuevo Servicio',
        url:'servicios/crear',
        icon:'fa fa-paint-brush scaling strong-icon',
        class:"strong-font"
      },
    ]
  },
  {
    title:true,
    name:'Usuarios',
    class:"strong-font",
    children:[
      {
        name:'Listar',
        url:'usuarios/listar',
        icon:'fa fa-users scaling strong-icon',
        class:"strong-font"
      },
    ]
  },
]

