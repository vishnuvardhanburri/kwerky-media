import { LiveQueryProvider } from "@sanity/preview-kit";
import { sanityClient, sanityToken, isPreviewMode } from "@/lib/sanity";

const PreviewProvider = ({ children }) => {
  if (!isPreviewMode || !sanityClient) {
    return children;
  }

  return (
    <LiveQueryProvider client={sanityClient} token={sanityToken}>
      {children}
    </LiveQueryProvider>
  );
};

export default PreviewProvider;
