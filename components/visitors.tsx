export default async function Visitors() {
  const visitors = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/visitors`,
  ).then((res) => res.json());

  return (
    <div className="flex gap-2 my-auto">
      <div className="w-2.5 h-2.5 animate-pulse rounded-full my-auto bg-green-500" />

      <p className="text-xs text-nowrap text-muted-foreground">
        {visitors.visitors} active{" "}
        {visitors.visitors > 1 ? "visitors" : "visitor (that's you!)"}
      </p>
    </div>
  );
}
