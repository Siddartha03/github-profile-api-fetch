import React, { Component } from "react";
import "./App.css";
import { Card, Button } from "antd";
import { connect } from "react-redux";
const { Meta } = Card;
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletepost: (id) => {
      dispatch({ type: "DELETE_POST", id: id });
    },
    addpost: (data) => {
      dispatch({ type: "ADD_POST", data: data });
    },
  };
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      val: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleDelete(id) {
    this.props.deletepost(id);
  }
  handleChange(e) {
    this.setState({ val: e.target.value });
  }
  handleAdd(e) {
    e.preventDefault();
    const data = {
      id: 5,
      title: "New Post is addes",
      description: "This is new description added after the add button",
    };
    fetch(`https://api.github.com/users/${this.state.val}`)
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        this.setState({ val: "" });
        this.props.addpost(user);
      });
  }
  
  render() {
    //console.log(this.props);
    const { posts} = this.props;
    return (
      <div className="container" style={{marginTop:'40px'}}>
        <div className="row">
          <div className="col-xs-12 col-md-4 col-md-offset-4">
            <form onSubmit={this.handleAdd}>
              <div className="form-group">
              <input
                className="form-control"
                placeholder="Search"
                value={this.state.val}
                onChange={this.handleChange}
              />
              </div>
              <div className="form-group">
              <button type="submit" className="btn btn-success form-control">
                Search
              </button>
              </div>
            </form>
          </div>
        </div>
        {posts.length <= 0 ? (
          <h2></h2>
        ) : (
  
          posts.map((item) => {
            return (
              <div className="col-xs-12 col-md-4" key={item.login}>
                <Card
                  hoverable
                  style={{ width: 340 ,marginBottom:20}}
                  cover={<img alt="example" src={item.avatar_url} />}
                >
                  <Meta title={item.html_url} />
                  <Meta title={`Followers- ${item.followers}`} />
                  <Meta
                    title={`Followings- ${item.following}`}
                    style={{ marginBottom: "20px" }}
                  />

                  <Button type="primary" danger href={item.html_url}>
                    View Profile
                  </Button>
                </Card>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
