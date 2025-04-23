import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default LoginPage;
