# Simplified CSAT Campaign Builder

A React TypeScript frontend for configuring a CSAT popup and previewing the result in real time. The app lets users edit popup content, adjust visual styling, and inspect the configured experience inside a mobile-device preview.

## Live Demo

Live demo: _Add deployed project link here_

## GitHub Repository

Repository: _Add GitHub repository link here_

## Features

- Content configuration for initial feedback, feedback, and thank-you screens
- Rating type selection with numbers or stars
- Dynamic feedback options with add, edit, and delete support
- Optional additional comment field
- Thank-you media upload preview using object URLs
- Styling controls for colors, typography, border radius, and button dimensions
- Live mobile preview with screen selector
- Responsive layout for desktop, tablet, and mobile widths

## Assignment Highlights

- Built as a focused frontend assignment with React, TypeScript, and Vite
- Uses controlled form inputs for all configuration fields
- Centralizes campaign state with React Context API
- Provides real-time synchronization between forms and mobile preview
- Separates pages, layout, context, hooks, data, and types for maintainability
- Includes responsive behavior for desktop, tablet, and mobile screen sizes

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- React Context API
- CSS

## Folder Structure

```text
src/
|-- components/
|   `-- preview/
|-- context/
|-- data/
|-- hooks/
|-- layouts/
|-- pages/
|-- types/
|-- App.tsx
|-- main.tsx
`-- index.css
```

## Installation

```bash
npm install
```

## Running Locally

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

## Build Command

```bash
npm run build
```

## Architecture Overview

The application uses React Router for navigation between the content and styling configuration pages. Both routes render inside a shared `MainLayout`, which provides the left navigation, center configuration area, and right-side mobile preview.

The mobile preview reads from the same campaign state as the forms, so edits are reflected immediately without a save action.

## State Management Approach

Campaign data is centralized in React Context. The `CampaignProvider` stores the full campaign configuration with `useState`, while `useCampaign` provides safe access to the context.

Default values live in `src/data/defaultCampaignConfig.ts`, and shared TypeScript interfaces live in `src/types/campaign.ts`.

## Future Improvements

- Add reusable form input components
- Add validation for uploaded media and numeric style limits
- Persist campaign settings to local storage or an API
- Add preview interaction for selected ratings and screen transitions
- Add automated tests for context updates and preview rendering
