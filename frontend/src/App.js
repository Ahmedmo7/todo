import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import {Input, Label} from 'reactstrap';
const todoItems = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy Ingredients",
    completed: true,
  },
  {
    id: 2,
    title: "Study",
    description: "Math, Science",
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's Books",
    description: "Get sammy some books from the store",
    completed: true,
  },
  {
    id: 4,
    title: "Write Article",
    description: "Determine the specs for my article",
    completed: false,
  },
];



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
  }
}

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("api/todo/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if(item.id){
      axios.put(`api/todo/${item.id}/`, item).then((res) => this.refreshList());
      return;
    }

    axios.post("api/todo/",item).then((res)=>this.refreshList());

  };

  handleDelete = (item) => {
    axios
    .delete(`/api/todo/${item.id}/`)
    .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };


 // On Click Complete
  onClickComplete = (item)=>{
    if(item.completed){
      axios.put(`api/todo/${item.completed = true}/`, item).then((res) => this.refreshList());
      return this.setState({viewCompleted:true});
    }
    axios.post("api/todo/",item.completed = true).then((res)=>this.refreshList());

  }




  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed == viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          

        <button
            className="btn btn-success mr-2"
            onClick={() => this.onClickComplete(item)}
          >
            Complete
          </button>

          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>


        </span>
      </li>
    ));
  };

  render = () => {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button className="btn btn-primary" onClick={this.createItem}>
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  };
}

export default App;
