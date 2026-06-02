// Datos compartidos: usamos localStorage para persistir productos entre páginas.
const STORAGE_KEY = "funko_products_v1";
const THEME_KEY = "funko_theme";

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Spider-Man Classic", empresa: "Marvel", pelicula: "Spiderman",
    price: 24.99, stock: 12, image: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=400",
    description: "Funko Pop de Spider-Man en su traje clásico rojo y azul." },
  { id: 2, name: "Iron Man Mark 50", empresa: "Marvel", pelicula: "Ironman",
    price: 27.50, stock: 8, image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400",
    description: "Tony Stark con la armadura Mark 50 de Infinity War." },
  { id: 3, name: "Hulk Smash", empresa: "Marvel", pelicula: "Hulk",
    price: 29.00, stock: 5, image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400",
    description: "El gigante verde listo para destrozar todo a su paso." },
  { id: 4, name: "Batman Dark Knight", empresa: "DC", pelicula: "Batman",
    price: 26.99, stock: 15, image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400",
    description: "El caballero de la noche en su versión más oscura." },
  { id: 5, name: "Superman Classic", empresa: "DC", pelicula: "Superman",
    price: 25.99, stock: 10, image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=400",
    description: "El hombre de acero con su icónica capa roja." },
  { id: 6, name: "Wonder Woman", empresa: "DC", pelicula: "Wonder Woman",
    price: 28.00, stock: 7, image: "https://images.unsplash.com/photo-1612036782180-6f0822045d23?w=400",
    description: "La princesa amazona con su lazo de la verdad." },
  { id: 7, name: "Mickey Mouse", empresa: "Disney", pelicula: "Mickey Mouse",
    price: 22.50, stock: 20, image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400",
    description: "El ratón más famoso del mundo en versión coleccionable." },
  { id: 8, name: "Elsa Frozen", empresa: "Disney", pelicula: "Frozen",
    price: 23.99, stock: 11, image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400",
    description: "La reina del hielo con su vestido azul brillante." },
  { id: 9, name: "Darth Vader", empresa: "Star Wars", pelicula: "Star Wars",
    price: 32.00, stock: 6, image: "https://images.unsplash.com/photo-1608889825100-3c4c4f3c1f5b?w=400",
    description: "El lord Sith con su sable de luz rojo." },
  { id: 10, name: "Goku Ultra Instinct", empresa: "Anime", pelicula: "Dragon Ball",
    price: 30.50, stock: 9, image: "https://images.unsplash.com/photo-1605806616949-59175b04c8e6?w=400",
    description: "Goku en su forma de Ultra Instinto perfeccionado." }
];

function getProducts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
  }
  try { return JSON.parse(raw); } catch { return [...DEFAULT_PRODUCTS]; }
}
function saveProducts(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
function nextId(list) {
  return list.length ? Math.max(...list.map(p => p.id)) + 1 : 1;
}

/* Tema claro/oscuro */
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "light";
  document.documentElement.setAttribute("data-theme", saved);
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.textContent = saved === "dark" ? "☀️" : "🌙";
    btn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme");
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
      btn.textContent = next === "dark" ? "☀️" : "🌙";
    });
  }
}
document.addEventListener("DOMContentLoaded", initTheme);
