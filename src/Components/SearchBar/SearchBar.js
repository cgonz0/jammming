import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      search: ''
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(){
    let searchTerm = this.state.search
    this.props.onSearch(searchTerm);
  }

  handleTermChange(event){
    this.setState({search: event.target.value});
  }

  handleEnterKeyPress = event => {
    let searchTerm = this.state.search
    if (event.key === 'Enter') {
      this.props.onSearch(searchTerm);
    }
  }

  render() {
    return(
      <div className="SearchBar">
        <input onKeyPress={this.handleEnterKeyPress} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;