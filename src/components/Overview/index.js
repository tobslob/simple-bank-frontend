import React from 'react'
import spent from '../../assets/spent.svg'
import balance from '../../assets/Balance.svg'
import './overview.scss'

const Overview = () => {
  return (
    <div className='overview'>
        <div className='overview-text'>
            <h2>Overview</h2>
            <button>Fund wallet</button>
        </div>

        <div className='account-balance'>
            <div className='account-info'>
                <div style={{marginBottom:'10px'}}><span>Account balance</span><img src={balance} alt=''/></div>
                <strong>$3,000,000</strong>
            </div>

            <div className='account-info'>
                <div style={{marginBottom:'10px'}}><span>Amount spent so far</span><img src={spent} alt=''/></div>
                <strong>$3,000,000</strong>
            </div>
        </div>
    </div>
  )
}

export default Overview