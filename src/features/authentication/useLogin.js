import { useMutation, useQueryClient } from "@tanstack/react-query";
import Login from "../../pages/Login";
import { login } from "../../services/apiAuth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // actually something changes in server
  const { mutate: loginMutation, isLogining } = useMutation({
    mutationFn: ({ email, password }) =>
      login({
        email,
        password,
      }),
    onSuccess: (userdata) => {
      // manually add the 'userdata.user' to the cache
      queryClient.setQueryData(["user"], userdata.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { loginMutation, isLogining };
}
