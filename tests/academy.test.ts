import test from "node:test";
import assert from "node:assert/strict";
import {
  programmes,
  academyMessage,
  academyEnquiryUrl,
  validateAcademy,
  experiences,
} from "../src/lib/academy.ts";

test("Academy catalogue retains approved standalone programmes and certificate boundaries", () => {
  assert.deepEqual(
    programmes.map((p) => [p.id, p.duration, p.feeNaira]),
    [
      ["foundation", "4 Weeks", 110000],
      ["professional", "8 Weeks", 150000],
      ["master", "3 Months", 280000],
      ["elite", "6 Months", 550000],
      ["executive", "1 Year", 1000000],
    ],
  );
  assert.deepEqual(
    programmes.map((p) =>
      p.curriculumGroups.reduce((sum, g) => sum + g.items.length, 0),
    ),
    [9, 10, 11, 20, 3],
  );
  assert.deepEqual(
    programmes.slice(0, 4).map((p) => p.certificateTitle),
    [
      "UrbanCut Foundation Certificate",
      "UrbanCut Professional Barber Certificate",
      "UrbanCut Certified Master Barber",
      "UrbanCut Elite Professional Certificate",
    ],
  );
  assert.equal(programmes[4].certificateTitle, undefined);
});
test("Academy validates whitespace and experience without restricting ordinary names or direct entry", () => {
  assert.ok(validateAcademy({ name: "  ", experience: "", notes: "" }).name);
  assert.ok(
    validateAcademy({ name: "Alex", experience: "unsupported", notes: "" })
      .experience,
  );
  for (const experience of experiences)
    for (const p of programmes) {
      assert.ok(
        academyMessage(p.id, {
          name: "Élodie O’Neil-Smith",
          experience,
          notes: "",
        }),
      );
    }
  assert.equal(
    academyMessage("unknown", {
      name: "Alex",
      experience: experiences[0],
      notes: "",
    }),
    null,
  );
  assert.equal(
    academyEnquiryUrl("foundation", {
      name: " ",
      experience: experiences[0],
      notes: "",
    }),
    null,
  );
});
test("Every Academy handoff derives current fee and duration and safely round-trips punctuation", () => {
  const draft = {
    name: "  Élodie O'Neil & Co  ",
    experience: experiences[0],
    notes: "What’s next?\nTools & timing + fees = details?",
  };
  for (const p of programmes) {
    const url = new URL(academyEnquiryUrl(p.id, draft)!);
    assert.equal(url.origin + url.pathname, "https://wa.me/2347063291013");
    const message = url.searchParams.get("text")!;
    assert.equal(message, academyMessage(p.id, draft));
    assert.ok(
      message.includes(
        `Programme: ${p.name}${p.subtitle ? ` — ${p.subtitle}` : ""}`,
      ),
    );
    assert.ok(message.includes(`Duration: ${p.duration}`));
    assert.ok(message.includes(`Fee: ₦${p.feeNaira.toLocaleString("en-NG")}`));
    assert.ok(message.includes("Name: Élodie O'Neil & Co"));
    assert.ok(message.includes(draft.notes));
    assert.ok(
      !academyMessage(p.id, { ...draft, notes: " \n " })!.includes(
        "Questions:",
      ),
    );
  }
});
