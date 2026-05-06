# Changelog

All notable changes to the MiyaraHub Technologies website.

## [2026-05-06] - Syno Manager icon refresh + per-subpage favicon and social meta polish

### Changed

- **`assets/syno-manager-icon.png` refreshed** to the new launcher icon
  shipped with Syno Manager 1.1.7+17 on 2026-05-06 (Google Play + Apple
  App Store). New asset is a full-bleed 1024x1024 squircle with a
  blue-to-teal gradient, 5-bay NAS silhouette, and bright green LED
  accents - matches the in-app launcher icon for cross-surface brand
  consistency. Referenced from the main-page portfolio card
  (`index.html` line 771); rendered at 56x56 with CSS `border-radius:
  14px`.
- **Per-app subpage branding gap closed** across all 7 product
  subpages (avr-maestro, elan-audio-lab, fury-path, network-deck,
  projector-pilot, synology-manager, upsight). Every subpage was
  using an inline-SVG emoji as its favicon and had no `og:image` or
  `twitter:image` social meta tags - which meant social-share unfurls
  on X/Facebook/Slack/Discord rendered with no preview image, and
  browser tabs showed inconsistent emoji glyphs across platforms.

### Added (per subpage)

- `<link rel="icon" type="image/png">` pointing to the per-app icon
  in `../assets/<app>-icon.png`.
- `<link rel="apple-touch-icon">` pointing to the same per-app icon
  for proper iOS Home Screen / Safari pinned-tab rendering.
- `<meta property="og:image">` (absolute URL) so Open Graph
  consumers (Facebook, LinkedIn, Slack, Discord, iMessage) get a
  proper preview image.
- `<meta property="og:image:alt">` for accessibility.
- `<meta name="twitter:image">` so X/Twitter cards render with
  the per-app icon.

## [2026-04-27] - AVR Maestro icon refresh + AVR Maestro MC in-development card

### Added

- **AVR Maestro MC portfolio card** on the main page, mirroring the
  Network Deck / ProjectorPilot "🚧 In Development" pattern. Yamaha
  MusicCast sibling to AVR Maestro - YXC protocol, all the same
  premium-controller features.
- New asset: `assets/avr-maestro-mc-icon.png` - the AVR Maestro
  brighter base with the orange "MC" badge in the bottom-right.

### Changed

- **`assets/avr-maestro-icon.png` refreshed** to the brighter
  variant Meir shipped with the AVR Maestro app refresh. The old
  asset was the pre-brightening version - dark dial knobs, pre-2.x
  era. New asset is the canonical 1024 reduced to 512 for web.

## [2026-04-26] - UPSight App Store approval

UPSight cleared Apple review on 2026-04-26 with the same listing
metadata the Android build uses (UPSight - for CyberPower / Eaton).
Brings the MiyaraHub lineup to 4-out-of-4 apps on both stores.

### Added
- App Store CTA on the UPSight portfolio card (main page)
- App Store hero CTA on the UPSight landing page
- iPhone screenshots gallery on the UPSight landing page ("On iPhone"
  carousel above the existing "On Android" carousel - 10 screenshots
  copied from `upsight/store_assets/ios_iphone_6.9/`)
- UPSight URL: `https://apps.apple.com/us/app/upsight-for-cyberpower-eaton/id6762854779`

### Changed
- UPSight meta description, Twitter title rewritten to reference iOS + Android
- Schema.org `operatingSystem` field on the UPSight page updated from
  `Android` to `iOS, Android`
- UPSight carousel JS refactored from a single IIFE to a `setupCarousel()`
  factory so the iPhone and Android galleries track their own
  `currentIndex` (matches the pattern used on AVR Maestro + FuryPath +
  Syno Manager)

## [2026-04-23] - FuryPath App Store approval

### Added
- App Store CTA on the FuryPath portfolio card (main page)
- App Store hero CTA on the FuryPath landing page
- App Store CTA on the FuryPath bottom CTA section
- iPhone screenshots gallery on the FuryPath landing page ("On iPhone"
  carousel above the existing "On Android" carousel - 10 screenshots
  copied from `fury_path/store_assets/apple/iphone_6.9/`)
- FuryPath URL: `https://apps.apple.com/us/app/furypath-for-hdfury-devices/id6763290302`

### Changed
- FuryPath tech-stack badge updated from `Android` to `iOS + Android`
- FuryPath page title updated to reference both platforms
- FuryPath meta description, Twitter title, and keywords expanded to include iOS
- Schema.org `operatingSystem` field updated from `Android` to `iOS, Android`
- FAQ "Which Android version is required?" rewritten to cover both iOS 16.0+ and Android 5.0+
- FuryPath carousel JS refactored from a single IIFE to a `setupCarousel()`
  factory so the iPhone and Android galleries track their own
  `currentIndex` (matches the pattern used on AVR Maestro + Syno Manager)

## [2026-03-21] - Portfolio Sub-Pages

### Added
- **Syno Manager landing page** (`/synology-manager/`) - Full product showcase with 12 screenshots, features, FAQ, legal disclaimer, security section
- **Elan Audio Lab landing page** (`/elan-audio-lab/`) - Full product showcase with 8 screenshots, features, tech stack, admin portal section
- Responsive screenshot carousel with arrows, dots, and swipe support
- Lightbox for screenshot zoom on both pages
- Hamburger menu for mobile navigation
- Legal trademark disclaimer for Synology (nominative fair use)
- Stats bars, tech stack grids, and admin portal showcases

### Changed
- Portfolio cards on main page now link to respective sub-pages
- Hero sections tightened (removed min-height: 85vh) so content below is visible on first load
- Fade-in animations show immediately for elements already in viewport

### Fixed
- Mobile nav wrapping issue (replaced with hamburger menu)
- Em dashes replaced with hyphens site-wide
- "iOS Widgets" renamed to "Widgets" on Syno Manager page
- Gallery scroll alignment (replaced with proper carousel)
- Invisible content below hero on first load (fade-in opacity fix)

## [2026-03-21] - Portfolio Links

### Added
- Google Play links to portfolio cards
- All Integrations link to UC-Remote card
- Home nav link and clickable brand

### Changed
- Store badges are clickable, not entire portfolio cards
- Reduced spacing, replaced em-dashes with single dashes
- Updated bio copy

## [2026-03-20] - Initial Launch

### Added
- Main landing page with hero, services, portfolio, about, contact sections
- Privacy policy page
- Terms of service page
- Dark theme with cyan/purple gradient accents
- Three portfolio cards: Elan Audio Lab, UC-Remote Integration Hub, Synology Manager
- Responsive design with fade-in scroll animations
- GitHub Pages deployment with custom domain (www.miyarahub.com)
