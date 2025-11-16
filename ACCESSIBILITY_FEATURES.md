# Accessibility Features

This portal includes comprehensive accessibility features for children and staff with diverse needs.

## Available Features

### 1. High Contrast Mode

**Location:** Profile → Accessibility Settings  
**Purpose:** Increases color contrast for users with visual impairments  
**Implementation:**

- Toggles `.high-contrast` class on `<html>`
- Applies black/white color scheme with high-contrast borders
- Persisted in `localStorage` (`a11y-highContrast`)

### 2. Text Size Control

**Location:** Profile → Accessibility Settings  
**Options:** Small (14px), Normal (16px), Large (18px), X-Large (20px)  
**Purpose:** Allows users to adjust text size for better readability  
**Implementation:**

- Sets `data-text-size` attribute on `<html>`
- Applies font-size scaling via CSS
- Persisted in `localStorage` (`a11y-textSize`)

### 3. Reduced Motion

**Location:** Profile → Accessibility Settings  
**Purpose:** Disables animations for users sensitive to motion  
**Implementation:**

- Toggles `.reduce-motion` class on `<html>`
- Removes/shortens all animations and transitions
- Hides confetti effects
- Defaults to system preference via `prefers-reduced-motion`
- Persisted in `localStorage` (`a11y-reducedMotion`)

## Technical Architecture

### Context Provider

`src/contexts/AccessibilityContext.jsx`

- Centralizes accessibility state management
- Syncs preferences to localStorage and DOM
- Provides React hooks for components

### Settings Page

`src/pages/AccessibilitySettings.jsx`

- User-friendly interface for adjusting preferences
- Toggle switches for binary options
- Grid layout for text size selection
- Child-friendly explanations

### CSS Implementation

`src/index.css` (lines 203-285)

- `.high-contrast` styles for color overrides
- `[data-text-size]` attribute selectors for font scaling
- `.reduce-motion` class for animation disabling
- Respects `prefers-reduced-motion` media query

### Integration

`src/App.js`

- Wrapped in `<AccessibilityProvider>`
- Route added: `/accessibility`
- Protected route (login required)

## Usage

### For Users

1. Log in to your account
2. Navigate to Profile
3. Click "Accessibility" tile
4. Toggle settings as needed
5. Settings persist across sessions

### For Developers

```javascript
import { useAccessibility } from "../contexts/AccessibilityContext";

function MyComponent() {
  const { highContrast, textSize, reducedMotion } = useAccessibility();

  // Use values to conditionally render or style
  return <div>{/* ... */}</div>;
}
```

## Testing Recommendations

1. **High Contrast:**

   - Verify all text is readable (white on black)
   - Check form inputs and buttons remain usable
   - Test with screen readers

2. **Text Size:**

   - Test all four sizes on mobile and desktop
   - Check for layout breaks or overflow
   - Verify interactive elements remain clickable

3. **Reduced Motion:**

   - Confirm no animations play when enabled
   - Check page transitions are instant
   - Verify confetti is hidden

4. **Cross-browser:**
   - Chrome, Firefox, Safari, Edge
   - iOS Safari, Chrome Mobile
   - Older browsers (graceful degradation)

## Future Enhancements

- **Dyslexia-friendly font option** (OpenDyslexic)
- **Color blind mode** (specialized palettes)
- **Speech synthesis** for text-to-speech
- **Dark mode** (separate from high contrast)
- **Keyboard shortcuts reference** (in-app guide)
- **Focus indicator customization** (size/color)

## Compliance

These features help meet:

- **WCAG 2.1 Level AA** requirements
- **Section 508** accessibility standards
- **ARIA 1.2** best practices (via semantic HTML and ARIA attributes throughout)

Last updated: 2025-11-16
