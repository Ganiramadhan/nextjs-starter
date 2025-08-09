"use client";

import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-white to-gray-100 text-gray-800">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          🚀 Welcome to GaniPedia
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This project is built with modern web tools and practices.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-10">
          <FeatureItem
            title="TypeScript Support"
            desc="Write safer and more scalable code with TypeScript."
          />
          <FeatureItem
            title="ESLint Integration"
            desc="Ensure code quality with built-in linting."
          />
          <FeatureItem
            title="JWT Authentication"
            desc="Secure authentication using JSON Web Tokens."
          />
          <FeatureItem
            title="Redux Toolkit"
            desc="Manage application state efficiently."
          />
          <FeatureItem
            title="Husky Hooks"
            desc="Automate code quality checks before commits."
          />
          <FeatureItem
            title="CI/CD Deployment"
            desc="Automate testing and deployment with GitHub Actions."
          />
        </div>

        <Button href="/login" variant="primary" size="md">
          Get Started
        </Button>
      </div>
    </main>
  );
}

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
