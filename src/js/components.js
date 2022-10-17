import { Todo } from '../classes';
import { todoList } from '../index';

/* Html references */
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const clearCompleted = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filter');

/* Recreate the whole HTML List  */
export const CreatedTodoHtml = (todo) => {

    const htmlTodo = 
    `<li class="${ (todo.completed) ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completed) ? 'checked' : ''}>
			<label>${ todo.task }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`

    const div = document.createElement('div');
    div.innerHTML =  htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div;
}

/* Events */
txtInput.addEventListener('keyup', (event)=> {
    if(event.keyCode === 13  && txtInput.value.length > 0 ){
        const newTodo = new Todo(txtInput.value);
        todoList.newTodo( newTodo );
        CreatedTodoHtml( newTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event)=> {
    
    const elementName = event.target.localName;  /* input, label, button */
    const elementTodo = event.target.parentElement.parentElement;
    const idTodo = elementTodo.getAttribute('data-id');

    if(elementName.includes('input')) {
        todoList.checkCompleted(idTodo);
        elementTodo.classList.toggle('completed');

    }

    else if(elementName.includes('button')) {
        todoList.deleteTodo(idTodo);
        elementTodo.innerHTML='';
    };
});

clearCompleted.addEventListener('click', ()=> {

    todoList.deleteCompleted();

    for(let i= divTodoList.children.length-1;  i>=0 ; i--) {

        const element = divTodoList.children[i];

        if(element.classList.contains('completed')){
            divTodoList.removeChild(element);
        }
    }
});

ulFilters.addEventListener('click', (event)=>{

    const filter = event.target.text;
     if(!filter){ return; };

     anchorFilters.forEach(elem => elem.classList.remove('selected'));
     event.target.classList.add('selected');

     for(const element of divTodoList.children){

        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch(filter){
            case 'Pending':
                if(completed){
                    
                    element.classList.add('hidden');
                }
            break;

            case 'Completed':
              if(!completed){
                element.classList.add('hidden');
              }  
            break;      
        }
     }
});



