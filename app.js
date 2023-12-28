const App = new Vue({
  el: "#app",
  data: {
    tareas: [],
    nuevaTarea: "",
    editarTarea: "",
    indexEditar: null,
    buscar: "",
  },
  created() {
    fetch("tareas.json")
      .then(res => res.json())
      .then(data => this.tareas = data)
  },
  watch: {
    buscar: function (val) {
      this.buscar = val.charAt(0).toUpperCase() + val.slice(1);
    },
    editarTarea: function (val) {
      this.editarTarea = val.charAt(0).toUpperCase() + val.slice(1);
    },
    nuevaTarea: function (val) {
      this.nuevaTarea = val.charAt(0).toUpperCase() + val.slice(1);
    }
  },
  directives: {
    autofocus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  methods: {
    buscador() {
      return this.tareas.filter(tarea => tarea.name.toLowerCase().includes(this.buscar.toLowerCase()))
    },
    cantidad(estados) {
      let cantPendientes = []
      this.tareas.forEach(tarea => !tarea.completed && cantPendientes.push(tarea))
      return estados ? cantPendientes.length : this.tareas.length - cantPendientes.length
    },
    crear() {
      this.tareas.push({ name: this.nuevaTarea, completed: false })
      this.nuevaTarea = ""
    },
    editar() {
      this.tareas.forEach((tarea, i) => {
        i == this.indexEditar && (tarea.name = this.editarTarea)
      })
      this.editarTarea = ""
      this.indexEditar = null
    },
    iniciarEdicion(index) {
      console.log(index)
      this.indexEditar = index
      
      this.tareas.forEach((tarea, i) => {
        i == index && (this.editarTarea = tarea.name)
      })
    },
    completar(index) {
      this.tareas[index].completed = true
    },
    restaurar(index) {
      this.tareas[index].completed = false
    },
    eliminar(index) {
      this.tareas.splice(index, 1)
    },
  },
})
