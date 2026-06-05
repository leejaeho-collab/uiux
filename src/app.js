import {
  buildContextTags,
  createRecommendationReason,
  createVisualTheme,
  demoPlaylists,
  demoTracks,
  emotionOptions,
  getWeeklyEmotionSummary,
  recommendPlaylists,
  recommendTracks,
  situationOptions,
  timeOptions,
  vibeOptions,
  weatherOptions
} from './mood.js';

const storageKey = 'moodcast-music-state-v1';
const app = document.querySelector('#app');

const state = {
  activeTab: 'home',
  context: {
    emotion: 'tired',
    weather: 'rain',
    time: getDefaultTime(),
    situation: 'alone',
    vibes: ['comfort', 'calm']
  },
  currentTrackId: null,
  likedTrackIds: [],
  savedPlaylistIds: [],
  history: [
    { emotion: 'tired', weather: 'rain', situation: 'alone', trackId: 'rain-window-letter', playlistId: 'rainy-night-comfort', createdAt: Date.now() - 86400000 * 2 },
    { emotion: 'focus', weather: 'cloudy', situation: 'study', trackId: 'cloud-study-loop', playlistId: 'cloud-focus-desk', createdAt: Date.now() - 86400000 }
  ],
  trackingEnabled: true,
  isPlaying: true
};

Object.assign(state, readSavedState());
render();

app.addEventListener('click', (event) => {
  const target = event.target.closest('button, a');
  if (!target) return;

  const { action, tab, field, value, trackId, playlistId } = target.dataset;

  if (tab) {
    state.activeTab = tab;
    render();
    return;
  }

  if (action === 'select') {
    updateContext(field, value);
  }

  if (action === 'toggle-vibe') {
    toggleVibe(value);
  }

  if (action === 'start') {
    state.activeTab = 'recommend';
    saveHistory();
  }

  if (action === 'track') {
    state.currentTrackId = trackId;
    state.activeTab = 'player';
  }

  if (action === 'playlist') {
    toggleSavedPlaylist(playlistId);
  }

  if (action === 'play') {
    state.isPlaying = !state.isPlaying;
  }

  if (action === 'like') {
    toggleLikedTrack(state.currentTrackId);
  }

  if (action === 'save-current-playlist') {
    const [playlist] = getRecommendations().playlists;
    toggleSavedPlaylist(playlist.id);
  }

  if (action === 'reroll') {
    const tracks = getRecommendations().tracks;
    const index = Math.max(0, tracks.findIndex((track) => track.id === state.currentTrackId));
    state.currentTrackId = tracks[(index + 1) % tracks.length].id;
  }

  if (action === 'record') {
    saveHistory();
  }

  if (action === 'clear-history') {
    state.history = [];
  }

  if (action === 'toggle-tracking') {
    state.trackingEnabled = !state.trackingEnabled;
  }

  if (action === 'open-preview') {
    const current = getCurrentTrack();
    window.open(current.previewUrl, '_blank', 'noopener,noreferrer');
  }

  persist();
  render();
});

function render() {
  const theme = createVisualTheme(state.context);
  const { tracks } = getRecommendations();
  if (!state.currentTrackId || !tracks.some((track) => track.id === state.currentTrackId)) {
    state.currentTrackId = tracks[0].id;
  }

  app.style.setProperty('--accent', theme.accent);
  app.style.setProperty('--accent-two', theme.accentTwo);
  app.style.setProperty('--app-bg', theme.background);
  app.innerHTML = `
    ${renderHeader()}
    <div class="scroll-area">
      ${state.activeTab === 'home' ? renderHome() : ''}
      ${state.activeTab === 'recommend' ? renderRecommend() : ''}
      ${state.activeTab === 'player' ? renderPlayer() : ''}
      ${state.activeTab === 'history' ? renderHistory() : ''}
      ${state.activeTab === 'library' ? renderLibrary() : ''}
    </div>
    ${renderMiniPlayer()}
    ${renderNav()}
  `;
}

function renderHeader() {
  const weather = getOption(weatherOptions, state.context.weather);
  const time = getOption(timeOptions, state.context.time);

  return `
    <header class="app-header">
      <div>
        <p class="eyebrow">MoodCast Music</p>
        <h1>오늘의 감정과 날씨에 맞는 음악</h1>
      </div>
      <div class="weather-pill">
        <span>서울</span>
        <strong>${weather.label}</strong>
        <span>18°C · ${time.label}</span>
      </div>
    </header>
  `;
}

function renderHome() {
  const { playlists } = getRecommendations();
  const reason = createRecommendationReason(state.context);
  const playlist = playlists[0];

  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Quick cast</p>
        <h2>오늘 기분은 어떤가요?</h2>
        <p>${reason.body}</p>
      </div>
      <div class="weather-orb" aria-hidden="true">
        <span></span>
        <i></i>
      </div>
    </section>

    <section class="section-block">
      <div class="section-title">
        <span>감정 선택</span>
        <small>한 번 누르면 추천이 바로 바뀝니다</small>
      </div>
      <div class="option-grid emotion-grid">
        ${emotionOptions.map((option) => renderOption('emotion', option)).join('')}
      </div>
    </section>

    <section class="forecast-strip">
      <div>
        <span>현재 날씨</span>
        <strong>${getOption(weatherOptions, state.context.weather).label}</strong>
      </div>
      <div>
        <span>상황</span>
        <strong>${getOption(situationOptions, state.context.situation).label}</strong>
      </div>
      <button class="text-button" type="button" data-tab="recommend">직접 조정</button>
    </section>

    <section class="playlist-feature">
      <div class="playlist-art" style="background:${playlist.image}"></div>
      <div>
        <p class="eyebrow">오늘의 추천 플레이리스트</p>
        <h3>${playlist.title}</h3>
        <p>${playlist.description}</p>
        <button class="primary-button" type="button" data-action="start">추천 결과 보기</button>
      </div>
    </section>
  `;
}

function renderRecommend() {
  const { tracks, playlists } = getRecommendations();
  const reason = createRecommendationReason(state.context);
  const playlist = playlists[0];

  return `
    <section class="reason-band">
      <p class="eyebrow">Recommendation</p>
      <h2>${reason.headline}</h2>
      <p>${reason.body}</p>
    </section>

    <section class="setup-stack">
      ${renderChoiceSection('1단계 · 감정', 'emotion', emotionOptions)}
      ${renderChoiceSection('2단계 · 날씨', 'weather', weatherOptions)}
      ${renderChoiceSection('3단계 · 시간대', 'time', timeOptions)}
      ${renderChoiceSection('4단계 · 상황', 'situation', situationOptions)}
      <div class="choice-panel">
        <div class="section-title">
          <span>원하는 분위기</span>
          <small>여러 개 선택 가능</small>
        </div>
        <div class="chip-grid">
          ${vibeOptions.map((option) => renderVibe(option)).join('')}
        </div>
      </div>
    </section>

    <section class="result-card">
      <div class="playlist-art large" style="background:${playlist.image}"></div>
      <div class="result-copy">
        <p class="eyebrow">${Math.round(playlist.score * 10)}% mood fit</p>
        <h3>${playlist.title}</h3>
        <p>${playlist.description}</p>
        <div class="action-row">
          <button class="primary-button" type="button" data-tab="player">전체 재생</button>
          <button class="icon-button" type="button" data-action="save-current-playlist" aria-label="플레이리스트 저장">${state.savedPlaylistIds.includes(playlist.id) ? '★' : '☆'}</button>
          <button class="icon-button" type="button" data-action="reroll" aria-label="다시 추천">↻</button>
        </div>
      </div>
    </section>

    <section class="track-list">
      <div class="section-title">
        <span>추천 곡</span>
        <small>${buildContextTags(state.context).slice(0, 4).join(' · ')}</small>
      </div>
      ${tracks.slice(0, 5).map((track) => renderTrackRow(track)).join('')}
    </section>
  `;
}

function renderPlayer() {
  const track = getCurrentTrack();
  const liked = state.likedTrackIds.includes(track.id);
  const progress = state.isPlaying ? '42%' : '18%';

  return `
    <section class="player-view">
      <div class="cover-hero" style="background:${track.cover}">
        <div class="equalizer ${state.isPlaying ? 'is-playing' : ''}" aria-hidden="true">
          ${Array.from({ length: 18 }, (_, index) => `<span style="--delay:${index * 52}ms"></span>`).join('')}
        </div>
      </div>
      <p class="eyebrow">Now playing</p>
      <h2>${track.title}</h2>
      <p>${track.artist} · ${track.genre} · ${track.duration}</p>
      <div class="tag-row">
        ${track.tags.slice(0, 5).map((tag) => `<span>#${tag}</span>`).join('')}
      </div>
      <div class="progress" aria-label="재생 진행률">
        <span style="width:${progress}"></span>
      </div>
      <div class="player-controls">
        <button class="icon-button" type="button" data-action="reroll" aria-label="이전 곡">‹</button>
        <button class="play-circle" type="button" data-action="play" aria-label="재생 또는 일시정지">${state.isPlaying ? 'Ⅱ' : '▶'}</button>
        <button class="icon-button" type="button" data-action="reroll" aria-label="다음 곡">›</button>
      </div>
      <div class="action-row wide">
        <button class="secondary-button" type="button" data-action="like">${liked ? '좋아요 취소' : '좋아요'}</button>
        <button class="secondary-button" type="button" data-action="record">감정 기록 저장</button>
        <button class="secondary-button" type="button" data-action="open-preview">미리듣기 열기</button>
      </div>
    </section>
  `;
}

function renderHistory() {
  const summary = getWeeklyEmotionSummary(state.history);
  const recent = state.history.slice(-7).reverse();

  return `
    <section class="summary-panel">
      <p class="eyebrow">Emotion calendar</p>
      <h2>${summary.copy}</h2>
      <p>${state.trackingEnabled ? '감정과 추천받은 음악이 이 기기에만 저장됩니다.' : '현재 감정 기록이 꺼져 있습니다.'}</p>
      <div class="action-row">
        <button class="secondary-button" type="button" data-action="toggle-tracking">${state.trackingEnabled ? '기록 끄기' : '기록 켜기'}</button>
        <button class="secondary-button danger" type="button" data-action="clear-history">기록 삭제</button>
      </div>
    </section>

    <section class="calendar-grid" aria-label="감정 캘린더">
      ${Array.from({ length: 14 }, (_, index) => renderCalendarDot(recent[index], index)).join('')}
    </section>

    <section class="track-list">
      <div class="section-title">
        <span>최근 감정 추천</span>
        <small>${recent.length}개 기록</small>
      </div>
      ${recent.length ? recent.map((item) => renderHistoryRow(item)).join('') : '<p class="empty-copy">아직 저장된 기록이 없어요.</p>'}
    </section>
  `;
}

function renderLibrary() {
  const likedTracks = demoTracks.filter((track) => state.likedTrackIds.includes(track.id));
  const savedPlaylists = demoPlaylists.filter((playlist) => state.savedPlaylistIds.includes(playlist.id));

  return `
    <section class="library-filters">
      <button class="filter-chip active" type="button">감정별</button>
      <button class="filter-chip" type="button">날씨별</button>
      <button class="filter-chip" type="button">장르별</button>
      <button class="filter-chip" type="button">시간대별</button>
    </section>

    <section class="track-list">
      <div class="section-title">
        <span>좋아요한 곡</span>
        <small>${likedTracks.length}곡</small>
      </div>
      ${likedTracks.length ? likedTracks.map((track) => renderTrackRow(track)).join('') : '<p class="empty-copy">플레이어에서 마음에 드는 곡을 좋아요 해보세요.</p>'}
    </section>

    <section class="saved-playlists">
      <div class="section-title">
        <span>저장한 플레이리스트</span>
        <small>${savedPlaylists.length}개</small>
      </div>
      ${savedPlaylists.length ? savedPlaylists.map((playlist) => `
        <button class="saved-card" type="button" data-action="playlist" data-playlist-id="${playlist.id}">
          <span class="mini-art" style="background:${playlist.image}"></span>
          <strong>${playlist.title}</strong>
          <small>${playlist.tags.slice(0, 3).join(' · ')}</small>
        </button>
      `).join('') : '<p class="empty-copy">추천 결과에서 플레이리스트를 저장할 수 있어요.</p>'}
    </section>
  `;
}

function renderMiniPlayer() {
  const track = getCurrentTrack();

  return `
    <aside class="mini-player">
      <button class="mini-cover" type="button" data-tab="player" style="background:${track.cover}" aria-label="플레이어 열기"></button>
      <button class="mini-copy" type="button" data-tab="player">
        <strong>${track.title}</strong>
        <span>${track.artist}</span>
      </button>
      <button class="icon-button small" type="button" data-action="play" aria-label="재생 또는 일시정지">${state.isPlaying ? 'Ⅱ' : '▶'}</button>
    </aside>
  `;
}

function renderNav() {
  const tabs = [
    ['home', '홈'],
    ['recommend', '추천'],
    ['player', '재생'],
    ['history', '기록'],
    ['library', '보관함']
  ];

  return `
    <nav class="bottom-nav" aria-label="주요 화면">
      ${tabs.map(([id, label]) => `<button class="${state.activeTab === id ? 'active' : ''}" type="button" data-tab="${id}">${label}</button>`).join('')}
    </nav>
  `;
}

function renderChoiceSection(title, field, options) {
  return `
    <div class="choice-panel">
      <div class="section-title">
        <span>${title}</span>
        <small>${getOption(options, state.context[field]).label}</small>
      </div>
      <div class="chip-grid">
        ${options.map((option) => renderOption(field, option)).join('')}
      </div>
    </div>
  `;
}

function renderOption(field, option) {
  const active = state.context[field] === option.id;
  return `
    <button class="select-chip ${active ? 'active' : ''}" type="button" data-action="select" data-field="${field}" data-value="${option.id}">
      <span>${option.label}</span>
    </button>
  `;
}

function renderVibe(option) {
  const active = state.context.vibes.includes(option.id);
  return `
    <button class="select-chip ${active ? 'active' : ''}" type="button" data-action="toggle-vibe" data-value="${option.id}">
      <span>${option.label}</span>
    </button>
  `;
}

function renderTrackRow(track) {
  const liked = state.likedTrackIds.includes(track.id);

  return `
    <button class="track-row-card" type="button" data-action="track" data-track-id="${track.id}">
      <span class="mini-art" style="background:${track.cover}"></span>
      <span class="track-meta">
        <strong>${track.title}</strong>
        <small>${track.artist} · ${track.genre}</small>
      </span>
      <span class="score-badge">${Math.round(track.score * 10)}%</span>
      <span class="like-mark">${liked ? '♥' : '♡'}</span>
    </button>
  `;
}

function renderHistoryRow(item) {
  const track = demoTracks.find((entry) => entry.id === item.trackId) ?? demoTracks[0];
  const emotion = getOption(emotionOptions, item.emotion);
  const weather = getOption(weatherOptions, item.weather);

  return `
    <div class="history-row">
      <span class="mini-art" style="background:${track.cover}"></span>
      <span>
        <strong>${emotion.label} · ${weather.label}</strong>
        <small>${track.title}을 추천받았어요</small>
      </span>
    </div>
  `;
}

function renderCalendarDot(item, index) {
  const emotion = item ? getOption(emotionOptions, item.emotion) : null;
  const label = item ? emotion.label : `${index + 1}일`;

  return `
    <span class="calendar-dot ${item ? 'filled' : ''}" style="${item ? `--dot:${emotion.color}` : ''}" title="${label}">
      ${item ? '' : index + 1}
    </span>
  `;
}

function updateContext(field, value) {
  state.context[field] = value;
  state.currentTrackId = null;
  persist();
  render();
}

function toggleVibe(value) {
  const vibes = state.context.vibes;
  state.context.vibes = vibes.includes(value) ? vibes.filter((id) => id !== value) : [...vibes, value];
  state.currentTrackId = null;
}

function toggleLikedTrack(trackId) {
  if (!trackId) return;
  state.likedTrackIds = state.likedTrackIds.includes(trackId)
    ? state.likedTrackIds.filter((id) => id !== trackId)
    : [...state.likedTrackIds, trackId];
}

function toggleSavedPlaylist(playlistId) {
  if (!playlistId) return;
  state.savedPlaylistIds = state.savedPlaylistIds.includes(playlistId)
    ? state.savedPlaylistIds.filter((id) => id !== playlistId)
    : [...state.savedPlaylistIds, playlistId];
}

function saveHistory() {
  if (!state.trackingEnabled) return;
  const { playlists } = getRecommendations();
  state.history = [
    ...state.history,
    {
      emotion: state.context.emotion,
      weather: state.context.weather,
      situation: state.context.situation,
      trackId: state.currentTrackId,
      playlistId: playlists[0].id,
      createdAt: Date.now()
    }
  ].slice(-30);
}

function getRecommendations() {
  const likedTags = demoTracks
    .filter((track) => state.likedTrackIds.includes(track.id))
    .flatMap((track) => track.tags);
  const context = { ...state.context, likedTags };

  return {
    tracks: recommendTracks(context),
    playlists: recommendPlaylists(context)
  };
}

function getCurrentTrack() {
  const { tracks } = getRecommendations();
  return tracks.find((track) => track.id === state.currentTrackId) ?? tracks[0];
}

function getOption(options, id) {
  return options.find((option) => option.id === id) ?? options[0];
}

function getDefaultTime() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 7) return 'dawn';
  if (hour >= 7 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

function readSavedState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? {};
  } catch {
    return {};
  }
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify({
    context: state.context,
    currentTrackId: state.currentTrackId,
    likedTrackIds: state.likedTrackIds,
    savedPlaylistIds: state.savedPlaylistIds,
    history: state.history,
    trackingEnabled: state.trackingEnabled,
    isPlaying: state.isPlaying
  }));
}
