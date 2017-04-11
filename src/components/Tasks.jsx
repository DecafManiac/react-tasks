import React from 'react';
import Panel from 'muicss/lib/react/panel';
import TaskItem from './TaskItem.jsx'


class Tasks extends React.Component {
   
    handleEditState(task, checked) {
        this.props.onEditState(task, checked);
    }

    render() {
        let taskItems;
        if(this.props.tasks){
            taskItems = this.props.tasks.map(task => {
                return (
                    <TaskItem onEditState={this.handleEditState.bind(this)} key={task._id.$oid} task={task} />
                );
            })
        }
        return (
            <Panel>
                {taskItems}
            </Panel>
        );
    }
}

export default Tasks;