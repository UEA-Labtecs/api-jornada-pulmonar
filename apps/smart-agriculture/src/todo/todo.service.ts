import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.model';
import { ObjectId } from 'mongodb';

@Injectable()
export class TodoService {
  todoList: Todo[] = [];

  addTodo(todo: Todo): Todo {
    // curl -X POST -H "Content-Type: application/json" -d '{"title":"Fazer testes logo.","hours":2,"favorite":true}' http://localhost:3000/todo
    todo._id = new ObjectId();
    todo.createdAt = new Date();
    this.todoList.push(todo);
    return todo;
  }

  getTodoList(): Todo[] {
    return this.todoList;
  }

  filterTodoList(query): Todo[] {
    let filteredList: Todo[] = [...this.todoList];

    if (query.title)
      filteredList = this.todoList.filter((item) => item.title === query.title);

    if (query.hours)
      filteredList = this.todoList.filter(
        (item) => item.hours === Number(query.hours),
      );

    if (query.favorite)
      filteredList = this.todoList.filter(
        (item) => item.favorite === (query.favorite === 'true'),
      );

    return filteredList;
  }

  getTodo(_id: string): Todo {
    return this.todoList.find((item) => item._id.toString() === _id);
  }

  replaceTodo(_id: string, todo: Todo): Todo {
    // curl -X PUT -H "Content-Type: application/json" -d '{"title":"Fazer testes logo.", "hours":3}' http://localhost:3000/todo/65afd1ba117576194acd6630
    const index = this.todoList.findIndex(
      (item) => item._id.toString() === _id,
    );

    // https://docs.nestjs.com/exception-filters
    if (index === -1) throw new NotFoundException();

    todo._id = new ObjectId(_id);
    todo.createdAt = new Date();
    this.todoList[index] = todo;

    return this.todoList[index];
  }

  updateTodo(_id: string, todo: Todo): Todo {
    const index = this.todoList.findIndex(
      (item) => item._id.toString() === _id,
    );

    if (index === -1) throw new NotFoundException();

    if (todo.title) this.todoList[index].title = todo.title;
    if (todo.hours) this.todoList[index].hours = todo.hours;
    if (todo.favorite) this.todoList[index].favorite = todo.favorite;

    return this.todoList[index];
  }

  deleteTodo(_id: string): boolean {
    // curl -X DELETE http://localhost:3000/todo/65afcb9c496dea3a1eda20bb
    const index = this.todoList.findIndex(
      (item) => item._id.toString() === _id,
    );

    if (index === -1) throw new NotFoundException();

    this.todoList.splice(index, 1);
    return true;
  }
}
