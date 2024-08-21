import MotelList from "@/components/list/MotelList";
import PostList from "@/components/list/PostList";
import { useAppSelector } from "@/stores/hooks";

const HomePage = () => {
  const role = useAppSelector(state => state.common.role)
  return (
    <div>
      {role==="motel" && <MotelList/>}
      {role==="post" && <PostList/>}
    </div>
  );
};

export default HomePage;
