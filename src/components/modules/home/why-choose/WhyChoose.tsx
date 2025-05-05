import React from "react";
import {
  CheckCircle2,
  Fish,
  ShieldCheck,
  Truck,
  Star,
  Leaf,
} from "lucide-react";
import Link from "next/link";

const WhyChoose = () => {
  const features = [
    {
      icon: <Fish className="w-8 h-8 text-primary" />,
      title: "Premium Quality Basa",
      description:
        "We source only the highest quality Basa fish, carefully selected for freshness and taste.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Rigorous Quality Checks",
      description:
        "Every batch undergoes strict quality control to ensure you receive the best product.",
    },
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Fast & Reliable Delivery",
      description:
        "Freshness guaranteed with our temperature-controlled, expedited shipping.",
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Customer Satisfaction",
      description:
        "98% of our customers report being highly satisfied with our products and service.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "Sustainable Sourcing",
      description: "Ethically farmed Basa with minimal environmental impact.",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
      title: "Easy Ordering Process",
      description:
        "Simple online ordering with flexible delivery options to suit your needs.",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Basa Finder
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re committed to bringing you the freshest, highest quality
            Basa fish with exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary/10 p-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Quality Promise
            </h3>
            <p className="text-gray-700 mb-6">
              At Basa Finder, we guarantee that every fillet meets our strict
              standards for freshness, texture, and flavor. If you&apos;re not
              completely satisfied, we&apos;ll make it right.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors cursor-pointer">
              <Link href="/all-rental-listings">Visit All Rental</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
