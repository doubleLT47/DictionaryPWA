
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {fetchLanguages} from './api/fetchApiLanguages.js'
import './App.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      language: 'en-vi',
      value: '',
      items: [],
      isFail: true
    } 

    this.handleClick = this.handleClick.bind(this);
    this.search = this.search.bind(this);
  }


  handleClick(e) {
    let isChecked = document.querySelector('.is-checked');

    ReactDOM.findDOMNode(isChecked).classList.remove('is-checked');
    e.target.classList.add('is-checked');
    this.setState({language: e.currentTarget.dataset.id})
    this.setState({items: []});
    
  }

  search = async (e) => {
    if (e.key === 'Enter') {
      const dataFromApi = await fetchLanguages(this.state.language, this.state.value);
      const data = this.state.language === 'en-vi' || this.state.language === 'vi-en' ? dataFromApi.sentences : dataFromApi.tratu;
      if(data.length === 0) {
        this.setState({isFail: false})
      }
      this.setState({items: data});
    }
  }
  setValue = () => {
    this.setState({value: this.values.value});
  }
  renderWords = (items, isFail) => {
    if (!isFail) {
      return (
        <h3 className="error-fetch">Không tìm thấy dữ liệu</h3>
      )
    }
    if (items.length !== 0) {
      if (this.state.language === 'en-vi' || this.state.language === 'vi-en') {
        return (
          <div className="meaning-content">  
            <table className="content-table">
              <tbody>
                  <tr>
                    <th>Example</th>
                    <th>Meaning</th>
                  </tr>
                  {items.map((item) => {
                    return (
                        <tr key={item._id}>
                          <td dangerouslySetInnerHTML={{__html: `${item.fields.en}`}} ></td>
                          <td dangerouslySetInnerHTML={{__html: `${item.fields.vi}`}} ></td>
                        </tr> 
                    )
                  })}
              </tbody>
            </table>
          </div>
        ) 
      }
      else {
        return (
          <div className="meaning-content">  
            <table className="content-table">
              <tbody>
                <tr>
                  <th>Example</th>
                </tr>
                {items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td dangerouslySetInnerHTML={{__html: `${item.fields.fulltext}`}} ></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) 
      }
    }
  }
  
  render() {
    var {items, isFail} =  this.state;

    return (
      <div className="main-container">
          <h1 className="app-title">Dictionary PWA</h1>
          <ul className="language">
            <li><button  data-id="en-vi" onClick={this.handleClick} className="language-options is-checked">Anh-Việt</button></li>
            <li><button  data-id="vi-en" onClick={this.handleClick} className="language-options">Việt-Anh</button></li>
            <li><button  data-id="fr-en-vi" onClick={this.handleClick} className="language-options">Pháp-Anh-Việt</button></li>
            <li><button  data-id="ja-en-vi" onClick={this.handleClick} className="language-options">Nhật-Anh-Việt</button></li>
          </ul>
          <input type="text" className="search" placeholder="Enter your text!" ref={(value) => {this.values = value}} onChange={this.setValue} onKeyPress={this.search}></input>
          {this.renderWords(items, isFail)}  
      </div>
    )
  }
  
}

export default App;
