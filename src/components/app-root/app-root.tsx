import { Component } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  configureRoutes() {
    return [
      <stencil-router>
        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route url='/' component='app-home' exact={true} />
        </stencil-route-switch>
      </stencil-router>
    ];
  }

  render() {
    return (
      <div>
        { this.configureRoutes() }
        <main></main>
      </div>
    );
  }
}
