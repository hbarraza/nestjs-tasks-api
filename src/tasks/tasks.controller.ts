import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto'

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks() {
        console.log(`Leyendo tareas`)
        return {
            status: true,
            tasks: this.tasksService.getAllTasks()
        }
    }

    @Post()
    createTask(@Body() newTask: CreateTaskDto) {
        //console.log(newTask);
        console.log(`Guardando tarea`)
        const res = this.tasksService.createTask(newTask.title, newTask.description)
        console.log("res: ", JSON.stringify(res))
        return { status: true }

    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        console.log(`Eliminando tarea`)
        const res = this.tasksService.deleteTask(id)
        console.log("res: ", JSON.stringify(res))
        return { status: true }
    }

    @Patch(':id')
    updateTask(@Param('id') id:string, @Body() updatedFields: UpdateTaskDto) {
        console.log(`Actualizando tarea`)
        const res = this.tasksService.updateTask(id, updatedFields)
        console.log("res: ", JSON.stringify(res))
        return { status: true, msg: `Task ${id} was updated`}
    }
}
