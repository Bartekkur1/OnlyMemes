enum Routes {
  login = '/identity/login',
  register = '/identity/register',
  verify = '/identity/verify',
  getToken = '/identity/getToken',
  health = '/health',
  prefix = '/api',
  content = '/content',
  contentId = '/content/:id(\\d+)',
  upvote = '/content/:memeId(\\d+)/upvote',
  downvote = '/content/:memeId(\\d+)/downvote',
  approve = '/content/:memeId/approve',
  profile = '/profile/:userId',
  follow = '/follow/:followedId(\\d+)',
  comment = '/comment'
}

export default Routes;
