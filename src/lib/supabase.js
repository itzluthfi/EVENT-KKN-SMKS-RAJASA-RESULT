// Supabase client — update with your own credentials
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ──────────────────────────────────────────────────
// Projects
// ──────────────────────────────────────────────────
export async function fetchProjects(category = null) {
  let query = supabase
    .from('projects_event')
    .select('*')
    .order('award_status', { ascending: true });

  if (category) {
    query = query.eq('class_category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchProjectBySlug(slug) {
  const { data, error } = await supabase
    .from('projects_event')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

// ──────────────────────────────────────────────────
// Team
// ──────────────────────────────────────────────────
export async function fetchTeamKKN(category = null) {
  let query = supabase
    .from('team_kkn')
    .select('*')
    .order('id');

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// ──────────────────────────────────────────────────
// Documentation Photos
// ──────────────────────────────────────────────────
export async function fetchDocPhotos(day = null) {
  let query = supabase
    .from('documentation_photos')
    .select('*')
    .order('created_at');

  if (day) {
    query = query.eq('event_day', day);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
