var STORAGE_KEY = 'todos-vuejs-demo';
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todos.forEach(function (todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

var app = new Vue({
  el: '#app',
  data: {
    msg: 'こんにちは Vue!',
    newTask: '',
    dueDate: '',
    todos: [],
    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '作業中' },
      { value: 1, label: '完了' },
      { value: 2, label: '未対応' }
    ],
    current: -1,
    labels: ['作業中', '完了', '未対応']
  },
  methods: {
    sayHello: function () {
      this.msg = 'Hello Vue!';
    },
    addTask: function () {
      var comment = this.$refs.comment;
      if (!this.newTask || !this.dueDate) return;

      this.todos.push({
        id: todoStorage.uid++,
        due: this.dueDate,
        comment: this.newTask,
        state: 2,
        isDone: false
      });

      this.newTask = '';
      this.dueDate = '';
      comment.value = '';
    },
    doChangeState: function (item) {
      item.state = item.state ? 0 : 1;
    },
    doRemove: function (item) {
      var index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
    },
    formatDate: function (dateStr) {
    const date = new Date(dateStr.replace(/-/g, '/')); // Safari対策で '/' に変換
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${month}/${day}`;
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  created: function () {
    this.todos = todoStorage.fetch();
  }
});
