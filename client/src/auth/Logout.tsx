import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      className="w-full hover:bg-orange-500"
      onClick={() =>
        logout()
      }
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
