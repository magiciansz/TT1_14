
import '../index.js';
import { useState, useEffect }  from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";


// Display list of destinations for a specific country
function Destination() { 
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    var url = "https://h4g.fly.dev/destination/";
    axios.get(url).then((res) => {
      const result = res.data;
      setDestinations(result["data"]);
    });

  }, []);
 
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Country name
        </p>

        <Link to="/create-destination"><Button>ADD DESTINATION + </Button></Link>

      <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Notes</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {destinations.map((item)=>(
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.notes}</td>
            <td>{item.cost}</td>

          </tr>
        ))}
      </tbody>
      
      </Table>
      
      </header>
      
    </div>
  );
}

export default Destination;
