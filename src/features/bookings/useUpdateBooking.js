import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateBooking } from "../../services/apiBookings";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const { mutate: updateBookingMutation, isLoading: isUpdating } = useMutation({
    // notice here：mutationFn only could accept one 'obj' as parameter
    mutationFn: ({ newBookingData, id }) =>
      createUpdateBooking(newBookingData, id),
    onSuccess: () => {
      toast.success("Booking successfully updated");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateBookingMutation };
}
