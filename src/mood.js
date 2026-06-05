export const emotionOptions = [
  { id: 'happy', label: '행복해요', tone: 'sunny coral', color: '#ffc857' },
  { id: 'sad', label: '우울해요', tone: 'rain navy', color: '#4c6fff' },
  { id: 'tired', label: '지쳤어요', tone: 'muted violet', color: '#9b8cff' },
  { id: 'excited', label: '설레요', tone: 'pink lavender', color: '#ff8fc7' },
  { id: 'angry', label: '화나요', tone: 'hot red', color: '#ff684d' },
  { id: 'lonely', label: '외로워요', tone: 'deep blue', color: '#6aa6ff' },
  { id: 'focus', label: '집중하고 싶어요', tone: 'blue mint', color: '#53d6c8' },
  { id: 'relaxed', label: '편안해지고 싶어요', tone: 'soft green', color: '#84d68a' }
];

export const weatherOptions = [
  { id: 'sunny', label: '맑음', detail: '햇살이 선명한 날' },
  { id: 'rain', label: '비', detail: '창밖에 비가 오는 중' },
  { id: 'cloudy', label: '흐림', detail: '조금 낮게 깔린 하늘' },
  { id: 'snow', label: '눈', detail: '조용히 눈이 오는 날' },
  { id: 'hot', label: '더움', detail: '열기가 남아있는 공기' },
  { id: 'cold', label: '추움', detail: '차갑고 맑은 공기' },
  { id: 'night', label: '밤', detail: '늦은 밤의 온도' },
  { id: 'dawn', label: '새벽', detail: '아직 조용한 시간' }
];

export const timeOptions = [
  { id: 'morning', label: '아침' },
  { id: 'afternoon', label: '오후' },
  { id: 'evening', label: '저녁' },
  { id: 'night', label: '밤' },
  { id: 'dawn', label: '새벽' }
];

export const situationOptions = [
  { id: 'commute', label: '출근/등교 중' },
  { id: 'way-home', label: '퇴근길' },
  { id: 'study', label: '공부 중' },
  { id: 'workout', label: '운동 중' },
  { id: 'walk', label: '산책 중' },
  { id: 'drive', label: '드라이브 중' },
  { id: 'sleep', label: '잠들기 전' },
  { id: 'alone', label: '혼자 있는 시간' }
];

export const vibeOptions = [
  { id: 'comfort', label: '위로되는' },
  { id: 'calm', label: '잔잔한' },
  { id: 'lyrics', label: '가사 있는' },
  { id: 'focus', label: '집중되는' },
  { id: 'energetic', label: '에너지 있는' },
  { id: 'dreamy', label: '몽환적인' }
];

const tagMap = {
  emotion: {
    happy: ['happy', 'bright', 'pop', 'acoustic'],
    sad: ['sad', 'calm', 'comfort'],
    tired: ['tired', 'calm', 'lofi', 'soft'],
    excited: ['excited', 'pop', 'sparkle', 'dance'],
    angry: ['angry', 'energetic', 'release'],
    lonely: ['lonely', 'indie', 'night', 'comfort'],
    focus: ['focus', 'lofi', 'instrumental'],
    relaxed: ['relaxed', 'ambient', 'soft', 'acoustic']
  },
  weather: {
    sunny: ['sunny', 'bright', 'citypop', 'walk'],
    rain: ['rainy', 'acoustic', 'mellow'],
    cloudy: ['cloudy', 'lofi', 'soft'],
    snow: ['snowy', 'piano', 'warm'],
    hot: ['hot', 'hiphop', 'edm'],
    cold: ['cold', 'ambient', 'piano'],
    night: ['night', 'ambient', 'soft'],
    dawn: ['dawn', 'dreamy', 'quiet']
  },
  time: {
    morning: ['morning', 'fresh', 'acoustic'],
    afternoon: ['afternoon', 'bright', 'pop'],
    evening: ['evening', 'mellow', 'drive'],
    night: ['night', 'ambient', 'soft'],
    dawn: ['dawn', 'quiet', 'dreamy']
  },
  situation: {
    commute: ['commute', 'pop', 'rhythm'],
    'way-home': ['way-home', 'mellow', 'comfort'],
    study: ['study', 'focus', 'lofi', 'instrumental'],
    workout: ['workout', 'energetic', 'hiphop', 'edm'],
    walk: ['walk', 'acoustic', 'citypop'],
    drive: ['drive', 'citypop', 'rhythm'],
    sleep: ['sleep', 'ambient', 'soft'],
    alone: ['alone', 'indie']
  }
};

export const demoTracks = [
  {
    id: 'rain-window-letter',
    title: 'Rain Window Letter',
    artist: 'June Harbor',
    duration: '3:41',
    genre: 'Indie Ballad',
    tags: ['sad', 'rainy', 'night', 'comfort', 'acoustic', 'mellow', 'soft', 'indie', 'lyrics', 'alone'],
    cover: 'linear-gradient(145deg, #1f2a56, #5872b8 52%, #d7c5ff)',
    previewUrl: 'https://www.youtube.com/results?search_query=rainy+night+indie+ballad'
  },
  {
    id: 'sunny-sidewalk',
    title: 'Sunny Sidewalk',
    artist: 'Maro Club',
    duration: '2:58',
    genre: 'City Pop',
    tags: ['happy', 'sunny', 'bright', 'walk', 'citypop', 'pop', 'acoustic'],
    cover: 'linear-gradient(145deg, #ffc857, #ff8f70 50%, #48c6b8)',
    previewUrl: 'https://www.youtube.com/results?search_query=bright+city+pop+walk'
  },
  {
    id: 'cloud-study-loop',
    title: 'Cloud Study Loop',
    artist: 'Pale Desk',
    duration: '4:20',
    genre: 'Lo-fi',
    tags: ['focus', 'study', 'cloudy', 'lofi', 'instrumental', 'soft', 'calm'],
    cover: 'linear-gradient(145deg, #65758b, #78dcca 58%, #f2f2e8)',
    previewUrl: 'https://www.youtube.com/results?search_query=lofi+study+cloudy'
  },
  {
    id: 'heatwave-sprint',
    title: 'Heatwave Sprint',
    artist: 'Riot Mile',
    duration: '3:09',
    genre: 'EDM Rock',
    tags: ['angry', 'hot', 'workout', 'energetic', 'hiphop', 'edm', 'rock', 'release'],
    cover: 'linear-gradient(145deg, #ff684d, #ffb000 48%, #231b20)',
    previewUrl: 'https://www.youtube.com/results?search_query=edm+rock+workout+heat'
  },
  {
    id: 'dawn-blanket',
    title: 'Dawn Blanket',
    artist: 'Luna Pond',
    duration: '3:52',
    genre: 'Ambient',
    tags: ['tired', 'dawn', 'dreamy', 'quiet', 'soft', 'ambient', 'sleep'],
    cover: 'linear-gradient(145deg, #2d2c5f, #9b8cff 55%, #f5c7d8)',
    previewUrl: 'https://www.youtube.com/results?search_query=dawn+ambient+sleep'
  },
  {
    id: 'cold-piano-room',
    title: 'Cold Piano Room',
    artist: 'Nell Yard',
    duration: '4:04',
    genre: 'Piano',
    tags: ['lonely', 'cold', 'piano', 'ambient', 'night', 'comfort', 'calm'],
    cover: 'linear-gradient(145deg, #17243f, #6aa6ff 56%, #e8f4ff)',
    previewUrl: 'https://www.youtube.com/results?search_query=cold+night+piano+comfort'
  }
];

export const demoPlaylists = [
  {
    id: 'rainy-night-comfort',
    title: '비 오는 밤, 조금 지친 당신에게',
    description: '잔잔한 인디와 따뜻한 발라드로 마음을 천천히 낮춰요.',
    tags: ['sad', 'rainy', 'night', 'comfort', 'acoustic', 'mellow', 'soft', 'lyrics', 'alone'],
    trackIds: ['rain-window-letter', 'cold-piano-room', 'dawn-blanket'],
    image: 'linear-gradient(145deg, #10182f, #405d97 50%, #b9a7ff)'
  },
  {
    id: 'sunny-walk-pop',
    title: '햇살 아래 산책 팝',
    description: '맑은 날 걷기 좋은 밝은 팝과 시티팝을 모았어요.',
    tags: ['happy', 'sunny', 'walk', 'citypop', 'bright', 'pop', 'acoustic'],
    trackIds: ['sunny-sidewalk', 'cloud-study-loop'],
    image: 'linear-gradient(145deg, #ffd166, #ff8f70 50%, #74d3ae)'
  },
  {
    id: 'cloud-focus-desk',
    title: '흐린 날의 집중 루프',
    description: '공부와 작업에 맞춘 lo-fi, 클래식, 앰비언트 무드.',
    tags: ['focus', 'cloudy', 'study', 'lofi', 'instrumental', 'ambient', 'soft'],
    trackIds: ['cloud-study-loop', 'dawn-blanket'],
    image: 'linear-gradient(145deg, #3d4a5d, #78dcca 58%, #f1f2df)'
  },
  {
    id: 'hot-release-workout',
    title: '더운 날 분출하는 운동 비트',
    description: '화난 기분을 안전하게 밀어내는 힙합, 록, EDM.',
    tags: ['angry', 'hot', 'workout', 'energetic', 'hiphop', 'edm', 'rock', 'release'],
    trackIds: ['heatwave-sprint', 'sunny-sidewalk'],
    image: 'linear-gradient(145deg, #ff3d34, #ffb000 45%, #1b1b24)'
  }
];

export function buildContextTags(context) {
  return unique([
    ...(tagMap.emotion[context.emotion] ?? []),
    ...(tagMap.weather[context.weather] ?? []),
    ...(tagMap.time[context.time] ?? []),
    ...(tagMap.situation[context.situation] ?? []),
    ...(context.vibes ?? [])
  ]);
}

export function recommendTracks(context, tracks = demoTracks) {
  return rankItems(context, tracks);
}

export function recommendPlaylists(context, playlists = demoPlaylists) {
  return rankItems(context, playlists);
}

export function createRecommendationReason(context) {
  const emotion = findOption(emotionOptions, context.emotion);
  const weather = findOption(weatherOptions, context.weather);
  const time = findOption(timeOptions, context.time);
  const situation = findOption(situationOptions, context.situation);
  const vibeLabels = (context.vibes ?? []).map((id) => findOption(vibeOptions, id).label).join(', ');
  const emotionAdjective = emotionAdjectives[context.emotion] ?? emotion.label.replace('해요', '한');

  return {
    headline: `${weather.label} ${time.label}, ${emotionAdjective} 당신에게`,
    body: `${weatherPhrase[context.weather] ?? weather.detail} 날씨와 ${situation.label} 맥락을 함께 봤어요. 오늘은 ${vibeLabels || emotion.tone} 분위기의 음악이 자연스럽게 맞습니다.`
  };
}

export function getWeeklyEmotionSummary(history) {
  if (!history.length) {
    return {
      topEmotion: null,
      count: 0,
      copy: '아직 감정 기록이 없어요. 첫 추천을 저장하면 이곳에 요약이 생깁니다.'
    };
  }

  const counts = history.reduce((result, item) => {
    result[item.emotion] = (result[item.emotion] ?? 0) + 1;
    return result;
  }, {});
  const [topEmotion, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const label = emotionNouns[topEmotion] ?? findOption(emotionOptions, topEmotion).label;

  return {
    topEmotion,
    count,
    copy: `이번 주에는 '${label}'을 가장 많이 느꼈어요.`
  };
}

export function createVisualTheme(context) {
  const emotion = findOption(emotionOptions, context.emotion);
  const weather = context.weather;
  const palette = {
    happy: ['#ffc857', '#ff7f6e', '#162129'],
    sad: ['#4c6fff', '#91a7ff', '#10172f'],
    tired: ['#9b8cff', '#6d6a8f', '#151521'],
    excited: ['#ff8fc7', '#b792ff', '#1f1728'],
    angry: ['#ff684d', '#ffb000', '#241719'],
    lonely: ['#6aa6ff', '#8ed2ff', '#101827'],
    focus: ['#53d6c8', '#6aa6ff', '#102322'],
    relaxed: ['#84d68a', '#d7c99b', '#102018']
  }[context.emotion] ?? ['#ffc857', '#72f2cc', '#101418'];

  const weatherLayer = {
    rain: 'radial-gradient(circle at 20% 0%, rgba(145, 167, 255, .24), transparent 34%)',
    sunny: 'radial-gradient(circle at 80% 8%, rgba(255, 200, 87, .3), transparent 30%)',
    cloudy: 'radial-gradient(circle at 50% 0%, rgba(230, 235, 245, .16), transparent 36%)',
    snow: 'radial-gradient(circle at 26% 18%, rgba(255, 255, 255, .24), transparent 32%)',
    hot: 'radial-gradient(circle at 70% 10%, rgba(255, 104, 77, .3), transparent 30%)',
    cold: 'radial-gradient(circle at 24% 0%, rgba(106, 166, 255, .28), transparent 32%)',
    night: 'radial-gradient(circle at 50% 0%, rgba(139, 146, 255, .16), transparent 34%)',
    dawn: 'radial-gradient(circle at 45% 0%, rgba(245, 199, 216, .22), transparent 34%)'
  }[weather] ?? 'radial-gradient(circle at 50% 0%, rgba(255,255,255,.12), transparent 34%)';

  return {
    accent: palette[0],
    accentTwo: palette[1],
    base: palette[2],
    emotionColor: emotion.color,
    background: `${weatherLayer}, linear-gradient(160deg, ${palette[2]}, #090a0f 62%, #050608)`
  };
}

function rankItems(context, items) {
  const contextTags = buildContextTags(context);
  const likedTags = context.likedTags ?? [];

  return items
    .map((item) => {
      const matches = item.tags.filter((tag) => contextTags.includes(tag));
      const likeMatches = item.tags.filter((tag) => likedTags.includes(tag));
      const score = matches.length + likeMatches.length * 1.5;

      return {
        ...item,
        matchedTags: unique([...matches, ...likeMatches]),
        score: round1(score)
      };
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

function findOption(options, id) {
  return options.find((option) => option.id === id) ?? { id, label: id, detail: id, tone: id, color: '#ffffff' };
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

const emotionNouns = {
  happy: '행복',
  sad: '우울함',
  tired: '지침',
  excited: '설렘',
  angry: '화남',
  lonely: '외로움',
  focus: '집중',
  relaxed: '편안함'
};

const emotionAdjectives = {
  happy: '행복한',
  sad: '우울한',
  tired: '지친',
  excited: '설레는',
  angry: '화가 난',
  lonely: '외로운',
  focus: '집중하고 싶은',
  relaxed: '편안해지고 싶은'
};

const weatherPhrase = {
  sunny: '맑은',
  rain: '비 오는',
  cloudy: '흐린',
  snow: '눈 오는',
  hot: '더운',
  cold: '추운',
  night: '밤의',
  dawn: '새벽의'
};
