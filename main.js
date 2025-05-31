
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

var app = new Vue({
  el: '#app',
  data: {
    todos: [],
    options: [
      { value: -1, label: 'すべて' },
      { value: 0,  label: '作業中' },
      { value: 1,  label: '完了' }
    ],
    current: -1,
    dueDate: ''  // 期日がある場合これも必要
  },
  methods: {
    addTask: function () {
      var comment = this.$refs.comment;
      if (comment.value === '') return;

      this.todos.push({
        due: this.dueDate,
        comment: comment.value,
        state: 0,
        isDone: false
      });
      comment.value = '';
      this.dueDate = '';
    },
    doChangeState: function (item) {
      item.state = item.state ? 0 : 1;
    },
    doRemove: function (item) {
      var index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
    }
  },
  mounted() {
    // 初期化処理がある場合
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  created() {
    this.todos = todoStorage.fetch();
  }
});