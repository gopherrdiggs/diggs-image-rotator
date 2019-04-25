import { Component, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @State() currentImgUrl: string = '';
  @State() photographerName: string = '';

  homeElem: HTMLDivElement;

  async componentDidLoad() {

    this.homeElem = document.querySelector('#home');

    let pageNum = Math.floor((Math.random() * 1000) + 1);

    let getPhotoData = await fetch(
      `https://api.pexels.com/v1/search?query=nature&per_page=1&page=${pageNum}`, {
        method: 'GET',
        headers: {
          'Authorization': '563492ad6f91700001000001742f8c7015ce4bdbb2d419744dd8d9b7'
        }
      }
    );

    if (getPhotoData.ok) {
      let jsonData = await getPhotoData.json();
      this.currentImgUrl = jsonData.photos[0].src.original;
      console.log('this.currentImgUrl', this.currentImgUrl);
      this.photographerName = jsonData.photos[0].photographer;
      this.homeElem.style.setProperty('background-image', `url('${this.currentImgUrl}')`);
    }
  }

  render() {
    return (
      <div id='home' class='app-home'></div>
    );
  }
}
