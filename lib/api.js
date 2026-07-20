import { supabase, isConfigured } from './supabase';
import { shrink } from './image';

const BUCKET = 'fleet';
const BANNER_KEY = 'banner_url';
const BANNER_PATH_KEY = 'banner_path';

// ------------------------------------------------------------
//  Reading. These run for every visitor, signed in or not.
// ------------------------------------------------------------

export async function listVehicles() {
  if (!isConfigured) return [];
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) {
    console.error('Could not load vehicles:', error.message);
    return [];
  }
  return data || [];
}

export async function getSetting(key) {
  if (!isConfigured) return '';
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .maybeSingle();
  if (error) return '';
  return data?.value || '';
}

export const getBannerUrl = () => getSetting(BANNER_KEY);

// ------------------------------------------------------------
//  Writing. The database rejects these unless a user is signed in,
//  so there is nothing secret to protect in this file.
// ------------------------------------------------------------

export async function uploadPhoto(file, prefix = 'vehicle') {
  const blob = await shrink(file, prefix === 'banner' ? 1800 : 1400);
  const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: 'image/jpeg', upsert: false });
  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path, kb: Math.round(blob.size / 1024) };
}

export async function removePhoto(path) {
  if (!path) return;
  await supabase.storage.from(BUCKET).remove([path]);
}

export async function saveVehicle(vehicle) {
  const row = {
    name: vehicle.name,
    class: vehicle.class,
    seats: vehicle.seats || null,
    luggage: vehicle.luggage || null,
    best_for: vehicle.best_for || null,
    description: vehicle.description || null,
    photo_url: vehicle.photo_url || null,
    photo_path: vehicle.photo_path || null,
    sort_order: vehicle.sort_order ?? 0,
  };

  const query = vehicle.id
    ? supabase.from('vehicles').update(row).eq('id', vehicle.id).select().single()
    : supabase.from('vehicles').insert(row).select().single();

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteVehicle(vehicle) {
  if (vehicle.photo_path) await removePhoto(vehicle.photo_path);
  const { error } = await supabase.from('vehicles').delete().eq('id', vehicle.id);
  if (error) throw new Error(error.message);
}

export async function setSetting(key, value) {
  const { error } = await supabase
    .from('settings')
    .upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

export async function setBanner(url, path) {
  const oldPath = await getSetting(BANNER_PATH_KEY);
  await setSetting(BANNER_KEY, url || '');
  await setSetting(BANNER_PATH_KEY, path || '');
  if (oldPath && oldPath !== path) await removePhoto(oldPath);
}

export async function clearBanner() {
  const oldPath = await getSetting(BANNER_PATH_KEY);
  await setSetting(BANNER_KEY, '');
  await setSetting(BANNER_PATH_KEY, '');
  if (oldPath) await removePhoto(oldPath);
}

// ------------------------------------------------------------
//  Auth
// ------------------------------------------------------------

export async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function currentSession() {
  if (!isConfigured) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}
