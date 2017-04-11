import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

class AddTask extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           task: ''
       }
   }

   onSubmit(e) {
       this.props.onAddTask(this.state.task)
       e.preventDefault();
   }

    onChange(e){
        this.setState({
            task: e.target.value
        })
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit.bind(this)}>
                <Input hint="Add task" onChange={this.onChange.bind(this)} />
            </Form>
        );
    }
}

export default AddTask;