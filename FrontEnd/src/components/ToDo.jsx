import React, { Component } from 'react';

class ToDo extends Component{
    constructor(props){
        super(props)
        this.state={
            item:'',
            todos:[]
        }
    }

    handleChange = (event) =>{
        this.setState({
            item:event.target.value
        })
    
    };

    handleClick = () => {
        const list= this.state.todos
        list.push(this.state.item)
        this.setState({
        todos: list
        })
    }

    handleDelete = (todo) => {
        this.setState({
          todos: this.state.todos.filter(el => el !== todo)
        })
      }

    render(){
        return(
            <div className='input-box'>
                <form>
                    <input className='input' type='text' placeholder='Please add your todo item' onChange={this.handleChange}></input>
                    <button onClick={this.handleClick}>Add</button>
                    <ul>
                        {this.state.todos.map((todo, index) =>
                            <span key={index}>
                            <li>{todo}</li>
                            <button type="button" onClick={() =>{this.handleDelete(todo)}}>delete</button>
                            </span>
                        )}
                    </ul>
                </form>
            </div>
        )
    }
}
export default ToDo