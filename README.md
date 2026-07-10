# Dashboardbox

A movie SPA (Single Page Application) built with [Create React App](https://github.com/facebook/create-react-app) using [The Movie Database](https://www.themoviedb.org/documentation/api?language=en-US) API. The goal of this project was to build a movie dashboard where you can search, sort, and filter movies using real data, as well as get a quick overview of each movie.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or later
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dashboardbox.git
   cd dashboardbox
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will open automatically at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

## Features

In addition to filtering, sorting, and searching, there are several other features implemented in this project. Below is a list of the main libraries used:

- **lodash** — used to build the pagination component
- **axios** — handles HTTP requests
- **react-toastify** — displays UI notifications in case of unexpected errors
- **react-router-dom** — manages client-side routing
- **react-reveal** — provides fade-in animation effects

There are other libraries used as well, but the ones listed above are the primary ones. You can find the full list in the `package.json` file.

## License

The code is open source and available under the [MIT License.](https://opensource.org/licenses/MIT)

Coded by [Gilbert Rosario.](https://gilbertrosario.com/)
