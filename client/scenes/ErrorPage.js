import React from 'react';
import DocumentMeta from 'react-document-meta';

const ErrorPage = () => {
  return (
    <section className="error-page">
      <DocumentMeta
        title="404"
      />
      <div>
        <h1>404</h1>
        <p>Uh oh! This page could not be found!</p>
      </div>
    </section>
  )
};

export default ErrorPage;
