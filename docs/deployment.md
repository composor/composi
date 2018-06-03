Composi
=======

Contents
--------
- [Installation](../README.md)
- [JSX](./jsx.md)
- [Hyperx](./hyperx.md)
- [Hyperscript](./hyperscript.md)
- [Functional Components](./functional-components.md)
- [Mount and Render](./render.md)
- [Components](./components.md)
- [State](./state.md)
- [Lifecycle Methods](./lifecycle.md)
- [Events](./events.md)
- [Styles](./styles.md)
- [Unmount](./unmount.md)
- [Third Party Libraries](./third-party.md)
- Deployment
- [Differences with React](./composi-react.md)

Deployment
----------

After completing your project, you'll want to deploy it to where you will serve the site/app from. By default a Composi development project has a log of files and folder you don't need in deployment. The Composi command like can help you separate the final project from the development parts.

CLI Deploy
----------

The Composi CLI can separate out the parts you need for deployment from the parts you need for development. There a just a few steps to follow. Open the terminal. There are two flags for deployment:

1. `-d`: tells Composi to deploy. Should be followed by a space and the path to the project you want to deploy.
2. `-p`: the path to deploy your project at. Should be followed by space and then the path. If no `-p` is provided, it will deploy to the same location as the value of `-d`, along side the project being deployed.

When Composi deploys you project, it uses the same name you gave but appends '-production' to the folder name. Internally all names will stay the same.

```bash
composi -d /Users/wobba/Desktop/test -p ~/dev
```

With the above command, you will find the deployed project at:

```bash
composi -d C:\Users\wobba\Desktop\test -p ~\dev
```

This would be deployed project at: 

```bash
C:\Users\wobba\dev\test-production
```

What Gets Deployed
------------------

When you deploy a project, Composi exports certain files and folders. They are all at the root leve of the project:

```bash
|--css
|--icons
|--images
|--js
|--index.html
```

The default Composi project build does not contain a folder for icons and images. However, if you want to use icons and images with your project, you can create these folders at the root of your project. Then during deployment Composi will include them. Everything in the above folders will be transfered to the deployment destination.

Changing Paths for Files
------------------------

Depending on how you intended to serve your project, you may need to change where CSS, icons, images and JavaScript reside. If this is so, be sure to adjust the paths to CSS and JavaScript in the `index.html` file, as well as any paths that for images in your `styles.css` file.

Standalone
----------

When you create the deployment version of your project, you get a standalone version. You could doubleclick the <code>index.html</code> to open it in your browser. Or you could open the terminal, <code>cd</code> to the deployed project and run an node server, such as [http-server](https://www.npmjs.com/package/http-server), in the project to launch it.