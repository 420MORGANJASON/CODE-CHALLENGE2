import { useEffect, useState }from 'react';
import React from 'react'

function BotCollection() {
    const [bots, setBots] = useState([])
    const [enlistedBots, setEnlistedBots] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/bots')
        .then(response => response.json())
        .then(data => setBots(data))
        .catch(err => console.log(err))
    }, []);

     const enlistedBot = (bot) => {
    if (!enlistedBots.includes(bot)) {
      setEnlistedBots([...enlistedBots, bot]);
    }
  };

   const deleteBot = (bot) => {
    fetch(`http://localhost:3000/bots/${bot.id}`, { method: 'DELETE' })
      .then(() => {
        setBots(bots.filter(b => b.id !== bot.id));
        setEnlistedBots(enlistedBots.filter(b => b.id !== bot.id));
      })
      .catch(err => console.log(err));
  };

  return (

     <div>
      <h1>Bots</h1>
      <table>
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
                {!enlistedBots.includes(bot) && (
                  <button onClick={() => enlistedBot(bot)}>Enlist</button>
                )}
                {enlistedBots.includes(bot) && (
                  <button onClick={() => enlistedBot(bot)}>Release</button>
                )}
              </td>
               <td>
                <button onClick={() => deleteBot(bot)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        <YourBotArmy bots={enlistedBots} />
    </div>

   
  );
}
 function YourBotArmy({ bots, releaseBot }) {
  return (
    <div>
      <h2>Your Bot Army</h2>
      <ul>
        {bots.map(bot => (
          <li key={bot.id}>
            {bot.name}
             <button onClick={() => releaseBot(bot)}>Release</button>
          </li>
        ))}
      </ul>
    </div>
  );
        }


export default BotCollection;

