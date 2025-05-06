"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Logo2 from "@/assets/svgs/logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/services/authServices";
import { loginSchema } from "./loginValidation";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

// Define proper form values type
type FormValues = {
  email: string;
  password: string;
};

// Define test credentials for different roles
const TEST_CREDENTIALS = {
  admin: {
    email: "jhankar@j.com",
    password: "user12345",
  },
  landlord: {
    email: "mejan@m.com",
    password: "user12345",
  },
  tenant: {
    email: "imunsadik@i.com",
    password: "user12345",
  },
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { refreshUser } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await loginUser(data);

      if (res?.success) {
        await refreshUser();
        toast.success(res?.message);
        router.push(redirect || "/");
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during login");
      console.error(err);
    }
  };

  // Function to fill form with test credentials
  const fillTestCredentials = (role: keyof typeof TEST_CREDENTIALS) => {
    form.setValue("email", TEST_CREDENTIALS[role].email);
    form.setValue("password", TEST_CREDENTIALS[role].password);
    toast.info(`Filled ${role} credentials`);
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4">
        <Image
          src={Logo2}
          alt="App Logo"
          width={60}
          height={60}
          className="object-contain"
        />
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-lg text-gray-600">Welcome back!</p>
        </div>
      </div>

      {/* Quick Login Buttons */}
      <div className="flex flex-col space-y-2 mt-4 mb-6">
        <p className="text-lg text-gray-500 text-center">
          Recruiter? Try quick login:
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => fillTestCredentials("admin")}
            className="flex-1"
          >
            Admin Login
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => fillTestCredentials("landlord")}
            className="flex-1"
          >
            Landlord Login
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => fillTestCredentials("tenant")}
            className="flex-1"
          >
            Tenant Login
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      className="pr-10" // Add padding for the eye icon
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-gray-600 text-center mt-4">
        Do not have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
