import TinderCard from "react-tinder-card"
import { useEffect, useState } from "react"
import { useCookies } from 'react-cookie'
import ChatContainer from "../components/ChatContainer"
import axios from 'axios'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [genderedUsers, setUsersSameInterest] = useState(null)
  const [genderedGroups, setGenderedGroups] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const userId = cookies.UserId
  const groupId = cookies.GroupId

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId }
      })

      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getGroup = async () => {
    try {
      const response = await axios.get('http://localhost:8000/group', {
        params: { groupId }
      })

      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getUsersSameInterest = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users-same-interest', {
        params: { major: user?.interests }
      })
      setUsersSameInterest(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
    getGroup()
  }, [])

  useEffect(() => {
    if (user) {
      getUsersSameInterest()
    }
  }, [user])

  const updateMaches = async (matchedUserId) => {
    try {
      await axios.put('http://localhost:8000/addmatch', {
        userId,
        matchedUserId
      })
      getUser()
    } catch (err) {
      console.log(err)
    }
  }

  const swiped = (direction, swipedUserId) => {
    if (direction === 'right') {
      updateMaches(swipedUserId)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <>
      {user &&
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-columns">
              <div className="card-container">
                <h1> FA </h1>
                {genderedUsers?.map((genderedUser) =>
                  <TinderCard
                    className="swipe"
                    key={genderedUser.user_id}
                    onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                    <div
                      style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                      className="card">
                      <h3>{genderedUser.first_name}</h3>
                    </div>
                  </TinderCard>
                )}
              </div>

              <div className="card-container">
                <h1> Groups </h1>
                {genderedGroups?.map((genderedGroups) =>
                  <TinderCard
                    className="swipe"
                    key={genderedGroups.groupId}
                    onSwipe={(dir) => swiped(dir, genderedGroups.groupId)}>
                    <div
                      style={{ backgroundImage: "url(" + genderedGroups.url + ")" }}
                      className="card">
                    </div>
                  </TinderCard>
                )}
              </div>
            </div>
          </div>


        </div>
      }
    </>
  )
}

export default Dashboard