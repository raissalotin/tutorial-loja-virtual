<script setup>
import { reactive, defineEmits } from 'vue';
import { useCategoryStore } from '@/stores/category';

const emit = defineEmits(['close']);

const categoryStore = useCategoryStore();

const category = reactive({
  name: '',
  icon: '',
});

const createCategory = async () => {
  await categoryStore.createCategory(category);
  emit('close');
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Adicionar Categoria</h2>
        <button @click="$emit('close')" class="btn-close">
          <i class="mdi mdi-close" />
        </button>
      </div>
      <form class="form" @submit.prevent="createCategory">
        <div class="row-form">
          <label for="name">Nome</label>
          <input type="text" id="name" v-model="category.name" />
        </div>
        <button class="btn-send" type="submit">Adicionar</button>

      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 30%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header h2 {
  font-size: 1.5rem;
}

.btn-close {
  background-color: #0a2668;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.btn-close i {
  font-size: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.row-form {
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
}

.form button.btn-send {
  background-color: #0a2668;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  font-size: 1.3rem;
  cursor: pointer;
  width: 200px;
}
</style>