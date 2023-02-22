export const environment = {
  production: false,
};

export const SpotifyConfiguration = {
  clientId: 'SUBSTITUA PELO CLIENT_ID NO SITE SPOTIFY FOR DEVELOPERS',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUri: 'http://localhost:4200/login/',
  scopes: [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
  ],
};
