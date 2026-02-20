"use client"

import Link from "next/link"
import {
  CheckCircle,
  ShoppingCart,
  BarChart3,
  CreditCard,
  Store,
} from "lucide-react"
import { brandConfig } from "@/config/brand.config"


export default function Home() {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className={`min-h-screen flex items-center justify-center bg-gradient-to-r ${brandConfig.gradientFrom} ${brandConfig.gradientTo} text-white px-6`}>
        <div className="max-w-6xl text-center">

          <h1 className="text-5xl font-bold leading-tight">{brandConfig.tagline}</h1>

          <p className="mt-6 text-lg opacity-90">
            IvoryTable helps restaurants, retail stores & cafes
            manage billing, GST, inventory and sales — all in one place.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/login"
              className={`bg-white text-${brandConfig.primaryColor}-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition`}
            >
              Get Started
            </Link>

            <Link
              href="/subscriptions"
              className={`${brandConfig.primaryButton} text-white px-6 py-3 rounded-lg hover:bg-white/10 transition`}
            >

              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            Powerful Features Built for India
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<ShoppingCart />}
              title="Fast Billing"
              description="Create orders instantly with our smart POS interface."
            />
            <FeatureCard
              icon={<BarChart3 />}
              title="Real-Time Analytics"
              description="Track sales, revenue & performance with live dashboard."
            />
            <FeatureCard
              icon={<CreditCard />}
              title="GST Ready"
              description="Automatic GST calculation & invoice generation."
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Everything You Need To Run Your Store
            </h2>

            <ul className="space-y-4">
              <ServiceItem text="Multi-vendor SaaS architecture" />
              <ServiceItem text="Inventory & stock management" />
              <ServiceItem text="Invoice prefix & custom GST %" />
              <ServiceItem text="Subscription-based billing model" />
              <ServiceItem text="Secure role-based access" />
            </ul>
          </div>

          <div className={`bg-${brandConfig.primaryColor}-100 p-10 rounded-2xl shadow-sm`}>
            <Store size={48} className={`text-${brandConfig.primaryColor}-600 mb-4`} />
            <h3 className="text-xl font-semibold mb-3">
              Built for Restaurants & Retail
            </h3>
            <p className="text-gray-700">
              Whether you run a small cafe or a growing retail store,
              IvoryTable scales with your business.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900 text-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            How IvoryTable Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              step="01"
              title="Sign Up"
              description="Create your vendor account in minutes."
            />
            <StepCard
              step="02"
              title="Setup Store"
              description="Add GST, products, and store details."
            />
            <StepCard
              step="03"
              title="Start Billing"
              description="Begin generating invoices instantly."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Simplify Your Business?
        </h2>
        <p className="text-gray-600 mb-8">
          Join hundreds of vendors managing their stores with IvoryTable.
        </p>

        <Link
          href="/register"
          className={`bg-${brandConfig.primaryColor}-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-${brandConfig.primaryColor}-700 transition`}
        >
          Start Free Trial
        </Link>
      </section>



      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-sm text-gray-500">
        &#xA9; {new Date().getFullYear()} {brandConfig.name}. {brandConfig.footerText}
      </footer>

    </div>
  )
}

/* ---------------- Components ---------------- */

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition">
      <div className={`text-${brandConfig.primaryColor}-600 mb-4`}>{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function ServiceItem({ text }: any) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle className={`text-${brandConfig.primaryColor}-600`} size={18} />
      <span>{text}</span>
    </li>
  )
}

function StepCard({ step, title, description }: any) {
  return (
    <div className="bg-gray-800 p-8 rounded-2xl">
      <div className={`text-${brandConfig.primaryColor}-400 text-2xl font-bold mb-4`}>
        {step}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
