// GoogleZero hostname matching tests (illustrative).
// These assume IsBlockedNtpShortcutUrl is accessible (e.g. via a testable
// helper). In Chromium these would live in new_tab_page_handler_unittest.cc.

#include "testing/gtest/include/gtest/gtest.h"
#include "url/gurl.h"

// Re-declaration of the helper under test (see new_tab_page_handler.cc).
extern bool IsBlockedNtpShortcutUrlForTesting(const GURL& url);

TEST(GoogleZeroHostname, BlocksGoogleAndSubdomains) {
  EXPECT_TRUE(IsBlockedNtpShortcutUrlForTesting(GURL("https://google.com/")));
  EXPECT_TRUE(IsBlockedNtpShortcutUrlForTesting(GURL("https://www.google.com/")));
  EXPECT_TRUE(IsBlockedNtpShortcutUrlForTesting(GURL("https://mail.google.com/")));
}

TEST(GoogleZeroHostname, BlocksGoogleTld) {
  EXPECT_TRUE(IsBlockedNtpShortcutUrlForTesting(GURL("https://example.google/")));
}

TEST(GoogleZeroHostname, BlocksYouTube) {
  EXPECT_TRUE(IsBlockedNtpShortcutUrlForTesting(GURL("https://youtube.com/")));
  EXPECT_TRUE(IsBlockedNtpShortcutUrlForTesting(GURL("https://www.youtube.com/")));
  EXPECT_TRUE(IsBlockedNtpShortcutUrlForTesting(GURL("https://m.youtube.com/")));
  EXPECT_TRUE(IsBlockedNtpShortcutUrlForTesting(GURL("https://youtu.be/abc")));
  EXPECT_TRUE(IsBlockedNtpShortcutUrlForTesting(GURL("https://www.youtube-nocookie.com/embed/x")));
}

TEST(GoogleZeroHostname, AllowsUnrelated) {
  EXPECT_FALSE(IsBlockedNtpShortcutUrlForTesting(GURL("https://notgoogle.com/")));
  EXPECT_FALSE(IsBlockedNtpShortcutUrlForTesting(GURL("https://google.example/")));
  EXPECT_FALSE(IsBlockedNtpShortcutUrlForTesting(GURL("https://example.com/")));
  EXPECT_FALSE(IsBlockedNtpShortcutUrlForTesting(GURL("https://youtube.example/")));
}
