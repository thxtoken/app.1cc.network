import resso from 'resso'

import Storage from '@/services/storage'
import { UserType } from '@/types/user'

type Store = {
  user?: UserType
  language: string
  loading: boolean
}

const store = resso({
  user: undefined,
  language: Storage.get('language') || 'en',
  loading: false
} as Store)

export default store
