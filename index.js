window.onload = () => {
  showNotes();
};

let page = 1;
let totalPages = 0;

const api = axios.create({
  baseURL: "http://localhost:1425",
});

function showNotes() {
  let container = document.getElementById("containerCards");
  container.innerHTML = "";
  const id = 6057;
  api
    .get(`/usuarios/${id}/recado`, { params: { page } })
    .then((res) => {
      const notes = res.data.recados;
      totalPages = res.data.pages;
      document.getElementById("total").innerText = res.data.total + " recados";
      notes.forEach((note) => {
        container.innerHTML += `<div class="cardNote"><span>${note.titulo}</span><span>${note.descricao}</span></div>`;
      });
    })
    .catch((err) => {
      alert(err.response.data);
    });
}

function previousPage() {
  if (page > 1) {
    page--;
    showNotes();
  }
}

function nextPage() {
  console.log(totalPages);
  if (page < totalPages) {
    page++;
    showNotes();
  }
}
