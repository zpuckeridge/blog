import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>Uses | Zacchary Puckeridge</title>
        <meta
          name="description"
          content="Check out what I'm using on my day to day!"
        />
      </Head>
      <div className="mt-20 flex flex-col justify-center max-w-2xl mx-auto mb-20 text-white">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-white">
          Uses
        </h1>
        <h2 className="text-white mb-4 mt-4">
          A list of the hardware and software that I use on a regular basis.
        </h2>
        <div className="md:inline-flex gap-4">
          <div className="bg-white/5 p-4 rounded-lg border border-zinc-800/50">
            <h3 className="text-2xl font-bold">Hardware</h3>I am currently dual
            booting POP!_OS and Windows 11. My workstation specifications are:
            <ul className="mt-4 mb-4">
              <li>
                <span className="font-semibold">CPU:</span> Ryzen 7 5800X
              </li>
              <li>
                <span className="font-semibold">GPU:</span> AMD RX 6600XT
              </li>
              <li>
                <span className="font-semibold">RAM:</span> Corsair 2 x 32GB
                DDR4-3200MHz
              </li>
              <li>
                <span className="font-semibold">MBO:</span> ASUS ROG STRIX
                X570-I
              </li>
              <li>
                <span className="font-semibold">SSD:</span> 2x 1TB Samsung 980
                Pro
              </li>
            </ul>
            For audio, {"I'm"} using the following:
            <ul className="mt-4">
              <li>
                <span className="font-semibold">Amplifier:</span> Focusrite
                Scarlett Solo
              </li>
              <li>
                <span className="font-semibold">Microphone:</span>{" "}
                Audio-Technica AT2020 Cardioid Condenser
              </li>
              <li>
                <span className="font-semibold">Headphones:</span> Beyerdynamic
                DT 770 + Koss KPH30i + Audio-Technica ATH-AD700X
              </li>
            </ul>
          </div>
          <div className="md:mt-0 mt-4 bg-white/5 p-4 rounded-lg border border-zinc-800/50">
            <h3 className="text-2xl font-bold">Gadgets</h3>
            <ul>
              <li>
                <span className="font-semibold">Phone:</span> Google Pixel 6
                (GrapheneOS)
              </li>
            </ul>
          </div>
        </div>
        <div className="md:inline-flex gap-4 mt-4">
          <div className="bg-white/5 p-4 rounded-lg border border-zinc-800/50">
            <h3 className="text-2xl font-bold">Editor & Terminal</h3>
            <ul>
              <li>
                <span className="font-semibold">Editor:</span> Visual Studio
                Code
              </li>
              <li>
                <span className="font-semibold">Terminal:</span> ZSH themed with
                Oh My Zsh
              </li>
            </ul>
          </div>
          <div className="md:mt-0 mt-4 bg-white/5 p-4 rounded-lg border border-zinc-800/50">
            <h3 className="text-2xl font-bold">Tools</h3>
            <ul>
              <li>
                <span className="font-semibold">Web Browser:</span> Librewolf
                and Brave. These are both great privacy respecting choices that
                allow me to develop for both platforms.
              </li>
              <li>
                <span className="font-semibold">Password Manager:</span>{" "}
                Bitwarden
              </li>
              <li>
                <span className="font-semibold">
                  Two Factor Authentication:
                </span>{" "}
                Aegis Authenticator
              </li>
              <li>
                <span className="font-semibold">Stack Detection:</span>{" "}
                Wappalyzer
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
