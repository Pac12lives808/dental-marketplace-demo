const { supabaseAdmin } = require('../../lib/supabaseAdmin');
const { getUserFromRequest } = require('../../lib/auth');
const { generatePublicCaseCode } = require('../../lib/caseCode');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const { user, profile, error: authError } = await getUserFromRequest(event);

  if (authError) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: authError })
    };
  }

  if (profile.role !== 'patient') {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Patient access required' })
    };
  }

  let body = {};

  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON body' })
    };
  }

  const newCase = {
    patient_user_id: user.id,
    title: body.title || 'Untitled case',
    description: body.description || '',
    treatment_category: body.treatment_category || '',
    city: body.city || '',
    state: body.state || '',
    budget_min: body.budget_min || null,
    budget_max: body.budget_max || null,
    public_case_code: generatePublicCaseCode(),
    status: 'draft'
  };

  const { data, error } = await supabaseAdmin
    .from('cases')
    .insert(newCase)
    .select('*')
    .single();

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify(data)
  };
};
