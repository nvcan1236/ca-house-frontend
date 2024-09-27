import H3 from "@/components/common/H3";
import Post from "@/components/list/Post";
import { useGetPostsByUserQuery } from "@/stores/api/postApi";
import { useAppSelector } from "@/stores/hooks";
import EditPostDialog from "./admin/posts/EditPostDialog";

const ManageMyPost = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data } = useGetPostsByUserQuery({
    offset: 0,
    username: user?.username || "",
  });
  const posts = data?.result;
  return (
    <div className="mx-auto">
      <H3>Danh sách bài viết</H3>
      {posts?.length == 0 && (
        <p className="text-muted-foreground text-center py-20">
          ( Chưa đăng bài viết nào )
        </p>
      )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-6 min-h-screen place-content-start">
        {posts?.map((post) => (
          <EditPostDialog post={post} key={post.id}>
            <div><Post data={post}  /></div>
          </EditPostDialog>
        ))}
      </div>
    </div>
  );
};

export default ManageMyPost;
