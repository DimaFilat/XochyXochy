import React, { Component } from 'react';

export default class SearchBar extends Component {
  state = {
    usersEmail: [
      'o6jlako@mail.ru',
      'alestin@mail.ru',
      'rudolf@google.com',
      'somethings@mail.ru',
      'starangethigs@google.com',
      'americaneagle@mail.ru'
    ],
    suggestions: []
  };

  onTextChanged = e => {
    const { value } = e.target;
    const { usersEmail } = this.state;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = usersEmail.sort().filter(v => regex.test(v));
      this.setState({ suggestions, text: value });
      console.log(this.state);
    }

    this.setState({ suggestions, text: value });
  };

  suggestionSelected = value => {
    this.setState({ text: value, suggestions: [] });
  };

  handleKeyPress = value => {
    this.setState({ text: value, suggestions: [] });
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;
    if (suggestions.lenght === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item, key) => (
          <li>
            <a
              href="/"
              key={key}
              onClick={e => {
                e.preventDefault();
                this.suggestionSelected(item);
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    // const { usersEmail } = this.state;
    return (
      <div>
        <input
          value={this.state.text}
          onChange={this.onTextChanged}
          type="text"
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}
