export default function Contact() {
  return (
    <main className="container-narrow py-12">
      <h1 className="text-3xl font-semibold mb-2">Contact</h1>
      <p className="text-gray-600 mb-6">For bespoke orders and wholesale inquiries, please leave a message.</p>
      <form className="card max-w-2xl">
        <label className="block mb-3">
          <span className="text-sm">Name</span>
          <input className="mt-1 w-full rounded-xl border p-3" placeholder="Your name" />
        </label>
        <label className="block mb-3">
          <span className="text-sm">Email</span>
          <input className="mt-1 w-full rounded-xl border p-3" placeholder="you@example.com" />
        </label>
        <label className="block mb-3">
          <span className="text-sm">Message</span>
          <textarea className="mt-1 w-full rounded-xl border p-3 min-h-[140px]" placeholder="Tell us about your request" />
        </label>
        <button type="button" className="btn btn-primary mt-2">Send</button>
      </form>
    </main>
  )
}
