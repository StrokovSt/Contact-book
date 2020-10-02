import React from 'react';

export default function WorkUserFormComponent({user, editMode, changeUsers, setEditMode}) {

  const saveChanges = (evt) => {
    evt.preventDefault()
    console.log()
    const newUser = (Object.assign({}, user, {
      company: {
        name: evt.target.company.value,
        catchPhrase: evt.target.tagline.value,
        bs: evt.target.bs.value,
      }
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
          <label className="information-article__info-description" htmlFor="company">Company:</label>
          {editMode ? <input type="text" name="company" id="company" defaultValue={user.company.name} /> :
            <span>{user.company.name}</span>}
        </li>
        <li className="information-article__item">
          <label className="information-article__info-description" htmlFor="tagline">Tagline:</label>
          {editMode ? <input type="text" name="tagline" id="tagline" defaultValue={user.company.catchPhrase} /> :
            <span>{user.company.catchPhrase}</span>}
        </li>
        <li className="information-article__item">
          <label className="information-article__info-description" htmlFor="bs">Work:</label>
          {editMode ? <input type="text" name="bs" id="bs" defaultValue={user.company.bs} /> :
            <span>{user.company.bs}</span>
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