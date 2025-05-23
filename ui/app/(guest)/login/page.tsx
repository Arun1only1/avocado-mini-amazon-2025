import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "This is a login page.",
};
const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
