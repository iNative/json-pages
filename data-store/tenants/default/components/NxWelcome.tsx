import React from 'react';
import { Button } from '@json-pages/ui';

export const NxWelcome = ({ title }: { title: string }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-6 p-8 bg-muted/20 rounded-xl border border-dashed border-border mt-8 bg-red-600/10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance text-primary">
         Taxing Laughter: The Joke Tax Chronicles
       </h1> 
       <h1 className="text-3xl text-primary font-bold">
         Silo Component: {title}
       </h1>
       <p className="text-muted-foreground text-center max-w-md">
         Questo componente vive dentro <code>data-store/tenants/default</code> 
         ma usa la UI Shared.
       </p>
       
       <div className="flex gap-4">
         <Button>Shadcn Primary</Button>
         <Button variant="destructive">Destructive</Button>
         <Button variant="outline">Outline</Button>
       </div>
    </div>
  );
};

export default NxWelcome;

