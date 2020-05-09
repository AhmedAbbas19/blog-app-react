import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./myeditor.css";
import { fetchCategories } from "../../actions/catActions";
import { addBlog } from "../../actions/blogActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ImageUploader from "react-images-upload";
import joi from "joi-browser";
import { toast } from "react-toastify";

const MyEditor = (props) => {
  const { quill, quillRef } = useQuill();

  const initBlog = {
    title: "",
    body: "",
    tags: [],
    category: "",
    imageUrl: "",
  };

  const [blog, setBlog] = useState(initBlog);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    props.fetchCategories();
  }, []);

  const schema = {
    title: joi.string().required().min(10).max(70),
    body: joi.string().required().min(200),
    category: joi.string().required(),
    author: joi.string().required(),
    tags: joi.array().items(joi.string()).optional(),
    imageUrl: joi.string().valid("").optional(),
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    blog.body = quill.container.firstChild.innerHTML;
    blog.author = "5eaeada198429795182d92ac";
    let _errors = joi.validate(blog, schema).error;
    if (_errors) {
      toast.error(_errors.details[0].message);
    } else {
      try {
        const response = await addBlog(blog);
        toast.info(response.data.message);
        props.history.push("/home");
      } catch (e) {
        if (e.response) {
          toast.info(e.response.data.message);
        }
      }
    }
  };

  const changeHandler = ({ target }) => {
    let newBlog = { ...blog };
    newBlog[target.name] = target.value;
    let _errors = { ...errors, [target.name]: "" };
    let error = validateInput(target).error;
    if (error) {
      _errors[target.name] = error.details[0].message;
    }
    setErrors(_errors);
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

  const onDrop = (picture) => {
    console.log(picture[0].name);
    let newBlog = { ...blog };
    newBlog.imageUrl = `/imgs/${picture[0].name}`;
    setBlog(newBlog);
  };

  const validateInput = (target) => {
    const inputSchema = { [target.name]: schema[target.name] };
    const input = { [target.name]: target.value };
    return joi.validate(input, inputSchema);
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
          <div ref={quillRef} />

          <label htmlFor="category" className="label">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="form-control"
            value={blog.category}
            onChange={changeHandler}
          >
            <option value="" disabled>
              Choose Category
            </option>
            {props.categories.map((cat) => (
              <option value={cat._id} key={cat._id}>
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
          <button className="btn">Post</button>
        </form>
      </div>
      <div className="thumbnail">
        <label className="label">Blog thumbnail</label>
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
          maxFileSize={5242880}
          style={{ backgroungImage: `url('${blog.imageUrl}')` }}
        />

        <img src={blog.imageUrl} alt="" />
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    categories: state.categories.items,
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchCategories, addBlog })(MyEditor)
);
