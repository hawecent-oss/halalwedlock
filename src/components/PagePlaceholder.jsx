import React from 'react';

const PagePlaceholder = ({ title }) => {
  return (
    <div className="section container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ marginBottom: 'var(--spacing-md)' }}>{title}</h1>
      <p>This page is currently under development to ensure it meets our high standards of Halal compliance and professional excellence.</p>
    </div>
  );
};

export default PagePlaceholder;
