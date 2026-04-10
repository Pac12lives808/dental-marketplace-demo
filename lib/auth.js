const { supabaseAdmin } = require('./supabaseAdmin');

async function getUserFromRequest(event) {
  const authHeader =
    event.headers.authorization || event.headers.Authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return { user: null, profile: null, error: 'Missing bearer token' };
  }

  const token = authHeader.replace('Bearer ', '').trim();

  const {
    data: { user },
    error: userError
  } = await supabaseAdmin.auth.getUser(token);

  if (userError || !user) {
    return { user: null, profile: null, error: 'Unauthorized' };
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return { user: null, profile: null, error: 'Profile not found' };
  }

  return { user, profile, error: null };
}

module.exports = { getUserFromRequest };
