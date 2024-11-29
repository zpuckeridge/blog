export default function Work() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-40">
      <div className="space-y-20">
        <div className="lg:flex lg:flex-row flex-col gap-8">
          <div className="space-y-4 lg:w-2/3">
            <p className="font-semibold text-lg text-muted-foreground">
              haddoninstitute.org
            </p>

            <div className="max-w-4xl">
              Building a Student Portal and Seminary website to save the world.
            </div>

            <div className="flex gap-8">
              <p className="font-semibold text-lg">
                <span className="text-muted-foreground">Role</span> Web
                Developer
              </p>
              <p className="font-semibold text-lg">
                <span className="text-muted-foreground">Client</span> 61 Oaks
                Group
              </p>
              <p className="font-semibold text-lg">
                <span className="text-muted-foreground">Duration</span>{" "}
                2023—Present
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 max-w-xl">
          <p className="font-semibold text-lg text-muted-foreground">Project</p>
          <h2 className="font-bold text-2xl">
            A Reformed seminary in Australia? Yes, please.
          </h2>
          <p className="text-lg ">
            In October 2023, Keith (Haddon&apos;s President) approached me
            looking to develop a website for the Haddon Institute to{" "}
            <span className="font-bold">
              help get it off the ground and put some momentum in its sails
            </span>
            . What initially started off as a simple website has now grown into
            a fully fledged student portal and seminary website. From accepting
            applications to providing students with a platform to access their
            course material, upload assessment, and staff with their own portal
            to grade and provide feedback.
          </p>
        </div>

        <div className="space-y-4 max-w-xl">
          <p className="font-semibold text-lg text-muted-foreground">
            Initial task
          </p>
          <h2 className="font-bold text-2xl">
            Crafting a professional, yet unique design for the website.
          </h2>
          <p className="text-lg ">
            It was critically important that we nailed the initial design of the
            website, primarily so that we could focus on disemminating the site
            amongst our socials. We needed something that was clean, easy to
            understand and navigate, and most importantly, something that was
            mobile responsive. Our first course was starting in December, so we
            needed to let students know that they were engaging a serious
            institution, not a mum and pop shop.
          </p>
        </div>

        <div className="space-y-4 max-w-xl">
          <p className="font-semibold text-lg text-muted-foreground">
            Application process
          </p>
          <h2 className="font-bold text-2xl">
            Building an application process that was easy to use and understand.
          </h2>
          <p className="text-lg ">
            All of this work was for naught if we had no students to teach. My
            next focus was to build an application process that was easy to use
            and understand. Initially, I started to building a form myself, but
            with the limited timeframe I had, I decided to use Tally forms.
            Which is actually a surprisingly great tool for this sort of thing.
            I highly recommend it for guaranteeing a great user experience.
          </p>
        </div>

        <div className="space-y-4 max-w-xl">
          <p className="font-semibold text-lg text-muted-foreground">
            Student experience
          </p>
          <h2 className="font-bold text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada.
          </h2>
          <p className="text-lg ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada, nunc non commodo vestibulum, metus libero fermentum
            turpis, ut feugiat odio met.
          </p>
        </div>

        <div className="space-y-4 max-w-xl">
          <p className="font-semibold text-lg text-muted-foreground">
            Staff experience
          </p>
          <h2 className="font-bold text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada.
          </h2>
          <p className="text-lg ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada, nunc non commodo vestibulum, metus libero fermentum
            turpis, ut feugiat odio met.
          </p>
        </div>

        <div className="space-y-4 max-w-xl">
          <p className="font-semibold text-lg text-muted-foreground">
            Key takeaways
          </p>
          <h2 className="font-bold text-2xl">
            Secure File uploads are hard—and third-party auth can be unreliable.
          </h2>
          <p className="text-lg ">
            Took a long time to get file uploads worked out, ran into issues
            with MS as an auth provider in clerk.
          </p>

          <h2 className="font-bold text-2xl">
            Planning goes a lot further than I originally gave it credit for.
          </h2>

          <p className="text-lg ">
            I must have rewritten the initial project three times before I
            settled on a design/general infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
}
