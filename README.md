# 할 일 체크리스트 API docs

## 프로젝트 개요

프리온보딩 프론트엔드 챌린지 9월(TypeScript) 참여 과제

작성자 : 이가은

### 할 일 체크리스트 실행 결과

<img src="./images/todo_example.jpg" width="80%" />

### 할 일 체크리스트 실행방법

```shell
$ npm ci
$ npm run build
```

이후 live-server 를 사용해서 실행

### JSDoc 작성

https://gaeundev.github.io/wanted-pre-onboarding-challenge-fe-2/out/index.html

## Members

### [todoList](global.html#todoList)

## Methods

### [CREATE](global.html#createTodo)

### [READ](global.html#readTodo)

### [READ LIST](global.html#readTodoList)

### [UPDATE](global.html#multiplication)

### [DELETE (할 일)](global.html#updateTodo)

### [DELETE (할 일의 태그)](global.html#deleteTodoTag)

## Type Definitions

### [Todo](global.html#Todo)

## 라이브 코드 리뷰

### 2022-09-12 (월)

- 만약 createTodo에서 todo를 리턴한다면 return 타입에 isCompleted를 boolean 보다는 false로 지정해주어 작성하면 좀 더 타입스크립트를 쓰는 의미가 있을 것이다.
- TodoType 이라는 이름은 interface가 이미 예약어와 같으므로 Todo라고 해주는 것이 좋다.
- TodoType에서 선언한 것을 좀 더 활용하면 좋을 것 같다. extends나 타입을 제외하는 util들이 있다. (omit 등..)
- createElement해서 appendChild하는거 말고, append 하는 방법도 있다. 속성을 정해주는 부분을 정리해주면 좋을 것 같다.
- 타입 중에 Function, EventListner, Event, HTMLElement ..는 any와 다를바 없으므로 typescript를 좀 더 공부하면서 수정해 갔으면 좋겠다.
- 이벤트에 등록하는 함수명은 함수가 어떤 동작을 하는 함수인지 명확한 것이 알기 쉬워 보인다.
- != 보다는 !== 사용을 지향하자 (eslint설정 => eqeqeq)
- switch case 문에는 default 넣어서 꼭 방어코드를 해주어야 한다.
- css는 최대한 inline으로 넣지말고, class로 제어하도록 하자! 협업할 때 더 유용하다.
- 컬러 코드는 constant로 빼서 관리하는 것이 좋다. css로 빼는 것도 염두하기.
- ModalTodo의 show의 기능이 조금 애매하다는 생각이 든다. todoId도 받고, style도 inline으로 넣고... 어떻게 수정해야할지 고민해서 수정해보면 좋을 것 같다.
