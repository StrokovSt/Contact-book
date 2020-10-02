import React, {useState} from 'react';
import { ReactSVG } from 'react-svg'
import UserInformationComponent from './user-infromation';

export default function UserCardComponent({user, changeUsers, changeMobileStatus}) {
  const ESC_KEY = 27;
  const prifileTypes = {
    contact: 'contact',
    work: 'work',
    history: 'history'
  }

  const [profileType, setProfileType] = useState(prifileTypes.contact)

  const imgLoadHandler = async (evt) => {
    const imgUrl = URL.createObjectURL(evt.target.files[0])
    const newUser = (Object.assign({}, user, {
      avatar: imgUrl
    }))
    changeUsers(newUser)
  }

  const navigationHandler = (type) => {
    setProfileType(type)
  }

  const CardCloseHandler = () => {
    changeMobileStatus(true)
    document.removeEventListener('keydown', CardEscHandler)
  }

  const CardEscHandler = (evt) => {
    if (evt.keyCode === ESC_KEY) {
      CardCloseHandler();
    }
  };

  if(document.documentElement.clientWidth < 768) {
    document.addEventListener('keydown', CardEscHandler)
  }

  return (
    <div className="user-section__container">
      <button className="user-section__close-button" onClick={CardCloseHandler}>Закрыть окно</button>
      <div className="user-section__header">
        <img className="user-section__header-img" src="https://data.1freewallpapers.com/detail/mountains-clouds-moon-height-overview-landscape.jpg" alt="Фоновый рисунок" />
      </div>
      <div className="user-section__main-container">
        <article className="user-section__avatar-article avatar-article">
          <form className="avatar-article__form">
            <div className="avatar-article__img-wrapper">
              <img className="avatar-article__img" src={user.avatar} alt="Avatar" />
              <label className="avatar-article__uploader">
                <ReactSVG className="avatar-article__svg" src="./img/icon-camera.svg" />
                <input type="file" name="avatar" accept="image/jpeg,image/png" onChange={imgLoadHandler}></input>
              </label>
            </div>
            <span className="avatar-article__name">{user.name}</span>
            <span className="avatar-article__user-work">{user.company.bs}</span>
          </form> 
          <div className="avatar-article__info-container">
            <span className="avatar-article__description">{user.posts[0].sentences}</span>
          </div>
        </article>

        <article className="user-section__information-article information-article">
          <ul className="information-article__navigation">
            <li 
              className={"information-article__navigation-item" + (profileType === prifileTypes.contact ? " information-article__navigation-item--active" : "")} 
              onClick={() => navigationHandler(prifileTypes.contact)}>
              Contacts
            </li> 
            <li 
              className={"information-article__navigation-item" + (profileType === prifileTypes.work ? " information-article__navigation-item--active" : "")}
              onClick={() => navigationHandler(prifileTypes.work)}>
              About work
            </li>
            <li 
              className={"information-article__navigation-item" + (profileType === prifileTypes.history ? " information-article__navigation-item--active" : "")} 
              onClick={() => navigationHandler(prifileTypes.history)}>
              History
            </li>
          </ul>
          <UserInformationComponent user={user} type={profileType} changeUsers={changeUsers}/>
        </article>
      </div>
    </div>
  )
}
