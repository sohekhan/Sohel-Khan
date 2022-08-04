import React from 'react'

const Paginate = (props) => {
  const pageNums = [];

  for (let i=1; i<=Math.ceil(props.totalPosts/10); i++) {
    pageNums.push(i);
  }

  const pagination = pageNums.map(number => {
        return(
                    <li key={number} onClick={() => props.setPage(number)}>{number}</li>
        )
    })
  return (
        <div className='delpaginate'>
            <button className='deleteall' onClick={props.deleteAll} >Delete Selected</button>
            <div className='paginate'>
                <ul>
                    {pagination}
                </ul>
            </div>
        </div>
  )
}

export default Paginate