import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function ContactSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 rounded-lg border-2 bg-neutral-900 w-full space-y-6">
        <h1 className="md:text-7xl sm:text-6xl text-5xl uppercase font-bold leading-none tracking-tight text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
          Contact Me
        </h1>
        <p className="text-lg">
          Got an awesome project you would like to work on together? I&apos;d
          love to hear all about it!
        </p>
      </div>
      <div className="w-full my-auto">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Label className="my-auto w-2/12">Name</Label>
            <Input placeholder="John Smith" className="w-10/12" />
          </div>
          <div className="flex gap-2">
            <Label className="my-auto w-2/12">Email</Label>
            <Input placeholder="john.smith@icloud.com" className="w-10/12" />
          </div>
          <div className="flex gap-2">
            <Label className="mt-3 w-2/12">Message</Label>
            <Textarea
              placeholder="Hey Zacc! I'm interested in working with you..."
              className="w-10/12"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" size="sm" variant="secondary">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
