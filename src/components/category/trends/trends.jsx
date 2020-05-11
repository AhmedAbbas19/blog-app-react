import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./trends.css";
import { connect } from "react-redux";
import { fetchCategories } from "../../../actions/catActions";
import { getBlogImageUrl } from "../../../actions/blogActions";

class Trends extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    const { categories } = this.props;
    if (!categories.length) {
      return (
        <div className="container text-center">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      );
    }
    return (
      <div className="trends">
        <div className="container">
          <h2 className="heading">Trends</h2>
        </div>
        <div className="categories">
          {categories.map((cat) => (
            <div className="category" key={cat._id}>
              <Link to={`/categories?title=${cat.title}`}>
                <img src={getBlogImageUrl(cat.image.data)} alt={cat.title} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.items,
  };
}
export default connect(mapStateToProps, { fetchCategories })(Trends);
