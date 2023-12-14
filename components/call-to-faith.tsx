"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function CallToFaith() {
  return (
    <Splide
      options={{
        type: "loop",
        rewind: true,
        autoplay: true,
        interval: 7000,
        arrows: false,
        height: "30vh",
      }}
      aria-label="Slider"
    >
      <SplideSlide>
        <div className="flex items-center justify-center w-full h-full border-2 rounded-lg bg-neutral-900">
          <div className="mx-auto my-auto text-center max-w-7xl px-8">
            <p className="text-lg">
              For all have sinned and fall short of the glory of God.
            </p>
            <p className="absolute top-4 left-4  select-none dark:text-muted-foreground text-black">
              1 / 7
            </p>
            <p className="absolute bottom-4 left-4  select-none dark:text-muted-foreground text-black">
              ESV
            </p>
            <p className="absolute bottom-4 right-4  select-none dark:text-muted-foreground text-black">
              Romans 3:23
            </p>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div className="flex items-center justify-center w-full h-full border-2 rounded-lg bg-neutral-900">
          <div className="mx-auto my-auto text-center max-w-7xl px-8">
            <p className="text-lg">
              For the wages of sin is death, but the free gift of God is eternal
              life in Christ Jesus our Lord!
            </p>
            <p className="absolute top-4 left-4  select-none dark:text-muted-foreground text-black">
              2 / 7
            </p>
            <p className="absolute bottom-4 left-4  select-none dark:text-muted-foreground text-black">
              ESV
            </p>
            <p className="absolute bottom-4 right-4  select-none dark:text-muted-foreground text-black">
              Romans 6:23
            </p>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div className="flex items-center justify-center w-full h-full border-2 rounded-lg bg-neutral-900">
          <div className="mx-auto my-auto text-center max-w-7xl px-8">
            <p className="text-lg">
              God shows his love for us in that while we were still sinners,
              Christ died for us!
            </p>
            <p className="absolute top-4 left-4  select-none dark:text-muted-foreground text-black">
              3 / 7
            </p>
            <p className="absolute bottom-4 left-4  select-none dark:text-muted-foreground text-black">
              ESV
            </p>
            <p className="absolute bottom-4 right-4  select-none dark:text-muted-foreground text-black">
              Romans 5:8
            </p>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div className="flex items-center justify-center w-full h-full border-2 rounded-lg bg-neutral-900">
          <div className="mx-auto my-auto text-center max-w-7xl px-8">
            <p className="text-lg">
              If you confess with your mouth that Jesus is Lord and believe in
              your heart that God raised him from the dead, you will be saved!
            </p>
            <p className="absolute top-4 left-4  select-none dark:text-muted-foreground text-black">
              4 / 7
            </p>
            <p className="absolute bottom-4 left-4  select-none dark:text-muted-foreground text-black">
              ESV
            </p>
            <p className="absolute bottom-4 right-4  select-none dark:text-muted-foreground text-black">
              Romans 10:9
            </p>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div className="flex items-center justify-center w-full h-full border-2 rounded-lg bg-neutral-900">
          <div className="mx-auto my-auto text-center  max-w-7xl px-8">
            <p className="text-lg">
              For everyone who calls on the name of the Lord will be saved.
            </p>
            <p className="absolute top-4 left-4  select-none dark:text-muted-foreground text-black">
              5 / 7
            </p>
            <p className="absolute bottom-4 left-4  select-none dark:text-muted-foreground text-black">
              ESV
            </p>
            <p className="absolute bottom-4 right-4  select-none dark:text-muted-foreground text-black">
              Romans 10:13
            </p>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div className="flex items-center justify-center w-full h-full border-2 rounded-lg bg-neutral-900">
          <div className="mx-auto my-auto text-center max-w-7xl px-8">
            <p className="text-lg">
              Therefore, since we have been justified by faith, we have peace
              with God through our Lord Jesus Christ.
            </p>
            <p className="absolute top-4 left-4  select-none dark:text-muted-foreground text-black">
              6 / 7
            </p>
            <p className="absolute bottom-4 left-4  select-none dark:text-muted-foreground text-black">
              ESV
            </p>
            <p className="absolute bottom-4 right-4  select-none dark:text-muted-foreground text-black">
              Romans 5:1
            </p>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div className="flex items-center justify-center w-full h-full border-2 rounded-lg bg-neutral-900">
          <div className="mx-auto my-auto text-center max-w-7xl px-8">
            <p className="text-lg">
              There is therefore now no condemnation for those who are in Christ
              Jesus!
            </p>
            <p className="absolute top-4 left-4  select-none dark:text-muted-foreground text-black">
              7 / 7
            </p>
            <p className="absolute bottom-4 left-4  select-none dark:text-muted-foreground text-black">
              ESV
            </p>
            <p className="absolute bottom-4 right-4  select-none dark:text-muted-foreground text-black">
              Romans 8:1
            </p>
          </div>
        </div>
      </SplideSlide>
    </Splide>
  );
}
