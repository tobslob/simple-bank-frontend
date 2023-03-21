 import React from 'react'
import Transaction from './Transaction'
 
 const RecentTransactions = () => {
   return (
     <div className='recent-transactions'>
      <div className='recent-trans-heading'>
      <h5>Recent Transactions</h5>
      <button>See all</button>
      </div>
      {[0,1,2,3,4,5].map((el)=>(
        <>
        <Transaction/>
        </>
      ))}
     </div>
   )
 }
 
 export default RecentTransactions