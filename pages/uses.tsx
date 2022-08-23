import { NextSeo } from "next-seo";

export default function About() {
  return (
    <>
      <NextSeo
        title="About | Zacchary Puckeridge"
        description="Learn more about Zacchary Puckeridge"
      />
      <div className="mt-20 flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-black dark:text-white">
          Uses
        </h1>
        <h2 className="text-gray-700 dark:text-gray-200 mb-4 mt-4">
          A list of the tools that I use on a regular basis.
        </h2>
        <div>
          <h5 className="text-2xl font-bold mt-5">Hardware</h5>I am currently
          dual booting POP!_OS and Windows 11. My workstation specifications
          are:
          <ul className="mt-5 list-disc">
            <li>CPU: Ryzen 7 5800X</li>
            <li>GPU: AMD RX 6600XT</li>
            <li>RAM: Corsair 2 x 32GB DDR4-3200MHz</li>
            <li>MBO: ASUS ROG STRIX X570-I</li>
            <li>SSD: 2x 1TB Samsung 980 Pro</li>
          </ul>
          For audio, {"I'm"} using the following:
          <ul className="list-disc">
            <li>Amplification: Focusrite Scarlett Solo</li>
            <li>Microphone: Audio-Technica AT2020 Cardioid Condenser</li>
            <li>
              Headphones: Beyerdynamic DT 770 + Koss KPH30i + Audio-Technica
              ATH-AD700X
            </li>
          </ul>
          <h5 className="text-2xl font-bold mt-5">Gadgets</h5>
          <h5 className="text-2xl font-bold mt-5">Editor & Terminal</h5>
          <h5 className="text-2xl font-bold mt-5">Tools</h5>
          <h5 className="text-2xl font-bold mt-5">
            DevOps Tech Stack (Learning)
          </h5>
          <h5 className="text-2xl font-bold mt-5">
            WebDev Tech Stack (Learning)
          </h5>
        </div>
      </div>
    </>
  );
}
