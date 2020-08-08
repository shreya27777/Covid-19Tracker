//useState used to dynamically display data in react
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from "react-bootstrap/CardDeck";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Columns from 'react-columns'
import Form from 'react-bootstrap/Form'

function App() {

  //react hooks
  const [latest, setLatest] = useState([])
  const [result, setResult] = useState([])
  const [search, setSearch] = useState("")


  useEffect(() => {
    axios.all([
      axios.get('https://corona.lmao.ninja/v2/all'),
      axios.get('https://corona.lmao.ninja/v3/covid-19/countries')
    ])
      .then(res => {
        setLatest(res[0].data);
        setResult(res[1].data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const date = new Date(parseInt(latest.updated))
  const lastUpdated = date.toString()
  const filterCountry = result.filter(
    item => { return search !== "" ? item.country.includes(search) : item; }
  );


  //for country wise results
  const countries = filterCountry.map((data, i) => {
    return (
      <div>
      <card style={{justifyContent: "center"}}>
      <Card key={i}  text="dark" className="text-center" style={{ marginLeft: "50px" ,width:"300px",height:"390px"
    ,backgroundColor:"#ffffff",boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"}}>
        <Card.Body>
          <Card.Img style={{width:"200px"}}variant="top" src={data.countryInfo.flag} />
          <Card.Title style={{fontFamily: "Garamond" , fontSize:"30px"}}><b>{data.country}</b></Card.Title>
          <br></br>
    <div style={{lineHeight:"10px"}}>
          <Card.Text style={{fontFamily: "Garamond"}}>ACTIVE : {data.active} , CRITICAL: {data.critical} </Card.Text>
          <Card.Text style={{fontFamily: "Garamond"}}>TOTAL CASES : {data.cases} </Card.Text>
          <Card.Text style={{fontFamily: "Garamond"}}>TOTAL DEATHS : {data.deaths} </Card.Text>
          <Card.Text style={{fontFamily: "Garamond"}}> TOTAL RECOVERED : {data.recovered} </Card.Text>
          <Card.Text style={{fontFamily: "Garamond"}}><b>TODAY'S :-</b></Card.Text>
          <Card.Text style={{fontFamily: "Garamond"}}>CASES : {data.todayCases} , DEATHS : {data.todayDeaths}</Card.Text>
          </div>
        </Card.Body>
      </Card>
      </card>
      <br></br>
      </div>
    );
  });

  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 4,
    query: 'min-width: 1000px'
  }];


  return (
    <div className="App">
      <br></br>
      <h1 style={{ textAlign: "center" }}><b><u>THE CORONA VIRUS TRACKER</u></b></h1>
      {/* for total count decks */}
  
      <CardDeck>

        <Card  text="black" className="text-center" style={{ margin: "20px",backgroundColor:"#ffffff",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",fontFamily: "Garamond" }}>
          <Card.Body>
            <Card.Title><u>TOTAL CASES</u></Card.Title>
            <Card.Text>
              {latest.cases} People worldwide
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>

        <Card className="text-center" style={{ margin: "20px" ,backgroundColor:"#ffffff",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)" , fontFamily: "Garamond"}}>
          <Card.Body>
            <Card.Title><u>RECOVERED CASES</u></Card.Title>
            <Card.Text>
              {latest.recovered} People worldwide
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small >Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>

        <Card  className="text-center" style={{ margin: "20px",backgroundColor:"#ffffff",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)" ,fontFamily: "Garamond"}}>
          <Card.Body>
            <Card.Title><u>TOTAL DEATHS</u></Card.Title>
            <Card.Text>
              {latest.deaths} People worldwide
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>

      <div style={{textAlign: "center" }}>
        <img src="http://www.medicalxpertsystems.ch/wp-content/uploads/2015/07/medical-events.jpg" />
      </div>
      {/* for search  */}
      <br></br>
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control  type="text" style={{ width: "540px",marginLeft: "350px" }} placeholder="Enter country to search..."
            onChange={e => setSearch(e.target.value)} />
        </Form.Group>
      </Form>
<h1 style={{textAlign: "center" }}><b><u>COUNTRY WISE STATISTICS</u></b></h1>
<br></br>
      <Columns query={queries} >{countries}</Columns>
    </div>
  );
}

export default App;
