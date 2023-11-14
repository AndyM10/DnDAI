export default async function Home() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Greetings Adventurer</h1>
          <p className="py-6">
            Welcome to DnD.AI, a place where you can generate your own character art for your DnD campaigns.
          </p>
          <a role="button" className="btn btn-primary" href="/login">Lets Get Started</a>
        </div>
      </div>
    </div>
  )
}
