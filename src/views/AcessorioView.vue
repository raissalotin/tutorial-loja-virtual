<script setup>
import { ref, reactive, onMounted } from "vue";
import AcessoriosApi from "@/api/acessorios";
const acessoriosApi = new AcessoriosApi();

const defaultAcessorio = { id: null, descricao: "" };
const acessorios = ref([]);
const acessorio = reactive({ ...defaultAcessorio });

onMounted(async () => {
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
});

function limpar() {
  Object.assign(acessorio, { ...defaultAcessorio });
}

async function salvar() {
  if (acessorio.id) {
    await acessoriosApi.atualizarAcessorio(acessorio.value);
  } else {
    await acessoriosApi.adicionarAcessorio(acessorio);
  }
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
  limpar();
}

function editar(acessorio_para_editar) {
  Object.assign(acessorio, acessorio_para_editar);
}

async function excluir(id) {
  await acessoriosApi.excluirAcessorio(id);
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
  limpar();
}
</script>

<template>
  <h1 class="title">Acessórios</h1>

  <div class="form">
    <input type="text" v-model="acessorio.descricao" placeholder="Descrição" />
    <div class="button-container">
    <button @click="salvar" class="save">Salvar</button>
    <button @click="limpar" class="clean">Limpar</button>
  </div>
  </div>
  <div class="list">
    <li v-for="acessorio in acessorios" :key="acessorio.id">
      <span @click="editar(acessorio)">
        ({{ acessorio.id }}) - {{ acessorio.descricao }} -
      </span>
      <button @click="excluir(acessorio.id)">X</button>
    </li>
  </div>
</template>

<style scoped>
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
  margin: 0px auto 20px auto;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
.button-container {
  display: flex;
  gap: 10px; 
  justify-content: center;
}
.list {
 justify-content: center;
 vertical-align: middle;
 text-align: center;
}

</style>