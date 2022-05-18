import { Writable, writable } from 'svelte/store';
import type { TodoListItem } from './app.types';

const storedTodoList = JSON.parse(localStorage.getItem("todolist"));
export const todolist: Writable<TodoListItem[]> = writable(storedTodoList || []);

// When todolist changes it is updated in localStorage
todolist.subscribe((todolist) => {
  localStorage.setItem('todolist', JSON.stringify((todolist)));
})
