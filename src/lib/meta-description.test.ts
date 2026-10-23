import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  descriptionForPost,
  fitMetaDescription,
  META_DESCRIPTION_MAX,
  META_DESCRIPTION_MIN,
} from "./meta-description.ts";

const inRange = (value: string): void => {
  assert.ok(
    value.length >= META_DESCRIPTION_MIN &&
      value.length <= META_DESCRIPTION_MAX,
    `${value.length}: ${value}`
  );
};

describe("fitMetaDescription", () => {
  it("keeps copy that is already in range", () => {
    const value =
      "Web developer and writer in Brisbane. IT Operations Lead at Star Compass and Haddon Institute; also runs obambulo studio.";
    assert.equal(fitMetaDescription(value), value);
    inRange(value);
  });

  it("trims a long description on a word boundary", () => {
    const value = "a".repeat(40);
    const long = `${value} ${"word ".repeat(40)}and the rest of the sentence that should be cut.`;
    const fitted = fitMetaDescription(long);
    inRange(fitted);
    assert.equal(fitted.endsWith(" "), false);
  });

  it("pads a short description", () => {
    inRange(
      fitMetaDescription(
        "An overview of my work experience and education as a Web Developer and IT Administrator."
      )
    );
  });

  it("fits the timeline and about descriptions", () => {
    inRange(
      fitMetaDescription(
        "Welcome to my personal corner of the internet. Here you'll find posts about my faith, technology I'm interested in, random notes, code snippets and other things happening in my life."
      )
    );
    inRange(
      fitMetaDescription(
        "I'm a 30 year old Reformed Baptist born and raised in Australia. Since childhood, I've had a natural affinity for computers, diving deep into video games, tinkering and taking apart old computers."
      )
    );
  });
});

describe("descriptionForPost", () => {
  it("uses the slug override only while the CMS description is out of range", () => {
    const age = descriptionForPost(
      "react-based-age-calculator",
      "Calculate age from a birthdate."
    );
    const goofy = descriptionForPost(
      "ive-been-inspired-by-a-goofy-movie",
      "Why I enjoyed A Goofy Movie."
    );
    inRange(age);
    inRange(goofy);
    assert.match(age, /birthdate/u);
    assert.match(goofy, /Goofy Movie/u);

    const cms =
      "Calculate an age from a birthdate in this small React calculator, a short build note by Zacchary Puckeridge in Brisbane.";
    assert.equal(descriptionForPost("react-based-age-calculator", cms), cms);
  });

  it("trims the long Rhodesia description instead of replacing it", () => {
    const raw =
      "A short life of Dr Jim Dearmore, Rhodesia's Baptist missionary, and the churches, schools, and clinics that grew from his work among the people he served for decades.";
    const fitted = descriptionForPost(
      "rhodesias-baptist-missionary-dr-jim-dearmore",
      `${raw} ${raw}`
    );
    inRange(fitted);
    assert.match(fitted, /Dearmore/u);
  });
});
