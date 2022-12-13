import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [status, setStatus] = useState({ display: 'none' });
  const type = ['posts', 'users', 'photos'];
  const [btn, setBtn] = useState('posts');
  const [data, setData] = useState([]);
  const [gotoTop, setGotoTop] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);


  const handleChange = () => {
    status.display === 'none' ? setStatus({ display: 'block' }) : setStatus({ display: 'none' });
  }

  const callApi = async (btn) => {
    return await axios.get(`https://jsonplaceholder.typicode.com/${btn}`)
  }

  useEffect(() => {
    callApi(btn)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.error(err))
  }, [btn])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setGotoTop(true);
      } else {
        setGotoTop(false);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }

  },[])



  console.log(gotoTop);
  return (
    <div className='container' id='top'>
      <div className='content'>
        <button onClick={handleChange}>Click me!</button>
        <h5>width: { width}</h5>
        <div style={status}>
          {type.map(item => (
            <button
              className='btn'
              key={item}
              style={btn === item ? {
                backgroundColor: 'green',
                color: 'white'
              } : {}}
              onClick={() => setBtn(item)}
            >
              {item}
            </button>
          ))}
          <div>
            <ul>
              {data.map((item) => (
                <li key={item.id}>{item.title || item.name}</li>
              ))}
              
            </ul>
            
          </div>
          {gotoTop && (
                <a className="gotoTop" href='#'>Go Top</a>
              )}
        </div>
      </div>




    </div>
  );
}

export default App;
