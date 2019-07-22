import React, { Component } from 'react';

export default class UploadPhoto extends Component {
  render() {
    return (
      <div>
        <p>Загрузите фотографию товара</p>
        <form action="/upload" method="POST" encType="multipart/form-data">
          <input type="file" name="file" id="file" />
          <br/>
          <input type="submit" value="Отравить" />
        </form>
      </div>
    );
  }
}
