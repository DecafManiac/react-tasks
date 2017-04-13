import React, { Component } from 'react';
import axios from 'axios'
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
import Button from 'muicss/lib/react/button';


import Tasks from './components/Tasks.jsx';
import AddTask from './components/AddTask.jsx';

import './App.css';


class App extends Component {
  constructor() {
    super()

    this.state = {
      tasks: []
    }
  }

  componentWillMount() {
    this.getTasks();
    
  }

  getTasks() {
    axios.request({
      method: 'get',
      url: 'https://api.mlab.com/api/1/databases/reacttasks/collections/tasks?apiKey=cxssGYdYHxJPJNWo9dR87IVu9OisXJ3t'
    }).then(response => {
      this.setState({
        tasks: response.data
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  editState(task, checked) {
    
    axios.request({
      method: 'put',
      url: 'https://api.mlab.com/api/1/databases/reacttasks/collections/tasks/'+task._id.$oid+'?apiKey=cxssGYdYHxJPJNWo9dR87IVu9OisXJ3t',
      data: {
        text: task.text,
        completed: checked
      }
    }).then(response => {
      
      let tasks = this.state.tasks;
      for(let i = 0; i <tasks.length; i++) {
        if(tasks[i]._id.$oid === response.data._id.$oid){
          tasks[i].completed = checked;
        }
      }
      this.setState({
        tasks: tasks
      })
     
    }).catch((error) => {
      console.log(error)
    })
  }

  addTask(text) {
    axios.request({
      method: 'post',
      url: 'https://api.mlab.com/api/1/databases/reacttasks/collections/tasks/?apiKey=cxssGYdYHxJPJNWo9dR87IVu9OisXJ3t',
      data: {
        text: text,
        completed: false
      }
    }).then(response => {
      
      let tasks = this.state.tasks;
      tasks.push({
        _id: response.data._id,
        text: text,
        completed: false
      })
      this.setState({
        tasks: tasks
      })
   
    }).catch((error) => {
      console.log(error)
    })
  }

  clearTasks() {
    let tasks = this.state.tasks;
    let i = tasks.length;

    while(i--) {
      if(tasks[i].completed === true) {
        let id = tasks[i]._id.$oid;
        tasks.splice(i, 1);
        axios.request({
          method: 'delete',
          url: 'https://api.mlab.com/api/1/databases/reacttasks/collections/tasks/'+id+'?apiKey=cxssGYdYHxJPJNWo9dR87IVu9OisXJ3t',
        }).then(response => {
          
        }).catch(error => {
          console.log(error);
        })
      }
    }
    
    this.setState({
      tasks: tasks
    })
  }

  clearAllTasks() {
     let tasks = this.state.tasks;
    let i = tasks.length;

    while(i--) {
      
        let id = tasks[i]._id.$oid;
        tasks.splice(i, 1);
        axios.request({
          method: 'delete',
          url: 'https://api.mlab.com/api/1/databases/reacttasks/collections/tasks/'+id+'?apiKey=cxssGYdYHxJPJNWo9dR87IVu9OisXJ3t',
        }).then(response => {
          
        }).catch(error => {
          console.log(error);
        })
      
    }
    
    this.setState({
      tasks: tasks
    })
  }

  render() {
    return (
      <div className="App">
       <Appbar>
         <Container>
            <table width="100%">
              <tbody>
                <tr>
                  <td className="mui--appbar-height" style={{fontSize:22}}>React Tasks</td>
                  <td className="mui--appbar-height" style={{fontSize:16, textAlign:'right'}}>by DecafManiac</td>
                </tr>
              </tbody>
            </table>
          </Container>
        </Appbar>
        <br />
        <Container>
          <AddTask onAddTask={this.addTask.bind(this)} />
          <Tasks onEditState={this.editState.bind(this)} tasks={this.state.tasks}/>
          <Button color="danger" onClick={this.clearTasks.bind(this)}>CLEAR</Button>
          <Button color="danger" onClick={this.clearAllTasks.bind(this)}>CLEAR ALL</Button>
        </Container>
      </div>
    );
  }
}

export default App;
