import useSWR from "swr";
import { FC } from "react";

interface PageViewsProps {
  slug: string;
}

const fetcher = async (input: RequestInfo) => {
  const res: Response = await fetch(input);
  return await res.json();
};

const PageViews: FC<PageViewsProps> = ({ slug }) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);

  return <>{data?.total ? `${data.total} views` : `–––`}</>;
};

export default PageViews;
