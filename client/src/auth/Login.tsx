import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      className="bg-orange-500 w-full hover:text-white font-bold text-lg"
      size="lg"
      onClick={async() => await loginWithRedirect()}
    >
      Log In
    </Button>
  );
}
