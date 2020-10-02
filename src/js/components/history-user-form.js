import React from 'react';

export default function HistoryUserFormComponent({user}) {

  return (
    <form className="information-article__form">
      <ul className="information-article__list">
        <li className="information-article__item">
          <span className="information-article__info-description">Amount:</span>
          <span>{user.accountHistory[0].amount}</span>
        </li>
        <li className="information-article__item">
          <span className="information-article__info-description">Business:</span>
          <span>{user.accountHistory[0].business}</span>
        </li>
        <li className="information-article__item">
          <span className="information-article__info-description">Name:</span>
          <span>{user.accountHistory[0].name}</span>
        </li>
        <li className="information-article__item">
          <span className="information-article__info-description">Type:</span>
          <span>{user.accountHistory[0].type}</span>
        </li>
        <li className="information-article__item">
          <span className="information-article__info-description">Account:</span>
          <span>{user.accountHistory[0].account}</span>
        </li>
      </ul>
    </form>
  )
}