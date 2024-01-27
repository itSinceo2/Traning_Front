import DOMPurify from 'dompurify';

const TextFormatToShow = ({ htmlContent }) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent);

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
  );
};

export default TextFormatToShow;
