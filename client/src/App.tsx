import { useState } from 'react';
import io from 'socket.io-client';


type Message = {
  id: string,
  message: string,
  type: string,
  name: string,
}

const socket = io('http://localhost:3000');
function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [user, setUser] = useState<string>('')
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [userNameExists, setUserNameExists] = useState<boolean>(false)

  const handleSend = (e:any) => {
    e.preventDefault()
    const messageObj = {
      id: socket.id,
      message: currentMessage,
      type: 'message',
      user: user
    }
    socket.emit('message', messageObj);
    setCurrentMessage('')
  }

  socket.on('message', (messages:Message[]) => {
    console.log("This is the on message event");
    setMessages(messages)
    console.log(messages);
  })

  socket.on('register', (messages:Message[]) => {
    setMessages(messages)
  })

  socket.on('disconnect', () => {
    setMessages(messages)
  })

  // socket.emit('message', 'hello world')

  const handleUser = (e) => {
    e.preventDefault()
    const tempUser:string = e.target.value
    setUser(tempUser)
    // e.target.value = ''
    setUserNameExists(true)
    socket.emit('register', user);
    console.log("This is the user", user);
  }

  
  return (
      <div>
        <div>
          <div className='flex justify-center items-center bg-zinc-400 bg-opacity-[0.15] border border-[#4c4c4cc5]  rounded-[20px] mx-3 my-2'>
            <h1 
              className="text-center text-[40px] font-bold text-white"
            >
              Chat App
            </h1>
          </div>
          
          {/* chats */}
          <div
            className="flex flex-col space-y-2 h-[900px] bg-black p-4 overflow-y-auto"
          >
            {messages.map((message:Message, index:any) => {
              const justifyType = message?.type === 'user'
              const isUser = message?.id === socket.id

              return (
                <>
                  <div id={index}>
                    {justifyType ? (
                      <div
                        className={`flex justify-center items-center bg-transparent text-white rounded-lg p-2`}
                      >
                        <div
                          className={`text-white rounded-lg p-2 px-5 bg-zinc-400 bg-opacity-[0.15] border border-[#4c4c4cc5] text-[18px] font-normal`}
                        >
                          {isUser ? "You" : `${message.name}`} {message?.message}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-center bg-transparent text-white rounded-lg p-2`}
                      >
                        <div
                          className={`text-white rounded-lg p-2 px-5 bg-zinc-400 bg-opacity-[0.15] border border-[#4c4c4cc5] text-[18px] font-normal`}
                        >
                          {isUser ? "" : `${message.name}: `}{message?.message}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )
            })}
          </div>

          <div>
            <form
              className="flex bottom-[40px] justify-center items-center space-x-2 flex-col gap-y-2"
            >

              <div 
                className='flex gap-x-2 justify-center items-center'
                style={{display: userNameExists ? 'none' : 'flex'}}
              >
                <input
                  className=" px-5 py-2 text-[20px] w-[350px] border-[#343437] border-[1.5px] rounded-md placeholder-gray-500 focus:outline-[2px] focus:outline-[#353538] focus:outline focus:outline-offset-[3px] bg-white bg-opacity-[0.02] backdrop-blur-[2px]"
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                />
                <button
                  className='text-[20px] bg-[#34343697] px-5 py-2 border-[#343437] border-[1px] rounded-md text-white focus:outline-[2px] focus:outline-[#27272A] focus:outline focus:outline-offset-[3px] hover:bg-[#27272A] hover:border-[#39393c] transition duration-300 ease-in-out'
                  onClick={handleUser}
                >
                  Set Username
                </button>
              </div>
              {userNameExists ? (
                <div>
                  <p
                    color='white'
                    className='flex justify-center items-center text-white font-bold text-[20px]'
                  >
                    Type your message below
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    color='white'
                    className='flex justify-center items-center text-white font-bold text-[20px]'
                  >
                    Please set your username
                  </p>
                </div>
              )}

              <div 
                className={`flex gap-x-2`}
                style={{display: userNameExists ? 'flex' : 'none'}}
              >
                <input 
                  className=" px-5 py-2 text-[20px] w-[350px] border-[#343437] border-[1.5px] rounded-md placeholder-gray-500 focus:outline-[2px] focus:outline-[#353538] focus:outline focus:outline-offset-[3px] bg-white bg-opacity-[0.02] backdrop-blur-[2px]"
                  type="text" 
                  value={currentMessage}
                  placeholder="Enter your message"
                  onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button
                  className='text-[20px] bg-[#34343697] px-5 py-2 border-[#343437] border-[1px] rounded-md text-white focus:outline-[2px] focus:outline-[#27272A] focus:outline focus:outline-offset-[3px] hover:bg-[#27272A] hover:border-[#39393c] transition duration-300 ease-in-out'
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default App
