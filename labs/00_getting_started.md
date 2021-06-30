# Getting Started

- [Getting Started](#getting-started)
  - [Before you start](#before-you-start)
    - [Required Software](#required-software)
  - [If you use IntelliJ / WebStorm: Getting started with IntelliJ / WebStorm](#if-you-use-intellij--webstorm-getting-started-with-intellij--webstorm)
  - [If you use Visual Studio Code: Getting Started with Visual Studio Code](#if-you-use-visual-studio-code-getting-started-with-visual-studio-code)
  - [Take a closer look at the starter kit](#take-a-closer-look-at-the-starter-kit)

## Before you start

### Required Software

- [NodeJS](https://nodejs.org/en/) in a current version (we test with the current LTS version)
- IDE / Editor
  - [Visual Studio Code](https://code.visualstudio.com/) (free) *or*
  - IntelliJ / WebStorm (or PhpStorm, commercial)
- Angular CLI (`npm i -g @angular/cli`)
    - If installation fails b/c of local firewall settings, you can also work without the CLI by using npx.

## If you use IntelliJ / WebStorm: Getting started with IntelliJ / WebStorm

> If you use Visual Studio code, you can skip this section.

In this part of the tutorial, you will pull (or download & extract the ``....zip``) the starter kit and run it.

Tip: Install and checkout the following useful tools for developing with Angular:

- [Angular Plugin](https://plugins.jetbrains.com/plugin/6971-angular-and-angularjs)
- [Prettier](https://www.jetbrains.com/help/phpstorm/prettier.html)

1. Pull the starter kit:

    https://github.com/L-X-T/...

    If you are using Linux or OS X, you should add the execution flag (x) to all files in the folder `node_modules\.bin` with `chmod`: ``chmod -R +x  node_modules``.

2. Open the starter kit in WebStorm/IntelliJ. This is the folder containing the ``package.json``.

6. Switch to the terminal and start the starter kit with `npm start`.

    ![](https://i.imgur.com/7YG65wz.png)

    If you do not want to run the project in the IDE, you can also use `cmd` (under Windows) or `bash` (under Linux and OS X) to open a shell in the root of the project and use `npm start`.

7. Open it in the browser (`http://localhost:4200`). You should now see the demo application.

    If and only if this port is already taken, you can change adjust it in the project root's `package.json` file. To do this, add the `--port` option to the node scripts / start:

    ```json
    "scripts": {
        "start": "ng serve --port 4242", [...]
    }
    ```

## If you use Visual Studio Code: Getting Started with Visual Studio Code

> If you are using IntelliJ/WebStorm, you can skip this section.

In this part of the exercise, you will extract the starter kit (``....zip``) and run it.

Tip: Install the following useful plugins for developing with Angular:

- [Angular Context Creator](https://marketplace.visualstudio.com/items?itemName=sjuulwijnia.kx-vscode-angular-context-creator)
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

In this part of the tutorial, you will pull (or download & extract ``....zip``) the starter kit and run it.

1. Pull the starter kit:

    https://github.com/L-X-T/...

    If you are using Linux or OS X, you should use `chmod` to add the execution flag (x) to all files in the `node_modules/.bin` folder: ``chmod -R +x  node_modules``.

2. Open the starter kit in Visual Studio Code.

3. Change to the command line (`CTRL+SHIFT+C`) or to the integrated Terminal (`CTRL+SHIFT+ö`)

4. Start the development server: `npm start`

    Note: The development server does not put the required bundles on the disk but only keeps them in the main memory. When you change the source files, it recreates the bundles and then notifies the browser.
    To serve individual apps run `ng serve --project=<appname>`

5. Open the demo in Chrome (http://localhost:4200)

    The port used may differ. You can see it from the console output at startup. If you want to change the port of a project, you can adjust this in the `package.json` file. To do this, add the `--port` option to the node `scripts/start`:

    ```json
    "scripts": {
        "start": "ng serve [...] --port 4242", [...]
    }
    ```

## Take a closer look at the starter kit

In this part, you will take a closer look at the starter kit to familiarize yourself with it.

> **Important hint:** During **all** the labs, use ``CTRL``+``p`` in Visual Studio Code to quickly jump to a specific file. You can do the same by pressing ``SHIFT`` twice in WebStorm/PhpStorm/IntelliJ.

1. Look at the component in the `app.component.ts` and `app.component.html` in the ``src/app`` folder and find out what they do.

2. Note that the `app.component.html` has an element `<router-outlet></router-outlet>`. This is the placeholder for the router.

3. Look at the module in the `app.module.ts` file.

4. Look at the `index.html` file.

5. If you have not already done so, start the development web server:

    ```
    npm start
    ```

6. Open the project in the browser.
