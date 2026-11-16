import ErrorPageContent from "@/components/error-page-content";

const NotFoundContent = () => (
  <ErrorPageContent
    code="404"
    message="Page could not be found."
    title="Error"
  />
);

export default NotFoundContent;
