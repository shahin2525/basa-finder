import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authServices";
// import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  tenant: [
    /^\/tenant/,
    /^\/create-rental-request/,
    /^\/orders-view/,
    /^\/verify-order/,
  ],
  admin: [/^\/admin/],
  landlord: [/^\/landlord/, /^\/create-listing/],
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
          `https://basa-finder-beta.vercel.app/login?redirectPath=${pathname}`,
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
    "/create-rental-request",
    "/create-listing",
    "/login",

    "/admin",
    "/admin/:page",
    "/tenant",
    "/tenant/:page",
    "/tenant",
    "/tenant/:page",
    "/landlord",
    "/landlord/:page",
    "/orders-view",
    "/verify-order",
  ],
};
