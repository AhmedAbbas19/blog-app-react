import React from "react";
import { Link } from "react-router-dom";
import "./trends.css";
import { connect } from "react-redux";
import { fetchCategories } from "../../../actions/catActions";
import { getBlogImageUrl } from "../../../actions/blogActions";
import { useEffect } from "react";
import { LinearProgress } from "@material-ui/core";

function Trends({ categories, fetchCategories }) {
  useEffect(() => {
    fetchCategories();
  }, []);

  if (!categories.length) {
    return <LinearProgress color="secondary" />;
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

function mapStateToProps(state) {
  return {
    categories: state.categories.items,
  };
}
export default connect(mapStateToProps, { fetchCategories })(Trends);
