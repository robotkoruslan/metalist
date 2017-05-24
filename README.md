# metalist-tickets v.2
## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^6.10.0, npm ^3.14.7
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run commands `mkdir mongo_data` && `chown -R mongodb:mongodb mongo_data` for mongodb volumes.

4. Rename .env.sample to .env.

5. Run `npm run docker:serve` to start the docker container with app in development mode.

6. Run `npm run watch`. It must automatically restart node server when the files are changed.

## Testing

Running `npm test` will run the unit tests with mocha.
