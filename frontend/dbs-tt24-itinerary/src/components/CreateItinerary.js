import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateItinerary = () => {
  const countryList = ["Singapore", "Malaysia", "Indonesia", "Japan", "Korea"];

  // Initialize state for form data
  const [formData, setFormData] = useState({
    title: "",
    budget: 0.0,
    country: "",
    destination: null,
  });

  // Initialise state for potential errors in form
  const [titleError, setTitleError] = useState(false);
  const [budgetError, setBudgetError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [allDestinations, setAllDestinations] = useState();

  // Getting all destinations
  React.useEffect(() => {
    var url = "https://h4g.fly.dev/destination/";
    axios.get(url).then((res) => {
      const result = res.data;
      console.log(result);
      setAllDestinations(result["data"]);
    });

  }, []);

  //   // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    // Setting error state variables to true if error is found
    if (formData.title == "") {
      setTitleError(true);
    } else if (formData.budget <= 0) {
      setBudgetError(true);
    } else if (formData.country == "") {
      setCountryError(true);
    } else {
      console.log("success!");
      var url = "https://h4g.fly.dev/destination/";
      axios.get(url).then((res) => {
        const result = res.data;
        console.log(result);
      });
    }
  };

  const handleUserInput = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Form className='m-4' onSubmit={handleSubmit}>
        <h1>Create Itinerary</h1>
        <br />

        <div>
          <Form.Group className='mb-3'>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              name='title'
              value={formData.title}
              onChange={handleUserInput}
            />
            {titleError && <Form.Text muted>Please enter a title.</Form.Text>}
          </Form.Group>
        </div>

        <div>
          <Form.Group className='mb-3'>
            <Form.Label>Budget (S$):</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter budget'
              name='budget'
              value={formData.budget}
              onChange={handleUserInput}
            />
            {budgetError && (
              <Form.Text muted>Please enter a budget for your trip.</Form.Text>
            )}
          </Form.Group>
        </div>

        <div>
          <Form.Group className='mb-4'>
            <Form.Label>Country:</Form.Label>

            <Form.Select
              aria-label='Country-Select'
              name='country'
              onChange={handleUserInput}
            >
              <option>Please select a country</option>
              {countryList.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </Form.Select>
            {countryError && (
              <Form.Text muted>
                Please select a country for your trip.
              </Form.Text>
            )}
          </Form.Group>
        </div>

        <div>
          <Form.Group className='mb-3'>
            <div class='d-flex justify-content-between mb-2'>
              <Form.Label class='align-self-end'>Destinations:</Form.Label>
              <Button variant='btn btn-outline-primary' type='submit'>
                + Add destination
              </Button>
            </div>

            <Form.Select
              aria-label='Destination-Select'
              name='destination'
              onChange={handleUserInput}
              disabled={!formData.country}
            >
              {allDestinations && allDestinations.map((dest, index) => (
                <option value={dest.name} key={dest.id}>
                  {dest.name} (Cost: ${dest.cost.toFixed(2)})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CreateItinerary;
