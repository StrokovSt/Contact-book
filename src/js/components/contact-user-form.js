import React from 'react';

export default function ContactUserFormComponent({user, editMode, changeUsers, setEditMode}) {

  const saveChanges = (evt) => {
    evt.preventDefault()
    const newUser = (Object.assign({}, user, {
      name: evt.target.name.value,
      username: evt.target.username.value,
      email: evt.target.email.value,
      phone: evt.target.phone.value,
      website: evt.target.website.value,
    }))
    changeUsers(newUser)
    setEditMode(false)
  }

  return (
    <form className="information-article__form" method="get" onSubmit={(evt) => saveChanges(evt)} disabled={editMode ? false : true}>
      <button className="information-article__form-button information-article__form-button--edit" 
      type="button" onClick={() => setEditMode(true)} disabled={!editMode ? false : true}>
        Edit
      </button>
      <ul className="information-article__list">
        <li className="information-article__item">
          <label className="information-article__info-description" htmlFor="name">Name:</label>
          {editMode ? <input type="text" name="name" id="name" defaultValue={user.name} /> :
            <span>{user.name}</span>}
        </li>
        <li className="information-article__item">
          <label className="information-article__info-description" htmlFor="username">Username:</label>
          {editMode ? <input type="text" name="username" id="username" defaultValue={user.username} /> :
            <span>{user.username}</span>}
        </li>
        <li className="information-article__item">
          <label className="information-article__info-description" htmlFor="website">Website:</label>
          {editMode ? <input type="text" name="website" id="website" defaultValue={user.website} /> :
            <a className="information-article__link" href={"https://" + user.website}>{user.website}</a>
          }
        </li>
        <li className="information-article__item">
          <label className="information-article__info-description">Email:</label>
          {editMode ? <input type="email" name="email" id="email" defaultValue={user.email} /> :
            <a className="information-article__link" href={"mailto:" + user.email}>{user.email}</a>
          }
        </li>
        <li className="information-article__item">
          <label className="information-article__info-description">Phone:</label>
          {editMode ? <input type="tel" name="phone" id="phone" defaultValue={user.phone} /> :
            <a className="information-article__link" href={"tel:" + user.phone}>{user.phone}</a>
          }
        </li>
      </ul>
      <button className="information-article__form-button information-article__form-button--save" 
      type="submit" disabled={editMode ? false : true}>
        Save
      </button>
    </form>
  )
}