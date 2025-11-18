# Mipsim App (mipsim)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).

## Docker Deployment

This project includes Docker support for easy deployment using Node 20 and Quasar CLI.

### Build and run with Docker Compose (recommended)
```bash
docker-compose up -d
```

The application will be available at `http://localhost:8080` (locally) or `http://vsim.fiit.stuba.sk` (production)

**Authentication Required:**
- Username: `fiit`
- Password: `mips`

### Build Docker image manually
```bash
docker build -t mipsim-app .
```

### Run Docker container manually
```bash
docker run -d -p 8080:80 --name mipsim-app mipsim-app
```

### Stop and remove container
```bash
docker-compose down
# or
docker stop mipsim-app && docker remove mipsim-app
```
