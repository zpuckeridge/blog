export default function Home() {
  return (
    <div className="grid h-screen place-items-center">
      {/* <div className="flex items-stretch w-128">
        <img
          class="object-cover w-full h-56 w-56 shadow-xl rounded-xl"
          src="./images/profile-pic.jpg"
          alt=""
        />
      </div> */}
      <div class="p-4">
        <h5 class="text-6xl font-bold text-gray-900 text-center">
          Hey 👋 I'm{" "}
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Zacc,
          </span>
          <div className="">a developer</div>
        </h5>
        <p class="font-bold pt-5 text-lg text-gray-400">
          I'm a 22 year old IT Administrator & Web Developer working for{" "}
          <a
            href="https://rsp.com.au"
            className="text-blue-400 hover:text-green-300"
          >
            Rising Sun Pictures
          </a>
        </p>
      </div>
    </div>
  );
}
