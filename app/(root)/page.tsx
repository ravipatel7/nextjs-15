import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const Home = async () => {
  return (
    <div>
      <h1 className="h1-bold">Welcome to DevFlow</h1>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}>
        <Button type="submit">Log out</Button>
      </form>
    </div>
  );
};

export default Home;
