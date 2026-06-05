import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildContextTags,
  createRecommendationReason,
  getWeeklyEmotionSummary,
  recommendPlaylists,
  recommendTracks,
  demoPlaylists,
  demoTracks
} from './mood.js';

test('maps emotion, weather, time, situation, and vibe into recommendation tags', () => {
  const tags = buildContextTags({
    emotion: 'sad',
    weather: 'rain',
    time: 'night',
    situation: 'alone',
    vibes: ['comfort', 'lyrics']
  });

  assert.deepEqual(tags, [
    'sad',
    'calm',
    'comfort',
    'rainy',
    'acoustic',
    'mellow',
    'night',
    'ambient',
    'soft',
    'alone',
    'indie',
    'lyrics'
  ]);
});

test('recommends calm rainy-night music for a sad alone context', () => {
  const context = {
    emotion: 'sad',
    weather: 'rain',
    time: 'night',
    situation: 'alone',
    vibes: ['comfort', 'lyrics']
  };

  const [topTrack] = recommendTracks(context, demoTracks);
  const [topPlaylist] = recommendPlaylists(context, demoPlaylists);

  assert.equal(topTrack.id, 'rain-window-letter');
  assert.equal(topPlaylist.id, 'rainy-night-comfort');
  assert.ok(topTrack.score > 0);
  assert.ok(topPlaylist.score > 0);
});

test('boosts recommendations that match liked genres or saved tags', () => {
  const context = {
    emotion: 'angry',
    weather: 'hot',
    time: 'afternoon',
    situation: 'workout',
    vibes: ['energetic'],
    likedTags: ['edm', 'rock']
  };

  const [topTrack] = recommendTracks(context, demoTracks);

  assert.equal(topTrack.id, 'heatwave-sprint');
  assert.ok(topTrack.score >= 9);
});

test('creates an explainable recommendation reason from the selected context', () => {
  const reason = createRecommendationReason({
    emotion: 'tired',
    weather: 'cloudy',
    time: 'dawn',
    situation: 'study',
    vibes: ['focus']
  });

  assert.match(reason.headline, /지친/);
  assert.match(reason.body, /흐린/);
  assert.match(reason.body, /공부/);
});

test('summarizes the most frequent weekly emotion from listening history', () => {
  const summary = getWeeklyEmotionSummary([
    { emotion: 'tired', weather: 'rain', trackId: 'a' },
    { emotion: 'happy', weather: 'sunny', trackId: 'b' },
    { emotion: 'tired', weather: 'cloudy', trackId: 'c' }
  ]);

  assert.equal(summary.topEmotion, 'tired');
  assert.equal(summary.count, 2);
  assert.match(summary.copy, /지침/);
});
