import React from 'react';
import { PackageX } from 'lucide-react';

const EmptyState = ({ title, description }) => {
  return (
    <div className="empty-state">
      <PackageX size={48} className="empty-state__icon" />
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__description">{description}</p>
    </div>
  );
};

export default EmptyState;