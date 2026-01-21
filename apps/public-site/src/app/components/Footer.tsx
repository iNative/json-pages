import React from 'react';
import { useFooter } from './Footer.hooks';

export const Footer: React.FC = () => {
  const { currentYear, siteTitle } = useFooter();

  return (
    <footer className="border-t border-border bg-background py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} {siteTitle} Team. Crafted with care.
        </p>
      </div>
    </footer>
  );
};