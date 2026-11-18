# Unimate

**Unimate** is a cross-platform mobile application built with React Native and Expo, designed to help university students track tasks, manage course deadlines, and stay organized.

Developed as part of the **Cross-Platform Development** course.

## Features
- **Task List & Summary Overview:** Virtualized `FlatList` displaying academic tasks alongside a summary row with live counts (`Total`, `Pending`, `High`).
- **Light & Dark Mode:** Automatic theme switching synced with device settings using a shared design token system.
- **Responsive Layout:** Adapts seamlessly across phone, tablet, and web screen widths (`1`, `2`, or `3` columns).
- **Filtering & Sorting:** Interactive chips to filter tasks by status/priority and sort by due date or priority.
- **Async States & Refresh:** Simulated API loading states, error handling with retry support, empty state views, and pull-to-refresh.
- **Touch Interaction & Accessibility:** Long-press gesture with confirmation alert to delete tasks, complete with screen reader labels and hints.
- **Priority & Status Indicators:** Color-coded priority badges (`High`, `Medium`, `Low`) and clear completion tracking.

## Tech Stack
- **Framework:** React Native (Expo SDK 58)
- **Navigation:** Expo Router
- **Language:** TypeScript
- **Styling:** React Native `StyleSheet` & Custom Theme Tokens

## Project Structure
```text
src/
├── app/
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   ├── EmptyState.tsx
│   ├── FilterChip.tsx
│   ├── TaskCard.tsx
│   └── TaskDetails.tsx
├── constants/
│   └── theme.ts
├── data/
│   ├── api.ts
│   └── tasks.ts
├── hooks/
│   └── use-theme.ts
└── types.ts