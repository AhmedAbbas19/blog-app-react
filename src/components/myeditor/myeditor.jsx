import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./myeditor.css";
import { fetchCategories } from "../../actions/catActions";
import { addBlog, editBlog } from "../../actions/blogActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import joi from "joi-browser";
import { toast } from "react-toastify";

const MyEditor = (props) => {
  const initBlog = {
    tags: [],
    title: "",
    category: "",
  };

  const [blog, setBlog] = useState(initBlog);
  const [mode, setMode] = useState("add");
  const [blogBody, setBlogBody] = useState("");
  const [blogImage, setBlogImage] = useState("");

  useEffect(() => {
    props.fetchCategories();
    const id = props.match.params.id;
    if (id) {
      const _blog = props.blogs.find((b) => b._id === id);
      if (_blog) {
        setMode("edit");
        _blog.author = _blog.author._id;
        _blog.category = _blog.category._id;
        setBlog(_blog);
        setBlogBody(_blog.body);
      } else {
        toast.error("Invalid Process");
        props.history.push("/");
      }
    }
  }, []);

  const schema = {
    title: joi.string().required().min(10).max(70),
    body: joi.string().required().min(200),
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setBlog({ ...blog, body: blogBody });
    let _errors = joi.validate({ title: blog.title, body: blogBody }, schema)
      .error;
    if (_errors) {
      toast.error(_errors.details[0].message);
    } else {
      if (mode === "add") {
        blog.author = props.auth.activeUser._id;
        blog.body = blogBody;
        addBlog(blog, blogImage)
          .then((response) => {
            toast.success(response.data.message);
            props.history.push("/");
          })
          .catch((e) => {
            if (e.response) {
              toast.error(e.response.data.message);
            }
          });
      } else {
        editBlog(blog, blogImage)
          .then((response) => {
            toast.success(response.data.message);
            props.history.push("/");
          })
          .catch((e) => {
            if (e.response) {
              toast.error(e.response.data.message);
            }
          });
      }
    }
  };

  const changeHandler = ({ target }) => {
    let newBlog = { ...blog };
    newBlog[target.name] = target.value;
    setBlog(newBlog);
  };

  const addTagHandler = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      const value = e.target.value;
      let tags = [...blog.tags];
      e.target.value = "";
      tags.push(value);
      blog.tags = tags;
      setBlog({ ...blog });
    }
  };

  const imageChange = ({ target }) => {
    setBlogImage(target.files[0]);
  };

  const editorChange = (value) => {
    setBlogBody(value);
  };

  return (
    <div className="my-editor">
      <div className="editor-form">
        <form onSubmit={onSubmit}>
          <label htmlFor="title" className="label">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={blog.title}
            onChange={changeHandler}
          />

          <label className="label">Blog Content</label>
          <ReactQuill
            theme="snow"
            value={blogBody}
            name="body"
            onChange={editorChange}
          />

          <label htmlFor="category" className="label">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="form-control"
            value={blog.category || ""}
            onChange={changeHandler}
          >
            <option value="" disabled>
              Choose Category
            </option>
            {props.categories.map((cat) => (
              <option value={`${cat._id}`} key={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>

          <label htmlFor="tags" className="label">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            className="form-control"
            placeholder="press enter to add"
            onKeyPress={addTagHandler}
          />

          <div className="tags">
            {blog.tags.map((tag) => (
              <li className="tag" key={tag}>
                {tag}
              </li>
            ))}
          </div>
          <div className="thumbnail">
            <label className="label">Blog thumbnail</label>
            <input type="file" name="image" onChange={imageChange} />
          </div>
          <button className="btn">{mode === "add" ? "Post" : "Edit"}</button>
        </form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    blogs: state.blogs.hotItems.concat(state.blogs.latestItems),
    categories: state.categories.items,
    auth: state.auth,
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchCategories, addBlog, editBlog })(MyEditor)
);
