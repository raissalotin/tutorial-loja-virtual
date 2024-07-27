<script setup>
import { ref, reactive, onMounted } from "vue";
import MarcasApi from "@/api/marcas";
const marcasApi = new MarcasApi();

const defaultMarca = { id: null, nome: "", nacionalidade: "" };
const marcas = ref([]);
const marca = reactive({ ...defaultMarca });

onMounted(async () => {
  marcas.value = await marcasApi.buscarTodasAsMarcas();
});

function limpar() {
  Object.assign(marca, { ...defaultMarca });
}

async function salvar() {
  if (marca.id) {
    await marcasApi.atualizarMarca(marca.value);
  } else {
    await marcasApi.adicionarMarca(marca);
  }
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  limpar();
}

function editar(marca_para_editar) {
  Object.assign(marca, marca_para_editar);
}

async function excluir(id) {
  await marcasApi.excluirMarca(id);
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  limpar();
}
</script>

<template>
  <h1 class="title">Marcas</h1>
  
  <div class="form">
    <input type="text" v-model="marca.nome" placeholder="Marca" />
    <input type="text" v-model="marca.nacionalidade" placeholder="Nacionalidade" />
    <div class="button-container">
      <button @click="salvar">Salvar</button>
      <button @click="limpar">Limpar</button>
    </div>
  </div>
  <div class="list">
    <li v-for="marca in marcas" :key="marca.id">
      <span @click="editar(marca)">
        ({{ marca.id }}) - {{ marca.nome }} - {{ marca.nacionalidade }}
      </span>
      <button @click="excluir(marca.id)">X</button>
    </li>
  </div>
</template>

<style>
.title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
  margin-top: 0;
  text-align: center;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 600px;
  margin: 50px auto 20px auto;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
.form input[type="text"] {
  width: 80%;
  max-width: 370px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
  background-color: #f9f9f9;
}
.button-container {
  display: flex;
  gap: 10px; 
  justify-content: center;
}
.form button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #007BFF;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}
.form button:hover {
  background-color: #0056b3;
}

.form button:active {
  background-color: #004494;
}
.list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.list span {
  font-size: 16px;
  color: #333;
}

.list button {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.list button:hover {
  background-color: #c82333;
}

.list button:active {
  background-color: #bd2130;
}

@media (max-width: 768px) {
  .title {
    font-size: 24px;
  }
  
  .form {
    padding: 10px;
  }
  
  .form input[type="text"] {
    max-width: 100%;
  }
  
  .form button {
    padding: 8px 16px;
  }
  
  .list li {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .list button {
    font-size: 12px;
    padding: 5px 8px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 20px;
  }
  
  .form {
    padding: 8px;
  }
  
  .form input[type="text"] {
    font-size: 14px;
  }
  
  .form button {
    font-size: 14px;
    padding: 6px 12px;
  }
  
  .list li {
    font-size: 14px;
  }
}
</style>