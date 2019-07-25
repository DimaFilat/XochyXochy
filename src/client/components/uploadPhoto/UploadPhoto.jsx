import React, { Component } from 'react';

export default class UploadPhoto extends Component {
  state = {
    file: '',
    imagePreviewUrl: '',
    imageLoaded: false
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { file } = this.state;

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
      method: 'POST',
      body: formData
    });
    this.setState({ imageLoaded: true });
  };

  handleImageChange(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imageLoaded, imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          alt=""
          style={{ maxWidth: '120px', maxHeight: '120px'}}
        />
      );
    } else {
      $imagePreview = (
        <div className="previewText" style={{ color: 'grey' }}>
          Please select an Image for Preview
        </div>
      );
    }
    let page;
    if (!imageLoaded) {
      page = (
        <React.Fragment>
          <div className="previewComponent">
            <form
              action="/upload"
              method="POST"
              encType="multipart/form-data"
              onSubmit={e => this.handleSubmit(e)}
            >
              <input
                className="fileInput"
                type="file"
                onChange={e => this.handleImageChange(e)}
                name="file"
                id="file"
              />
              <input
                className="submitButton"
                type="submit"
                onClick={e => this.handleSubmit(e)}
                value="Отравить"
              />
            </form>
            <div className="imgPreview">{$imagePreview}</div>
          </div>
        </React.Fragment>
      );
    } else {
      page = (
        <React.Fragment>
          <p>Спасибо, фотография загружена</p>
        </React.Fragment>
      );
    }

    return page;
  }
}
