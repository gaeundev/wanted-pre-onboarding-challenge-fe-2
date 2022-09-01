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
 * - 할 일을 추가할 수 있다.
 * - 내용없이 추가할 수 없다.
 *
 * @function createTodo
 * @param {Object} params
 * @param {string} params.content - 추가할 내용
 * @param {string} params.category - 카테고리
 * @param {string[]|undefined} params.tags - 태그들
 */
const createTodo = ({ content, category, tags }) => {};

/**
 * - 모든 할 일을 조회할 수 있다.
 * - ID를 기반으로 특정 할 일을 조회할 수 있다.
 *
 * @function readTodo
 * @param {string|undefined} id - 할 일 아이디 (undefined일 경우 모든 할 일을 조회)
 */
const readTodo = id => {};

/**
 * - ID를 제외한 모든 속성을 수정할 수 있다.
 * - 특정 할 일의 특정 태그를 수정할 수 있다.
 *
 * @function updateTodo
 * @param {Todo} todoData
 */

const updateTodo = todoData => {};

/**
 * - ID를 기반으로 특정 할 일을 삭제할 수 있다.
 * - 모든 할 일을 제거할 수 있다.
 *
 * @function deleteTodo
 * @param {string|undefined} id - 할 일 아이디 (undefined일 경우 모든 할 일 삭제)
 *
 *
 */

const deleteTodo = id => {};

/**
 * - 특정 할 일의 특정 태그를 삭제할 수 있다.
 * - 특정 할 일의 모든 태그를 제거할 수 있다.
 *
 * @function deleteTodoTag
 * @param {Object} params
 * @param {string} params.id - 할 일 아이디
 * @param {string|undefined} params.tag - 태그 (undefined일 경우 모든 태그 삭제)
 */

const deleteTodoTag = ({ id, tag }) => {};
