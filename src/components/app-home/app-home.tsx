import { Component, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @State() imageData: any;
  @State() currentImgUrl: string = '';
  @State() photographerName: string = '';
  @State() showLandscape: boolean = true;

  homeElem: HTMLDivElement;

  async componentWillLoad() {

    try{
      this.showLandscape = localStorage.getItem('dir:orientation') === '1';
    }
    catch (error) {
      this.showLandscape = true;
    }
  }

  async componentDidLoad() {

    this.homeElem = document.querySelector('#home');

    let pageNum = Math.floor((Math.random() * 1000) + 1);

    let getPhotoData = await fetch(
      `https://api.pexels.com/v1/search?query=HD%20nature%20wallpaper%20-people%20-person&per_page=1&page=${pageNum}`, {
        method: 'GET',
        headers: {
          'Authorization': '563492ad6f91700001000001742f8c7015ce4bdbb2d419744dd8d9b7'
        }
      }
    );

    if (getPhotoData.ok) {
      this.imageData = await getPhotoData.json();
      this.currentImgUrl = this.showLandscape 
        ? this.imageData.photos[0].src.landscape 
        : this.imageData.photos[0].src.portrait;
      this.photographerName = this.imageData.photos[0].photographer;
      
      this.setBackgroundImage();      
    }
  }

  handleOrientationClick() {

    this.showLandscape = !this.showLandscape;
    this.setBackgroundImage();
    localStorage.setItem('dir:orientation', this.showLandscape ? '1' : '0');
  }

  setBackgroundImage() {
    this.currentImgUrl = this.showLandscape 
        ? this.imageData.photos[0].src.landscape 
        : this.imageData.photos[0].src.portrait;
    this.homeElem.style
      .setProperty('background-image', `url('${this.currentImgUrl}')`);
  }

  render() {
    return (
      <div id='home' class='app-home'>
        <div id='orientation' 
             class={this.showLandscape ? 'landscape' : 'portrait'}
             onClick={()=>this.handleOrientationClick()}>
        </div>
        <div id='photoInfo'>
          {this.photographerName} via Pexels.
        </div>
      </div>
    );
  }
}
