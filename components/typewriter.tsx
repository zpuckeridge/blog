"use client";

import Typewriter from "typewriter-effect";

export default function TypewriterEffect({ string }: { string: string }) {
  return (
    <p className="font-mono text-sm text-muted-foreground">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(string)

            //   .pauseFor(2500)
            //   .deleteAll()
            .start();
        }}
        options={{
          delay: 50,
        }}
      />
    </p>
  );
}
