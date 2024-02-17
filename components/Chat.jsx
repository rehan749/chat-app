import React from 'react'

const [msg, setMsg] = useState('')

const handleChange = (e)=>{
    setMsg(e.target.value)
}
const handleSubmit =(e)=>{
    e.preventDefault();
    setMsg("");
}

const Chat = () => {
  return (
    <div>

        <input type="text" className='py-2 px-3'  placeholder="Type your message..." value={msg} onChange={handleChange} />
        <input type="button" className='py-2 px-3 bg-sky-500 text-slate-50'  onClick={handleSubmit} value="" />
    </div>
  )
}

export default Chat