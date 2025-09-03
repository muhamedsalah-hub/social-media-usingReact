//MUI Components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";

//React Router
import { Link } from "react-router-dom";

//React Hooks
import { useCurrentUser } from "../../Contexts/CurrentUserContext";

export const PostsCard = ({
  postData,
  handleOpenDeleteDialogue,
  handleId,
  handleOpenEditDialogue,
  handlePostData,
}) => {
  const { currentUser } = useCurrentUser();
  const currentUserId = currentUser?.id;

  const btnList = (
    <div style={{ display: "flex", columnGap: "0.5rem" }}>
      <Button
        sx={{
          "&:hover": {
            borderColor: "#1976D2",
          },
        }}
        size="small"
        variant="outlined"
        onClick={() => {
          handlePostData(postData);
          handleOpenEditDialogue();
          handleId(postData.id);
        }}
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          handleId(postData.id);
          handleOpenDeleteDialogue();
        }}
        size="small"
        variant="outlined"
        sx={{
          "&:hover": {
            borderColor: "red",
          },
        }}
        color="error"
      >
        Delete
      </Button>
    </div>
  );

  return (
    <div style={{ marginTop: "2rem" }}>
      <Card
        style={{
          padding: "1rem",
          borderBottomLeftRadius: "0",
          borderBottomRighttRadius: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "1rem",
            paddingBottom: "1rem",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Link
              style={{ color: "black" }}
              to={`/profile/${postData.author.id}`}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "0.7px solid gray",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ width: "85%", borderRadius: "50%", height: "85%" }}
                    src={postData.author.profile_image}
                  />
                </div>
                <h4 style={{ padding: 0, margin: 0 }}>
                  {postData.author.username}
                </h4>
              </div>
            </Link>
          </div>
          <div>{postData.author.id == currentUserId ? btnList : ""}</div>
        </div>
        <Divider variant="fullWidth" />
        <Link
          style={{ color: "black" }}
          key={postData.id}
          to={`/postDetails/${postData.id}`}
        >
          <div style={{ paddingTop: "1rem" }}>
            <img width={"100%"} src={postData.image} />
          </div>
        </Link>

        <div style={{ paddingTop: "1rem" }}>
          <span
            style={{ color: "gray", fontWeight: "500", fontSize: "0.8rem" }}
          >
            {postData.created_at}
          </span>
          <h3 style={{ marginTop: "0.5rem" }}>{postData.title}</h3>
          <p style={{ marginTop: "0.5rem" }}>{postData.body}</p>
        </div>
        <Divider variant="fullWidth" />
        <div style={{ paddingTop: "1rem", display: "flex" }}>
          <CreateOutlinedIcon />
          <span>({postData.comments_count}) Comments</span>
        </div>
      </Card>
    </div>
  );
};
