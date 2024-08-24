import React from 'react';
import Sidebar from '../Sidebar.js/Sidebar';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

const Dashboard = () => {

  const cardsData = [
    { id: 1, title: "Categories", text: "1" },
    { id: 2, title: "Tests", text: "2" },
    { id: 3, title: "Packages", text: "3" },
  ];

  const cardsData2 = [
    { id: 1, title: "Categories", text: "4" },
    { id: 2, title: "Tests", text: "5" },
  ];

  return (
    <>
      <div className="dashboard">
        <Sidebar />

        <div className='dashboard_card' >
          {cardsData.map((card) => (
            <Card key={card.id}>
              <Card.Body>
                <div className='title_text'>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </div>
                {/* <div className='submit_btn'>
                <Button variant="primary">Submit</Button>
              </div> */}
              </Card.Body>
            </Card>
          ))}
        </div>

        <div className='dashboard_card' >
          {cardsData2.map((card) => (
            <Card key={card.id}>
              <Card.Body>
                <div className='title_text'>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </div>
                {/* <div className='submit_btn'>
                <Button variant="primary">Submit</Button>
              </div> */}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;