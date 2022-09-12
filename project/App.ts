import Main from './components/Main';

const $app = document.querySelector('.app');

function App(this: any, $app: HTMLElement) {
  this.$app = $app;

  const $headline1 = this.$app.appendChild(document.createElement('h1'));
  $headline1.innerText = '할 일 체크리스트';

  const $main = this.$app.appendChild(document.createElement('div'));
  $main.classList.add('main');

  new (Main as any)($main);
}

if ($app) {
  new (App as any)($app);
}
