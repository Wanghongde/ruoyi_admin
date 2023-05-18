export default {
  roles: state => state.user.roles,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  siderbarRouters: state => state.permission.sidebarRouters
}
