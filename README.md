
# Spotimix

**Spotimix**  
This is a server-less SPA that allows users to search for songs and create a custom playlist that can be saved to their Spotify account. It is built using React and the Spotify API and use CI/CD to deploy to Netlify.

The running project can be found [here](https://spotimix.netlify.app/). Please be aware that this project is in **'development mode'**. In order to have full functionality within the live environment, your email **must** be added to the approved list of beta users. In order to have your name added to the approved beta users, please contact me.

[![Repo Size](https://img.shields.io/github/repo-size/lyzboy/playlist_generator.svg)](https://github.com/lyzboy/playlist_generator)
[![Contributors](https://img.shields.io/github/contributors/lyzboy/playlist_generator.svg)](https://github.com/lyzboy/playlist_generator/graphs/contributors)

---

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

---

## About

> This project has been developed as a portfolio project to showcase the creation of a react app utilizing API authentication.

---

## Installation

### Prerequisites

- Software/dependencies required.
  - Node.js
  - React
  - Spotify API

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lyzboy/playlist_generator.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy the `.env.example` file and rename it to `.env`. 
   *Using bash:*
   ```bash
   cp .env.example .env
   ```
Then configure the following environment variables:

   - `REACT_APP_CLIENT_ID` - Your Spotify client ID found within your Spotify Developer Dashboard.

4. **Run the project**:
   ```bash
   npm start
   ```

---

## Usage

 
To run the project, use the following command from the root folder:
```bash
npm start
```

To run the project's tests, use the following command from the root folder:
```bash
npm test
```

You can access the app by visiting `http://localhost:3000` in your browser.

---

## Features

- Users can serch for songs by song title or artist.
- Users can see information about each song.
- Users can play a preview of each song if available.
- Users can view basic profile information and logout.

---


## Contributing

Contributions are always welcome!  

### How to Contribute

1. **Fork the repository**
2. **Create a branch for your feature**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Add feature details"
   ```
4. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**

---

## License

Distributed under the **MIT License**.

---

