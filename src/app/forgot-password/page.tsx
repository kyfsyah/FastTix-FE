import ForgotPasswordPage from "@/app/components/auth/forgot-pass/ForgotPasswordPage";

export const metadata = {
  title: "Forgot Password - FastTix",
  description: "Reset your FastTix account password.",
};

export default function ForgotPasswordRoute() {
  return <ForgotPasswordPage />;
}
