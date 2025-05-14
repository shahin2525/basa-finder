// "use client";

// import { useUser } from "@/context/UserContext";
// import Image from "next/image";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// const ProfileComponent = () => {
//   const { user } = useUser();

//   if (!user) {
//     return (
//       <p className="text-center mt-10 text-muted-foreground">
//         Loading user profile...
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <Card className="shadow-md">
//         <CardHeader>
//           <div className="flex flex-col items-center justify-center text-center">
//             <div className="relative w-24 h-24 rounded-full overflow-hidden border mb-4">
//               <Image
//                 src={user.image || "/default-user.png"}
//                 alt={user.name}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <CardTitle className="text-2xl">{user.name}</CardTitle>
//             <Badge variant="secondary" className="capitalize mt-2">
//               {user.role}
//             </Badge>
//             {user.deactivate && (
//               <Badge variant="destructive" className="mt-2">
//                 Deactivated
//               </Badge>
//             )}
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
//             <div>
//               <p className="font-medium text-card-foreground">Email</p>
//               <p>{user.email}</p>
//             </div>
//             <div>
//               <p className="font-medium text-card-foreground">Phone</p>
//               <p>{user.phone}</p>
//             </div>
//             <div>
//               <p className="font-medium text-card-foreground">Address</p>
//               <p>{user.address}</p>
//             </div>
//             <div>
//               <p className="font-medium text-card-foreground">City</p>
//               <p>{user.city}</p>
//             </div>
//             <div>
//               <p className="font-medium text-card-foreground">Created At</p>
//               <p>{new Date(user.createdAt).toLocaleDateString()}</p>
//             </div>
//             <div>
//               <p className="font-medium text-card-foreground">Updated At</p>
//               <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ProfileComponent;
"use client";

import { useUser } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-lg text-muted-foreground animate-pulse">
          Loading user profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-center mb-6">
              User Profile
            </CardTitle>

            {/* Profile Header - Responsive with Tailwind */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 md:w-32 md:h-32">
                <AvatarImage src={user.image} />
                <AvatarFallback className="bg-primary text-white text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="text-center md:text-left space-y-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex gap-2 justify-center md:justify-start">
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                  <Badge variant={user.deactivate ? "destructive" : "outline"}>
                    {user.deactivate ? (
                      <span className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> Deactivated
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Active
                      </span>
                    )}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <Separator className="my-2" />

          <CardContent className="pt-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium break-all">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{user.phone}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">User ID:</span>
                    <span className="font-medium break-all text-xs">
                      {user._id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Member Since:</span>
                    <span className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section - Only shown if address or city exists */}
            {(user.address || user.city) && (
              <>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Address Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.address && (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Address:</p>
                          <p className="font-medium">{user.address}</p>
                        </div>
                      </div>
                    )}
                    {user.city && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">City:</p>
                          <p className="font-medium">{user.city}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Account Details Section */}
            <Separator className="my-6" />
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Status:</span>
                  <span
                    className={`font-medium ${
                      user.deactivate ? "text-destructive" : "text-green-600"
                    }`}
                  >
                    {user.deactivate ? "Deactivated" : "Active"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
