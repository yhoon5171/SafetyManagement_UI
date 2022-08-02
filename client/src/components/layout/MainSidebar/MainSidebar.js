import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Col, Row, Button } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

import { Store } from "./../../flux";

import { Link } from "react-router-dom"

class MainSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
      sidebarNavItems: Store.getSidebarItems(),
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems()
    });
  }
  

  render() {

    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-12",
      this.state.menuVisible && "open"
    );

    return (
      <Col
        tag="aside"
        className={classes}
        lg={{ size: 2 }}
        md={{ size: 1 }}
      > 
        <SidebarMainNavbar hideLogoText={this.props.hideLogoText} />
      
      <Row>d</Row>
      <Row>
        <Col sm ={{order:4, offset: 2}}>
          <Link to = "/writetransaction">
            <Button pill theme="secondary" outline size="md" className="mb-2">
                <i className="font-size:30px material-icons mr-1">add</i> 트랜잭션 추가
            </Button>
          </Link>
        </Col>
      </Row>

        <SidebarSearch />
        <SidebarNavItems />
      </Col>
    );
  }
}

MainSidebar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};

export default MainSidebar;
