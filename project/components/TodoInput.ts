interface TodoInputProps {
  $main: HTMLElement;
  onClick: EventListener;
}

interface TodoInputThis {
  render: Function;
}

export function TodoInput(this: TodoInputThis, { $main, onClick }: TodoInputProps) {
  if (!(this instanceof TodoInput)) {
    throw new Error('TodoInput이 생성자 함수가 아닙니다.');
  }

  this.render = () => {
    const $toodInput = $main.appendChild(document.createElement('form'));
    $toodInput.innerHTML = `
      <select name="categories" id="categorySelect">
      <option value="category1" selected>🟥 기본</option>
      <option value="category2">🟧 개발</option>
      <option value="category3">🟨 취미</option>
      </select>
      <input id="inputContent" type="text" placeholder="할 일을 입력해주세요." maxlength="30" />
      <input id="inputTags" type="text" placeholder="태그를 입력해주세요. ','로 여러개를 입력할 수 있어요 " />
      <input class="createTodoButton" type="submit" value="저장" />`;

    $toodInput.addEventListener('submit', onClick);
  };

  this.render();
}
