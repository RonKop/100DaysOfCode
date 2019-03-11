<template>
    <div id="app">
        <section class="todoapp">
            <Todo></Todo>
            <TodoList :todos="todosCached" :filters="filters" :todoCount="todoCount"></TodoList>
        </section>
        <Footer></Footer>
    </div>
</template>

<script>
    import Todo from "./components/Todo.vue";
    import TodoList from "./components/TodoList.vue";
    import Footer from "./components/Footer.vue";
    import { bus } from "./bus.js";

    export default {
        name: "app",
        components: {
            Footer,
            TodoList,
            Todo
        },
        data() {
            return {
                todos: [],
                todosCached: [],
                filters: [
                    { id: 1, label: "All", selected: true },
                    { id: 2, label: "Completed", selected: false },
                    { id: 3, label: "Active", selected: false }
                ],
                storage: window.localStorage
            };
        },
        created() {
            bus.$on("newTodo", this.newTodo);
            bus.$on("deleteTodo", this.deleteTodo);
            bus.$on("filterTodos", this.filter);
            bus.$on("deleteCompleted", this.deleteCompleted);
            bus.$on("markComplete", this.markComplete);
            bus.$on("updateStatus", this.updateStatus);
            if (this.storage.getItem("todos")) {
                this.todos = JSON.parse(this.storage.getItem("todos"));
            } else {
                this.todos = [];
            }
            this.filter();
        },
        computed: {
            todoCount() {
                return this.todos.filter(t => !t.completed).length;
            }
        },
        methods: {
            newTodo(todo) {
                this.todos.push(todo);
                this.filter();
            },
            deleteTodo(todo) {
                this.todos = this.todos.filter(t => t != todo);
                this.filter();
            },
            filter() {
                const filter = this.filters.filter(t => t.selected)[0];
                if (filter.label == "All") {
                    this.todosCached = this.todos.filter(t => t);
                } else if (filter.label == "Completed") {
                    this.todosCached = this.todos.filter(t => t.completed);
                } else if (filter.label == "Active") {
                    this.todosCached = this.todos.filter(t => !t.completed);
                }
                this.save();
            },
            deleteCompleted() {
                this.todos = this.todos.filter(t => !t.completed);
                this.filter();
            },
            markComplete() {
                this.todos = this.todos.map(t => {
                    t.completed = true;
                    return t;
                });
                this.filter();
            },
            updateStatus(todo) {
                this.todos = this.todos.map(t => {
                    if (t == todo) {
                        t.completed = !t.completed;
                    }
                    return t;
                });
                this.filter();
            },
            save() {
                this.storage.setItem("todos", JSON.stringify(this.todos));
            }
        }
    };
</script>

