import { NextPage } from "next";
import { useEffect, useState } from "react";

interface PageViewsProps {
  slug: string;
}

const PageViews: NextPage<PageViewsProps> = ({ slug }) => {
  const [data, setData] = useState<{ total: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/views/${slug}`);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [slug]);

  return <>{data?.total ? `${data.total} views` : `–––`}</>;
};

export default PageViews;
