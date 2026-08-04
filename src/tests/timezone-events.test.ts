import assert from "node:assert";
import { describe, test } from "node:test";

import { icsFilter } from "../index.js";

const now = new Date("2026-08-03T20:00:00.000Z");
const max = new Date("2026-08-04T07:00:00.000Z");
// 13:00 US/Pacific is 20:00 UTC; compare the local date, not the raw time string.
const content = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:pacific-event@test
DTSTART;TZID=US/Pacific:20260803T130000
DTEND;TZID=US/Pacific:20260803T140000
SUMMARY:Physical Therapy
END:VEVENT
END:VCALENDAR
`;

describe("icsFilter with timezone-aware events", () => {
  test("keeps TZID events near a UTC date boundary", () => {
    const filteredContent = icsFilter(content, now, max);

    assert.match(filteredContent, /SUMMARY:Physical Therapy/);
  });
});
