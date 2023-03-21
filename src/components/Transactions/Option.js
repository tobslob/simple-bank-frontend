import React from 'react'
import bank from '../../assets/bank.svg'

const Option = () => {
  return (
    <div className='options'>
        <div className='trans-option'>
        <img src={bank} alt=''/>
        <div className='trans-to'>
            <span>To</span>
            <span>Mobile Recharge</span>
        </div>
    </div>
    <div className='trans-option'>
        <img src={bank} alt=''/>
        <div className='trans-to'>
            <span>To</span>
            <span>Bank Account</span>
        </div>
    </div>

    <div className='trans-option'>
        <img src={bank} alt=''/>
        <div className='trans-to'>
            <span>To</span>
            <span>Crypto wallet</span>
        </div>
    </div>
</div>
  )
}

export default Option