enum Routes {
  login = '/identity/login',
  register = '/identity/register',
  verify = '/identity/verify',
  getToken = '/identity/getToken',
  health = '/health',
  prefix = '/api',
  content = '/content',
  contentId = '/content/:id',
  approve = '/content/:memeId/approve',
  profile = '/profile/:displayName'
}

export default Routes;
