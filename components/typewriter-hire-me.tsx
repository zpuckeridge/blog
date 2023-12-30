"use client";

import Typewriter from "typewriter-effect";

export default function TypewriterEffectHireMe() {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .pauseFor(1000)
          .typeString("Ready to get building?")
          .pauseFor(1000)
          .deleteChars(9)
          .typeString("creating?")
          .pauseFor(1000)
          .deleteChars(9)
          .typeString("designing?")
          .pauseFor(1000)
          .deleteChars(10)
          .typeString("establishing?")
          .pauseFor(1000)
          .deleteChars(13)
          .typeString("selling?")
          .pauseFor(1000)
          .deleteChars(8)
          .start();
      }}
      options={{
        delay: 50,
        loop: true,
      }}
    />
  );
}
