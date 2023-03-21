import React from 'react'
import Account from '../AccountDetails'
import Overview from '../Overview'
import AccountHistory from '../Transactions/AccountHistory'
import './index.scss'

const MainContent = () => {
  return (
    <div className='main-content' >
      <div className='right-section'>
      <Overview/>
      <AccountHistory/>
      </div>
      <Account/>
    </div>
  )
}

export default MainContent