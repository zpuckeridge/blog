export default function Work() {
  return (
    <div className="mx-auto max-w-7xl py-32 px-4">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Work</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            I've been a web developer for around 3 years now, creating unique
            marketing, e-commerce and web applications for clients. Below is a
            selection of my work from the last few years.
          </p>
        </div>
        <div className="border rounded h-[600px]"></div>
        <div className="grid grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="border rounded h-[400px]"></div>
          <div className="border rounded h-[400px]"></div>
        </div>
      </div>
    </div>
  );
}
