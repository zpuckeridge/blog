import Image from "next/image";

export default function Media() {
  return (
    <>
      <div className="relative h-full w-full p-4">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="/hit-monkey.jpg"
            width={125}
            height={125}
            alt="Hit Monkey"
            className="absolute z-40 -rotate-[10deg] mr-[120px] mt-8 rounded-lg shadow-2xl"
          />
          <Image
            src="/hit-monkey.jpg"
            width={125}
            height={125}
            alt="Hit Monkey"
            className="absolute z-50 rounded-lg shadow-2xl"
          />
          <Image
            src="/hit-monkey.jpg"
            width={125}
            height={125}
            alt="Hit Monkey"
            className="absolute z-30 rotate-[10deg] ml-[120px] mt-12 rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </>
  );
}
