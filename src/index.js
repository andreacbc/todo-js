import './styles.css';
import { TodoList } from './classes';
import { CreatedTodoHtml } from './js/components';

export const todoList = new TodoList();
todoList.todos.forEach( CreatedTodoHtml );
