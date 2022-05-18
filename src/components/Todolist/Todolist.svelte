<style>
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    list-style-type: none;
  }
</style>

<script lang="ts">
  import type { TodoListItem } from '../../app.types';
  import TodolistItem from './TodolistItem.svelte';
  export let todolist:TodoListItem[] = [];

  const deleteItem = (index: number) => {
    todolist.splice(index, 1);
    todolist = todolist;
    localStorage.setItem('todolist', JSON.stringify(todolist));
  };

  const toggleTodoListItem = (index: number) => {
    todolist[index] = { ...todolist[index], completed: !todolist[index]['completed']};
    localStorage.setItem('todolist', JSON.stringify(todolist));
  }
</script>

<ul class="todo-list">
  {#each todolist as { text, completed }, index}
    <TodolistItem 
      {index}
      {text} 
      {completed}
      {deleteItem}
      {toggleTodoListItem}
    />
  {/each}
</ul>
