import { getUserData } from "@/app/helpers/authhelper";
import { useRouter } from "next/navigation"

async function authMiddleware(context) {
    
  const user = await getUserData();
  // console.log("usweDAta auth---------------",user)
  const router = useRouter();

  if (!user) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default authMiddleware;
