import React from "react";
import SideBar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userActions";
import Loader from "../layout/Loader/Loader";
import { useState } from "react";
import { useEffect } from "react";

const UpdateUser = () => {
  const title = "Update User";
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);
    dispatch(updateUser(formData));
  };
  return (
    <>
      <MetaData title={title} />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              onSubmit={updateUserSubmitHandler}
              action=""
              className="createProductForm"
            >
              <h1>{title}</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
