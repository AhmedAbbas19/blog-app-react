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
import {
  makeStyles,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

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

  const imageChange = (target) => {
    setBlogImage(target[0]);
  };

  const editorChange = (value) => {
    setBlogBody(value);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    inputField: {
      width: "100%",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <div className="my-editor">
      <div className="editor-form">
        <form onSubmit={onSubmit}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  className={classes.inputField}
                  id="standard-required"
                  label="Blog Title"
                  name="title"
                  value={blog.title}
                  onChange={changeHandler}
                />
              </Grid>

              <ReactQuill
                theme="snow"
                value={blogBody}
                name="body"
                onChange={editorChange}
              />
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    className={classes.inputField}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="category"
                    value={blog.category || ""}
                    onChange={changeHandler}
                  >
                    <MenuItem value="" disabled>
                      Select Category
                    </MenuItem>
                    {props.categories.map((cat) => (
                      <MenuItem value={cat._id} key={cat._id}>
                        {cat.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.inputField}
                  label="Tags"
                  id="standard-tags"
                  name="tags"
                  onKeyPress={addTagHandler}
                />
                {blog.tags.map((tag) => (
                  <Chip label={tag} key={tag} style={{ margin: "4px" }} />
                ))}
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="thumbnail">Blog Image</InputLabel>
                <DropzoneArea
                  labelId="thumbnail"
                  name="image"
                  onChange={imageChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  type="submit"
                >
                  {mode === "add" ? "Save" : "Edit"}
                </Button>
              </Grid>
            </Grid>
          </div>
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
