export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-40 rounded-md bg-muted" />
      <div className="h-10 w-full rounded-xl bg-muted" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-48 rounded-xl bg-muted" />
        <div className="h-48 rounded-xl bg-muted" />
      </div>
    </div>
  )
}
