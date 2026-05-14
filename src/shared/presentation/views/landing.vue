<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import useIamStore from "../../../iam/application/iam.store.js";


const { t } = useI18n();
const router = useRouter();
const store  = useIamStore();

function goToDashboard() {
  if (store.isAuthenticated) router.push('/dashboard');
  else router.push('/iam/login');
}
</script>

<template>
  <div class="landing">
    <!-- Nav -->
    <nav class="landing-nav">
      <div class="nav-brand">
        <span class="logo-icon">✦</span>
        <span class="logo-text">MediSync</span>
      </div>
      <div class="nav-actions">
        <router-link to="/iam/login" class="nav-link">{{ t('auth.login') }}</router-link>
        <router-link to="/iam/register" class="nav-cta">{{ t('auth.register') }}</router-link>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Clinical Management Platform
        </div>
        <h1 class="hero-title" v-html="t('home.hero_title').replace(/\n/g, '<br/>')"></h1>
        <p class="hero-subtitle">{{ t('home.hero_subtitle') }}</p>
        <div class="hero-cta">
          <button class="btn-primary" @click="goToDashboard">{{ t('home.cta_primary') }}</button>
          <a href="#features" class="btn-ghost">{{ t('home.cta_secondary') }}</a>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="mock-card">
          <div class="mc-header">
            <span class="mc-dot red"></span>
            <span class="mc-dot yellow"></span>
            <span class="mc-dot green"></span>
          </div>
          <div class="mc-body">
            <div class="mc-row">
              <div class="mc-avatar"></div>
              <div class="mc-lines">
                <div class="mc-line long"></div>
                <div class="mc-line short"></div>
              </div>
              <div class="mc-badge">Cardio</div>
            </div>
            <div class="mc-divider"></div>
            <div class="mc-stats">
              <div class="mc-stat" v-for="n in 3" :key="n">
                <div class="mc-num" :style="`width: ${40+n*20}px`"></div>
                <div class="mc-label"></div>
              </div>
            </div>
            <div class="mc-chart">
              <div v-for="(h, i) in [40,60,50,80,65,90,72]" :key="i" class="mc-bar" :style="`height: ${h}%`"></div>
            </div>
          </div>
        </div>
        <div class="floating-pill pill-1">
          <i class="pi pi-check-circle"></i> Appointment confirmed
        </div>
        <div class="floating-pill pill-2">
          <i class="pi pi-users"></i> 3 new patients today
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-bar">
      <div class="stat-item">
        <strong>12,400+</strong>
        <span>{{ t('home.stats_patients') }}</span>
      </div>
      <div class="stat-sep"></div>
      <div class="stat-item">
        <strong>320+</strong>
        <span>{{ t('home.stats_doctors') }}</span>
      </div>
      <div class="stat-sep"></div>
      <div class="stat-item">
        <strong>99.9%</strong>
        <span>{{ t('home.stats_uptime') }}</span>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="features">
      <div class="feature-card">
        <div class="feature-icon"><i class="pi pi-folder-open"></i></div>
        <h3>{{ t('home.feature_1_title') }}</h3>
        <p>{{ t('home.feature_1_desc') }}</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><i class="pi pi-calendar"></i></div>
        <h3>{{ t('home.feature_2_title') }}</h3>
        <p>{{ t('home.feature_2_desc') }}</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><i class="pi pi-chart-bar"></i></div>
        <h3>{{ t('home.feature_3_title') }}</h3>
        <p>{{ t('home.feature_3_desc') }}</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="landing-footer">
      <span>© 2026 MediSync · All rights reserved</span>
    </footer>
  </div>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  background: var(--ms-surface);
  display: flex;
  flex-direction: column;
}

/* Nav */
.landing-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 3rem;
  border-bottom: 1px solid var(--ms-border);
  position: sticky;
  top: 0;
  background: rgba(255,255,255,.95);
  backdrop-filter: blur(8px);
  z-index: 100;
}
.nav-brand { display: flex; align-items: center; gap: .5rem; }
.logo-icon { color: var(--ms-primary); font-size: 1.3rem; }
.logo-text { font-family: 'DM Serif Display', serif; font-size: 1.25rem; color: var(--ms-text); }

.nav-actions { display: flex; align-items: center; gap: 1rem; }
.nav-link { font-size: .88rem; font-weight: 500; color: var(--ms-text-muted); }
.nav-link:hover { color: var(--ms-primary); }
.nav-cta {
  padding: .45rem 1.1rem;
  background: var(--ms-primary);
  color: #fff;
  border-radius: 7px;
  font-size: .88rem;
  font-weight: 600;
  transition: background .2s;
}
.nav-cta:hover { background: var(--ms-primary-dark); color: #fff; }

/* Hero */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 5rem 3rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
@media (max-width: 900px) {
  .hero { flex-direction: column; text-align: center; }
  .hero-cta { justify-content: center; }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  font-size: .78rem;
  font-weight: 600;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: var(--ms-primary);
  background: rgba(13,110,110,.08);
  border: 1px solid rgba(13,110,110,.2);
  border-radius: 100px;
  padding: .3rem .85rem;
  margin-bottom: 1.25rem;
}
.badge-dot {
  width: 6px; height: 6px;
  background: var(--ms-primary-light);
  border-radius: 50%;
  animation: pulse 1.8s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: .5; transform: scale(.75); }
}

.hero-title {
  font-size: 3.2rem;
  line-height: 1.08;
  margin-bottom: 1.25rem;
  color: var(--ms-text);
}
.hero-subtitle {
  font-size: 1.05rem;
  color: var(--ms-text-muted);
  max-width: 440px;
  margin-bottom: 2rem;
  line-height: 1.65;
}

.hero-cta { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
.btn-primary {
  padding: .75rem 1.75rem;
  background: var(--ms-primary);
  color: #fff;
  border: none;
  border-radius: 9px;
  font-family: inherit;
  font-size: .95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s, transform .1s;
}
.btn-primary:hover { background: var(--ms-primary-dark); transform: translateY(-1px); }
.btn-ghost {
  padding: .75rem 1.5rem;
  border: 1.5px solid var(--ms-border);
  border-radius: 9px;
  font-size: .95rem;
  font-weight: 500;
  color: var(--ms-text);
  transition: border-color .2s;
}
.btn-ghost:hover { border-color: var(--ms-primary); color: var(--ms-primary); }

/* Hero visual / mock card */
.hero-visual { position: relative; flex-shrink: 0; }

.mock-card {
  width: 340px;
  background: var(--ms-surface);
  border: 1px solid var(--ms-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,.1);
}
.mc-header { display: flex; gap: .35rem; padding: .75rem 1rem; background: var(--ms-surface-2); }
.mc-dot { width: 10px; height: 10px; border-radius: 50%; }
.mc-dot.red    { background: #ff5f57; }
.mc-dot.yellow { background: #febc2e; }
.mc-dot.green  { background: #28c840; }

.mc-body { padding: 1rem; }
.mc-row { display: flex; align-items: center; gap: .75rem; margin-bottom: 1rem; }
.mc-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--ms-primary-light), var(--ms-primary)); flex-shrink: 0; }
.mc-lines { flex: 1; display: flex; flex-direction: column; gap: .35rem; }
.mc-line { height: 8px; background: var(--ms-border); border-radius: 4px; }
.mc-line.long { width: 80%; }
.mc-line.short { width: 50%; }
.mc-badge { padding: .2rem .6rem; background: rgba(13,110,110,.1); color: var(--ms-primary); border-radius: 5px; font-size: .72rem; font-weight: 600; }

.mc-divider { height: 1px; background: var(--ms-border); margin-bottom: 1rem; }

.mc-stats { display: flex; gap: .75rem; margin-bottom: 1rem; }
.mc-stat { flex: 1; }
.mc-num { height: 14px; background: var(--ms-primary-light); border-radius: 3px; margin-bottom: .3rem; opacity: .4; }
.mc-label { height: 8px; background: var(--ms-border); border-radius: 3px; width: 60%; }

.mc-chart { display: flex; align-items: flex-end; gap: 6px; height: 60px; }
.mc-bar {
  flex: 1;
  background: var(--ms-primary);
  border-radius: 4px 4px 0 0;
  opacity: .7;
  transition: opacity .2s;
}
.mc-bar:hover { opacity: 1; }

/* Floating pills */
.floating-pill {
  position: absolute;
  display: flex;
  align-items: center;
  gap: .45rem;
  background: var(--ms-surface);
  border: 1px solid var(--ms-border);
  border-radius: 100px;
  padding: .5rem 1rem;
  font-size: .78rem;
  font-weight: 500;
  color: var(--ms-text);
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
  white-space: nowrap;
}
.floating-pill .pi { color: var(--ms-primary); }
.pill-1 { top: -16px; right: -24px; animation: float1 4s ease-in-out infinite; }
.pill-2 { bottom: 24px; left: -32px; animation: float2 5s ease-in-out infinite; }
@keyframes float1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes float2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

/* Stats bar */
.stats-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 2.5rem 3rem;
  background: var(--ms-sidebar-bg);
  color: #fff;
}
.stat-item { text-align: center; }
.stat-item strong { display: block; font-size: 1.8rem; font-family: 'DM Serif Display', serif; color: var(--ms-primary-light); }
.stat-item span { font-size: .8rem; color: var(--ms-sidebar-text); text-transform: uppercase; letter-spacing: .5px; }
.stat-sep { width: 1px; height: 40px; background: rgba(255,255,255,.1); }

/* Features */
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 4rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
@media (max-width: 768px) { .features { grid-template-columns: 1fr; padding: 2rem 1.5rem; } }

.feature-card {
  background: var(--ms-surface);
  border: 1px solid var(--ms-border);
  border-radius: 14px;
  padding: 1.75rem;
  transition: box-shadow .2s, transform .2s;
}
.feature-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,.08); transform: translateY(-2px); }
.feature-icon {
  width: 48px; height: 48px;
  background: rgba(13,110,110,.1);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: var(--ms-primary);
}
.feature-card h3 { font-family: 'DM Sans', sans-serif; font-weight: 600; margin-bottom: .4rem; font-size: 1rem; }
.feature-card p { font-size: .88rem; color: var(--ms-text-muted); line-height: 1.6; }

/* Footer */
.landing-footer {
  padding: 1.5rem 3rem;
  border-top: 1px solid var(--ms-border);
  text-align: center;
  font-size: .8rem;
  color: var(--ms-text-muted);
  margin-top: auto;
}
</style>
