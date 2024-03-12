import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorised",
  description: "Oops! That wasn't supposed to happen! 😳",
};

export default function Unauthorised() {
  return (
    <main className="mx-auto my-10 max-w-lg">
      <div className="text-center">
        <p className="text-lg font-semibold">
          Oops! That wasn{"'"}t supposed to happen! 😳
        </p>
        <p>You are not authorised to view this page.</p>
      </div>
    </main>
  );
}
