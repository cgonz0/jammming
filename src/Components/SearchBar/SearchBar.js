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
    const search = event.target.value;
    sessionStorage.setItem('search', search); // store the current search term to local storage
    this.setState({search: search});
  }

  handleEnterKeyPress = event => {
    let searchTerm = this.state.search
    if (event.key === 'Enter') {
      this.props.onSearch(searchTerm);
    }
  }

  componentWillMount() { // set the previous search term in the state, if it exists in sessionStorage
    let search = sessionStorage.getItem('search');
    if (search) {
        this.setState({ search: search })
    }
  }

  render() {
    return(
      <div className="SearchBar">
        <input onKeyPress={this.handleEnterKeyPress} onChange={this.handleTermChange} value={this.state.search} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;