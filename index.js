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
    tags: tags ? tags : []
  };

  todoList.push(todo);
};

/**
 * - ID를 기반으로 특정 할 일을 조회할 수 있다.
 *
 * @function readTodo
 * @param {string} id - 할 일 아이디 (undefined일 경우 모든 할 일을 조회)
 */
const readTodo = id => {
  const todo = todoList.find(todo => todo.id === id);

  if (!todo) new Error('');

  return todo;
};

/**
 * - 모든 할 일을 조회할 수 있다.
 *
 * @function readTodoList
 */

const readTodoList = () => {
  return todoList;
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

  const todoIndex = todoList.findIndex(todo => todo.id === todoData.id);

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
 * @param {number|undefined} params.tagIdx - 태그의 인덱스 번호로 삭제
 */

const deleteTodoTag = ({ id, tagIdx }) => {
  if (todoList.length < 1) return new Error('할 일 리스트가 없습니다.');

  const todoIndex = todoList.findIndex(todo => todo.id === id);

  if (todoIndex < 0) return;

  if (tagIdx === undefined) {
    todoList[todoIndex].tags = [];
    return;
  }

  todoList[todoIndex].tags?.splice(tagIdx, 1);
};
