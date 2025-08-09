export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-sky-50 to-sky-100 px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          🚀 Google Docs Editor Access
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Click the button below to open the Google Docs document in editor mode.
        </p>
        <div className="flex justify-center">
          <a
            href="https://docs.google.com/document/d/1ww3lHAMJD7lb_GMY12frPFRfn8hKdRwnRmaH1YUrLn4/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            Open in Google Docs (Edit Mode)
          </a>
        </div>
      </div>
    </main>
  );
}
