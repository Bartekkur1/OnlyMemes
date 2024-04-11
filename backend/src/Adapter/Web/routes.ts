enum Routes {
  login = '/identity/login',
  register = '/identity/register',
  verify = '/identity/verify',
  generateToken = '/identity/generateToken',
  health = '/health',
  prefix = '/api',
  content = '/content',
  contentId = '/content/:id',
  profile = '/profile/:displayName'
}

export default Routes;
