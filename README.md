# Unimate 

**Unimate** is a cross-platform mobile application built with React Native and Expo, designed to help university students track tasks, manage course deadlines, and stay organized.

Developed as part of the **Cross-Platform Development** course.

## Features
- **Task List View:** Displays all academic tasks with dynamic task counting.
- **Priority Indicators:** Color-coded priority badges (`High`, `Medium`, `Low`).
- **Status Tracking:** Clear distinction between completed and pending tasks.
- **Detailed View Component:** `TaskDetails` component for full task breakdown.

## Tech Stack
- **Framework:** React Native (Expo SDK 58)
- **Navigation:** Expo Router
- **Language:** TypeScript
- **Styling:** React Native `StyleSheet`

## Project Structure
```text
src/
├── app/
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   ├── TaskCard.tsx
│   └── TaskDetails.tsx
├── data/
│   └── tasks.ts
└── types.ts