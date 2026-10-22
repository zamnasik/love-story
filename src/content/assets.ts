import type { SceneId } from './story';

/**
 * OPTIONAL: use your own artwork as a scene background.
 *
 * 1. Put the image in  public/images/  (e.g. public/images/village.webp)
 * 2. Add a line below, using a RELATIVE path with no leading slash:
 *        boy: 'images/village.webp',
 *
 * The image is layered over the built-in illustration and fades in once it has loaded.
 * If the file is missing or fails to load, the built-in illustration stays visible,
 * so there is never a broken image.
 *
 * Only use images you made or that are licensed for this use. Do not use Musliha's photograph.
 */
export const customBackgrounds: Partial<Record<SceneId, string>> = {
  // boy: 'images/village.webp',
  // building: 'images/desk.webp',
  // castle: 'images/castle.webp',
};

/** Resolve a public-folder path so it also works when the site is hosted in a sub-folder. */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

/** Path of the background music file. Keep this name, or change it here. */
export const MUSIC_FILE = 'audio/romantic-piano.mp3';
