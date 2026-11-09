# GoogleZero Chromium NTP patch

## Modified files
- chrome/browser/ui/webui/new_tab_page/new_tab_page_handler.cc
- chrome/browser/search/instant_service.cc

## Build instructions (Chromium)
1. Obtain a Chromium source tree matching the supplied version.
2. Copy the modified files over the originals at the paths above.
3. Configure: `gn gen out/Default`
4. Build: `autoninja -C out/Default chrome`
5. (Optional) Build tests: `autoninja -C out/Default unit_tests`

## Notes
- Default for kNtpUseMostVisitedTiles remains false (Custom Links / manual shortcuts).
- Existing profiles are not migrated automatically; see limitations.
