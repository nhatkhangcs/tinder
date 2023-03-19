import ChatHeader from "./chatHeader"
import MatchesDisplay from "./MatchesDisplay"
import ChatDisplay from "./chatDisplay"
import { useState } from "react"

const ChatContainer = ({user}) => {
    const [clickedUser, setClickedUser] = useState(null)

    return (
        <div className="chat-container">
            <ChatHeader user = {user}/>

            <div>
                <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
                <button className="option" onClick={() => setClickedUser(null)}>My group</button>
            </div>

            {console.log('user.matches', user.matches)}

            {!clickedUser && <MatchesDisplay matches = {user.matches} setClickedUser = {setClickedUser}/>}

            {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
        </div>
    )
}

export default ChatContainer