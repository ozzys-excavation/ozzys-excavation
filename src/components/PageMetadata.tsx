import { useEffect } from "react";
import { setMeta, setCanonical } from "../utils/seo-helpers";

export default function PageMetadata({
  title,
  description,
  keywords,
  url,
}: {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
}) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    if (keywords?.length) setMeta("keywords", keywords.join(", "));
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", url, true);
    setCanonical(url);
  }, [title, description, keywords, url]);
  return null;
}
