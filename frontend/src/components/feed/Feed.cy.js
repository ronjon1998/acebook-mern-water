import React from 'react';
import Feed from './Feed';
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, message: "Hello, world",
            user: {
              "_id": "64d10621593ed5d2b1a88b36",
              "email": "test123@test",
              "username": "testname",
              "password": "pass",
              "__v": 0
          }},
            {_id: 2, message: "Hello again, world",
            user: {
              "_id": "64d10621593ed5d2b1a88b36",
              "email": "test123@test",
              "username": "testname",
              "password": "pass",
              "__v": 0
          }}
          ] }
        })
      }
    ).as("getPosts")

    cy.mount(<Feed navigate={navigate}/>)
    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "Hello, world")
      .and('contain.text', "Hello again, world")
    });
  });
});