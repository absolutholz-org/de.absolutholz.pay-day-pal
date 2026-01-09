# The Payday Pal

A mobile-first web application designed to help households track chores and calculate allowances. Built with React, TypeScript, and Firebase.

## Features

- **Household Management**: Create and manage multiple households with unique members.
- **Chore Tracking**: Track daily chores with customizable values, frequency, and effort levels.
- **Allowance Calculation**: Real-time calculation of earnings based on completed tasks.
- **Mobile-First Design**: Responsive UI optimized for mobile devices with touch-friendly interactions.
- **Real-time Sync**: Data is synchronized instantly across devices using Firebase Firestore.
- **Customizable Settings**: Configure the start of the week and manage household members.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Lucide React
- **Backend**: Firebase (Firestore)

## Prerequisites

- Node.js (v18 or higher recommended)
- A Firebase project with Cloud Firestore enabled

## Setup

1.  **Clone the repository**

2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Firebase configuration:

    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server**
    ```bash
    pnpm dev
    ```
