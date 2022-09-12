import { TodoType, createTodo, readTodoList, updateTodo, deleteTodo, deleteTodoTag, readTodo } from '../scripts/api';
import { TodoInput } from './TodoInput';
import TodoList from './TodoList';
import { ModalTodo } from './ModalTodo';

import '../styles/index.css';

export default function Main(this: any, $main: HTMLElement) {
  if (!(this instanceof Main)) {
    throw new Error('Main가 생성자 함수가 아닙니다.');
  }

  let todoData: TodoType[] = readTodoList();

  const modalTodo = new (ModalTodo as any)({
    onSubmit: (e: Event) => {
      e.preventDefault();

      const categoryTarget = document.getElementById('updateCategorySelect') as HTMLSelectElement;
      const contentTarget = document.getElementById('updateInputContent') as HTMLTextAreaElement;
      const tagsTarget = document.getElementById('updateInputTags') as HTMLTextAreaElement;

      if (!contentTarget.value) return;

      const todoData = readTodo(modalTodo.todoId);

      if (todoData != undefined) {
        const todo = {
          id: modalTodo.todoId,
          content: contentTarget.value,
          isCompleted: false,
          category: categoryTarget.value,
          tags: tagsTarget.value
            .split(',')
            .filter(tag => tag.trim() != '')
            .map(tag => tag.trim())
        };

        todo.isCompleted = todoData?.isCompleted;
        updateTodo(todo);
      }

      todoComponent.setState();

      modalTodo.hide();
    },
    closeOnClick: () => {
      modalTodo.hide();
    }
  });

  new (TodoInput as any)({
    $main: $main,
    onClick: (e: Event) => {
      {
        e.preventDefault();

        const categoryTarget = document.getElementById('categorySelect') as HTMLSelectElement;
        const contentTarget = document.getElementById('inputContent') as HTMLTextAreaElement;
        const tagsTarget = document.getElementById('inputTags') as HTMLTextAreaElement;

        if (!contentTarget.value) return;

        const data = {
          content: contentTarget.value,
          category: categoryTarget.value,
          tags: tagsTarget.value
            .split(',')
            .filter(tag => tag.trim() != '')
            .map(tag => tag.trim())
        };

        createTodo(data);

        categoryTarget.value = 'category1';
        contentTarget.value = '';
        tagsTarget.value = '';

        todoComponent.setState();
      }
    }
  });

  const todoComponent = new (TodoList as any)({
    $main: $main,
    todoData: todoData,
    onClick: (e: Event) => {
      e.preventDefault();

      const target = e.target as HTMLElement;

      switch (target.className) {
        case 'deleteTagButton': {
          const $todoList = target.closest('#todoListWrapper > li') as HTMLElement;
          const todoId = $todoList.dataset.id ? $todoList.dataset.id : '';
          const tagId = target.closest('li')?.dataset.id;

          deleteTodoTag({ id: todoId, tagIdx: parseInt(tagId as string, 10) });
          break;
        }
        case 'updateTodoButton': {
          const $todoList = target.closest('#todoListWrapper > li') as HTMLElement;
          const todoId = $todoList.dataset.id ? $todoList.dataset.id : '';
          modalTodo.show(todoId);

          return;
        }
        case 'allTagRemove': {
          const $todoList = target.closest('#todoListWrapper > li') as HTMLElement;
          const todoId = $todoList.dataset.id ? $todoList.dataset.id : '';
          deleteTodoTag({ id: todoId });

          break;
        }
        case 'deleteTodoButton': {
          const $todoList = target.closest('#todoListWrapper > li') as HTMLElement;
          const todoId = $todoList.dataset.id ? $todoList.dataset.id : '';
          deleteTodo(todoId);

          break;
        }
      }

      if (target.nodeName === 'LABEL' || target.nodeName === 'INPUT') {
        const $todoList = target.closest('#todoListWrapper > li') as HTMLElement;
        const todoId = $todoList.dataset.id ? $todoList.dataset.id : '';

        const todoData = readTodo(todoId);

        if (todoData) {
          todoData.isCompleted = !todoData?.isCompleted;
          updateTodo(todoData);
        }
      }

      todoComponent.setState();
    },
    allRemoveOnClick: () => {
      deleteTodo();
      todoComponent.setState();
    }
  });
}
