import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
// import  location1  from "@/assets/location/down.jpg";
// import  location2  from "@/assets/location/river.jpg";
// import  location3  from "@/assets/location/univercity.jpg";
// import  location4  from "@/assets/location/green.jpg";
//public/location/down.jpg
// const location1 = "/public/location/down.jpg";
// const location2 = "/public/location/river.jpg";
// const location3 = "/public/location/univercity.jpg";
// const location4 = "/public/location/green.jpg";
interface Location {
  id: number;
  name: string;
  image: string;
  avgRent: number;
  propertiesAvailable: number;
  popularAmenities: string[];
}

const PopularLocation = () => {
  const locations: Location[] = [
    {
      id: 1,
      name: "Downtown",
      image: "https://i.postimg.cc/5yf6Y1rW/down.jpg",
      avgRent: 1800,
      propertiesAvailable: 124,
      popularAmenities: ["Metro Access", "24/7 Security", "Shopping Mall"],
    },
    {
      id: 2,
      name: "Riverside",
      image:
        "https://i.postimg.cc/QC6SXcL0/viswaprem-anbarasapandian-rhecz5-8-YQM-unsplash.jpg",
      avgRent: 1450,
      propertiesAvailable: 89,
      popularAmenities: ["River View", "Bike Trails", "Pet Friendly"],
    },
    {
      id: 3,
      name: "University District",
      image:
        "https://i.postimg.cc/rydDgSsj/zoshua-colah-Vm-Kcf-Oiqp-UE-unsplash.jpg",
      avgRent: 1200,
      propertiesAvailable: 156,
      popularAmenities: ["Study Lounges", "Near Campus", "Furnished Options"],
    },
    {
      id: 4,
      name: "Green Valley",
      image: "https://i.postimg.cc/7Yd1Zs2F/green.jpg",
      avgRent: 1650,
      propertiesAvailable: 72,
      popularAmenities: ["Parks", "Organic Markets", "Yoga Studio"],
    },
  ];

  return (
    <section className="py-12 bg-[#FFFDF6] dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Popular Rental Locations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most sought-after neighborhoods with the best amenities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <Card
              key={location.id}
              className="hover:shadow-lg transition-shadow py-0 h-96"
            >
              <CardHeader className="p-0">
                <div className="relative h-[130px] w-full">
                  <Image
                    src={location.image}
                    alt={location.name}
                    height={1000}
                    width={1000}
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 mt-2">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{location.name}</CardTitle>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    ${location.avgRent}/mo
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {location.propertiesAvailable}+ properties available
                </p>

                <ul className="space-y-2 mb-6">
                  {location.popularAmenities.map((amenity, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {amenity}
                    </li>
                  ))}
                </ul>

                {/* <Button variant="outline" className="w-full">
                  Explore {location.name}
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* <div className="text-center mt-10">
          <Button variant="ghost" className="border border-primary">
            View All Locations
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default PopularLocation;
