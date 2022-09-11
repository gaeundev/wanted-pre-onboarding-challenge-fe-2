export interface TodoType {
  id: string;
  content: string;
  isCompleted: boolean;
  category?: string;
  tags?: string[];
}

let todoList: TodoType[] = [];

export interface createParamsType {
  content: string;
  category: string;
  tags?: string[];
}

export const createTodo = ({ content, category, tags }: createParamsType) => {
  if (!content) return;

  const todo = {
    id: `todo_${todoList.length + 1}`,
    content: content.trim(),
    isCompleted: false,
    category: category,
    tags: tags ? tags : []
  };

  todoList.push(todo);
};

export const readTodo = (id: string) => {
  const todo = todoList.find(todo => todo.id === id);

  if (!todo) new Error('');

  return todo;
};

export const readTodoList = () => {
  return todoList;
};

export const updateTodo = (todoData: TodoType) => {
  if (todoList.length < 1) return new Error('할 일 리스트가 없습니다.');

  const todoIndex = todoList.findIndex(todo => todo.id === todoData.id);

  if (todoIndex < 0) return;

  todoList[todoIndex] = todoData;
};

export const deleteTodo = (id?: string) => {
  if (!id) {
    todoList = [];
    return;
  }

  if (todoList.length < 1) return new Error('할 일 리스트가 없습니다.');

  const todoIndex = todoList.findIndex(todo => todo.id === id);
  if (todoIndex < 0) return;

  todoList.splice(todoIndex, 1);
};

interface deleteTagParamsType {
  id: string;
  tagIdx?: number;
}

export const deleteTodoTag = ({ id, tagIdx }: deleteTagParamsType) => {
  if (todoList.length < 1) return new Error('할 일 리스트가 없습니다.');

  const todoIndex = todoList.findIndex(todo => todo.id === id);

  if (todoIndex < 0) return;

  if (tagIdx === undefined) {
    todoList[todoIndex].tags = [];
    return;
  }

  todoList[todoIndex].tags?.splice(tagIdx, 1);
};
