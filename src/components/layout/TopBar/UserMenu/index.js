import React from 'react'
// import { connect } from 'react-redux'
// import { Menu, Dropdown, Avatar, Badge } from 'antd'
import { Menu } from 'antd';
// import styles from './style.module.scss'

// @connect(({ user }) => ({ user }))
class ProfileMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail',
    }
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  //   state = {
  //     count: 7,
  //   }

  // logout = () => {
  //   const { dispatch } = this.props
  //   dispatch({
  //     type: 'user/LOGOUT',
  //   })
  // }

  // addCount = () => {
  //   let { count } = this.state
  //   count += 1
  //   this.setState({
  //     count,
  //   })
  // }

  render() {
    return (
      // eslint-disable-next-line react/destructuring-assignment
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="mail">
          HOME
        </Menu.Item>
        <Menu.Item key="">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            DOWNLOAD
          </a>
        </Menu.Item>
        <Menu.Item key="">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            FAQ
          </a>
        </Menu.Item>
        <Menu.Item key="">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            CONTACT
          </a>
        </Menu.Item>
        <Menu.Item key="">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            REPORT
          </a>
        </Menu.Item>
      </Menu>
    );
    // const { user } = this.props
    // const { count } = this.state
    // const menu = (
    //   <Menu selectable={false}>
    //     <Menu.Item>
    //       <strong>Hello, {user.name || 'Anonymous'}</strong>
    //       <div>
    //         <strong className="mr-1">Billing Plan: </strong>
    //         Professional
    //       </div>
    //       <div>
    //         <strong>Role: </strong>
    //         {user.role}
    //       </div>
    //     </Menu.Item>
    //     <Menu.Divider />
    //     <Menu.Item>
    //       <div>
    //         <strong>Email: </strong>
    //         {user.email}
    //         <br />
    //         <strong>Phone: </strong>
    //         {user.phone || '— '}
    //       </div>
    //     </Menu.Item>
    //     <Menu.Divider />
    //     <Menu.Item>
    //       <a href="javascript: void(0);">
    //         <i className={`${styles.menuIcon} fe fe-user`} />
    //         Edit Profile
    //       </a>
    //     </Menu.Item>
    //     <Menu.Divider />
    //     <Menu.Item>
    //       <a href="javascript: void(0);" onClick={this.logout}>
    //         <i className={`${styles.menuIcon} fe fe-log-out`} />
    //         Logout
    //       </a>
    //     </Menu.Item>
    //   </Menu>
    // )
    // return (
    //   <Dropdown overlay={menu} trigger={['click']} onVisibleChange={this.addCount}>
    //     <div className={styles.dropdown}>
    //       <Badge count={count}>
    //         <Avatar className={styles.avatar} shape="square" size="large" icon="user" />
    //       </Badge>
    //     </div>
    //   </Dropdown>
    // )
  }
}

export default ProfileMenu
