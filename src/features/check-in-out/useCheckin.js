import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    // notice here: onSuccess will receive data from 'mutationFn(updateBooking)'
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} sucessfully checked in`);
      //使所有活动的（即正在观察或获取数据的）查询无效。当一个查询被标记为无效时，React Query将会在下一次渲染时重新获取该查询的数据。
      //这通常用于当你知道或者怀疑某些数据可能已经过时或者改变时，来确保UI显示的是最新的数据。
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
