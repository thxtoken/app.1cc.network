const translations = {
  en_us: {
    translation: {
      common: {
        refresh: 'Refresh',
        click_show_more: 'Click to show more',
        show_more: 'Show more',
        ok: 'OK',
        cancel: 'Cancel'
      },
      navbar: {
        support: 'SUPPORT',
        about: 'ABOUT',
        faq: 'FAQ',
        community: 'COMMUNITY'
      },
      wallet: {
        wallet: 'Wallet',
        account_address: 'ACCOUNT ADDRESS',
        connect_wallet: 'Connect Wallet',
        disconnect_wallet: 'Disconnect Wallet',
        not_connected: 'Not Connected',
        connected_to: 'CONNECTED TO',
        is_not_connected: 'is not connected',
        wallet_not_installed: '{{wallet}} is not installed',
        confirm_disconnect: 'Do you want to disconnect the wallet?',
        disconnect: 'Disconnect'
      },
      transaction: {
        tokens: 'TOKENS',
        rencent_transactions: 'RECENT TRANSACTIONS',
        no_transactions: 'CURRENTLY NO ACTIVE TRANSACTIONS...',
        collected_token: 'Collected {{count}} 1CC',
        transfer_out_token: 'Transfer Out {{count}} 1CC',
        initially_token: 'Initially Received {{count}} 1CC',
        withdrawal: 'Withdrawal',
        transaction_success_title: 'Transaction Success',
        transaction_success_message:
          'Your transaction has been successfully submitted to the network.',
        transaction_failed_title: 'Transaction Failed'
      },
      bubble: {
        empty_placeholder: `No 1CC generated, you can visit other people's homepage to collect.`,
        collect_log: 'Collected {{count}} 1CC',
        growing: 'growing',
        disappear: 'to disappear'
      },
      ranking: {
        leaderboard: '24H Leaderboard',
        random_access: 'Random Access',
        uncollectible: 'Uncollectible',
        collectible: 'Collectible',
        free_refresh_count: 'Free refresh {{count}}',
        free_refresh: '{{time}} Free refresh'
      },
      settings: {
        settings: 'Settings',
        language: 'Language',
        version: 'Version',
        build: 'Build',
        clear_storage: 'Clear Storage',
        clear: 'Clear',
        clear_storage_success: 'Storage cleaning succeeded',
        open_source: 'Open Source',
        changelog: 'Changelog',
        technical_support: 'Technical Support'
      },
      user: {
        account: 'ACCOUNT'
      },
      transfer: {
        title: 'Transfer',
        title_preview: 'Transfer Preview',
        address_label: 'ETH Address / ENS',
        amount_label: 'Amount',
        gas_label: 'Gas Price Estimation',
        address_placeholder: 'Enter ETH address or ENS',
        amount_placeholder: 'Enter amount',
        available: 'Available',
        use: 'Use',
        address_error: 'Please enter a valid ETH address or ENS',
        amount_error: 'Please enter a valid amount',
        button_next: 'Next',
        button_close: 'Close',
        button_transfer: 'Transfer',
        status_label: 'Transfer Status',
        status_waiting: 'Waiting ...',
        status_waiting_sign: 'Waiting for signature ...',
        status_tranferring: 'Transferring ...',
        status_sent: 'Transaction Sent',
        status_cancel: 'Transaction Canceled',
        status_success: 'Transfer succeeded !',
        status_failed: 'Transfer failed !',
        view_on_etherscan: 'View on Etherscan'
      },
      confirm: {
        open_transaction_confirm_title: 'Transaction confirmation',
        open_transaction_confirm_message:
          'You have an open transaction and must wait for it to complete before continuing',
        open_transaction_confirm_ok: 'Continue previous transaction',
        transfer_cancle_confirm_title: 'Transaction confirmation',
        transfer_cancle_confirm_message:
          'Once the transfer address and amount are determined, they cannot be modified or cancelled. Are you sure you want to continue?',
        transfer_cancle_confirm_ok: 'Confirm transfer',
        add_token_confirm_title: 'Add Token',
        add_token_confirm_message:
          'Do you want to add 1CC token to your wallet? If you have already added it, click Cancel.',
        add_token_confirm_ok: 'Add Token',
        clear_storage_title: 'Clear Storage',
        clear_storage_message:
          'Continue will clear the website storage in your browser, the wallet will be disconnected and your account will be logged out.'
      },
      warning: {
        network_type_switch_warning_title: 'Network type switch',
        network_type_switch_warning_message:
          'The transfer operation only supports the Ethereum main network, please try again after switching the main network in the wallet.'
      },
      button: {
        add_token: 'Add 1CC to {{wallet}}'
      },
      errors: {
        wallet_login_error: 'Wallet login failed'
      },
      message: {
        waiting_for_signature: 'Waiting for signature ...',
        verifying_signature: 'Verifying signature...',
        login_success: 'Login Success',
        wallet_disconnected: 'Wallet disconnected',
        wallet_chain_changed: 'Wallet network changed',
        wallet_connected: 'Wallet connected',
        logout_success: 'You are logged out'
      }
    }
  },
  zh_cn: {
    translation: {
      common: {
        refresh: '刷新',
        click_show_more: '点击加载更多',
        show_more: '查看更多',
        ok: '确定',
        cancel: '取消'
      },
      navbar: {
        support: '支持',
        about: '项目简介',
        faq: '常见问题',
        community: '社区'
      },
      wallet: {
        wallet: '钱包',
        account_address: '帐户地址',
        connect_wallet: '连接钱包',
        disconnect_wallet: '断开连接',
        not_connected: '钱包未连接',
        connected_to: '钱包',
        is_not_connected: '钱包未连接',
        confirm_disconnect: '确定要取消连接钱包?',
        disconnect: '断开连接'
      },
      transaction: {
        tokens: '代币总额',
        rencent_transactions: '最近交易',
        no_transactions: '目前还没有交易...',
        collected_token: '采集了 {{count}} 枚 1CC',
        transfer_out_token: '转出了 {{count}} 枚 1CC',
        initially_token: '初始获得 {{count}} 1CC',
        withdrawal: '提币',
        transaction_success_title: '交易成功',
        transaction_success_message: '您的交易已成功提交到网络。',
        transaction_failed_title: '交易失败'
      },
      bubble: {
        empty_placeholder: '还没有产生 1CC，你可以去他人主页搜集。',
        collect_log: '采集了 {{count}} 枚 1CC',
        growing: '成熟',
        disappear: '过期'
      },
      ranking: {
        leaderboard: '24H 排行榜',
        random_access: '随机访问',
        uncollectible: '已采集',
        collectible: '可采集',
        free_refresh_count: '免费刷新{{count}}次',
        free_refresh: '{{time}} 后免费刷新'
      },
      settings: {
        settings: '设置',
        language: '语言',
        version: '版本号',
        build: '构建版本',
        clear_storage: '清除缓存',
        clear: '清除',
        clear_storage_success: '缓存清理成功',
        open_source: '开源代码',
        changelog: '最近更新',
        technical_support: '技术支持'
      },
      user: {
        account: '帐户信息'
      },
      transfer: {
        title: '转账',
        title_preview: '转账预览',
        address_label: 'ETH 地址/域名',
        amount_label: '金额',
        gas_label: '预估燃料费',
        address_placeholder: '输入 ETH 地址或域名',
        amount_placeholder: '输入金额',
        available: '余额',
        use: '使用',
        address_error: '请输入正确的 ETH 地址或域名',
        amount_error: '请输入正确的金额',
        button_next: '下一步',
        button_close: '关闭',
        button_transfer: '转账',
        status_label: '转账状态',
        status_waiting: '等待确认',
        status_waiting_sign: '等待签名',
        status_tranferring: '转账中',
        status_cancel: '交易取消',
        status_sent: '交易已发送',
        status_success: '转账成功',
        status_failed: '转账失败',
        view_on_etherscan: '在区块浏览器上查看'
      },
      confirm: {
        open_transaction_confirm_title: '交易确认',
        open_transaction_confirm_message: '您有一个未完成的交易，请等待它完成后再继续',
        open_transaction_confirm_ok: '继续上一次交易',
        transfer_cancle_confirm_title: '交易确认',
        transfer_cancle_confirm_message:
          '一旦转账地址和金额被确定，它们将不能被修改或取消。您确定要继续吗？',
        transfer_cancle_confirm_ok: '确认转账',
        add_token_confirm_title: '添加代币到钱包',
        add_token_confirm_message:
          '你需要把 1CC 代币添加到钱包吗？如果你已经添加，请点击取消按钮。',
        add_token_confirm_ok: '添加到钱包',
        clear_storage_title: '清除缓存',
        clear_storage_message: '继续将清除你浏览器中的网站存储，钱包将会断开，你的帐户也会被退出。'
      },
      warning: {
        network_type_switch_warning_title: '网络类型切换',
        network_type_switch_warning_message:
          '提币操作仅支持以太坊主网，请在钱包中切换主网络后重试。'
      },
      button: {
        add_token: '添加 1CC 到 {{wallet}}'
      },
      errors: {
        wallet_login_error: '钱包登录失败'
      },
      message: {
        waiting_for_signature: '等待签名中...',
        verifying_signature: '验证签名中...',
        login_success: '登录成功',
        wallet_disconnected: '钱包已断开连接',
        wallet_chain_changed: '钱包网络已切换',
        wallet_connected: '钱包已连接',
        logout_success: '你的帐户已退出登录'
      }
    }
  },
  zh_tw: {
    translation: {
      common: {
        refresh: '刷新',
        click_show_more: '點擊加載更多',
        show_more: '查看更多',
        ok: '確定',
        cancel: '取消'
      },
      navbar: {
        support: '支持',
        about: '項目簡介',
        faq: '常見問題',
        community: '社區'
      },
      wallet: {
        wallet: '錢包',
        account_address: '帳戶地址',
        connect_wallet: '連接錢包',
        disconnect_wallet: '斷開連接',
        not_connected: '錢包未連接',
        connected_to: '錢包',
        is_not_connected: '錢包未連接',
        confirm_disconnect: '確定要取消連接錢包?',
        disconnect: '斷開連接'
      },
      transaction: {
        tokens: '代幣總額',
        rencent_transactions: '最近交易',
        no_transactions: '目前還沒有交易...',
        collected_token: '採集了 {{count}} 枚 1CC',
        transfer_out_token: '轉出 {{count}} 枚 1CC',
        initially_token: '初始獲得 {{count}} 1CC',
        withdrawal: '提幣',
        transaction_success_title: '交易成功',
        transaction_success_message: '您的交易已成功提交到網絡。',
        transaction_failed_title: '交易失敗'
      },
      bubble: {
        empty_placeholder: '還沒有產生 1CC，你可以去他人主頁蒐集。',
        collect_log: '採集了 {{count}} 枚 1CC',
        growing: '成熟',
        disappear: '過期'
      },
      ranking: {
        leaderboard: '24H 排行榜',
        random_access: '隨機訪問',
        uncollectible: '已採集',
        collectible: '可採集',
        free_refresh_count: '免費刷新{{count}}次',
        free_refresh: '{{time}} 後免費刷新'
      },
      settings: {
        settings: '設置',
        language: '語言',
        version: '版本號',
        build: '構建版本',
        clear_storage: '清除緩存',
        clear: '清除',
        clear_storage_success: '緩存清理成功',
        open_source: '開源代碼',
        changelog: '最近更新',
        technical_support: '技術支持'
      },
      user: {
        account: '帳戶信息'
      },
      transfer: {
        title: '轉賬',
        title_preview: '轉賬預覽',
        address_label: 'ETH 地址/域名',
        amount_label: '金額',
        gas_label: '預估燃料費',
        address_placeholder: '輸入 ETH 地址或域名',
        amount_placeholder: '輸入金額',
        available: '餘額',
        use: '使用',
        address_error: '請輸入正確的 ETH 地址或域名',
        amount_error: '請輸入正確的金額',
        button_next: '下一步',
        button_close: '关闭',
        button_transfer: '轉賬',
        status_label: '轉賬狀態',
        status_waiting: '等待確認',
        status_waiting_sign: '等待簽名',
        status_tranferring: '轉賬中',
        status_cancel: '交易取消',
        status_sent: '交易已發送',
        status_success: '轉賬成功',
        status_failed: '轉賬失敗',
        view_on_etherscan: '在區塊瀏覽器上查看'
      },
      confirm: {
        open_transaction_confirm_title: '交易確認',
        open_transaction_confirm_message: '您有一個未完成的交易，請等待它完成後再繼續',
        open_transaction_confirm_ok: '继续上一次转账',
        transfer_cancle_confirm_title: '交易確認',
        transfer_cancle_confirm_message:
          '一旦轉账地址和金額被确定，它们将不能被修改或取消。您确定要继续吗？',
        transfer_cancle_confirm_ok: '確定轉賬',
        add_token_confirm_title: '添加代幣確認',
        add_token_confirm_message:
          '你需要把 1CC 代幣添加到錢包嗎？如果你已經添加，請點擊取消按鈕。',
        add_token_confirm_ok: '添加到錢包',
        clear_storage_title: '清除緩存確認',
        clear_storage_message: '繼續將清除你瀏覽器中的網站存儲，錢包將會斷開，你的帳戶也會被退出。'
      },
      warning: {
        network_type_switch_warning_title: '網絡類型切換',
        network_type_switch_warning_message:
          '提幣操作僅支持以太坊主網，請在錢包中切換主網絡後重試。'
      },
      button: {
        add_token: '添加 1CC 到 {{wallet}}'
      },
      errors: {
        wallet_login_error: '無法登入錢包'
      },
      message: {
        waiting_for_signature: '等待簽名中...',
        verifying_signature: '驗證簽名中...',
        login_success: '登入成功',
        wallet_disconnected: '錢包已斷線',
        wallet_chain_changed: '錢包网络已更改',
        wallet_connected: '錢包已連接',
        logout_success: '你的帳戶已退出登錄'
      }
    }
  }
}

export default translations
