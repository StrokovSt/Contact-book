import React from 'react';
import { ReactSVG } from 'react-svg'

export default function UserPreviewComponent({user, currentUser, changeCurrentUser, changeMobileStatus, personalKey, changeUsers}) {
  const userClass = (currentUser === personalKey) ? "contacts-section__user-preview user-preview user-preview--active" : "contacts-section__user-preview user-preview"
  
  const userPrevesHandler = () => {
    changeCurrentUser(personalKey)
    changeMobileStatus(false)
  }

  const svgHandler = () => {
    const newUser = (Object.assign({}, user, {
      favorite: !user.favorite
    }))
    changeUsers(newUser)
  }

  return (
    <li className={userClass} onClick={userPrevesHandler}>
      <img className="user-preview__avatar" src={user.avatar} alt="Аватар" />
      <div className="user-preview__info-container">
        <p className="user-preview__name">{user.username}</p>
        <a className="user-preview__phone" href="tel: {user.phone}">{user.phone}</ a>
      </div>
      <ReactSVG className="user-preview__svg" src={user.favorite ? "./img/icon-star.svg" : "./img/icon-empty-star.svg"} onClick={svgHandler}/>
    </li>
  )
}