# ICT TIME TABLE REACT FRONTEND

# Container deployment

## Requirements

1. Docker Desktop install (includes Docker and Compose). [Install here](https://docs.docker.com/compose/install/)

## How to setup (windows and linux)

Run the docker compose command in the repo directory.

```
docker build -t web-ui . && docker rm web-ui -f && docker image prune -f && docker run --name web-ui -p 3000:3000 -d web-ui
```

## How to test

Open CMD to run a CURL command.
```
curl http://localhost:3000/
```

## Local Development

Clone and run this app in your machine with the following steps:

### Prerequisites

You need `npm` and `node`  installed in your machine. If you have not done so, refer to the link: [install node and npm](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac).

### Clone the Repository

Use `git clone` command to clone project to the current directory using HTTPS. Execute this in the terminal:

```console
git clone https://github.com/icttimetable/nportal-frontend-svc.git

```

### Install Node Modules

Make sure you are in the root directory of the project. You can use `cd` command for Windows.\
After which, you need to install the node modules and dependencies stated in the package.json file.\
It takes a few minutes for installation.

```console

cd nportal-frontend-svc
npm install

``` 

### Run Project

This runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

```console

npm start

```

The page will reload when you make changes.
