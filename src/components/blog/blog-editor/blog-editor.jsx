import React, { Component } from "react";
import MyEditor from "../../myeditor/myeditor";
import "./blog-editor.css";

export default class BlogEditor extends Component {
  render() {
    return (
      <section className="blog-editor">
        <div className="container">
          <MyEditor />
        </div>
      </section>
    );
  }
}
