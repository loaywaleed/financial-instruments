
<a name="readme-top"></a>


[![Build Status][build-shield]][build-url]

[build-shield]: https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge
[build-url]: https://github.com/loaywaleed/financial-instruments/actions

<br />
<div align="center">
  <h3 align="center">Financial Instruments</h3>

  <p align="center">
    An app that fetches candles and data about instruments
    <br />
    <a href="https://financial-instruments.vercel.app/">View App</a>
    ·
    <a href="https://www.linkedin.com/in/loaywali/">Report Bug</a>
    ·
    <a href="https://www.linkedin.com/in/loaywali/">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#infrastructure">Infrastructure</a></li>
    <li><a href="#CICD">CI/CD</a></li>
    <li><a href="#Coding-Standard">Coding Standard</a></li>
    <li><a href="#Features">Features</a></li>
    <li><a href="#Security">API documentation</a></li>
    <li><a href="#Testing">API documentation</a></li>
    <li><a href="#Documentation">API documentation</a></li>
  </ol>
</details>


## About The Project

An app used to track financial instruments in a convenient and user friendly way.

Here's what you can do with the app:

- Discover instrument data.
- View candlestick data for each instrument.
- View metadata about each instrument and the exchange its traded on.


### Built With

#### Language
- [![TypeScript][TypeScript]][TS-url]

#### Frontend
- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Mantine][Mantine.js]][Mantine-url]

#### Backend
- [![express][express]][express-url]
- [![Mongodb][MongoDB]][Mongodb-url]
- [![jest][jest]][jest-url]


## Getting Started

First Clone the repo or download the zip file.

### Prerequisites

Make sure you have docker and docker-compose installed

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/loaywaleed/financial-instruments
   ```
2. Change .env.example in backend directory to .env with your credentials

### Run with docker

#### For backend

Use Docker Compose profiles to manage different environments:

```bash
cd backend
# Development environment
docker-compose --profile development up

# Production environment
docker-compose --profile production up
```

#### For frontend
```bash
# Development environment
docker-compose up
```

### Run without docker

#### For backend
```bash
cd backend

npm install

# Production environment
npm start
# Development environment
```

#### For frontend
```bash
cd frontend

npm install

# Production environment
npm start
# Development environment
npm run dev
```

## Infrastructure

- Frontend hosted separately on Vercel.
- Backend (including database) hosted on AWS EC2 Instance.
- Backend is served by Nginx web server.

## CI/CD

- CI/CD pipeline using github actions that tests the backend and deploys it to EC2 Instance automatically whenever we push to backend directory or change the file
- Separate CI/CD is done for frontend automatically using Vercels

## Coding Standard

- ESLint for linting
- Prettier for code formatting

## Features

- Wide variety of instrument types
- Dark mode
- Clear and user friendly metrics and charts
- Metadata about instruments
- Easy to use interface
- Language switchers
- Responsive Design
- SE0 Optimized (90% on google lighthouse)
- Good performance
- Swagger API docs


## Security

- Used rate limiting on the publically accessible API to prevent Denial of Service attacks and server overload

## Testing
```bash
npm test # to run tests
```
- Tested all services, controllers and middlewares using Jest

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Documentation
For detailed information, visit the documentation:
- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/OPENAPI.md)
- [Decisions and Questions](docs/DECISIONS.md)
- [Demo](docs/DEMO.md)



[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/AsserElshafey/best-version-of-your-self/blob/main/LICENSE.txt
[changelog-shield]: https://img.shields.io/badge/changelog-ff8c00?style=for-the-badge&logo=git&logoColor=white
[changelog-url]: https://github.com/AsserElshafey/best-version-of-your-self/blob/main/CHANGELOG.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/asser-elshafey-759967252/
[product-screenshot1]: images/screenshot1.png
[product-screenshot2]: images/screenshot2.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Mantine.js]: https://img.shields.io/badge/mantine-339AF0?style=for-the-badge&logo=mantine&logoColor=white
[Mantine-url]: https://mantine.dev/
[express]: https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[TypeScript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/
[mongodb]: https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/
[jest]: https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[jest-url]: https://jestjs.io/
