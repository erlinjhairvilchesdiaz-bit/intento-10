// CATEGORÍAS
const categorias = [
  "Café",
  "Crepes",
  "Waffles",
  "Frappes",
  "Postres",
  "Milkshake",
  "Panqueques",
  "Cupcake"
];

// PRODUCTOS
const productos = [

/* ===================== CAFÉ ===================== */
{
  categoria: "Café",
  nombre: "Espresso",
  precio: 6.90,
  imagen: "espresso.jpg",
  descripcion: "Café intenso y corto",
  insumos: {
  cafe: 18
  }
},
{
  categoria: "Café",
  nombre: "Americano",
  precio: 6.50,
  imagen: "americano.jpg",
  descripcion: "Espresso con agua caliente",
  insumos: {
  cafe: 18
  }
},

{
  categoria: "Café",
  nombre: "Capuccino",
  precio: 8.50,
  imagen: "capuccino.jpg",
  descripcion: "Café con leche espumada",
extras: {
  "  Leche  ": ["Normal", "Deslactosada"],
  "  Azúcar  ": ["Sin", "Normal"]
},
  insumos: {
  cafe: 18,
  leche: 150
  }
},
{
  categoria: "Café",
  nombre: "Latte",
  precio: 9.50,
  imagen: "latte.jpg",
  descripcion: "Más leche, sabor suave",
  insumos: {
  cafe: 18,
  leche:180
  }
},
{
  categoria: "Café",
  nombre: "Mocaccino",
  precio: 9.90,
  imagen: "Mocaccino.jpg",
  descripcion: "Café con chocolate",
  insumos: {
    cafe: 18,
    leche: 150,
    chocolate: 20
  }
},
{
  categoria: "Café",
  nombre: "Café pasado",
  precio: 5.90,
  imagen: "pasado.jpg",
  descripcion: "Clásico y tradicional",
  insumos: {
  cafe: 18
  }
},
{
  categoria: "Café",
  nombre: "Café con leche",
  precio: 7.00,
  imagen: "cafe_leche.jpg",
  descripcion: "Equilibrado",
  insumos: {
  cafe: 18,
  leche:120
  }
},
{
  categoria: "Café",
  nombre: "Café caramelo",
  precio: 9.50,
  imagen: "cafe_caramelo.jpg",
  descripcion: "Dulce y cremoso",
  insumos: {
  cafe: 18,
  leche:150
  }
},

/* ===================== CREPES ===================== */
{
  categoria: "Crepes",
  nombre: "Crepe chocolate",
  precio: 13.50,
  imagen: "crepe_chocolate.jpg",
  descripcion: "Chocolate derretido"
},
{
  categoria: "Crepes",
  nombre: "Crepe plátano",
  precio: 12.99,
  imagen: "platano.jpg",
  descripcion: "Plátano fresco"
},
{
  categoria: "Crepes",
  nombre: "Crepe fresa",
  precio: 13.00,
  imagen: "crepe_fresa.jpg",
  descripcion: "Fresas naturales"
},
{
  categoria: "Crepes",
  nombre: "Crepe nutella",
  precio: 14.00,
  imagen: "crepe_nutella.jpg",
  descripcion: "Nutella clásica"
},
{
  categoria: "Crepes",
  nombre: "Crepe mixto",
  precio: 15.00,
  imagen: "crepe_mixto.jpg",
  descripcion: "Fruta + chocolate"
},
{
  categoria: "Crepes",
  nombre: "Crepe rollitos",
  precio: 10.00,
  imagen: "crepe_rollitos.jpg",
  descripcion: "Pequeños y crocantes"
},
{
  categoria: "Crepes",
  nombre: "Crepe helado",
  precio: 16.00,
  imagen: "crepe_helado.jpg",
  descripcion: "Con helado artesanal"
},
{
  categoria: "Crepes",
  nombre: "Crepe oreo",
  precio: 14.50,
  imagen: "crepe_oreo.jpg",
  descripcion: "Galleta Oreo"
},
{
  categoria: "Crepes",
  nombre: "Crepe manjar",
  precio: 13.00,
  imagen: "crepe_manjar.jpg",
  descripcion: "Dulce clásico"
},

/* ===================== WAFFLES ===================== */
{
  categoria: "Waffles",
  nombre: "Waffle clásico",
  precio: 12.00,
  imagen: "waffle_clasico.jpg",
  descripcion: "Azúcar impalpable"
},
{
  categoria: "Waffles",
  nombre: "Waffle chocolate",
  precio: 14.00,
  imagen: "waffle chocolate.jpg",
  descripcion: "Salsa caliente"
},
{
  categoria: "Waffles",
  nombre: "Waffle fresa",
  precio: 14.50,
  imagen: "waffle fresa.jpg",
  descripcion: "Fresa fresca"
},
{
  categoria: "Waffles",
  nombre: "Waffle plátano",
  precio: 14.00,
  imagen: "waffle platano.jpg",
  descripcion: "Plátano caramelizado"
},
{
  categoria: "Waffles",
  nombre: "Waffle nutella",
  precio: 15.90,
  imagen: "waffle nutella.jpg",
  descripcion: "Nutella abundante"
},
{
  categoria: "Waffles",
  nombre: "Waffle helado",
  precio: 16.50,
  imagen: "waffle helado.jpg",
  descripcion: "Helado artesanal"
},
{
  categoria: "Waffles",
  nombre: "Waffle oreo",
  precio: 15.00,
  imagen: "waffle oreo.jpg",
  descripcion: "Oreo crocante"
},
{
  categoria: "Waffles",
  nombre: "Waffle mixto",
  precio: 16.90,
  imagen: "waffle mixto.jpg",
  descripcion: "Fruta + chocolate"
},
{
  categoria: "Waffles",
  nombre: "Waffle especial",
  precio: 18.00,
  imagen: "waffle especial.jpg",
  descripcion: "Todo incluido"
},

/* ===================== FRAPPES ===================== */
{
  categoria: "Frappes",
  nombre: "Frappe café",
  precio: 12.00,
  imagen: "frappe cafe.jpg",
  descripcion: "Refrescante"
},
{
  categoria: "Frappes",
  nombre: "Frappe chocolate",
  precio: 12.00,
  imagen: "frappe chocolate.jpg",
  descripcion: "Chocolate frío"
},
{
  categoria: "Frappes",
  nombre: "Frappe vainilla",
  precio: 12.00,
  imagen: "frappe vainilla.jpg",
  descripcion: "Clásico"
},
{
  categoria: "Frappes",
  nombre: "Frappe caramelo",
  precio: 12.00,
  imagen: "frappe caramelo.jpg",
  descripcion: "Dulce"
},
{
  categoria: "Frappes",
  nombre: "Frappe oreo",
  precio: 12.00,
  imagen: "frappe oreo.jpg",
  descripcion: "Oreo triturado"
},
{
  categoria: "Frappes",
  nombre: "Frappe fresa",
  precio: 12.90,
  imagen: "frappe fresa.jpg",
  descripcion: "Fresa natural"
},
{
  categoria: "Frappes",
  nombre: "Frappe moka",
  precio: 12.00,
  imagen: "frappe moka.jpg",
  descripcion: "Café + chocolate"
},
{
  categoria: "Frappes",
  nombre: "Frappe plátano",
  precio: 12.00,
  imagen: "frappe platano.jpg",
  descripcion: "Plátano cremoso"
},
{
  categoria: "Frappes",
  nombre: "Frappe especial",
  precio: 13.00,
  imagen: "frappe especial.jpg",
  descripcion: "Receta de la casa"
},
/* ===================== POSTRES ===================== */
{
  categoria: "Postres",
  nombre: "croissant",
  precio: 2.00,
  imagen: "pan.jpg",
  descripcion: "Suave y recién horneado"
},
{    categoria: "Postres",
    nombre: "Torta de chocolate",
    precio: 7.50,
    imagen: "torta_chocolate.jpg",
    descripcion: "Cobertura intensa"},

{
  categoria: "Postres",
  nombre: "Donas",
  precio: 2.90,
  imagen: "donas.jpg",
  descripcion: "Glaseadas y deliciosas"
},
{
  categoria: "Postres",
  nombre: "Ensalada",
  precio: 10.00,
  imagen: "ensalada.jpg",
  descripcion: "Fresca"
},
{
  categoria: "Postres",
  nombre: "Helado artesanal",
  precio: 9.90,
  imagen: "helado 1.jpg",
  descripcion: "Cremoso y natural"
},
{
  categoria: "Postres",
  nombre: "Helado Frito",
  precio: 9.90,
  imagen: "rollitos.jpg",
  descripcion: "Refrescante"
},

/* ===================== Milshake ===================== */

  {
    categoria: "Milkshake",
    nombre: "Milkshake de vainilla",
    precio: 13.00,
    imagen: "milkshake_vainilla.jpg",
    descripcion: "Cremoso y clásico"
  },
  {
    categoria: "Milkshake",
    nombre: "Milkshake de fresa",
    precio: 13.50,
    imagen: "milkshake_fresa.jpg",
    descripcion: "Fresco y natural, hecho con fresas"
  },
  {
    categoria: "Milkshake",
    nombre: "Milkshake de chocolate",
    precio: 13.00,
    imagen: "milkshake_chocolate.jpg",
    descripcion: "Intenso, con cacao premium"
  },
    {
    categoria: "Milkshake",
    nombre: "Milkshake de Oreo",
    precio: 13.00,
    imagen: "milkshake_oreo.jpg",
    descripcion: "Sabor cremoso unico,"
  },
/* ===================== Panqueques ===================== */
    {
    categoria: "Panqueques",
    nombre: "Panqueques clásicos",
    precio: 8.50,
    imagen: "panqueque_clasico.jpg",
    descripcion: "suaves acompañados con miel"
  },
  {
    categoria: "Panqueques",
    nombre: "Panqueques de banana",
    precio: 9.00,
    imagen: "panqueque_banana.jpg",
    descripcion: "Dulces y esponjosos"
  },
  {
    categoria: "Panqueques",
    nombre: "Panqueques de chocolate",
    precio: 9.50,
    imagen: "panqueque_chocolate.jpg",
    descripcion: "Con cacao y chispas de chocolate"
  },
  /* ===================== Cupcake ===================== */
    {
    categoria: "Cupcake",
    nombre: "Cupcake de vainilla",
    precio: 2.50,
    imagen: "Cupcake de vainilla.jpg",
    descripcion: "Con frosting de vainilla"
  },
  {
    categoria: "Cupcake",
    nombre: "Cupcake red velvet",
    precio: 3.00,
    imagen: "cupcake_red_velvet.jpg",
    descripcion: "Clásico, con crema de queso"
  },
  {
    categoria: "Cupcake",
    nombre: "Cupcake de chocolate",
    precio: 3.00,
    imagen: "Cupcake de chocolate.jpg",
    descripcion: "Chocolate cremoso"
  },
];

