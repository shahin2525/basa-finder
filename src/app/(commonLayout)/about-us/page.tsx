import React from "react";
import Image from "next/image";
import { DollarSign, Handshake, Home, Phone } from "lucide-react";
// import {
//   FaHome,
//   FaHandshake,
//   FaSearchDollar,
//   FaMobileAlt,
// } from "react-icons/fa";
import logo from "@/assets/svgs/logo.png";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Basa Finder
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Bridging the gap between landlords and tenants with simplicity and
            trust
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Basa Finder was born out of a simple observation - finding rental
              housing should be easier, more transparent, and accessible to
              everyone. In 2023, our team set out to create a platform that
              would revolutionize how people connect for housing needs.
            </p>
            <p className="text-gray-600">
              What started as a small project has now grown into a trusted
              community of thousands of landlords and tenants across the
              country, all benefiting from our simple, secure, and efficient
              platform.
            </p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={logo}
              // height={100}
              // width={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Basa Finder Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <Home className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Simplify Rentals</h3>
              <p className="text-gray-600">
                Make the rental process straightforward for both landlords and
                tenants
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <Handshake className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Build Trust</h3>
              <p className="text-gray-600">
                Create a transparent platform where both parties feel secure
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <DollarSign className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Save Time & Money</h3>
              <p className="text-gray-600">
                Reduce the costs and hassles associated with traditional renting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How Basa Finder Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">List or Search</h3>
            <p className="text-gray-600">
              Landlords post properties with details. Tenants search with
              filters.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Connect</h3>
            <p className="text-gray-600">
              Direct communication between parties through our secure platform.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Agree & Move In</h3>
            <p className="text-gray-600">
              Finalize terms and complete the rental process smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Basa Finder
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Phone className="text-blue-600 text-2xl mb-3" />
              <h3 className="font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-gray-600 text-sm">
                Access our platform anytime, anywhere from any device
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-600 text-2xl mb-3">$</div>
              <h3 className="font-semibold mb-2">Cost Effective</h3>
              <p className="text-gray-600 text-sm">
                No middlemen means lower costs for both parties
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-600 text-2xl mb-3">✓</div>
              <h3 className="font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600 text-sm">
                We verify properties to ensure quality and accuracy
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-600 text-2xl mb-3">24/7</div>
              <h3 className="font-semibold mb-2">Always Available</h3>
              <p className="text-gray-600 text-sm">
                Our platform is available round the clock for your convenience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find or List a Rental?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied landlords and tenants in our growing
            community
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              List Your Property
            </button>
            <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Browse Listings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
