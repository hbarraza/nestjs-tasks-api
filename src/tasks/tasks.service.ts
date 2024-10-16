import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity'
import { v4 } from 'uuid'
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [
        {
            id: "1",
            title: "First task",
            description: "This is the task",
            status: TaskStatus.PENDING
        }
    ]

    getAllTasks(){
        return this.tasks
    }

    createTask(title: string, description:string){
        const task = {
            id: v4(),//new Date().toISOString(),
            title,
            description,
            status: TaskStatus.PENDING
        }

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id)
        return { msg: `Task ${id} deleted`}
    }

    getTaskById(id:string): Task {
        return this.tasks.find(t => t.id === id)
    }

    updateTask(id: string, updatedFields: UpdateTaskDto){
        const task = this.getTaskById(id)
        const newTask = Object.assign(task, updatedFields)

        this.tasks = this.tasks.map( task => task.id === id ? newTask : task)
        return newTask;
    }
}
