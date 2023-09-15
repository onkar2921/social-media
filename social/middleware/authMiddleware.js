import { getUserData } from "@/app/helpers/authhelper";
import { useRouter } from "next/router";

async function authMiddleware(context) {
    
  const user = await getUserData();
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
