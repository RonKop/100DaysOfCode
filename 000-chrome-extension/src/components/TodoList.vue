<template>
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" @click="markComplete">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <li v-for="todo in todos" :key="todo.id" :class="{completed: todo.completed}">
                <div class="view">
                    <input
                        class="toggle"
                        type="checkbox"
                        :checked="todo.completed"
                        @click="updateStatus(todo)"
                    >
                    <label>{{todo.value}}</label>
                    <button class="destroy" @click="deleteTodo(todo)"></button>
                </div>
            </li>
        </ul>
        <footer class="footer">
            <span class="todo-count">{{todoCount}} todo(s) left</span>
            <ul class="filters">
                <li v-for="filter in filters" :key="filter.id">
                    <a
                        href="#"
                        :class="{selected: filter.selected}"
                        @click="updateFilter(filter)"
                    >{{filter.label}}</a>
                </li>
            </ul>
            <button class="clear-completed" @click="deleteCompleted">Clear completed</button>
        </footer>
    </section>
</template>

<script>
    import { bus } from "../bus.js";
    export default {
        name: "TodoList",
        props: {
            todos: Array,
            filters: Array,
            todoCount: Number
        },
        methods: {
            deleteTodo(todo) {
                bus.$emit("deleteTodo", todo);
            },
            updateFilter(filter) {
                this.filters.forEach(f => {
                    f.selected = false;
                    if (f == filter) {
                        f.selected = true;
                    }
                });
                bus.$emit("filterTodos");
            },
            deleteCompleted() {
                bus.$emit("deleteCompleted");
            },
            markComplete() {
                bus.$emit("markComplete");
            },
            updateStatus(todo) {
                bus.$emit("updateStatus", todo);
            }
        }
    };
</script>
