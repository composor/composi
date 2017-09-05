Composi
========

Composi is a framework for creating desktop and mobile apps. With Composi you can create a dynamic website with reactive components, a progressive web app, or a hybrid app for mobile app stores.

Composi is small. The core is only 3KB gzipped. It therefore loads fast. Its virtual DOM updates components efficiently and quickly. 

Components can be stateless or stateful. Stateful components are reactive. When you change a component's state, that triggers the component's render function. This creates a new virtual DOM based on the data changes. It then patches the DOM to match the changes. If there are no changes, nothing will happen.

A component's markup is written with JSX. This means you can create custom tags to organize your component's template. You can also pass props to a component tag. If you prefer, you can instead use the h function to define the component's markup with hyperscript. Actually, at render time the JSX is converted to this.

Composi also provides synthetic events and virtual stylesheets scoped to the component.

Browser Support
---------------

Composi is compatible with browsers back to IE 9 on Windows 7.

Installation
-------------

To install Composi, you'll need to have [Nodejs](https://nodejs.org/en/) installed. Open your terminal and run:

```sh
npm run i -D composi
```

Create a New Project
--------------------
After installing Composi, you can use it to create a new project. The simplest way to do this is to provide a project name following the `-n` flag:

```sh
composi -n myproject
```
This will create a project named "myproject" on your desktop. If you want to have the project placed somewhere else, you can provide a path with the `-p` flag:

```sh
npm -n myproject -p dev/New \Projects
```
>On Windows use the standard Windows file system path notation to define your project's path.

Project Structure
-----------------
A new project will have the following folder structure:
```
|- my-project
   |- css
      -- styles.css
   |- dev
      -- app.js
      |- components
         -- list.js
   -- index.html
   |- js
      -- app.js
```

Building
--------
To build your project, `cd` to its folder and run:

```sh
npm i
```

You'll also need to have the `gulp-cli` installed:

```sh
npm i -g gulp-cli
```

Then, while in your project's root folder, run:

```sh
gulp
```

This will build and launch your project in your default browser.

With this structure, you can add other sub-folders to components, or create other folders inside the `dev` folder as necessary.

`styles.css` is a minimal CSS reset. Use it or replace it with whatever you want. `app.js` is the core of your website/app. `components` folder has one component: `list.js`. You can add more files for other component as needs. Feel free to add more folders and files to the `dev` folder as you see fit to achieve the structure your app needs. Import them into `app.js`. At build time the build script uses `app.js` to bundle all your files and output them to `js/app.js`. The `index.html` is automatically setup to import that script. `index.html` is your main page. npm

Documentation
-------------
To learn how to use Composi, open the [docs](./docs/index.md) folder.


Summary
-------

Composi is all about components. These provide a great way to organize your code into modular and reusable chunks. The virtual dom means you never have to touch the DOM to change something.

Because Composi uses JSX, there are many similarities to React patterns. Please note that Composi is not a React clone, like Preact, Inferno, etc. It is not trying to be compatible with React and the React ecosystem. Component state is managed quite differently from React. Components lack the React refs and context properties. Also lacking, PropTypes. Events are not synthetic. They are either real inline events or standard DOM events with `addEventListener`. Props and custom tags are supported only because JSX provides these by default. 

Composi is small, just 3KB for the gzipped core. It loads quickly. Its small and focused API means you can learn everything in half a day and be productive. If you're already familiar with JSX, then you only need to learn the Component API. You can easily do that in an hour or two.