import React from 'react'

import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import MetaMaskAvatar from '@/components/MetaMaskAvatar'
import StyleSheet, { scale, SCALE } from '@/libs/StyleSheet'
import { useMe } from '@/libs/hooks'
import { addressSummary } from '@/libs/utlis'
import { openInEtherscan } from '@/services/web3'
import { useLocation } from 'react-router-dom'
import { UserType } from '@/types/user'

interface Props {
  address: string
}

interface LocationState {
  user?: UserType
}

const TokenCollectionUser: React.FC<Props> = ({ address }) => {
  const location = useLocation()
  const state = location.state as LocationState
  const me = useMe()
  const addr = state?.user?.ens || addressSummary(address)

  if (!address || address === me?.address) {
    return null
  }

  return (
    <div style={styles.container}>
      <MetaMaskAvatar
        account={address}
        size={48 * SCALE}
        onClick={Avatar.show}
        style={styles.avatar}
      />
      <Button
        width={90 + addr.length * 4}
        height={48}
        title={addr}
        borderRadius={16}
        style={styles.button}
        onClick={() => openInEtherscan(address)}
      />
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: scale(40),
    left: scale(40)
  },
  button: {
    backgroundColor: '#205C67',
    borderColor: '#205C67',
    marginLeft: scale(24),
    marginRight: scale(24),
    borderRadius: scale(48),
    fontWeight: 'bold'
  },
  avatar: {
    cursor: 'pointer'
  }
})

export default TokenCollectionUser
