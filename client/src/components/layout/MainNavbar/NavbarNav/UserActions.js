import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {

  // const [user_name, setUser_name] = useState("");

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  log_out(){
    sessionStorage.removeItem('user_id')
    document.location.href = '/'
  }
  // useEffect(() => {
  
  //   async function user_set_id(){

  //     setUser_name(sessionStorage.getItem('user_id'));
  //   }
  //   user_set_id();
  
  // }, []);


//   render() {
//     return (
//       <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
//         <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
//           <span className="d-none d-md-inline-block">{sessionStorage.getItem('user_id')}</span>
//         </DropdownToggle>
//         <Collapse tag={DropdownMenu} right small open={this.state.visible}>
//           <DropdownItem onClick={this.log_out} className="text-danger">
//             <i className="material-icons text-danger">&#xE879;</i> Logout
//           </DropdownItem>
//           <DropdownItem onClick={this.log_out}>
//             <i className="material-icons">&#xE7FD;</i> 트랜잭션(관리자)
//           </DropdownItem>
//         </Collapse>
//       </NavItem>
//     );
//   }
// }




  render() {
    if (sessionStorage.getItem('user_id') == 'admin'){
      return (<NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
                <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
                  <span className="d-none d-md-inline-block">{sessionStorage.getItem('user_id')}</span>
                </DropdownToggle>
                <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                  <DropdownItem onClick={this.log_out} className="text-danger">
                    <i className="material-icons text-danger">&#xE879;</i> Logout
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/admin">
                    <i className="material-icons">&#xE7FD;</i> 트랜잭션(관리자)
                  </DropdownItem>
                </Collapse>
              </NavItem>
              )
    }
    else {
      return (<NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
                  <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
                    <span className="d-none d-md-inline-block">{sessionStorage.getItem('user_id')}</span>
                  </DropdownToggle>
                  <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                    <DropdownItem onClick={this.log_out} className="text-danger">
                      <i className="material-icons text-danger">&#xE879;</i> Logout
                    </DropdownItem>
                  </Collapse>
                </NavItem>
      )
    }
  }
}