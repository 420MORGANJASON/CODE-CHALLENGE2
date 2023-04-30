import { useEffect, useState }from 'react';
import React from 'react'
// import React from './App.css';

function BotCollection() {
    const [bots, setBots] = useState([])
    const [listedBots, setlistedBots] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/bots')
        .then(response => response.json())
        .then(data => setBots(data))
        .catch(err => console.log(err))
    }, []);

    // The listedBot function takes a bot object as its argument and adds it to
    //  the listedBots state if it is not already enlisted.
     const listedBot = (bot) => {
    if (!listedBots.includes(bot)) {
      setlistedBots([...listedBots, bot]);
    }
  };



   const releaseBot = (bot) => {
    setlistedBots(listedBots.filter(b => b.id !== bot.id));
  };
//   The deleteBot function is used to delete a bot from the server
//  and update the bots and listedBots state variables.
//  It uses the fetch function to send a DELETE request to the server. 
// After the bot is successfully deleted, it removes the bot from both bots and listedBots state.



   const deleteBot = (bot) => {
    fetch(`http://localhost:3000/bots/${bot.id}`, { method: 'DELETE' })
      .then(() => {
        setBots(bots.filter(b => b.id !== bot.id));
        setlistedBots(listedBots.filter(b => b.id !== bot.id));
      })
      .catch(err => console.log(err));
  };

  return (

     <div className='TABLE'>
      <h1>Bots</h1>
      <table className='TABLE1'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Health</th>
            <th>Damage</th>
            <th>Armor</th>
            <th>Avatar URL</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Enlist</th>
          </tr>
        </thead>
        <tbody>
          {bots.map(bot => (
            <tr key={bot.id}>
              <td>{bot.id}</td>
              <td>{bot.name}</td>
              <td>{bot.health}</td>
              <td>{bot.damage}</td>
              <td>{bot.armor}</td>
              <td><img src={bot.avatar_url} alt={bot.name} /></td>
              <td>{bot.created_at}</td>
              <td>{bot.updated_at}</td>
              <td>
{/* This code block is rendering two buttons for each bot in the bots array. The first button has the label "list" and
                 it will be displayed only if the bot is not enlisted in the listedBots array.  */}
                {!listedBots.includes(bot) && (
                  <button onClick={() => listedBot(bot)} className='BTN1'>list</button>
                )}
{/* This code block is rendering two buttons for each bot in the bots array. The first button has the label "list" and it will be displayed only if the bot is not enlisted in the listedBots array. The second button has the label "Release" and 
it will be displayed only if the bot is enlisted in the listedBots array */}
      
                {listedBots.includes(bot) && (
                  <button onClick={() => releaseBot(bot)} className='BTN2'>Release</button>
                )}
              </td>
               <td>
                <button onClick={() => deleteBot(bot)} className='BTN3'>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* This includes the YourBotArmy component with a bots prop set to the listedBots array. */}
       <div style={{ float: 'right', marginTop: '20px' }}>
        {/* passing down the releaseBot as aprop makes it able to function on click */}
        <YourBotArmy bots={listedBots} releaseBot={releaseBot} />
      </div>
    </div>

   
  );
}

// This declares the YourBotArmy component as a function that takes an
//  object with bots and releaseBot properties as its argument.

 function YourBotArmy({ bots, releaseBot }) {
  return (
    <div  className='UL1'>
      <h2>Your Bot Army</h2>
      <ul>
        {bots.map(bot => (
          <li key={bot.id}>
             <img src={bot.avatar_url} alt={bot.name} />
            {bot.name}
              {bot.name}
              {bot.health}
              {bot.damage}
              {bot.armor}
              {bot.created_at}
              {bot.updated_at}
             <button onClick={() => releaseBot(bot)} className='BTN4'>Release</button>
          </li>
        ))}
      </ul>
    </div>
  );
        };


export default BotCollection;

