document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("atrasosTabela").style.display = "none";
  document.getElementById("demandaTabela").style.display = "none";
  document.getElementById("alunoTabela").style.display = "none";
});

function toggleAtrasos() {
  const tabela = document.getElementById("atrasosTabela");
  if (tabela.style.display === "none" || tabela.style.display === "") {
    carregarAtrasos();
  } else {
    tabela.style.display = "none";
  }
}

function toggleDemanda() {
  const tabela = document.getElementById("demandaTabela");
  if (tabela.style.display === "none" || tabela.style.display === "") {
    carregarDemanda();
  } else {
    tabela.style.display = "none";
  }
}

function buscarAluno() {
  const termo = document.getElementById("searchInput").value.toLowerCase();
  fetch("http://localhost:4000/aluno")
    .then(response => response.json())
    .then(data => {
      const tabela = document.getElementById("alunoTabela");
      tabela.style.display = "table";
      const tbody = tabela.getElementsByTagName("tbody")[0];
      tbody.innerHTML = "";
      data.Lista_Alunos.forEach(item => {
        if (item.nomeAluno.toLowerCase().includes(termo)) {
          let row = tbody.insertRow();
          row.insertCell(0).textContent = item.idAluno;
          row.insertCell(1).textContent = item.nomeAluno;
          row.insertCell(2).textContent = item.cpfAluno;
          row.insertCell(3).textContent = item.numMatricula;
          row.insertCell(4).textContent = item.celularAluno;
          row.insertCell(5).textContent = item.emailAluno;
        }
      });
    })
    .catch(error => console.error("Erro ao buscar aluno:", error));
}

function carregarAtrasos() {
  fetch("http://localhost:4000/atrasosFrequentes")
    .then(response => response.json())
    .then(data => {
      const tabela = document.getElementById("atrasosTabela");
      tabela.style.display = "table";
      const tbody = tabela.getElementsByTagName("tbody")[0];
      tbody.innerHTML = "";
      data.Alunos_Atrasados.forEach(item => {
        let row = tbody.insertRow();
        row.insertCell(0).textContent = item.Nome_Aluno;
        row.insertCell(1).textContent = item.Status;
        row.insertCell(2).textContent = item.Titulo;
        row.insertCell(3).textContent = item.Data_Emprestimo;
        row.insertCell(4).textContent = item.Data_Entrega;
        row.insertCell(5).textContent = item.Dias_Atraso;
      });
    })
    .catch(error => console.error("Erro ao carregar atrasos:", error));
}

function carregarDemanda() {
  fetch("http://localhost:4000/verificarDemanda")
    .then(response => response.json())
    .then(data => {
      const tabela = document.getElementById("demandaTabela");
      tabela.style.display = "table";
      const tbody = tabela.getElementsByTagName("tbody")[0];
      tbody.innerHTML = "";
      data.Verificar_Demanda.forEach(item => {
        let row = tbody.insertRow();
        row.insertCell(0).textContent = item.Titulo;
        row.insertCell(1).textContent = item.Quantidade_Disponivel;
        row.insertCell(2).textContent = item.Quantidade_Emprestimos;
      });
    })
    .catch(error => console.error("Erro ao carregar demanda:", error));
}
