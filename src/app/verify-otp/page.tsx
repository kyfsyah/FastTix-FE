import VerifyOtpPage from "@/app/components/auth/verify-otp/OtpPage";

export const metadata = {
  title: "Verify OTP - FastTix",
  description: "Enter your 6-digit verification code to proceed.",
};

export default function VerifyOtpRoute() {
  return <VerifyOtpPage />;
}
