import React, { useState } from 'react';

function MessageInput() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      message: message,
    };


    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
       // eslint-disable-next-line
      .then((data) => {
        // console.log(data)
        setResponse(data);
        setMessage('');
        
      })
  }
  // setResponse(message)
  console.log(response)

  // console.log(message)


  return (
    <div className='flex flex-col h-screen bg-gray-300'>
      
      <h1 className='text-center m-5 text-2xl font-bold uppercase'>Chat app</h1>


      <form onSubmit={handleSubmit} className='mx-auto'>
        
        <label className='text-center font-semibold' htmlFor="message">Message:</label>
        <br />
        <textarea
         
          className='border mt-2 rounded-md text-md md:resize-x resize-none focus:outline-none p-4'
          placeholder='ask me anything...'
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button
          className='rounded-md font-semibold py-2 bg-[#22c1c3] text-center container mx-auto mt-4'
          type="submit" 
          >Submit</button>
      </form> 

     {/* brief history of virus */}

      {response && (
        <div className='min-w-fit md:text-md rounded-lg mx-16 p-4 mt-10 bg-slate-100 min-h-fit'>
          {response.message}         
        </div>
      )}
    </div>
  );
}

export default MessageInput;
