# Fetch Dogs Application

This project allows users to browse, filter, and match dogs from a dataset. The application provides functionality to select favorite dogs and generate a match.

## Features

- Filter dogs by breed.
- Sort dogs alphabetically (ascending/descending).
- Paginated results.
- Mark dogs as favorites.
- Generate a match from selected favorite dogs with a celebratory modal and details.

## Tech Stack

- **Frontend**: React, Material-UI, SCSS
- **State Management**: Local React state
- **API**: Axios for communication with provided endpoints

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/fetch-dogs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd fetch-dogs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm start
   ```
5. Open your browser at:
   ```
   http://localhost:3000
   ```

## How to Use

1. Log in with your name and email.
2. Filter and sort dogs as needed.
3. Mark your favorite dogs by clicking the heart icon.
4. Click "Generate My Puppy Match" to get a match.
5. View match details in the modal.

## Notes

- Favorites are stored locally for simplicity.
- No persistent backend storage is implemented.
