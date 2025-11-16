# Accessibility Features - Children's Hospital Portal

## Overview

This portal has been designed with comprehensive accessibility features to ensure all children, regardless of ability, can use the educational games and medical guidance content.

## Keyboard Navigation

### Global Navigation

- **ESC key**: Closes mobile menu
- **Auto-focus**: First interactive element receives focus when modals/menus open
- **Focus trap**: Keyboard focus stays within modals (can't Tab outside)
- **Tab navigation**: Logical tab order throughout all pages

### Game Keyboard Shortcuts

#### All Games

- **Space bar**: Restart game (shows confirmation dialog)

#### Memory Game

- **Space**: Restart with confirmation
- Cards are keyboard accessible via Tab navigation

#### Hospital Quiz

- **Number keys 1-4**: Select answer option (e.g., press "1" for first option)
- **Enter**: Proceed to next question (after answering current question)
- **Space**: Restart quiz with confirmation

#### Word Scramble

- **Enter**: Submit answer
- **Space**: Restart game with confirmation

#### Math Challenge

- **Enter**: Submit answer
- **Space**: Restart game with confirmation

#### Pattern Match

- **Number keys 1-9**: Select pattern option
- **Space**: Restart game with confirmation

## Screen Reader Support

### ARIA Live Regions

All games include live regions that announce:

- Current progress (e.g., "Question 3 of 10")
- Score updates (e.g., "Score: 7 out of 10")
- Feedback on answers (correct/incorrect)
- Game completion status

Live regions use:

- `aria-live="polite"`: Non-interruptive announcements for progress updates
- `aria-live="assertive"`: Immediate announcements for errors
- `role="status"`: Progress indicators
- `role="alert"`: Error messages and critical feedback

### ARIA Labels and Descriptions

- Form inputs: `aria-label`, `aria-describedby` for error messages
- Buttons: Descriptive `aria-label` (e.g., "Restart game", "Select option 1")
- Toggle buttons: `aria-pressed` states (user type selection)
- Input validation: `aria-invalid` linked to error messages via `aria-describedby`

### Semantic Roles

- `role="toolbar"`: Game control toolbars
- `role="dialog"`: Modals (avatar editor)
- `role="alert"`: Error and success messages
- `role="navigation"`: Main navigation menu
- `role="group"`: Related form controls (user type selection)
- `role="form"`: Authentication forms with descriptive labels

### Focus Management

- Custom `useFocusTrap` hook for modals
- Auto-focus on first interactive element when modals open
- Focus restoration when modals close
- Visible focus indicators on all interactive elements

## Form Accessibility

### Authentication Forms

All auth forms (Login, Register, ForgotPassword, ResetPassword, ChangePassword) include:

- Form-level `aria-label` (e.g., "Login form")
- Error messages with `role="alert"` and `aria-live="assertive"`
- Success messages with `role="alert"` and `aria-live="polite"`
- Input validation with `aria-invalid` and `aria-describedby`
- Unique IDs linking inputs to error messages

### User Type Selection (Register Form)

- Button group has `role="group"` with `aria-label="Select user type"`
- Each button has descriptive `aria-label` (e.g., "Select Child account type")
- Active selection indicated with `aria-pressed="true"`

## Visual Accessibility

### Decorative Content

- Emoji icons have `aria-hidden="true"` to prevent screen reader clutter
- Decorative images excluded from accessibility tree

### Responsive Design

- Tablet-first approach (768px optimized)
- Progressive text scaling for readability
- Touch-friendly button sizes (minimum h-12 on tablets)
- Adequate spacing between interactive elements

## Content Accessibility

### Medical Guidance Pages

All 10 content pages (Medicine, Blood Tests, Surgery, Hospital School, MRI, X-Ray, Ward, Theatre, Playroom, Hospital Map) feature:

- Semantic HTML headings (h1, h2, h3) in logical hierarchy
- Responsive text sizing (text-xl md:text-2xl progression)
- High-contrast background sections via `ContentSection` component
- Clear navigation with keyboard-accessible buttons

### Game Instructions

- Clear, age-appropriate instructions
- Visual and textual feedback for all interactions
- Progress indicators for multi-step activities

## Testing Recommendations

### Keyboard-Only Testing

1. Navigate entire portal using only Tab, Enter, Space, Arrow keys
2. Verify all interactive elements are reachable and operable
3. Confirm focus indicators are clearly visible
4. Test game keyboard shortcuts in all games

### Screen Reader Testing

Recommended screen readers:

- **Windows**: NVDA (free) or JAWS
- **macOS**: VoiceOver (built-in)
- **Mobile**: TalkBack (Android) or VoiceOver (iOS)

Test scenarios:

1. Navigate through forms with validation errors
2. Play games and verify progress announcements
3. Confirm modal focus trap works correctly
4. Verify live region announcements are clear and timely

### Contrast Testing

Use tools like:

- WebAIM Contrast Checker
- Chrome DevTools Lighthouse accessibility audit
- axe DevTools browser extension

Target: WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)

## Known Issues & Future Improvements

### Pending Enhancements

- [ ] Comprehensive color contrast audit across all components
- [ ] High contrast mode support
- [ ] Reduced motion preferences (partially implemented)
- [ ] Adjustable text size settings
- [ ] Screen reader testing documentation with specific patterns

### Browser Compatibility

Tested on:

- Modern Chrome, Firefox, Edge, Safari
- Tailwind CSS provides consistent cross-browser styling

## Compliance Standards

This portal aims to meet:

- **WCAG 2.1 Level AA**: Web Content Accessibility Guidelines
- **Section 508**: US federal accessibility standards
- **EN 301 549**: European accessibility standard

Key principles followed:

1. **Perceivable**: Information presented in multiple ways
2. **Operable**: Keyboard navigation, adequate time for interactions
3. **Understandable**: Clear instructions, predictable behavior
4. **Robust**: Compatible with assistive technologies

## Resources

### For Developers

- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### For Content Authors

- [Plain Language Guidelines](https://www.plainlanguage.gov/)
- [Writing for Web Accessibility](https://www.w3.org/WAI/tips/writing/)

---

Last updated: November 16, 2025
