# Find Dogs !!

For setup see the following part. For more detailed information about the project see the latter parts of the readme.

## Setup

### Import modules

You should first import the node modules that exists in the project, using `yarn` command in the terminal

### Start the project

Then you can start the project using the `yarn start` command in the terminal

### Run tests

To run tests, you can use `yarn test`

### Build

To build the project for production you can run `yarn build` to create a production build of the project

### More Details

More details regarding the commands themselves are in the following parts of the document

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Architecture

This project consists of following architectural layers:
- Providers
- Layouts
- Pages
- Controllers
- Components
- Styles
- Services
- Resources
- Utils

These layers mostly have a parental relationship (Pages -> Components), but some of the layers might have more than 1 parent layers (Styles -> Pages, Styles -> Components). You can check [here](https://www.apollographql.com/blog/apollo-client/architecture/client-side-architecture-basics/) to learn more about the inspiration of the current architecture of this project. The implementation used in this proect is inspired by a modern redesign of the *Model View Presenter* architecture.

### Providers

Providers are to manage relatively-global state. There are currently 2 providers, `DogProvider` and `ResponsiveProvider`.

### Layouts

Layouts are UI wrappers for pages. Layouts are places on top of `Route`s and they enable smooth transition between pages that needs the same layout.

### Pages

Controllers are the glues for controllers and the logical center of the app. The page components themselves should not contain business logic.
### Controllers

Controllers are the glues for components and the logical center of the app.

### Components 

Components are the atomic UI elements which are plug&play. Although exceptions happen in the case of being plug&play, such as requiring a `ResponsiveProvider` to be present on top of the component for some components.

### Styles

Styles is where all styling configurations and theming happens, the imported libraries such as Bulma is altered and imported in here. Styling will be described better in the following parts of the document.

### Services

Services are responsible for handling the business logic, being always in interaction with Controllers and Resources. Services can either direct a netwerk call to a Resource and return the result back, or they can handle non-network related local operations such as processing files. The errors in Resources are always handled in the Services layer.

### Resources

Resources are the gateway to the network of the app, the api calls are always made in the Resources layer. The errors in Resources are always handled in the Services layer.

### Utils

Utils are simple functions that might be better to put in a separate folder and use anywhere.

## Styling

Styling is done using `Sass` and `Bulma`. This enables a modular approach to styling. 'styles' folder consists of 2 main parts:

- modular
- root

### Modular

'modular' part is where the necessary pieces of bulma are imported modularly (that is one of the good sides of bulma, modularity), and than altered according to the project's needs, and then these modular custom files can be imported from Components, so that each component gets what it needs, not more, not less.

### Root

'root' part is where almost all the app-related customizations are done (some modular customizations are also done in 'modular'). The mixins, functions, and variables are all in their own files and they should be imported from the main file. This main file then can be imported from anywhere and that would enable the file that imports main file to be able to use the app styles.

### Grid

The app is based on a 4px grid. This grid should be used everyhere, and that can be easily referenced by using `$cpx($num)` with the number of 4px needed to be put as `$num`. The declaration of `$cpx()` is under [_functions.sass](src/styles/_functions.sass).

### Style.module.sass

Sass modules are used for purposes other than theming. Which means whenever some stylings are needed either in a component or a page, sass modules should be used as much as it can be.

## Specific Libraries Used

`Sass` and `Bulma` are used for handling designs, `React Testing Library` is used for testing

### Sass & Bulma

Sass is used for preventing CSS boilerplate and be able to have a structure in styling. Bulma is used for its modularity and light-weighted structure. Bulma is highly configurable, and well documented, Bulma only includes styling and it is a very good candidate for writing such projects. [Sass docs](https://sass-lang.com/guide) & [Bulma docs](https://bulma.io/documentation/)

### Mobilenet

We use `mobilenet` model (@tensorflow-models/mobilenet) to process images. Because `mobilenet` is very mobile compatible, and it works very nice for image processing purposes. We use `WebGL` engine to enable hardware acceleration for `mobilenet`, `WebGL` is faster than `wasm` in our case. [Mobilenet docs](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet)

### React Testing Library (RTL)

React testing library is more usable than Enzyme, more react focused than jest (yeah it works **with** jest but still), and it has a strong community and a strong contributor. [RTL docs](https://testing-library.com/docs/react-testing-library/intro/)

## Testing

Testing is done using `jest` and `react-testing-library` together. This enables better testing for React components. Also, `jest-electron` is being used in the background too. The reason for this choice is to have a more browser-like environment, which provides the following benefits:

- We can test the lazy load behaviour correctly
- We can test using `WebGL` engine for `mobilenet`, which is 2-4 times faster than `wasm` in `mobilenet` model.

Current errors regarding:
```
Warning: render(): Rendering components directly into document.body is discouraged
```
which can be seen in the testing terminal are expected. For some cases the test components need to be launched in `document.body`, so we can test the components that are created with `ReactDOM.createPortal` such as `FullPageLoader`. There is also another solution using `renderIntoDocument`, however it requires other libraries to be included in the test file as well, see the full discussion [here](https://github.com/testing-library/react-testing-library/issues/62).