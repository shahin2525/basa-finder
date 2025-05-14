"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProfileComponent = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <p className="text-center mt-10 text-muted-foreground">
        Loading user profile...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border mb-4">
              <Image
                src={user.image || "/default-user.png"}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <Badge variant="secondary" className="capitalize mt-2">
              {user.role}
            </Badge>
            {user.deactivate && (
              <Badge variant="destructive" className="mt-2">
                Deactivated
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-card-foreground">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-medium text-card-foreground">Phone</p>
              <p>{user.phone}</p>
            </div>
            <div>
              <p className="font-medium text-card-foreground">Address</p>
              <p>{user.address}</p>
            </div>
            <div>
              <p className="font-medium text-card-foreground">City</p>
              <p>{user.city}</p>
            </div>
            <div>
              <p className="font-medium text-card-foreground">Created At</p>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-medium text-card-foreground">Updated At</p>
              <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileComponent;
