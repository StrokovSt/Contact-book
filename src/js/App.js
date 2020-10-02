import React, {useState, useEffect} from 'react';
import UserCardComponent from './components/user-card';
import UserPreviewComponent from './components/user-privew'

function App() {
  const localUsers = JSON.parse(localStorage.getItem('users'))
  const [users, setUsers] = useState(localUsers ? localUsers : [])
  const [usersCopy, setUsersCopy] = useState(users)
  const [currentUser, setCurrentUser] = useState(0)
  const [mobileStatus, setMobileStatus] = useState(document.documentElement.clientWidth >= 768 ? false : true)
  const [sortDirection, setSortDirection] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('users')) {
      fetch('http://demo.sibers.com/users')
      .then(response => response.json())
      .then(users => {
        setUsers(users)
        return JSON.stringify(users)
      })
      .then(users => {
        localStorage.setItem('users', users)
      })
    }
  }, [])

  const changeCurrentUser = (userId) => {
    setCurrentUser(userId)
  }

  const changeUsers = (changedUser) => {
    const changedUsers = users.map((user, index) => {
      if (index === currentUser) {
        user = changedUser
      }
      return user
    })
    setUsers(changedUsers)
    setUsersCopy(changedUsers)
  }

  const changeMobileStatus = (bool) => {
    setMobileStatus(bool)
  }

  const usersSort = () => {
    setSortDirection(!sortDirection)
    const sortedUsers = users.slice().sort(function(a, b) {
      if (a['username'] > b['username']) {
        return sortDirection ? 1 : -1;
      }
      if (a['username'] < b['username']) {
        return sortDirection ? -1 : 1;
      }
      return 0;
    })
    setUsers(sortedUsers)
  };

  const usersFilter = (searchValue) => {
    if (searchValue) {
      setUsers(
        usersCopy.filter(user => {
          let valuesIsExist = false;
          if (String(user.username).toUpperCase().includes(searchValue.toUpperCase()) || String(user.phone).toUpperCase().includes(searchValue.toUpperCase())) {
            valuesIsExist = true;
          }
          return valuesIsExist;
        })
      ) 
    } else {
      setUsers(usersCopy)
    }
  };

  window.addEventListener("resize", () => {
    const windowSize = document.documentElement.clientWidth
    if (windowSize >= 768) {
      setMobileStatus(false)
    } else {
      setMobileStatus(true)
    }
  });

  return (
    <div className="page-main__container container">
      <section className="page-main__contacts-section contacts-section">
        <div className="contacts-section__heading">
          <h2>Список контактов</h2>
          <form className="contacts-section__form">
            <label htmlFor="search">Поиск контактов</label>
            <input className="contacts-section__search" type="search" id="search" name="search" onChange={evt => usersFilter(evt.target.value)} placeholder="Search..."></input>
            <button className="contacts-section__sort-button" type="button" onClick={usersSort}>Сортировка</button>
          </form>
        </div>
        <ul className="contacts-section__users-list">
          {users.length !== 0 ? users.map((user, index) => {
            return <UserPreviewComponent user={user} currentUser={currentUser} changeCurrentUser={changeCurrentUser} changeMobileStatus={changeMobileStatus} key={index} personalKey={index} changeUsers={changeUsers}/>
          }) : <li className="contacts-section__user-preview"><div className="user-preview__info-container"><p className="user-preview__name">No users found</p></div></li>}
        </ul>
      </section>
  
      {!mobileStatus ? 
      <section className="page-main__user-section user-section">
        {(!mobileStatus && users.length !== 0) ? 
          <UserCardComponent user={users[currentUser]} changeUsers={changeUsers} changeMobileStatus={changeMobileStatus}/> :
          null
        }
      </section> : null 
      } 
    </div>
  )
}

export default App;
