import * as fs from "node:fs";
import * as path from "node:path";

export interface PronunciationConfig {
  dictionary: Record<string, string>;
  protected_words: string[];
}

/**
 * Loads the technical terms & English pronunciation normalization dictionary.
 */
export function loadPronunciationDict(configPath?: string): PronunciationConfig {
  const defaultPath = path.resolve(__dirname, "../../config/pronunciation_dict.json");
  const targetPath = configPath || defaultPath;

  if (!fs.existsSync(targetPath)) {
    return { dictionary: {}, protected_words: [] };
  }

  try {
    const raw = fs.readFileSync(targetPath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[PronunciationNormalizer] Failed to read ${targetPath}:`, err);
    return { dictionary: {}, protected_words: [] };
  }
}

/**
 * Normalizes a sentence by replacing technical terms & abbreviations with
 * natural Vietnamese phonetic spellings for TTS models, while protecting
 * designated words (like 'Ngoc Einstein').
 */
export function normalizePronunciation(text: string, customDict?: PronunciationConfig): string {
  const config = customDict || loadPronunciationDict();
  let result = text;

  // Step 1: Replace protected words with temporary random placeholders
  const placeholders: Map<string, string> = new Map();
  config.protected_words.forEach((word, index) => {
    const placeholder = `__PROTECTED_TOKEN_${index}__`;
    if (result.includes(word)) {
      placeholders.set(placeholder, word);
      result = result.split(word).join(placeholder);
    }
  });

  // Step 2: Sort dictionary keys by length descending to match longest phrases first
  // e.g. "Big Endian" before "Endian"
  const sortedKeys = Object.keys(config.dictionary).sort((a, b) => b.length - a.length);

  for (const term of sortedKeys) {
    const replacement = config.dictionary[term];
    // Use word-boundary regex if it consists of alphanumeric words
    const isAlphaNum = /^[a-zA-Z0-9_\s.-]+$/.test(term);
    if (isAlphaNum) {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "g");
      result = result.replace(regex, replacement);
    } else {
      result = result.split(term).join(replacement);
    }
  }

  // Step 3: Restore protected words
  placeholders.forEach((originalWord, placeholder) => {
    result = result.split(placeholder).join(originalWord);
  });

  return result;
}
