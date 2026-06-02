let products = [];
let selectedEmpresas = new Set();
let selectedPeliculas = new Set();
let searchTerm = "";

document.addEventListener("DOMContentLoaded", () => {
  products = getProducts();
  buildFilters();
  render();

  document.getElementById("searchInput").addEventListener("input", (e) => {
    searchTerm = e.target.value.toLowerCase();
    render();
  });
  document.getElementById("clearFilters").addEventListener("click", () => {
    selectedEmpresas.clear();
    selectedPeliculas.clear();
    searchTerm = "";
    document.getElementById("searchInput").value = "";
    document.querySelectorAll(".filter-group input").forEach(i => i.checked = false);
    render();
  });
});

function buildFilters() {
  const empresas = [...new Set(products.map(p => p.empresa))].sort();
  const peliculas = [...new Set(products.map(p => p.pelicula))].sort();

  const empBox = document.getElementById("empresaFilters");
  empBox.innerHTML = empresas.map(e => `
    <label><input type="checkbox" data-empresa="${e}"> ${e}</label>
  `).join("");
  empBox.querySelectorAll("input").forEach(inp => {
    inp.addEventListener("change", () => {
      const v = inp.dataset.empresa;
      inp.checked ? selectedEmpresas.add(v) : selectedEmpresas.delete(v);
      render();
    });
  });

  const pelBox = document.getElementById("peliculaFilters");
  pelBox.innerHTML = peliculas.map(p => `
    <label><input type="checkbox" data-pelicula="${p}"> ${p}</label>
  `).join("");
  pelBox.querySelectorAll("input").forEach(inp => {
    inp.addEventListener("change", () => {
      const v = inp.dataset.pelicula;
      inp.checked ? selectedPeliculas.add(v) : selectedPeliculas.delete(v);
      render();
    });
  });
}

function render() {
  const filtered = products.filter(p => {
    if (selectedEmpresas.size && !selectedEmpresas.has(p.empresa)) return false;
    if (selectedPeliculas.size && !selectedPeliculas.has(p.pelicula)) return false;
    if (searchTerm && !(`${p.name} ${p.pelicula} ${p.empresa}`.toLowerCase().includes(searchTerm))) return false;
    return true;
  });

  const grid = document.getElementById("productsGrid");
  const noRes = document.getElementById("noResults");
  document.getElementById("productCount").textContent = `${filtered.length} producto(s)`;

  if (!filtered.length) { grid.innerHTML = ""; noRes.hidden = false; return; }
  noRes.hidden = true;

  grid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <img class="product-image" src="${p.image}" alt="${p.name}"
           onerror="this.src='https://via.placeholder.com/300x220?text=Funko'">
      <div class="product-body">
        <div class="product-tags">
          <span class="tag empresa">${p.empresa}</span>
          <span class="tag">${p.pelicula}</span>
        </div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">$${p.price.toFixed(2)}</span>
          <span class="product-stock">${p.stock > 0 ? `Stock: ${p.stock}` : "Agotado"}</span>
        </div>
        <button class="btn-buy" ${p.stock <= 0 ? "disabled" : ""} data-id="${p.id}">
          ${p.stock > 0 ? "🛒 Comprar" : "Sin stock"}
        </button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".btn-buy:not(:disabled)").forEach(btn => {
    btn.addEventListener("click", () => buyProduct(+btn.dataset.id));
  });
}

function buyProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p || p.stock <= 0) return;
  p.stock -= 1;
  saveProducts(products);
  alert(`¡Compraste "${p.name}" por $${p.price.toFixed(2)}! 🎉`);
  render();
}
