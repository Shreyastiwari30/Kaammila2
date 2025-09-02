import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const useGetAllJobs = (keyword = "") => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const url = keyword
          ? `${JOB_API_END_POINT}/get?keyword=${keyword}`
          : `${JOB_API_END_POINT}/get`;

        const res = await axios.get(url, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, [dispatch, keyword]);
};

export default useGetAllJobs;
