export const State = {
  user: null,
  profile: null,

  products: [],
  categories: [],
  activeCat: 'all',

  cart: [],

  selectedProduct: null,
  selectedSize: null,
  selectedQty: 1,

  isOnline: navigator.onLine,

  publicConfig: {
    nombre: null,
    direccion: null,
    whatsapp: null
  }
};
