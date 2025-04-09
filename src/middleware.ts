import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authServices";
// import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  //   console.log("Cpathname", pathname);

  const userInfo = await getCurrentUser();
  //   console.log("userInfo", userInfo);

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (
    userInfo?.data?.role &&
    roleBasedPrivateRoutes[userInfo?.data?.role as Role]
  ) {
    const routes = roleBasedPrivateRoutes[userInfo?.data?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/create-shop",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
  ],
};
