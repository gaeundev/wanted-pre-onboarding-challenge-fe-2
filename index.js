// @ts-check

/* Todo {
  아이디(required),
  내용(required),
  완료여부(required),
  카테고리(required),
  태그들(optional),
} */

/**
 * 할 일
 * @typedef {Object} Todo
 * @property {string} id - 아이디
 * @property {string} content - 내용
 * @property {boolean} isCompleted - 완료 여부
 * @property {string} category - 카테고리
 * @property {string[]|undefined} tags - 태그들
 */

/**
 * 할 일 목록
 * @type {Todo[]}
 */

let todoList = [];

/**
 * - 할 일을 추가할 수 있다.
 * - 내용없이 추가할 수 없다.
 *
 * @function createTodo
 * @param {Object} params
 * @param {string} params.content - 추가할 내용
 * @param {string} params.category - 카테고리
 * @param {string[]|undefined} params.tags - 태그들
 */
const createTodo = ({ content, category, tags }) => {
  if (!content) return;

  const todo = {
    id: `todo_${todoList.length}`,
    content: content.trim(),
    isCompleted: false,
    category: category,
    tags: tags
  };

  todoList.push(todo);
};

/**
 * - 모든 할 일을 조회할 수 있다.
 * - ID를 기반으로 특정 할 일을 조회할 수 있다.
 *
 * @function readTodo
 * @param {string|undefined} id - 할 일 아이디 (undefined일 경우 모든 할 일을 조회)
 */
const readTodo = id => {
  if (!id) return todoList;

  return todoList.filter(value => value.id === id);
};

/**
 * - ID를 제외한 모든 속성을 수정할 수 있다.
 * - 특정 할 일의 특정 태그를 수정할 수 있다.
 *
 * @function updateTodo
 * @param {Todo} todoData
 */

// 기존 데이터에서 수정된 데이터를 그대로 param에 전달
const updateTodo = todoData => {
  if (todoList.length < 1) return new Error('할 일 리스트가 없습니다.');

  const todoIndex = todoList.findIndex(value => value.id === todoData.id);

  if (todoIndex < 0) return;

  todoList[todoIndex] = todoData;
};

/**
 * - ID를 기반으로 특정 할 일을 삭제할 수 있다.
 * - 모든 할 일을 제거할 수 있다.
 *
 * @function deleteTodo
 * @param {string|undefined} id - 할 일 아이디 (undefined일 경우 모든 할 일 삭제)
 *
 *
 */

const deleteTodo = id => {
  if (!id) {
    todoList = [];
    return;
  }

  if (todoList.length < 1) return new Error('할 일 리스트가 없습니다.');

  const todoIndex = todoList.findIndex(value => value.id === id);
  if (todoIndex < 0) return;

  todoList.splice(todoIndex, 1);
};

/**
 * - 특정 할 일의 특정 태그를 삭제할 수 있다.
 * - 특정 할 일의 모든 태그를 제거할 수 있다.
 *
 * @function deleteTodoTag
 * @param {Object} params
 * @param {string} params.id - 할 일 아이디
 * @param {string|undefined} params.tag - 태그 (undefined일 경우 모든 태그 삭제)
 */

const deleteTodoTag = ({ id, tag }) => {
  if (todoList.length < 1) return new Error('할 일 리스트가 없습니다.');

  const todoIndex = todoList.findIndex(value => value.id === id);

  if (todoIndex < 0) return;

  if (!tag) {
    todoList[todoIndex].tags = [];
    return;
  }

  const tags = todoList[todoIndex].tags;

  if (!tags) return;

  // ! 일관적이지 못한 프로세스 발견
  // update에서는 '기존+수정된' 내용 전체를 한 번에 업데이트 하도록 했는데
  // tag는 개별적으로 삭제하도록 만듬
  // 동일한 프로세스를 가져가려면 tags 자체를 param으로 넘겨 받았어야 함
  const tagIndex = tags.findIndex(value => value === tag);
  tags.splice(tagIndex, 1);

  todoList[todoIndex].tags = tags;
};

/* 함수 실행 테스트 */
const main = () => {
  const $main = document.querySelector('.main');

  if (!$main) return;

  let text = '';

  text += `<h1>함수 실행 결과</h1>`;
  /*  createTodo 함수 실행 */
  createTodo({ content: 'gbhm', category: '카테1', tags: ['a', 'b', 'c', 'd'] });
  createTodo({ content: 'gbdqw', category: '카테2', tags: ['a12', 'gb', 'bcc', 'dgd'] });
  createTodo({ content: 'gbqw', category: '카테2', tags: ['a', 'bff', 'aac', 'vxcd'] });
  createTodo({ content: 'bbsdg', category: '카테3', tags: ['qwea', 'gcb', 'cvc', 'bbd'] });
  createTodo({ content: '', category: '카테1', tags: ['awea', 'asdb', 'xcvc', 'dasd'] });

  /*  readTodo 함수 실행 */
  let todoData = readTodo(undefined); // undefined를 써줘야하네..?
  text += `<h2>추가한 모든 할 일 조회</h2>`;
  text += JSON.stringify(todoData);

  // 사실상 배열로 리턴할 필요가 없는 것이기 때문에 함수를 분리해서 쓰면 좋았을 듯
  todoData = readTodo('todo_0');

  text += `<h2>id 기반 할 일 조회</h2>`;
  text += JSON.stringify(todoData);

  /* updateTodo 함수 실행 */
  updateTodo({
    id: 'todo_0',
    content: 'gbhm_update',
    isCompleted: true,
    category: '카테2',
    tags: ['a', 'bb', 'c', 'd']
  });

  // 수정된 데이터 확인
  todoData = readTodo('todo_0');
  text += `<h2>id를 제외한 모든 속성 수정</h2>`;
  text += JSON.stringify(todoData);

  updateTodo({ id: 'todo_0', content: 'gbhm', isCompleted: true, category: '카테1', tags: ['ab', 'bc', 'cd', 'de'] });

  // 수정된 데이터 확인
  todoData = readTodo('todo_0');

  text += `<h2>특정 할 일의 특정 태그를 수정</h2>`;
  text += JSON.stringify(todoData);

  /* deleteTodo 함수 실행 */

  deleteTodoTag({ id: 'todo_0', tag: 'bc' });
  todoData = readTodo('todo_0');

  text += `<h2>특정 할 일의 특정 태그 삭제</h2>`;
  text += JSON.stringify(todoData);

  deleteTodoTag({ id: 'todo_1', tag: undefined });
  todoData = readTodo('todo_1');

  text += `<h2>특정 할 일의 모든 태그 삭제</h2>`;
  text += JSON.stringify(todoData);

  // 특정 할 일 제거
  deleteTodo('todo_1');
  todoData = readTodo(undefined);
  text += `<h2>특정 할 일 삭제</h2>`;
  text += JSON.stringify(todoData);

  // 모든 할 일 제거
  deleteTodo(undefined);
  todoData = readTodo(undefined);
  text += `<h2>모든 할 일 삭제</h2>`;
  text += JSON.stringify(todoData);

  $main.innerHTML = text;
};

main();
