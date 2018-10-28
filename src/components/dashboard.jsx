import React from "react";

const Dashboard = ({ match }) => {
  return <h1>Dasboard movie {match.params.id}</h1>;
};

export default Dashboard;
