export function NxWelcome({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
       <h1 className="text-4xl text-primary font-bold border-b border-border pb-4">
         Tailwind Configurato: {title}
       </h1>
    </div>
  );
}
export default NxWelcome;