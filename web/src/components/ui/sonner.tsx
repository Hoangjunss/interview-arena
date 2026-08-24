import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast bg-card text-card-foreground border border-border shadow-lg rounded-lg',
          description: 'text-muted-foreground',
          actionButton: 'bg-accent text-accent-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
        },
      }}
    />
  )
}

export { toast } from 'sonner'
