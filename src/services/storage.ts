import KeyvStorage from '@kangfenmao/keyv-storage'
import LocalStorage from '@kangfenmao/keyv-storage/lib/adapter/LocalStorage'

const Storage = new KeyvStorage({
  driver: new LocalStorage()
})

export const MemoryStorage = new KeyvStorage()

export default Storage
