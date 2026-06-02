let products = [];
let editingId = null;

document.addEventListener("DOMContentLoaded", () => {
  products = getProducts();
  renderTable();

  document.getElementById("productForm").addEventListener("submit", handleSubmit);
  document.getElementById("cancelBtn").addEventListener("click", resetForm);
});

function handleSubmit(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById("name").value.trim(),
    price: parseFloat(document.getElementById("price").value),
    empresa: document.getElementById("empresa").value,
    pelicula: document.getElementById("pelicula").value.trim(),
    stock: parseInt(document.getElementById("stock").value, 10),
    image: document.getElementById("image").value.trim(),
    description: document.getElementById("description").value.trim()
  };

  if (editingId !== null) {
    const idx = products.findIndex(p => p.id === editingId);
    if (idx !== -1) products[idx] = { id: editingId, ...data };
  } else {
    products.push({ id: nextId(products), ...data });
  }
  saveProducts(products);
  resetForm();
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("adminTbody");
  if (!products.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--text-muted)">Sin productos cargados</td></tr>`;
    return;
  }
  tbody.innerHTML = products.map(p => `
    <tr>
      <td><img src="${p.image}" alt="" onerror="this.src='https://via.placeholder.com/48'"></td>
      <td>${p.name}</td>
      <td>${p.empresa}</td>
      <td>${p.pelicula}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td>${p.stock}</td>
      <td>
        <button class="btn-edit" data-id="${p.id}">Editar</button>
        <button class="btn-delete" data-id="${p.id}">Eliminar</button>
      </td>
    </tr>
  `).join("");

  tbody.querySelectorAll(".btn-edit").forEach(b =>
    b.addEventListener("click", () => editProduct(+b.dataset.id)));
  tbody.querySelectorAll(".btn-delete").forEach(b =>
    b.addEventListener("click", () => deleteProduct(+b.dataset.id)));
}

function editProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  document.getElementById("productId").value = p.id;
  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("empresa").value = p.empresa;
  document.getElementById("pelicula").value = p.pelicula;
  document.getElementById("stock").value = p.stock;
  document.getElementById("image").value = p.image;
  document.getElementById("description").value = p.description;
  document.getElementById("formTitle").textContent = "Editar producto";
  document.getElementById("submitBtn").textContent = "Actualizar producto";
  document.getElementById("cancelBtn").hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if (!confirm(`¿Eliminar "${p.name}"?`)) return;
  products = products.filter(x => x.id !== id);
  saveProducts(products);
  if (editingId === id) resetForm();
  renderTable();
}

function resetForm() {
  editingId = null;
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";
  document.getElementById("formTitle").textContent = "Cargar nuevo producto";
  document.getElementById("submitBtn").textContent = "Guardar producto";
  document.getElementById("cancelBtn").hidden = true;
}
