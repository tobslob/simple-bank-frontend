import React from 'react'
import Option from './Option'
import RecentTransactions from './RecentTransactions'
import './transactions.scss'

const AccountHistory = () => {
  return (
    <div className='account-history'>
        <h4>Money Withdrawn</h4>
        <Option/>
        <RecentTransactions/>
    </div>
  )
}

export default AccountHistory