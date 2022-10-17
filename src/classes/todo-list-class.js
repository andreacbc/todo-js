import { Todo } from './todo.class';

/* Html references */
const todoCount = document.querySelector('strong');

export class TodoList {
    
    constructor() {
        this.loadLocalStorage();
    }

    newTodo(todo) { 
        this.todos.push(todo); 
        this.saveLocalStorage();
    }

    deleteTodo(id) {
        /* const elementDeleted =  this.todos.findIndex(() => this.todos.id == id);
        return this.todos.splice(elementDeleted,1); */

        this.todos = this.todos.filter( todo => todo.id != id);
        this.saveLocalStorage();
    }

    checkCompleted(id) {
        for (const todo of this.todos ){

            if(todo.id == id) { 
                todo.completed = !todo.completed;
                this.saveLocalStorage();
                break;
             }
        }
    }

    deleteCompleted() {
        this.todos = this.todos.filter( todo => !todo.completed );
        this.saveLocalStorage();
    }

    saveLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
        this.countTodosPending();
    }

    loadLocalStorage(){
        this.todos = (localStorage.getItem('todo')) 
                    ? JSON.parse(localStorage.getItem('todo')) 
                    : [];

        this.todos = this.todos.map( Todo.fromJson ); 
        this.countTodosPending();

        /* if(localStorage.getItem('todo')){
            this.todos = JSON.parse(localStorage.getItem('todo'));
            console.log('Load Local:', this.todos);
        }else {
            this.todos = [];
        } */
    }

    countTodosPending(){
        let count = 0;

        for(let todo of this.todos){
            if(todo.completed === false){
                 count = count + 1 ;
            }
        }

        todoCount.innerHTML = count;
    }
}