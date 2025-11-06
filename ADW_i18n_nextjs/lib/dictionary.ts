import en from '@/lib/dictionaries/en.json'
import ja from '@/lib/dictionaries/ja.json'
import zh from '@/lib/dictionaries/zh.json'

export type Locale = 'en' | 'ja' | 'zh'
export const dictionaries: Record<Locale, any> = { en, ja, zh }
