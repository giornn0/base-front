import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  // {
  //   name: "Inicio",
  //   url: "/dashboard",
  //   icon: "icon-home",
  //   class:"strong-font"
  // },
  {
    divider: true,
  },
  {
    title:true,
    name:'Usuarios',
    class:"strong-font"
  },
  {
    name:'Listado Usuarios',
    url:'usuarios/listar',
    icon:'fa fa-user scaling',
    class:"strong-font"
  },
  {
    name:'Nuevo Usuario',
    url:'usuarios/crear',
    icon:'fa fa-plus scaling',
    class:"strong-font"
  },
];
