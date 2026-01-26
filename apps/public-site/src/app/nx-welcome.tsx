import { Button } from '@json-pages/ui';

export function NxWelcome({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
       <h1 className="text-4xl text-primary font-bold border-b border-border pb-4">
         Tailwind Configurato: {title}
       </h1>
       {/* Test del Componente Shared */}
       <Button>Shared UI Button</Button>
       <Button variant="destructive">Destructive</Button>
       <Button variant="outline">Outline</Button>
    </div>
  );
}
export default NxWelcome;