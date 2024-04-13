import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps={
country:'in',
pageSize:8
  }
  static PropTypes={
country:PropTypes.string,
pageSize:PropTypes
  }
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=1faffd6f44cd4162a7b3cde9b81a5873&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults, loading:false
    });
  }
  handlePreClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=1faffd6f44cd4162a7b3cde9b81a5873&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);

    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading:false
    });
  };
  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=1faffd6f44cd4162a7b3cde9b81a5873&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedata = await data.json();
      console.log(parsedata);

      this.setState({
        page: this.state.page + 1,
        articles: parsedata.articles,
        loading:false
      });
    }
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitems
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={
                    element.description ? element.description.slice(0, 70) : ""
                  }
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
