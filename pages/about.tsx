export default function About() {
  return (
    <div className="mt-10 mb-10">
      <h5 className="text-4xl font-bold">🤔 About Zacchary Puckeridge</h5>
      <p className="text-lg">
        Hey there! I'm a 22 year old IT Administrator & Web Developer based out
        of Brisbane, Australia. Currently, I'm working for a VFX Studio called{" "}
        <a
          href="https://rsp.com.au"
          className="text-blue-400 hover:text-green-300"
        >
          Rising Sun Pictures
        </a>
        .
      </p>
      <div>
        <h5 className="text-2xl font-bold">What are you currently learning?</h5>
        <div>
          <p>
            Currently, I'm building tools to automate various processes at RSP
            as well as designing and deploying networking solutions.
          </p>
        </div>
        <div>
          <p>
            When I'm not at work, or working on a personal project, I'm hanging
            out with mates, riding motorcycles, playing video games, nerding out
            over audio and teaching myself animation.
          </p>
        </div>
      </div>
    </div>
  );
}
