<script setup>
import '@passageidentity/passage-elements/passage-auth';
</script>

<template>
  <h1>Login</h1>
  <div class="authContainer">
    <passage-auth
      app-id="dDl5WbrU1st3EnyNXlRhdQxL"
    ></passage-auth>
  </div>
</template>

<style scoped>
h1{
text-align: center;
}
.authContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}


</style>