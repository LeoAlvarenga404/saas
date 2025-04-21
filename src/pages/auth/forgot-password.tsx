import { ForgotPasswordForm } from "@/components/(auth)/forgot-password";

export function ForgotPassword() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-950 via-zinc-900 to-zinc-950">
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/background.jpg')" }}
      >
        <div className="w-full h-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="p-12 max-w-lg">
            <h1 className="text-4xl font-bold text-white mb-6">
              Password Recovery
            </h1>
            <p className="text-gray-200 text-lg">
              Securely reset your password and regain access to your account.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-xl shadow-xl p-8">
            <div className="mb-6 text-center">
              <div className="inline-block mb-4">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect
                    x="5"
                    y="11"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Reset your password
              </h2>
              <p className="text-muted-foreground mt-1">
                Follow the steps below to reset your password
              </p>
            </div>

            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
