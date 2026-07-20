'use client';

import { useEffect, useState, useRef } from 'react';
import { site } from '../../lib/config';
import { isConfigured } from '../../lib/supabase';
import {
  listVehicles, saveVehicle, deleteVehicle,
  uploadPhoto, removePhoto,
  getBannerUrl, setBanner, clearBanner,
  signIn, signOut, currentSession,
} from '../../lib/api';

const EMPTY = {
  id: null, name: '', class: 'Sedan', seats: '', luggage: '',
  best_for: '', description: '', photo_url: '', photo_path: '',
};

const CLASSES = ['Sedan', 'Compact', 'SUV', 'Van', 'Luxury', 'Coaster'];

export default function Admin() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [photoNote, setPhotoNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [banner, setBannerState] = useState('');
  const [bannerBusy, setBannerBusy] = useState(false);

  const vehicleFile = useRef(null);
  const bannerFile = useRef(null);

  useEffect(() => {
    (async () => {
      setSession(await currentSession());
      setChecking(false);
    })();
  }, []);

  useEffect(() => {
    if (!session) return;
    (async () => {
      setVehicles(await listVehicles());
      setBannerState(await getBannerUrl());
    })();
  }, [session]);

  async function refresh() {
    setVehicles(await listVehicles());
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    try {
      await signIn(email.trim(), password);
      setSession(await currentSession());
      setPassword('');
    } catch (err) {
      setLoginError(err.message || 'Sign in failed.');
    }
  }

  async function handleVehiclePhoto(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setError('');
    setPhotoNote('Uploading photo...');
    try {
      const { url, path, kb } = await uploadPhoto(file, 'vehicle');
      if (form.photo_path) await removePhoto(form.photo_path);
      setForm((f) => ({ ...f, photo_url: url, photo_path: path }));
      setPhotoNote(`Photo uploaded, about ${kb} KB after resizing.`);
    } catch (err) {
      setPhotoNote('');
      setError(err.message);
    }
    e.target.value = '';
  }

  async function dropVehiclePhoto() {
    if (form.photo_path) await removePhoto(form.photo_path);
    setForm((f) => ({ ...f, photo_url: '', photo_path: '' }));
    setPhotoNote('');
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    setSaving(true);
    setError('');
    try {
      await saveVehicle({ ...form, name: form.name.trim() });
      await refresh();
      setForm(EMPTY);
      setPhotoNote('');
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  }

  async function handleDelete(v) {
    if (!confirm(`Delete ${v.name}?`)) return;
    try {
      await deleteVehicle(v);
      if (form.id === v.id) { setForm(EMPTY); setPhotoNote(''); }
      await refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleBannerPhoto(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setBannerBusy(true);
    try {
      const { url, path } = await uploadPhoto(file, 'banner');
      await setBanner(url, path);
      setBannerState(url);
    } catch (err) {
      setError(err.message);
    }
    setBannerBusy(false);
    e.target.value = '';
  }

  async function handleBannerClear() {
    setBannerBusy(true);
    try {
      await clearBanner();
      setBannerState('');
    } catch (err) {
      setError(err.message);
    }
    setBannerBusy(false);
  }

  // ----------------------------------------------------------

  if (!isConfigured) {
    return (
      <Shell>
        <h2>Not connected yet</h2>
        <p className="sectionsub">
          Add your Supabase URL and anon key to a file named <code>.env.local</code>, then restart
          the dev server. The template is in <code>.env.local.example</code>.
        </p>
      </Shell>
    );
  }

  if (checking) {
    return <Shell><p className="sectionsub">Checking your session...</p></Shell>;
  }

  if (!session) {
    return (
      <Shell>
        <div className="cap">Admin</div>
        <h2>Sign in</h2>
        <p className="sectionsub" style={{ marginBottom: 24 }}>
          Use the account you created in Supabase under Authentication.
        </p>
        <form onSubmit={handleLogin} style={{ maxWidth: 400 }}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </div>
          <div className="field">
            <label htmlFor="pw">Password</label>
            <input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          {loginError ? <div className="err">{loginError}</div> : null}
          <div className="sheet-acts">
            <button className="btn btn-primary" type="submit">Sign in</button>
            <a className="btn btn-ghost" href="/">Back to site</a>
          </div>
        </form>
      </Shell>
    );
  }

  return (
    <Shell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div className="cap">Admin</div>
          <h2>Manage the site</h2>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a className="btn btn-ghost btn-sm" href="/">View site</a>
          <button className="btn btn-ghost btn-sm" onClick={async () => { await signOut(); setSession(null); }}>Sign out</button>
        </div>
      </div>

      <p className="sectionsub">
        Anything saved here appears on the public site straight away, for every visitor.
      </p>

      {error ? <div className="err" style={{ marginBottom: 16 }}>{error}</div> : null}

      {/* vehicle form */}
      <div className="pcard" style={{ marginBottom: 22 }}>
        <h3>{form.id ? 'Edit vehicle' : 'Add a vehicle'}</h3>

        <div className="field" style={{ marginTop: 16 }}>
          <label>Vehicle photo</label>
          <div className="drop">
            <div className="prev" style={form.photo_url ? { backgroundImage: `url('${form.photo_url}')` } : undefined} />
            <div className="txt">
              <p>{photoNote || 'Choose a photo from your phone or computer. It is resized automatically before uploading, so large photos are fine.'}</p>
              <div className="g">
                <button className="btn btn-line btn-sm" type="button" onClick={() => vehicleFile.current.click()}>
                  {form.photo_url ? 'Replace photo' : 'Choose photo'}
                </button>
                {form.photo_url ? (
                  <button className="btn btn-ghost btn-sm" type="button" onClick={dropVehiclePhoto}>Remove</button>
                ) : null}
              </div>
            </div>
          </div>
          <input ref={vehicleFile} type="file" accept="image/*" className="hidden" onChange={handleVehiclePhoto} />
        </div>

        <div className="field">
          <label htmlFor="vname">Vehicle name</label>
          <input id="vname" type="text" value={form.name} placeholder="Toyota Corolla"
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>

        <div className="row2">
          <div className="field">
            <label htmlFor="vclass">Class</label>
            <select id="vclass" value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })}>
              {CLASSES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="vseats">Passengers</label>
            <input id="vseats" type="text" value={form.seats} placeholder="4"
              onChange={(e) => setForm({ ...form, seats: e.target.value })} />
          </div>
        </div>

        <div className="row2">
          <div className="field">
            <label htmlFor="vbags">Luggage</label>
            <input id="vbags" type="text" value={form.luggage} placeholder="2 large bags"
              onChange={(e) => setForm({ ...form, luggage: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="vbest">Best for</label>
            <input id="vbest" type="text" value={form.best_for} placeholder="Long distance"
              onChange={(e) => setForm({ ...form, best_for: e.target.value })} />
          </div>
        </div>

        <div className="field">
          <label htmlFor="vdesc">Description</label>
          <textarea id="vdesc" value={form.description} placeholder="The most comfortable option for long motorway journeys."
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className="sheet-acts">
          <button className="btn btn-primary" onClick={handleSave} disabled={saving || !form.name.trim()}>
            {saving ? 'Saving...' : form.id ? 'Update vehicle' : 'Save vehicle'}
          </button>
          {form.id ? (
            <button className="btn btn-ghost" onClick={() => { setForm(EMPTY); setPhotoNote(''); }}>Cancel edit</button>
          ) : null}
        </div>
      </div>

      {/* fleet list */}
      <div className="adminlist">
        <h4>Current fleet</h4>
        {vehicles.length === 0 ? (
          <div className="empty">No vehicles added yet. The fleet section stays hidden on the public site until you add one.</div>
        ) : (
          vehicles.map((v) => (
            <div className="arow" key={v.id}>
              <div className="l">
                <div className="th" style={v.photo_url ? { backgroundImage: `url('${v.photo_url}')` } : undefined} />
                <div>
                  <b>{v.name}</b>
                  <small>{v.class}{v.seats ? ` \u00B7 ${v.seats} passengers` : ''}</small>
                </div>
              </div>
              <div className="g">
                <button className="btn btn-ghost btn-sm" onClick={() => {
                  setForm({
                    id: v.id, name: v.name || '', class: v.class || 'Sedan',
                    seats: v.seats || '', luggage: v.luggage || '',
                    best_for: v.best_for || '', description: v.description || '',
                    photo_url: v.photo_url || '', photo_path: v.photo_path || '',
                  });
                  setPhotoNote('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(v)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* banner */}
      <div className="adminlist">
        <h4>Banner photo</h4>
        <div className="drop">
          <div className="prev" style={banner ? { backgroundImage: `url('${banner}')` } : undefined} />
          <div className="txt">
            <p>A wide photo works best. The dark overlay stays on top so the heading is always readable. Leave this empty to keep the built-in graphic.</p>
            <div className="g">
              <button className="btn btn-line btn-sm" type="button" disabled={bannerBusy} onClick={() => bannerFile.current.click()}>
                {bannerBusy ? 'Uploading...' : banner ? 'Replace photo' : 'Choose photo'}
              </button>
              {banner ? (
                <button className="btn btn-ghost btn-sm" type="button" disabled={bannerBusy} onClick={handleBannerClear}>Remove</button>
              ) : null}
            </div>
          </div>
        </div>
        <input ref={bannerFile} type="file" accept="image/*" className="hidden" onChange={handleBannerPhoto} />
      </div>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <>
      <header className="topbar">
        <div className="wrap">
          <a className="brand" href="/">
            <span className="mark">{site.initials}</span>
            <span><b>{site.name}</b><i>Admin</i></span>
          </a>
        </div>
      </header>
      <section style={{ borderBottom: 0 }}>
        <div className="wrap" style={{ maxWidth: 760 }}>{children}</div>
      </section>
    </>
  );
}
