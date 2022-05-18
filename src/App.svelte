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

  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    list-style-type: none;
  }

  .todo-list-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    background-color: #2f3e45;
  }

  .todo-list-item-group {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .todo-list-item-text {
    text-align: left;
    font-weight: 700;
    font-size: 1rem;
    color: #fff;
  }

  .completed {
    text-decoration: line-through;
    color: #ccc;
  }

  .completeButton {
    border-radius: 50%;
    background-color: transparent;
    border: 3px solid #df87b5;
    padding: 0.6rem;
  }

  .disabledButton {
    background-color: #ce4a7eff;
  }

  .submitButton {
    background-color: #df87b5;
    border-radius: 30%;
    border: none;
    color: #fff;
    font-size: 0.6rem !important;
    padding: 0.3rem 0.4rem;
  }

  .deleteButton{
    background-color: transparent;
    color: #ccc;
    border: none;
  }

</style>

<script lang="ts">
  import { onMount } from "svelte";

  type TodoListItem = {
    text: string;
    completed: boolean;
  };
  let todolist: TodoListItem[] = [];
  let todo: string = '';

  // Because Svelte's reactivity is based on assignments, using array methods like
  // .push() and .splice() won't automatically trigger updates. A subsequent
  // assignment is required to trigger the update.
  const onSubmit = () => {
    if(todo !== '' || todo){
      todolist = [...todolist, { text: todo, completed: false }];
      localStorage.setItem('todolist', JSON.stringify(todolist));
      todo = '';
    }
  };

  const deleteItem = (index: number) => {
    todolist.splice(index, 1);
    todolist = todolist;
    localStorage.setItem('todolist', JSON.stringify(todolist));
  };

  const toggleTodoListItem = (index: number) => {
    todolist[index] = { ...todolist[index], completed: !todolist[index]['completed']};
    localStorage.setItem('todolist', JSON.stringify(todolist));
  }

  onMount(() => {
    todolist = JSON.parse(localStorage.getItem('todolist')) || [];
  })
</script>

<main>
  <div class="container">
    <h1 class="title">TODO LIST</h1>
    <div class="content">
      <ul class="todo-list">
        {#each todolist as { text, completed }, index}
          <li class="todo-list-item">
            <div class="todo-list-item-group">
              <button
                class={`completeButton ${completed ? 'disabledButton' : ''}`}
                on:click = {() => toggleTodoListItem (index)}
              >
              </button>
              <span class:completed class="todo-list-item-text">{text}</span>
            </div>
            <button class="deleteButton"
            on:click = {() => deleteItem(index)}>
                x
            </button>
          </li>
        {/each}
      </ul>
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
