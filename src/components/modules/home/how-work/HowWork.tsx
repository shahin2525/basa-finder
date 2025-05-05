import React from "react";
import {
  Home,
  Key,
  Search,
  FileText,
  Handshake,
  CircleDollarSign,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

const HowWork = () => {
  const landlordSteps = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "List Your Property",
      description:
        "Create a detailed listing with photos, amenities, and rental terms",
      additional: "Free to list - no upfront costs",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Get Matched",
      description:
        "Our system connects you with qualified tenants matching your criteria",
      additional: "Background checks available",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Review Applications",
      description: "Evaluate tenant profiles and schedule viewings",
      additional: "Secure messaging system",
    },
    {
      icon: <CircleDollarSign className="w-8 h-8" />,
      title: "Sign & Collect Rent",
      description: "Digital lease signing and automated rent collection",
      additional: "Payment tracking included",
    },
  ];

  const tenantSteps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Find Your Home",
      description: "Browse verified listings with filters for your needs",
      additional: "Save favorite properties",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Submit Application",
      description: "Complete your profile and apply for properties",
      additional: "One-click applications",
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Schedule Viewing",
      description: "Arrange in-person or virtual tours",
      additional: "Landlord ratings available",
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Move In",
      description: "Sign lease digitally and get keys",
      additional: "Rent payment reminders",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-12 bg-[#FBF8EF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Our Platform Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simplifying the rental process for both landlords and tenants
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            For Landlords
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-1 bg-primary/20">
              <div className="absolute top-0 left-0 h-full bg-primary w-full"></div>
            </div>

            {landlordSteps.map((step, index) => (
              <Card
                key={`landlord-${index}`}
                className="text-center border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="items-center">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full">
                    {step.icon}
                  </div>
                  <div className="relative">
                    <span className="absolute -top-8 -left-8 md:flex items-center justify-center w-6 h-6 bg-primary rounded-full text-white font-bold hidden">
                      {index + 1}
                    </span>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-3">
                    {step.description}
                  </CardDescription>
                  <p className="text-sm text-primary font-medium">
                    {step.additional}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            For Tenants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-1 bg-primary/20">
              <div className="absolute top-0 left-0 h-full bg-primary w-full"></div>
            </div>

            {tenantSteps.map((step, index) => (
              <Card
                key={`tenant-${index}`}
                className="text-center border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="items-center">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full">
                    {step.icon}
                  </div>
                  <div className="relative">
                    <span className="absolute -top-8 -left-8 md:flex items-center justify-center w-6 h-6 bg-primary rounded-full text-white font-bold hidden">
                      {index + 1}
                    </span>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-3">
                    {step.description}
                  </CardDescription>
                  <p className="text-sm text-primary font-medium">
                    {step.additional}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of landlords and tenants who have simplified their
            rental experience with our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              <Link href="/rent-calculator"> Browse Rental calculation</Link>
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-6 border border-gray-300 rounded-lg transition-colors">
              <Link href="/all-rental-listings">Browse Listings</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWork;
