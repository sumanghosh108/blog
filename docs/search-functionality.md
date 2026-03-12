# Search Functionality Documentation

## Overview

The SearchBar component provides client-side fuzzy search functionality across all blog posts using Fuse.js. It's integrated into the site header and available on all pages.

## Features

### 1. Fuzzy Search
- Uses Fuse.js for intelligent fuzzy matching
- Searches across multiple fields with weighted priorities:
  - Title (40% weight)
  - Description (30% weight)
  - Tags (20% weight)
  - Content (10% weight)

### 2. Search Configuration
- **Threshold**: 0.4 (balanced between strict and fuzzy matching)
- **Minimum Match Length**: 2 characters
- **Debounce Delay**: 200ms to prevent excessive searches while typing
- **Results Limit**: Maximum 8 results displayed

### 3. Keyboard Navigation
The search interface supports full keyboard navigation:
- **Arrow Down**: Move to next result
- **Arrow Up**: Move to previous result
- **Enter**: Navigate to selected result
- **Escape**: Close search dropdown and blur input

### 4. User Interface
- Search input with icon in the header
- Dropdown results panel with:
  - Post title (with highlighted matches)
  - Post description (truncated to 2 lines)
  - Publication date
  - Up to 2 tags per result
- Hover and keyboard selection states
- Responsive design for mobile and desktop

### 5. Accessibility
- ARIA attributes for screen readers:
  - `aria-label` on search input
  - `aria-autocomplete="list"`
  - `aria-controls` linking to results
  - `aria-expanded` state
  - `role="listbox"` on results container
  - `role="option"` on result items

## Implementation Details

### Component Location
- **File**: `src/components/SearchBar.astro`
- **Integration**: Included in `src/components/Header.astro`

### Data Indexing
The component fetches all published blog posts at build time and creates a search index with:
- Post slug (for navigation)
- Title
- Description
- Tags array
- Full content body
- Publication date

### Client-Side Hydration
The component uses Astro's `define:vars` to pass the search data to the client-side script, which then dynamically imports Fuse.js for the search functionality.

## Usage

The SearchBar is automatically included in the site header. Users can:

1. Click on the search input
2. Type at least 2 characters
3. View results in the dropdown
4. Use keyboard or mouse to select a result
5. Press Enter or click to navigate to the selected post

## Testing

Unit tests are located in `tests/search-bar.test.ts` and cover:
- Search configuration validation
- Results display logic
- Keyboard navigation support
- Accessibility features
- Query validation

## Performance Considerations

- **Build-time indexing**: All posts are indexed during build, not at runtime
- **Debouncing**: 200ms delay prevents excessive search operations
- **Dynamic import**: Fuse.js is loaded only when needed
- **Result limiting**: Maximum 8 results prevents DOM bloat
- **Efficient matching**: Fuse.js uses optimized algorithms for fast search

## Browser Compatibility

The search functionality works in all modern browsers that support:
- ES6 modules
- Dynamic imports
- CSS Grid and Flexbox
- ARIA attributes

## Future Enhancements

Potential improvements for future iterations:
- Search history/recent searches
- Search suggestions/autocomplete
- Advanced filters (by tag, date range)
- Search analytics
- Keyboard shortcuts (e.g., Cmd+K to focus search)
