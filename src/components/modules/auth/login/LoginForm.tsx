// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import Link from "next/link";

// import Logo2 from "@/assets/svgs/logo.png";
// import { zodResolver } from "@hookform/resolvers/zod";
// // import { loginUser,  } from "";
// import { toast } from "sonner";
// // import { loginSchema } from "./loginValidation";
// // import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { loginUser } from "@/services/authServices";
// import { loginSchema } from "./loginValidation";
// import Image from "next/image";

// export default function LoginForm() {
//   const form = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const searchParams = useSearchParams();
//   const redirect = searchParams.get("redirectPath");
//   const router = useRouter();

//   const {
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     // console.log(data);
//     try {
//       const res = await loginUser(data);
//       // console.log("res1", res);
//       if (res?.success) {
//         toast.success(res?.message);
//         if (redirect) {
//           router.push(redirect);
//         } else {
//           router.push("/");
//         }
//       } else {
//         toast.error(res?.message);
//         // console.log(res);
//       }
//     } catch (err: any) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
//       <div className="flex items-center space-x-4 ">
//         <Image
//           src={Logo2}
//           alt="basaFinder Logo"
//           width={60} // 👈 Adjust width/height as needed
//           height={60}
//           className="object-contain" // 👈 Ensures proper scaling
//         />
//         <div>
//           <h1 className="text-xl font-semibold">Login</h1>
//           <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
//         </div>
//       </div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="email" {...field} value={field.value || ""} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input type="password" {...field} value={field.value || ""} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* <div className="flex mt-3 w-full">
//             <ReCAPTCHA
//               sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
//               onChange={handleReCaptcha}
//               className="mx-auto"
//             />
//           </div> */}

//           <Button type="submit" className="mt-5 w-full">
//             {isSubmitting ? "Logging...." : "Login"}
//           </Button>
//         </form>
//       </Form>
//       <p className="text-sm text-gray-600 text-center my-3">
//         Do not have any account ?
//         <Link href="/register" className="text-primary">
//           Register
//         </Link>
//       </p>
//     </div>
//   );
// }
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

// Define proper form values type
type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      // Add default values to prevent uncontrolled inputs
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
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
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
                  {/* Remove manual value prop - react-hook-form handles it */}
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
                <FormControl>
                  {/* Remove manual value prop - react-hook-form handles it */}
                  <Input type="password" {...field} />
                </FormControl>
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
        do not have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
