import ErrorPageContent from "@/components/error-page-content";

const GoneContent = () => (
  <ErrorPageContent
    code="410"
    message="This content has been permanently removed."
    title="Gone"
  />
);

export default GoneContent;
