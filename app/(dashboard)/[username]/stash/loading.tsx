export default function Loading() {
  return (
    <div className="col-span-12 flex flex-col items center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="skeleton w-80 h-80"></div>
      </div>
    </div>
  )
}
