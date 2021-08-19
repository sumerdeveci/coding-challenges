# Simple Checkout Form

See the parts after `Setup` for more detailed information about the project.

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

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Architecture

This project consists of following architectural layers:
- Providers
- Layouts
- Pages
- Components
- Styles
- Utils

These layers mostly have a parental relationship (Pages -> Components), but some of the layers might have more than 1 parent layers (Styles -> Pages, Styles -> Components)

### Providers

Providers wrap everything, and they only consist of 1 provider, which is the `CheckoutFormProvider`.

### Layouts

Layouts are UI wrappers for pages. Layouts are places on top of `Route`s and they enable smooth transition between pages that needs the same layout.

### Pages

Pages are the glues for components and the logical center of the app. Ideally pages can be separated into following to have a more structured design:

- Controllers (Logical center and glue for components)
- Pages (Glue for controllers)

But it is not needed for this project, if the projejct gets complex, it can be considered.

### Components 

Components are the atomic UI elements which are plug&play.

### Styles

Styles is where all styling configurations and theming happens, the imported libraries such as Bulma is altered and imported in here.

### Utils

Utils are simple functions that might be better to put in a separate folder and use anywhere

## Styling

Styling is done using `Sass` and `Bulma`. This enables a modular approach to styling. 'styles' folder consists of 2 main parts:

### Folder Structure

- root
- modular

'modular' part is where the necessary pieces of bulma are imported modularly (that is one of the good sides of bulma, modularity), and than altered according to the project's needs, and then these modular custom files can be imported from Components, so that each component gets what it needs, not more, not less.

'root' part is where almost all the app related customizations are done (some modular customizations are also done in 'modular'). The mixins, functions, and variables are all in their own files and they should be imported from the main file. This main file then can be imported from anywhere and that would enable the file that imports main file to be able to use the app styles.

### Grid

The app is based on a 4px grid. This grid should be used everyhere, and that can be easily referenced by using `$cpx($num)` with the number of 4px needed to be put as `$num`. The declaration of `$cpx()` is under [_functions.sass](src/styless/_functions.sass).

### Style.module.sass

Sass modules are used for purposes other than theming. Which means whenever some stylings are needed either in a component or a page, sass modules should be used as much as it can be.

## Specific Libraries Used

`Formik` is used for handling forms, `Sass` and `Bulma` are used for handling designs, `React Testing Library` is used for testing

### Formik

Formik is selected because the proejct does not need a very complex form structure, and Formik provides a light-weight form structure, easy to use, easy to debug. [Formik docs](https://formik.org/docs/overview)

### Sass & Bulma

Sass is used for preventing CSS boilerplate and be able to have a structure in styling. Bulma is used for its modularity and light-weighted structure. Bulma is highly configurable, and well documented, Bulma only includes styling and it is a very good candidate for writing such projects. [Sass docs](https://sass-lang.com/guide) & [Bulma docs](https://bulma.io/documentation/)

### React Testing Library (RTL)

React testing library is more usable than Enzyme, more react focused than jest (yeah it works **with** jest but still), and it has a strong community and a strong contributor. [RTL docs](https://testing-library.com/docs/react-testing-library/intro/)