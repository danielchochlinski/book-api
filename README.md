# Book-api

## Overview

This is "book-api, a dynamic web application built with React.ts and Vite. It integrates with the Google Books API to allow users to search for books, view details, and save their favorite selections.

I choose Vite for educational purposes as I've never worked with it before, and its modern architecture, fast build times, and simplicity make it an ideal platform for learning the latest in front-end development practices.

## Application Architecture

The application is structured to ensure maintainability and a clean separation of concerns. Below is an overview of the key directories and their purpose:

### `src` Directory
This is the root directory containing all the source code of the application.

#### `context`
- Located under the `src` directory, it contains the Context API files for global state management.

#### `pages`
- This directory hosts the individual pages of the application, with each page encapsulating its own logic and components.
    - **Index Page**
        - The entry point of the application, containing all necessary components and logic for the homepage.
        - `components`: A subdirectory for specific components used on the `index page`, promoting better organization and modularity.

#### `components`
- A dedicated folder for storing common, reusable components. These components are used across different pages, fostering code reusability and consistency in the UI/UX.

This architectural approach enhances the ease of navigation and understanding of the codebase, particularly for new developers, and aids in the application's maintenance and scalability.

## Live Demo

You can view a live demo of the application here:
[book-api](https://book-idbk54hrg-danielchochlinski.vercel.app/)

## Features

- Search for books using the Google Books API
- View detailed information about each book
- Save favorite books to a personal list
- Responsive design for various device sizes

## Technology Stack

- React.ts
- Vite
- Emotion for styling
- MUI for Material UI components
- Axios for API requests
- Sass for advanced styling

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   \```bash
   git clone https://github.com/danielchochlinski/book-api
   \```
2. Navigate to the project directory:
   \```bash
   cd book-api
   \```
3. Install dependencies:
   \```bash
   npm install
   \```

## Running the Application

### Development Server

To start the development server, run:

\```bash
npm run dev
\```

This will launch the Vite development server. By default, the app will be available at `http://localhost:5173`.

### Production Build

To create a production build, use:

\```bash
npm run build
\```

After building, you can preview the production build with:

\```bash
npm run preview
\```

## Testing

Run the following command to execute tests:

\```bash
npm run test
\```

## Linting

To lint the project files for any code issues, run:

\```bash
npm run lint
\```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

[MIT License](LICENSE)

## Contact

For questions or feedback, please contact Daniel daneilchochlinski@gmail.com.
