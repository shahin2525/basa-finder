"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      avatar: "/avatars/sarah.jpg",
      quote:
        "Fasa-Finder helped me find my dream apartment in just 3 days! The search filters are incredibly accurate.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Medical Student",
      avatar: "/avatars/michael.jpg",
      quote:
        "As an international student, I was nervous about finding housing. Fasa-Finder made the process so easy!",
      rating: 4,
    },
    {
      name: "Amina Diallo",
      role: "Graphic Designer",
      avatar: "/avatars/amina.jpg",
      quote:
        "Found a pet-friendly rental with all my requirements. Landlord was verified and responsive. 10/10!",
      rating: 5,
    },
    {
      name: "David Wilson",
      role: "Teacher",
      avatar: "/avatars/david.jpg",
      quote:
        "Saved me hours of searching. The price alerts notified me when perfect listings became available.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full py-8 md:py-18 lg:py-18 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:mb-2">
              Success Stories
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-2">
              Hear from our happy renters who found their perfect homes
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="w-full lg:hidden">
            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                  />
                  <AvatarFallback>
                    {testimonials[currentIndex].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-lg font-semibold">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                {/* <blockquote className="text-lg italic">
                  "{testimonials[currentIndex].quote}"
                </blockquote> */}
                <blockquote className="text-lg italic">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[currentIndex].rating
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "stroke-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Desktop Grid */}
          <div className="hidden w-full lg:grid lg:grid-cols-2 lg:gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-lg font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* <blockquote className="text-lg italic">
                    "{testimonial.quote}"
                  </blockquote> */}
                  <blockquote className="text-lg italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="mt-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "fill-yellow-400 stroke-yellow-400"
                            : "stroke-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
