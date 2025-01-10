import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserAuthButton } from "./UserAuthButton";
import { cn } from "@/lib/utils";

export const SignInForm = async () => {
  return (
    <section className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-blue-800 via-blue-700 to-purple-700">
      <div className="flex w-[100%] max-w-[900px] items-center justify-center">
        <div className="flex w-[100%] max-w-[1900px] flex-col items-center justify-center md:justify-between">
          <div className="w-[95%] max-w-[600px] p-3">
            <Card
              className={cn(
                "flex w-[100%] flex-col items-center justify-center border-[#313338] bg-[#313338]",
              )}
            >
              <CardHeader className="w-[100%]">
                <CardTitle className="w-[100%] text-center text-4xl">
                  <h1 className="text-white">Welcome to </h1>
                  <h2 className="bg-clip-text tracking-tighter text-[#4752C4]">
                    konnekt
                  </h2>{" "}
                </CardTitle>
                <CardDescription className="text-center text-xl">
                  <p className="mx-auto mb-2 max-w-xs text-center text-lg font-light text-gray-400">
                    By continuing you are setting up a konnekt account and agree
                    to our User agreement and Privacy Policy
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent className="w-[100%]">
                <UserAuthButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
