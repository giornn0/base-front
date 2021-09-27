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
    name: "Clientes",
    class:"strong-font"
  },
  {
    name: "Mis Clientes",
    url: `/clientes/listar`,
    icon: "fa fa-user",
    class:"strong-font"
  },
  {
    name: "Crear Cliente",
    url: "/clientes/crear",
    icon: "fa fa-paint-brush",
    class:"strong-font"
  },
  {
    divider: true,
  },
  {
    title: true,
    name: "Contratos",
    class:"strong-font"
  },
  {
    name: "Contratos ",
    url: `/contratos/listar`,
    icon: "fa fa-address-book-o",
    class:"strong-font"
  },
  {
    name: "Crear Contrato",
    url: "/contratos/crear",
    icon: "fa fa-paint-brush",
    class:"strong-font"
  },
  {
    divider: true,
  },
  {
    title:true,
    name:'Pagos',
    class:"strong-font"
  },
  {
    url:'pagos/listar',
    name:'Mis Pagos',
    icon:'fa fa-money',
    class:"strong-font"
  },
  {
    url:'pagos/crear',
    name:'Cargar Pago',
    icon:'fa fa-money',
    class:"strong-font"
  },
  {
    url:'pagos/balances',
    name:'Balance Saldos',
    icon:'fa fa-institution',
    class:"strong-font"
  },
  {
    divider: true,
  },
  {
    title:true,
    name:'Usuarios',
    class:"strong-font"
  },
  {
    name:'Nuevo Usuario',
    url:'usuarios/crear',
    icon:'fa fa-user',
    class:"strong-font"
  },
  {
    divider: true,
  },
  {
    title:true,
    name:'Vendedores',
    class:"strong-font"
  },
  {
    name:'Nuevo Vendedor',
    url:'vendedores/crear',
    icon:'fa fa-user',
    class:"strong-font"
  }
];
