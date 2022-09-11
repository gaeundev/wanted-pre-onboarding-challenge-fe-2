import { TodoType, readTodoList } from '../scripts/api';

interface TodoListProps {
  $main: HTMLElement;
  todoData: TodoType[];
  onClick: EventListener;
  allRemoveOnClick: EventListener;
}

interface TodoListThis {
  state: TodoType[];
  render: Function;
  setState: Function;
}

export default function TodoList(this: TodoListThis, { $main, todoData, onClick, allRemoveOnClick }: TodoListProps) {
  if (!(this instanceof TodoList)) {
    throw new Error('TodoList가 생성자 함수가 아닙니다.');
  }

  this.state = todoData;

  const $todo = $main.appendChild(document.createElement('div'));
  $todo.classList.add('todo');

  const $allRemoveButton = $todo.appendChild(document.createElement('button'));
  $allRemoveButton.innerText = '전체 삭제';
  $allRemoveButton.classList.add('allRemoveBtn');
  $allRemoveButton.addEventListener('click', allRemoveOnClick);

  const $todoListWrapper = $todo.appendChild(document.createElement('ul'));
  $todoListWrapper.id = 'todoListWrapper';

  $todoListWrapper.addEventListener('click', onClick);

  this.render = () => {
    const todoData = this.state;
    console.log(todoData);
    if (todoData.length > 0) {
      $allRemoveButton.setAttribute('style', 'display:block;');
    } else {
      $allRemoveButton.setAttribute('style', 'display:none;');
    }

    const $todoList = todoData
      .map(todo => {
        const tags = todo.tags ? todo.tags : [];

        const tagList = tags
          .map((tag, tagIdx) => `<li data-id=${tagIdx}>${tag}<button class="deleteTagButton">x</button></li>`)
          .join('');

        const categoryColor =
          todo.category === '카테고리3' ? '#ffec3d' : todo.category === '카테고리2' ? '#ffc23d' : '#ff3939';

        return `<li class="todoList" data-id=${todo.id}>
        <span style="background-color:${categoryColor}"></span>
        <button class="deleteTodoButton">삭제</button>
        <button class="updateTodoButton">수정</button>
        <input type="checkbox" id=${todo.id} ${todo.isCompleted ? 'checked' : ''} />
        <label for=${todo.id} >${todo.content}</label>
        ${
          tags && tags.length > 0
            ? `<div class="tagWrapper"><button class="allTagRemove">태그 전부 삭제</button><ul class="tags">${tagList}</ul></div>`
            : ''
        }
        </li>`;
      })
      .join('');

    $todoListWrapper.innerHTML = $todoList;
  };

  this.setState = () => {
    this.state = readTodoList();
    this.render();
  };

  this.render();
}
