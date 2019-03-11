<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
      v-model="newTodo"
      @keyup.enter.prevent="newTodoAction"
    >
  </header>
</template>

<script>
    import { bus } from "../bus.js";

    export default {
        name: "Todo",
        data() {
            return {
                newTodo: ""
            };
        },
        created: () => {},
        methods: {
            newTodoAction() {
                const todo = {
                    completed: false,
                    value: this.newTodo,
                    date: +new Date()
                };
                bus.$emit("newTodo", todo);
                this.newTodo = "";
            }
        }
    };
</script>
