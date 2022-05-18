<style>
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

  .deleteButton{
    background-color: transparent;
    color: #ccc;
    border: none;
  }

  .deleteButton:active {
    background-color: transparent;
  }
</style>

<script lang="ts">
  export  let index: number;
  export let text: string;
  export let completed: boolean;
  export let deleteItem: Function;
  export let toggleTodoListItem: Function;
</script>

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
