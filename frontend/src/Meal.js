import React, {Component} from 'react';

import Input from './Input';
import ListTodo from './ListTodo';

class Todo extends Component {

    state = {
        todos: []
    }

    componentDidMount(){
        this.getTodos();
    }

    getTodos = () => {
        const data = {action: 'GET_TODOS'};

        fetch('/api/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, 
            // origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }).then((res) => {
            if(res.data) {
                this.setState({
                    todos: res.data
                });
            }
        }).catch( (err) => {
            console.log('catch(err), err: ', err);
        });
    }

    deleteTodo = (id) => {
        const data = {action: 'DELETE_TODO'};
        fetch(`/api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, 
            // origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(res => {
            if(res.data) {
                this.getTodos();
            }
        }).catch(err => console.log(err));
    }

    render() {
        let { todos } = this.state;

        return(
        <div>
            <h1>My Todo(s)</h1>
            <Input getTodos={this.getTodos}/>
            <ListTodo todos={todos} deleteTodo={this.deleteTodo}/>
        </div>
        );
    }
}

export default Todo;