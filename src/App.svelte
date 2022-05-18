<style>
  main {
    display: flex;
    justify-content: center;
    padding: 1em;
    width: 100%;
    height: 100%;
    background-color: #1b1b23;
  }

  button {
    cursor: pointer;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 75%;
    margin-top: 1rem;
  }

  .title {
    color: #fff;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: bold;
  }

  .content {
    margin-top: 1.5rem;
  }

  .todo-list-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    margin-top: 1rem;
    border: 2px solid #2f3e45;
    border-radius: 5px;
    padding: 1rem;
  }

  .todo-list-form input[name='todo-list-entry'] {
    font-size: 0.9rem;
    background-color: transparent;
    color: #fff;
    outline: none;
    width: 95%;
    border: none;
  }

  .todo-list-form input[name='todo-list-entry']:focus {
    outline: none;
  }

  .submitButton {
    background-color: #df87b5;
    border-radius: 30%;
    border: none;
    color: #fff;
    font-size: 0.6rem !important;
    padding: 0.3rem 0.4rem;
  }
</style>

<script lang="ts">
  import Todolist from "./components/Todolist/Todolist.svelte";
  import type { TodoListItem } from './app.types';
  import { todolist } from './store';

  let todo: string = '';

  // Because Svelte's reactivity is based on assignments, using array methods like
  // .push() and .splice() won't automatically trigger updates. A subsequent
  // assignment is required to trigger the update.
  const onSubmit = () => {
    if(todo !== '' || todo){
      todolist.update(
        (todolist: TodoListItem[]): TodoListItem[] => [...todolist, { text: todo, completed: false}]
      );
      todo = '';
    }
  };
</script>

<main>
  <div class="container">
    <h1 class="title">TODO LIST</h1>
    <div class="content">
      <Todolist todolist={$todolist}/>
      <form on:submit|preventDefault={onSubmit} class="todo-list-form">
        <button class="submitButton">+</button>
        <input
          type="text"
          placeholder="Add Task"
          bind:value={todo}
          name="todo-list-entry"
        />
      </form>
    </div>
  </div>
</main>
