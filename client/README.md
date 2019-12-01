# react_boilerplate

# commands

- install dependencies
  npm i

- start dev server
  npm start

- build project
  npm run build / yarn run build

# Build folder

- app

# Development folder

- src

  - app
    Contains the all routes of the app

  - assets

    - images
      where all your images go

    - stylesheets - main.css
      where all global css are placed like css thats generally used like header etc
        
       - normalize.css
      contains css resets

          -  skeleton.css
              contains basic styles for typography and other elements

  - components
    where all your react components kept

    - common
      basically where all your reusable react componnets are placed, and other things like json data, svg etc

  - contexts
    where all you state is initialzed and kept which uses the context api

    - Context.js
      sets up the state of the app, ideally thats where you would add your state ( inside the initialState const )

    - index.js
      exports funcs in useConnect.js

    - Provider
      initializes the state of the app

    - useConnect
      Provides a hook that makes available state to any components thats wrap by it

  - hook
    where all yoour reusable functions are placed, hooks etc

  - utils
    where you keep your extras like apis, actionTypes etc

  - index.html
    used by webpack to inject the development react code

  - index.js
    is the entry point and where react is intialized

  - sw
    is where all your service worker settings go
