import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg'
import ContactUserFormComponent from './contact-user-form';
import HistoryUserFormComponent from './history-user-form';
import WorkUserFormComponent from './work-user-form';


export default function UserInformationComponent({user, type, changeUsers}) {
  let userImformation = null
  const [editMode, setEditMode] = useState(false)
  const prifileTypes = {
    contact: 'contact',
    work: 'work',
    history: 'history'
  }

  const contactInformation = <ContactUserFormComponent user={user} editMode={editMode} changeUsers={changeUsers} setEditMode={setEditMode} />;
  const jobInformation = <WorkUserFormComponent user={user} editMode={editMode} changeUsers={changeUsers} setEditMode={setEditMode} />
  const messageInformation = <HistoryUserFormComponent user={user} />

  useEffect(() => {
    setEditMode(false)
  }, [user, type])

  if (type === prifileTypes.contact) {
    userImformation = contactInformation
  } else if (type === prifileTypes.work) {
    userImformation = jobInformation
  } else if (type === prifileTypes.history) {
    userImformation = messageInformation
  }
  
  return (
    <div className="information-article__user-info">
      <a className="information-article__icon-link" href={"tel:" + user.phone}>{user.phone}
        <ReactSVG className="information-article__icon" src="./img/icon-phone.svg" />
      </a>  
      {userImformation}
    </div>
  )
}