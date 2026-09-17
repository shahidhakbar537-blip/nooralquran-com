# Improve readability across the site

## What will change
- Replace the main interface font with a highly legible, friendly typeface designed for easy character recognition.
- Use language-appropriate readable fonts for Hindi, Telugu, Kannada, Tamil, and Arabic text.
- Increase the smallest text sizes throughout the site so labels, navigation, captions, and body text remain comfortable for older readers.
- Increase line spacing and remove wide letter spacing that makes small text harder to scan.
- Preserve the existing Islamic visual style, colors, layout, content, and functionality.

## Accessibility checks
- Keep strong text/background contrast and clear visual hierarchy.
- Verify the homepage and a multilingual content page at desktop and mobile sizes.
- Confirm no text is clipped or overlapping after the size changes.

## Technical details
- Update the global typography tokens and language-specific font fallbacks in the shared stylesheet.
- Adjust the header’s smallest text treatment where needed.
- Use locally bundled font packages so the type remains consistent without relying on external font loading.
