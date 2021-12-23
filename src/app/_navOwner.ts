export function getNavItemsOwner(ownedID) {
  return [
    // {
    //   name: "Inicio",
    //   url: "/dashboard",
    //   icon: "icon-home",
    //   class:"strong-font"
    // },
    {
      title: true,
      name: "Centros Atencion",
      class: "strong-font",
      children: [
        {
          name: "Mi Centro",
          url: `centrosAtencion/${ownedID}`,
          icon: "fa fa-building scaling strong-icon",
          class: "strong-font",
        },
      ],
    },
    {
      title: true,
      name: "Obras Sociales",
      class: "strong-font",
      children: [
        {
          name: "Listar",
          url: "obrasSociales/listar",
          icon: "fa fa-institution scaling strong-icon",
          class: "strong-font",
        },
      ],
    },
    {
      title: true,
      name: "Usuarios",
      class: "strong-font",
      children: [
        {
          name: "Listar",
          url: "usuarios/listar",
          icon: "fa fa-users scaling strong-icon",
          class: "strong-font",
        },
        {
          name: "Crear Usuario",
          url: "usuarios/crear",
          icon: "fa fa-user-plus scaling strong-icon",
          class: "strong-font",
        },
      ],
    },
    {
      title: true,
      name: "Facturas",
      class: "strong-font",
      children: [
        {
          name: "Listar",
          url: "comprobantes/listar",
          icon: "fa fa-money-check scaling strong-icon",
          class: "strong-font",
        },
        {
          name: "Ingresar Factura",
          url: "comprobantes/crear",
          icon: "fa fa-paint-brush scaling strong-icon",
          class: "strong-font",
        },
      ],
    },
    {
      title: true,
      name: "Pacientes",
      class: "strong-font",
      children: [
        {
          name: "Listar",
          url: "pacientes/listar",
          icon: "fa fa-vcard scaling strong-icon",
          class: "strong-font",
        },
        {
          name: "Nuevo Paciente",
          url: "pacientes/crear",
          icon: "fa fa-paint-brush scaling strong-icon",
          class: "strong-font",
        },
      ],
    },
  ];
}
