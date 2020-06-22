<h1 align="center">
    Kudo API
</h1>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## :rocket: Technologies

-  Typescript
-  NodeJS
-  Express
-  Typeorm
-  AWS S3
-  Multer
-  Eslint
- Prettier
-  [VS Code][vc] with [EditorConfig][vceditconfig]

## :information_source: How To Use

To run this application, you'll need to have installed on your computer:
  - [Git](https://git-scm.com)
  - [Node.js v12][nodejs] or higher
  - [Yarn v1.22][yarn] or higher

```bash
# Clone repository
$ git clone https://github.com/anaalicefig/kudo-api.git

# Go into the repository
$ cd kudo-api

# Change the ormconfig.json to your database configurations

"type": "postgres",
"host":
"port":
"username":
"password":
"database":

# Install dependencies
$ yarn
or
$ npm install

# Run the app
$ yarn dev:server
or
$ npm dev:server
```

To run this application with docker, you'll need to have installed on your computer:
 - [Dcoker](https://www.docker.com/)
 - [Dcoker Compose](https://docs.docker.com/compose/)
 ```bash
 # Go into the repository
$ cd kudo-api

# Create a .env file with the same data of .env.example

# Build
docker-compose build

# Run the app
docker-compose up
 ```

File configuration:
```bash
# To use AWS to save files, do on .env:
STORAGE_DRIVER=s3

# And put your keys:
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# To use local disk to save files, do on .env:
STORAGE_DRIVER=disk
```
---

Made with ♥ by Ana Alice :wave:
<br>
[Get in touch with me!](https://www.linkedin.com/in/ana-alice-figueiredo/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
