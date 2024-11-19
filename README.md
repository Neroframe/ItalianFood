# README.md

## Overview

This web application provides an interactive exploration of the history of pasta, complete with recipes, animations, and user customization features.

### Key Features

- **User Authentication**: Simple login and logout functionality.
- **Night Mode Theme Switching**: Toggle between light and night modes.
- **User Preferences Management**: Preferences are saved and applied based on user authentication.
- **Interactive Dish Display**: Animated presentation of dishes with ratings and descriptions.
- **Language Selection**: Option to change the language (functionality placeholder).
- **Chef's Surprise Feature**: Random dish selection with accompanying audio.
- **Reservation Form Handling**: Simulated reservation form submission with success message.
- **Personalized Greeting**: Greeting message that updates based on user input.
- **Keyboard Navigation**: Navigate through dish cards using keyboard arrows.
- **Scroll Animations**: Animations triggered by scrolling.

## User Preferences Management

### Theme Preference (Night Mode)

- **When Not Logged In**: Users can toggle between light and night modes using the "Toggle Theme" button. The preference is not saved; the site resets to light mode upon page reload or navigation.
- **When Logged In**: Users can toggle the theme, and their preference is saved. The preference is stored in `localStorage` under the key `nightMode`. Upon logging in, the saved theme preference is automatically applied. When logging out, the site returns to light mode, but the preference remains saved for future logins.

### Authentication State

- **Login Status**: Managed using `localStorage` under the key `isLoggedIn`. Determines the availability of certain features and the state of the login/logout button.
- **Login Process**: Users can log in using a simple prompt (credentials are hardcoded for demonstration). Successful login updates the UI and applies saved preferences.
- **Logout Process**: Users can log out, which resets certain preferences and updates the UI accordingly. Keeps the night mode preference saved for future logins.

## How Preferences Are Managed

On page load, the script checks `localStorage` for `isLoggedIn` and `nightMode`. If logged in, it applies the saved night mode preference; if not, the site starts in light mode.

When toggling the theme:

- The "Toggle Theme" button is always accessible.
- When logged in, changes are saved to `localStorage`.
- When not logged in, changes are temporary and reset upon page reload.

Logging in:

- Applies the last saved night mode preference.
- Updates the authentication status in `localStorage`.
- Adjusts the UI to reflect the logged-in state.

Logging out:

- Resets the site to light mode.
- Updates the authentication status in `localStorage`.
- Adjusts the UI to reflect the logged-out state.
- Keeps the night mode preference saved for future logins.

## Local Storage Usage

- **`isLoggedIn`**: Stores the user's authentication status (`'true'` or `'false'`). Determines whether to apply saved preferences on page load.
- **`nightMode`**: Stores the user's theme preference when logged in (`'true'` or `'false'`). Applied automatically upon subsequent logins.

## Additional Features

- **Interactive Dish Cards**: Hover effects and animations enhance user engagement. Users can rate dishes and read extended descriptions.
- **Language Selection**: Placeholder functionality for changing the site's language.
- **Chef's Surprise**: Randomly displays a dish with an audio effect.
- **Reservation Form**: Simulated form submission with a delayed success message.
- **Greeting Message**: Updates in real-time based on user input.
- **Keyboard Navigation**: Allows users to navigate through dish cards using the up and down arrow keys.
- **Scroll Animations**: Elements animate into view as the user scrolls down the page.

## Setup Instructions

To set up the application:

1. **Clone the Repository**: Ensure all HTML, CSS, JavaScript files, and assets are properly downloaded.
2. **File Structure**: Place the `animation.js` file in your project directory. Include `styles.css` for custom styling and night mode.
3. **Include Necessary Libraries**: Add Bootstrap CSS and JS links in your HTML files.
4. **Run the Application**: Open `index.html` in a web browser to view the site. Navigate between pages to see shared preferences and authentication states.