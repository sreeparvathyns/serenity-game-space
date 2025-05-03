
# Serenity - Mental Health and Wellness Application

## Project Overview

Serenity is a comprehensive mental health mobile application designed to help users improve and maintain their mental well-being through science-backed techniques, mindfulness tools, and personal development resources. The application provides a calming, supportive environment with a gentle and empathetic tone, acting as a supportive companion for the user's mental wellness journey.

![Serenity App](https://placeholder-for-app-screenshot.com)

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces
- **TypeScript**: Adds static type definitions to enhance code quality and readability
- **Vite**: Next generation frontend tooling for faster development and optimized production builds
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs
- **Shadcn UI**: A collection of reusable components built with Radix UI and Tailwind CSS
- **React Router Dom**: For managing navigation and routing within the application
- **Date-fns**: Modern JavaScript date utility library
- **Lucide React**: A beautiful and consistent icon set with React components
- **React Hook Form**: For efficient and flexible form handling
- **TanStack Query**: For data fetching, caching, and state management
- **React Day Picker**: A flexible date picker for React

### State Management
- **Local Storage**: Used for persisting user data and authentication state on the client side
- **React Context API**: For managing application-wide state

## Key Features

### Authentication System
- Secure user authentication with email and password
- User registration with email validation
- Protected routes for authenticated users only

### Mood Tracking
- Daily mood logging with a 5-point scale
- Note-taking capability for mood entries
- Calendar view with visual indicators for mood entries
- Historical trend analysis for mood patterns

### Meditation & Mindfulness
- Library of guided meditation sessions
- Breathing exercise tools with animations
- Mindfulness timer with customizable duration

### Journaling
- Private journaling tool with text formatting
- Prompt-based writing exercises
- Searchable journal entries
- Journal analytics for insight into emotional patterns

### Mental Health Games
- Interactive games designed to reduce anxiety and improve focus
- Memory games for cognitive improvement
- Color relaxation activities for stress reduction

### Resources & Support
- Curated articles on mental health topics
- Emergency resources for crisis situations
- Self-help courses and materials

### User Experience
- Responsive design for all device sizes
- Soothing color palette with lavender, teal, and soft blues
- Dark mode for reduced eye strain
- Smooth animations and transitions for a calming experience

## Application Architecture

The application follows a component-based architecture using React. Key architectural elements include:

1. **Authentication Layer**: Manages user authentication state using React Context API
2. **Page Components**: Main views of the application (Home, Mood Tracker, Journal, etc.)
3. **UI Components**: Reusable UI elements like buttons, cards, and forms
4. **Feature Components**: Specialized components for specific features (Meditation Player, Mood Entry Form)
5. **Hooks**: Custom React hooks for shared logic (useAuth, useMoodEntries, etc.)
6. **Services**: Helper functions for data operations and external interactions

## Data Storage

In the current implementation, data is stored locally:

- **User Authentication**: User credentials and authentication status stored in localStorage
- **Mood Entries**: User mood data stored in localStorage
- **Journal Entries**: Journal content stored in localStorage
- **Application Preferences**: User settings and preferences stored in localStorage

## Future Enhancements

Potential future enhancements for the application include:

1. **Backend Integration**: Implementation of a secure backend with proper authentication
2. **Cloud Synchronization**: Allowing users to access their data across multiple devices
3. **Notification System**: Time-based reminders for mood tracking and meditation
4. **Community Features**: Optional anonymous community support elements
5. **Advanced Analytics**: More sophisticated mood and journal analysis tools
6. **Personalized Recommendations**: AI-driven content recommendations based on user data
7. **Integration with Wearable Devices**: Heart rate and sleep data integration

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd serenity

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```
serenity/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── auth/      # Authentication-related components
│   │   ├── games/     # Mental health games components
│   │   ├── home/      # Home page components
│   │   ├── journal/   # Journaling feature components
│   │   ├── layout/    # Layout components (Header, Footer)
│   │   ├── mindfulness/ # Mindfulness and meditation components
│   │   ├── mood/      # Mood tracking components
│   │   ├── resources/ # Resource components
│   │   └── ui/        # Shadcn UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and libraries
│   ├── pages/         # Page components
│   ├── services/      # Service functions
│   ├── App.tsx        # Main application component
│   ├── index.css      # Global styles
│   └── main.tsx       # Application entry point
├── .gitignore         # Git ignore file
├── index.html         # HTML entry point
├── package.json       # Project dependencies and scripts
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## Deployment

The application can be deployed to various hosting platforms:

- **Vercel**: Optimized for React applications
- **Netlify**: Simple deployment with continuous integration
- **GitHub Pages**: For static site hosting
- **Firebase Hosting**: For Google ecosystem integration

## User Guide

### Registration and Login
1. New users can create an account via the Registration page
2. Returning users can log in with their email and password
3. Authentication state persists across browser sessions

### Using the Mood Tracker
1. Navigate to the Mood Tracker page
2. Select your current mood on the 5-point scale
3. Add an optional note about your feelings
4. Submit your entry to save it
5. View your mood history on the calendar or chart views

### Journaling
1. Access the Journal page
2. Create a new entry with the "+" button
3. Write freely or use provided prompts
4. Save your entry
5. Search or filter past entries as needed

### Meditation and Mindfulness
1. Go to the Mindfulness page
2. Choose a guided meditation session
3. Use the breathing exercises for immediate calm
4. Track your meditation history and streaks

## Contributors

- [Your Name] - Lead Developer
- [Designer Name] - UI/UX Design

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all the open-source libraries that made this project possible
- Inspiration from leading mental health applications in the market
- Mental health resources and techniques adapted from evidence-based practices

---

© 2025 Serenity App. All rights reserved.
