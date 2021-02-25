import React, { useEffect } from "react";
import BarraTopo from "./BarraTopo";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { getUser, handleLogout } from "../../actions";
import { Redirect } from "react-router-dom";

function Dashboard(props) {
  const authorized = useSelector((state) => state.auth.authorized);
  //const usuario = useSelector((state) => state.auth.usuario);



  const dispatch = useDispatch();
 // const history = useHistory();

  useEffect(() => {
    dispatch(getUser())
    if(!getUser() || authorized === "false") return <Redirect to="/login"/>
  }, []);



  return (
    <div className="flex horizontal full-height">
      <div className="flex vertical">
        <Menu />
      </div>
      <div className="flexx vertical full-width">
        <div className="flex horizontal">
          <BarraTopo handlingLogout={() => handleLogout()} />
        </div>
        <main className="flex full-height">{props.children}</main>
      </div>
    </div>
  );
}

export default Dashboard;
