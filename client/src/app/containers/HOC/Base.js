import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions";

const AdminRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.auth.authorized);
  const usuario = useSelector((state) => state.auth.usuario);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        getUser() && authorized === true && usuario.role.includes("admin") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: props.location }} />
        )
      }
    />
  );
};
export default AdminRoute;
