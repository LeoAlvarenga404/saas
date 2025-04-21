import { LoginForm } from "@/components/(auth)/login-form";

export function SignIn() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-950 via-zinc-900 to-zinc-950">
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/background.jpg')" }}
      >
        <div className="w-full h-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="p-12 max-w-lg">
            <h1 className="text-4xl font-bold text-white mb-6">
              Enterprise Management Platform
            </h1>
            <p className="text-gray-200 text-lg">
              Manage your entire business operations with our comprehensive SaaS
              solution.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-xl shadow-xl p-8">
            <div className="mb-8 text-center">
              <div className="inline-block mb-4"></div>
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h2>
              <p className="text-muted-foreground mt-1">
                Enter your credentials to access your account
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
