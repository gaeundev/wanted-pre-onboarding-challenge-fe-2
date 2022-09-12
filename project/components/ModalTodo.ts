import { readTodo } from '../scripts/api';

interface ModalTodoProps {
  onSubmit: EventListener;
  closeOnClick: EventListener;
}

interface ModalTodoThis {
  todoId: string;
  render: Function;
  show: Function;
  hide: Function;
}

export function ModalTodo(this: ModalTodoThis, { onSubmit, closeOnClick }: ModalTodoProps) {
  const $body = document.body;
  const $modal = $body.appendChild(document.createElement('div'));
  $modal.classList.add('modal');

  this.todoId = '';

  this.render = () => {
    const todoData = readTodo(this.todoId);
    const tags = todoData?.tags?.join(',');

    $modal.innerHTML = `
    <div class="modalContent">
    <button class="modalCloseButton">X</button>
    <h2>할 일 수정</h2>
    <form id="updateForm">
    <select name="updateCategories" id="updateCategorySelect">
      <option value="category1" ${todoData?.category === 'category1' ? 'selected' : ''}>🟥 기본</option>
      <option value="category2" ${todoData?.category === 'category2' ? 'selected' : ''}>🟧 개발</option>
      <option value="category3" ${todoData?.category === 'category3' ? 'selected' : ''}>🟨 취미</option>
    </select>
    <input id="updateInputContent" type="text" placeholder="할 일을 입력해주세요." value=${todoData?.content} />
    <input id="updateInputTags" type="text" placeholder="태그를 입력해주세요. ','로 여러개를 입력할 수 있어요"
      value="${tags}" />
    <input class="updateTodoButton" type="submit" value="수정" />
    </form>
    </div>`;

    const $form = document.getElementById('updateForm');
    if ($form) $form.addEventListener('submit', onSubmit);

    const $modalClose = document.querySelector('.modalCloseButton');
    $modalClose?.addEventListener('click', closeOnClick);
  };

  this.show = (todoId: string) => {
    this.todoId = todoId;
    this.render();

    $modal.setAttribute('style', 'display:flex;');
  };

  this.hide = () => {
    $modal.innerHTML = '';
    $modal.setAttribute('style', 'display:none;');
  };

  this.hide();
}
