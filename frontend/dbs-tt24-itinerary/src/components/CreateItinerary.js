import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateItinerary = () => {
  const countryList = ["Singapore", "Malaysia", "Indonesia", "Japan", "Korea"];
  const destinationList = {
    destinations: [
      {
        id: 1,
        name: "Marina Bay Sands",
        cost: 50.0,
        notes: "Hello world",
      },
      {
        id: 2,
        name: "Gardens By The Bay",
        cost: 60.0,
        notes: "Hello world",
      },
      {
        id: 3,
        name: "Esplanade",
        cost: 10.0,
        notes: "Hello world",
      },
    ],
  };

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

  //   // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData)

      // Setting error state variables to true if error is found
      if (formData.title.strip == "") {
        setTitleError(true);
      } else if (formData.budget <= 0) {
        setBudgetError(true);
      } else if (formData.country == "") {
        setCountryError(true);
      } else {
        console.log("success!");
        
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
          </Form.Group>
          {titleError && (
            <Form.Text class='text-danger' muted>
              Please enter a title.
            </Form.Text>
          )}
        </div>

        <div>
          <Form.Group className='mb-3'>
            <Form.Label>Budget (S$):</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter budget'
              name='budget'
              value={formData.title}
              onChange={handleUserInput}
            />
          </Form.Group>
          {budgetError && (
            <Form.Text class='text-danger' muted>
              Please enter a budget for your trip.
            </Form.Text>
          )}
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
            <Form.Text class='text-danger' muted>
              Please select a country for your trip.
            </Form.Text>
          )}
          </Form.Group>
        </div>

        <div>
          <Form.Group className='mb-3'>
            <div class='d-flex justify-content-between mb-2'>
              <Form.Label class="align-self-end">Destination:</Form.Label>
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
              {destinationList.destinations.map((dest, index) => (
                <option value={dest.name} key={dest.id}>
                  {dest.name} (Cost: {dest.cost})
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
